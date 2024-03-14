import json
import base64

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from django.core.files.base import ContentFile
from django.db.models import Q, OuterRef, Exists
from django.db.models.functions import Coalesce

from .serializers import UserSerialzier, SearchSearializer, RequestSerializer, FriendSerializer, MessageSerializer
from .models import User, Connection, Message


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        user = self.scope['user']

        if not user.is_authenticated:
            return

        # Save username to use a  group name for this user
        self.username = user.username

        # Join the user with their username group
        async_to_sync(self.channel_layer.group_add)(
            self.username, self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # Leave room/group
        async_to_sync(self.channel_layer.group_discard)(
            self.username, self.channel_name
        )

    # -----------------------------------------
    # Handle Request
    # -----------------------------------------
    def receive(self, text_data):
        # Receive
        data = json.loads(text_data)
        data_source = data.get("source")

        # Search filter users
        if data_source == "search":
            self.receive_search(data)

        # Accept freiend request
        elif data_source == "request.accept":
            self.receive_request_accept(data)

        # Make freiend request
        elif data_source == "request.connect":
            self.receive_request_connect(data)

        # Get request list
        elif data_source == "request.list":
            self.receive_request_list(data)

        # Get friend list
        elif data_source == "friend.list":
            self.receive_friend_list(data)

        # Get message list
        elif data_source == "message.list":
            self.receive_message_list(data)

        # Get message send
        elif data_source == "message.send":
            self.receive_message_send(data)

        # User is typing message
        elif data_source == "message.type":
            self.receive_message_type(data)

        # Thumbnail upload
        elif data_source == "thumbnail":
            self.receive_thumbnail(data)

    def receive_message_type(self, data):
        user = self.scope['user']
        recipient_username = data.get("username")

        data = {
            "username": user.username
        }

        self.send_group(recipient_username, "message.type", data)

    def receive_message_list(self, data):
        user = self.scope['user']
        connectionId = data.get("connectionId")
        page = data.get("page")
        page_size = 5

        try:
            connection = Connection.objects.get(id=connectionId)
        except Connection.DoesNotExist:
            print("Error! Couldn't find connection")
            return

        messages = Message.objects.filter(
            connection=connection).order_by("-created")[page * page_size:(page + 1) * page_size]

        # Serialzied messages
        serialized_messages = MessageSerializer(
            messages, context={"user": user}, many=True
        )

        # Get recipient friend
        recipient = connection.sender
        if connection.sender == user:
            recipient = connection.receiver

        # Serialzied friend
        serialized_friend = UserSerialzier(recipient)

        # Count the total no of messages for this connection
        messages_count = Message.objects.filter(connection=connection).count()

        next_page = page + \
            1 if messages_count > (page + 1) * page_size else None

        data = {
            "messages": serialized_messages.data,
            "friend": serialized_friend.data,
            "next": next_page
        }

        self.send_group(user.username, "message.list", data)

    def receive_message_send(self, data):
        user = self.scope["user"]
        connectionId = data.get("connectionId")
        message_text = data.get("message")

        try:
            connection = Connection.objects.get(id=connectionId)
        except Connection.DoesNotExist:
            print("Error! Couldn't find connection")
            return

        message = Message.objects.create(
            connection=connection, user=user, text=message_text)

        # Get recipient friend
        recipient = connection.sender
        if connection.sender == user:
            recipient = connection.receiver

        # Send new message back to sender
        serialized_message = MessageSerializer(message, context={"user": user})
        serialized_friend = UserSerialzier(recipient)
        data = {"message": serialized_message.data,
                "friend": serialized_friend.data}
        self.send_group(user.username, "message.send", data)

        # Send new message back to sender
        serialized_message = MessageSerializer(
            message, context={"user": recipient})
        serialized_friend = UserSerialzier(user)
        data = {"message": serialized_message.data,
                "friend": serialized_friend.data}
        self.send_group(recipient.username, "message.send", data)

    def receive_friend_list(self, data):
        user = self.scope["user"]

        # Latest message subquery
        latest_message = Message.objects.filter(
            connection=OuterRef("id")).order_by("-created")[:1]

        # Get connections for the user
        connections = Connection.objects.filter(
            Q(sender=user) | Q(receiver=user), accepted=True).annotate(latest_text=latest_message.values("text"), latest_created=latest_message.values("created")).order_by(Coalesce("latest_created", "updated").desc())
        serialized = FriendSerializer(connections, context={'user': user
                                                            }, many=True)

        # Send data back to requesting user
        self.send_group(user.username, "friend.list", serialized.data)

    def receive_request_accept(self, data):
        username = data.get("username")

        # Fetech connection object
        try:
            connection = Connection.objects.get(
                sender__username=username, receiver=self.scope['user'])
        except Connection.DoesNotExist:
            print("Error! Connection doesn't exist")

        # Update connection
        connection.accepted = True
        connection.save()

        serialized = RequestSerializer(connection)

        # Send accepted request to sender
        self.send_group(connection.sender.username,
                        "request.accept", serialized.data)

        # Send accepted request to sender
        self.send_group(connection.receiver.username,
                        "request.accept", serialized.data)

        # Send new friend object to sender
        serialized_friend = FriendSerializer(
            connection, context={"user": connection.sender})

        self.send_group(connection.sender.username,
                        "friend.new", serialized_friend.data)

        # Send new friend object to receiver
        serialized_friend = FriendSerializer(
            connection, context={"user": connection.sender})

        self.send_group(connection.receiver.username,
                        "friend.new", serialized_friend.data)

    def receive_request_connect(self, data):
        username = data.get("username")

        # Fetch the receiving user
        try:
            receiver = User.objects.get(username=username)
        except User.DoesNotExist:
            print("Error! User not found")
            return

        # Create connection
        connection, _ = Connection.objects.get_or_create(
            sender=self.scope["user"], receiver=receiver)

        # Serialized connection
        serialized = RequestSerializer(connection)

        # Send back to sender
        self.send_group(connection.sender.username,
                        "request.connect", serialized.data)
        # Send to receiver
        self.send_group(connection.receiver.username,
                        "request.connect", serialized.data)

    def receive_request_list(self, data):
        user = self.scope['user']

        # Get connection made to this user
        connections = Connection.objects.filter(receiver=user, accepted=False)
        serialized = RequestSerializer(connections, many=True)

        # Send request list back to the user
        self.send_group(user.username, "request.list", serialized.data)

    def receive_search(self, data):
        query = data.get('query')

        # Get users from search terms query
        users = User.objects.filter(
            Q(username__istartswith=query) |
            Q(first_name__istartswith=query) |
            Q(last_name__istartswith=query)
        ).exclude(username=self.username).annotate(
            pending_them=Exists(
                Connection.objects.filter(
                    sender=self.scope["user"],
                    receiver=OuterRef("id"),
                    accepted=False)),
            pending_me=Exists(
                Connection.objects.filter(
                    sender=OuterRef("id"),
                    receiver=self.scope["user"],
                    accepted=False)),
            connected=Exists(
                Connection.objects.filter(
                    Q(sender=self.scope["user"], receiver=OuterRef("id")) |
                    Q(receiver=self.scope["user"], sender=OuterRef("id")),
                    accepted=True
                )
            )
        )

        # Searialize results
        serialized = SearchSearializer(users, many=True)

        # Send search results back to this user
        self.send_group(self.username, "search", serialized.data)

    def receive_thumbnail(self, data):
        user = self.scope["user"]

        # Convert base64 to django content file
        image_str = data.get("base64")
        image = ContentFile(base64.b64decode(image_str))

        # Update thumbnail field
        filename = data.get("filename")
        user.thumbnail.save(filename, image, save=True)

        # Serialize user
        serialized = UserSerialzier(user)

        # Send updated user data including new thumbnail
        self.send_group(self.username, "thumbnail", serialized.data)

    # ---------------------------------------
    #   Catch/All broadcast to client helpers
    # ---------------------------------------

    def send_group(self, group, source, data):
        response = {"type": "broadcast_group", "source": source, "data": data}
        async_to_sync(self.channel_layer.group_send)(
            group, response
        )

    def broadcast_group(self, data):
        """
            data
                type:' broadcast_group'
                source - 'originited position'
                data - 'what ever you want to send as a dict'
        """
        data.pop("type")
        """
            return data
                       type:' broadcast_group'
                       source - 'originited position'
                       data - 'what ever you want to send as a dict'
        """
        self.send(text_data=json.dumps(data))
