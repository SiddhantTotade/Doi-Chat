import {create} from 'zustand';
import secure from './secure';

import api from './api';
import utils from './utils';

// --------------------------------
// Socket receive message handler
// --------------------------------

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
  socketClose: () => {},

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
