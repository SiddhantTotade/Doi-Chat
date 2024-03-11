import json
import base64

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from .serializers import UserSerialzier

from django.core.files.base import ContentFile


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

        # Thumbnail upload
        if data_source == "thumbnail":
            self.receive_thumbnail(data)

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
