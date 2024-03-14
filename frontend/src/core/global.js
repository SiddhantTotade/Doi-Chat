import {create} from 'zustand';
import secure from './secure';

import api from './api';
import utils from './utils';

// --------------------------------
// Socket receive message handler
// --------------------------------

function responseRequestConnect(set, get, connection) {
  const user = get().user;
  // If connect person is user, update the search list
  if (user.username === connection.sender.username) {
    const searchList = [...get().searchList];
    const searchIndex = searchList.findIndex(
      request => request.username === connection.receiver.username,
    );
    if (searchIndex >= 0) {
      searchList[searchIndex].status = 'pending-them';
      set(state => ({
        searchList: searchList,
      }));
    }
  } else {
    const requestList = [...get().requestList];
    const requestIndex = requestList.findIndex(
      request => request.sender.username === connection.sender.username,
    );

    if (requestIndex === -1) {
      requestList.unshift(connection);
      set(state => ({requestList: requestList}));
    }
  }
}

function responseRequestAccept(set, get, connection) {
  const user = get().user;

  // If I was the one who is accepting request,
  // remove the request from the request list
  if (user.username === connection.receiver.username) {
    const requestList = [...get().requestList];
    const requestIndex = requestList.findIndex(
      request => request.id === connection.id,
    );

    if (requestIndex >= 0) {
      requestList.splice(requestIndex, 1);
      set(state => ({
        requestList: requestList,
      }));
    }
  }

  // If the corrosponding user is contained within the SearchList
  // for the acceptor or the acceptee, update
  // the state of searchlist item
  const sl = get().searchList;
  if (sl === null) {
    return;
  }

  const searchList = [...sl];

  let searchIndex = -1;

  // If user is accepted
  if (user.username === connection.receiver.username) {
    searchIndex = searchList.findIndex(
      user => user.username === connection.sender.username,
    );
  } else {
    searchIndex = searchList.findIndex(
      user => user.username === connection.receiver.username,
    );
  }

  if (searchIndex >= 0) {
    searchList[searchIndex].status = 'connected';
    set(state => ({
      searchList: searchList,
    }));
  }
}

function responseMessageSend(set, get, data) {
  const username = data.friend.username;
  // Move the friendList item to this friend
  // to the start of the list, update the preview text and update the timestamp
  const friendList = [...get().friendList];
  const friendIndex = friendList.findIndex(
    item => item.friend.username === username,
  );
  if (friendIndex >= 0) {
    const item = friendList[friendIndex];
    item.preview = data.message.text;
    item.updated = data.message.created;
    friendList.splice(friendIndex, 1);
    friendList.unshift(item);
    set(state => ({
      friendList: friendList,
    }));
  }

  // If the message data does not belon to this friend,
  // then dont update the message list, as a fresh
  // messageList will be loaded the next time the user open the correct chat window
  if (username !== get().messagesUsername) {
    return;
  }

  const messagesList = [data.message, ...get().messagesList];
  set(state => ({
    messagesList: messagesList,
    messagesType: null,
  }));
}

function responseMessageType(set, get, data) {
  if (data.username !== get().messagesUsername) return;

  set(state => ({
    messagesType: new Date(),
  }));
}

function responseMessageList(set, get, data) {
  set(state => ({
    messagesList: [...get().messagesList, ...data.messages],
    messagesNext: data.next,
    messagesUsername: data.friend.username,
  }));
}

function responseRequestList(set, get, requestList) {
  set(state => ({
    requestList: requestList,
  }));
}

function responseFriendNew(set, get, friend) {
  const friendList = [friend, ...get().friendList];
  set(state => ({
    friendList: friendList,
  }));
}

function responseFriendList(set, get, friendList) {
  set(state => ({
    friendList: friendList,
  }));
}

function responseSearch(set, get, data) {
  set(state => ({
    searchList: data,
  }));
}

function responseThumbnail(set, get, data) {
  set(state => ({
    user: data,
  }));
}

const useGlobal = create((set, get) => ({
  // -------------------
  // Initiliazation
  // -------------------
  initialized: false,

  init: async () => {
    const credentials = await secure.get('credentials');

    if (credentials) {
      try {
        const response = await api({
          url: '/auth/signin/',
          method: 'POST',
          data: {
            username: credentials.username,
            password: credentials.password,
          },
        });

        if (response.status !== 200) {
          throw 'Authentication error';
        }

        const user = response.data.user;
        const tokens = response.data.tokens;

        secure.set('tokens', tokens);

        set(state => ({initialized: true, authenticated: true, user: user}));

        return;
      } catch (error) {
        console.log('Error', error);
      }
    }
    set(state => ({initialized: true}));
  },

  // -------------------
  // Authentication
  // -------------------
  authenticated: false,
  user: {},

  login: (credentials, user, tokens) => {
    secure.set('credentials', credentials);
    secure.set('tokens', tokens);
    set(state => ({authenticated: true, user: user}));
  },

  logout: () => {
    secure.wipe();
    set(state => ({
      authenticated: false,
      user: {},
    }));
  },

  // -------------------
  // Websockets
  // -------------------
  socket: null,

  socketConnect: async () => {
    const tokens = await secure.get('tokens');
    const socket = new WebSocket(
      `ws://192.168.43.248:8000/chat/?token=${tokens.access}`,
    );

    socket.onopen = () => {
      utils.log('onopen');
      socket.send(JSON.stringify({source: 'request.list'}));
      socket.send(JSON.stringify({source: 'friend.list'}));
    };
    socket.onclose = () => {
      utils.log('onclose');
    };
    socket.onmessage = event => {
      // Convert data to js object
      const parsed = JSON.parse(event.data);

      // Debug log value
      utils.log(parsed);

      const responses = {
        'request.accept': responseRequestAccept,
        'request.connect': responseRequestConnect,
        'message.send': responseMessageSend,
        'message.type': responseMessageType,
        'friend.new': responseFriendNew,
        'friend.list': responseFriendList,
        'message.list': responseMessageList,
        'request.list': responseRequestList,
        search: responseSearch,
        thumbnail: responseThumbnail,
      };
      const resp = responses[parsed.source];
      if (!resp) {
        utils.log(parsed.source + 'not found');
        return;
      }
      resp(set, get, parsed.data);
    };
    socket.onerror = () => {
      utils.log('onerror');
    };

    set(state => ({socket: socket}));
  },
  socketClose: () => {
    const socket = get().socket;

    if (socket) {
      socket.close();
    }
    set(state => ({
      socket: null,
    }));
  },

  // -------------------
  // Messages
  // -------------------
  messagesList: [],
  messagesType: null,
  messagesNext: null,
  messagesUsername: null,

  messageList: (connectionId, page = 0) => {
    if (page === 0) {
      set(state => ({
        messagesList: [],
        messagesType: null,
        messagesNext: null,
        messagesUsername: null,
      }));
    } else {
      set(state => ({
        messagesNext: null,
      }));
    }
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: 'message.list',
        connectionId: connectionId,
        page: page,
      }),
    );
  },

  messageSend: (connectionId, message) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: 'message.send',
        connectionId: connectionId,
        message: message,
      }),
    );
  },

  messageType: username => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: 'message.type',
        username: username,
      }),
    );
  },

  // -------------------
  // Requests
  // -------------------
  requestList: null,

  requestAccept: username => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: 'request.accept',
        username: username,
      }),
    );
  },

  requestConnect: username => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: 'request.connect',
        username: username,
      }),
    );
  },

  // -------------------
  // Search
  // -------------------
  searchList: null,

  searchUsers: query => {
    if (query) {
      const socket = get().socket;
      socket.send(
        JSON.stringify({
          source: 'search',
          query: query,
        }),
      );
    } else {
      set(state => ({
        searchList: null,
      }));
    }
  },

  // -------------------
  // Uplaod thumbnail
  // -------------------
  uploadThumbnail: file => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: 'thumbnail',
        base64: file.base64,
        filename: file.fileName,
      }),
    );
  },
}));

export default useGlobal;
