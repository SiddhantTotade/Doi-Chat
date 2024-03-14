from rest_framework import serializers

from .models import User, Connection, Message


class UserSerialzier(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["username", "name", "thumbnail"]

    def get_name(self, obj):
        fname = obj.first_name.capitalize()
        lname = obj.last_name.capitalize()

        return fname + " " + lname


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "password"]
        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def create(self, validated_data):
        # Clean all values, set as lowercase
        username = validated_data["username"].lower()
        first_name = validated_data["first_name"].lower()
        last_name = validated_data["last_name"].lower()
        password = validated_data["password"].lower()

        user = User.objects.create(
            username=username, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()

        return user


class SearchSearializer(UserSerialzier):
    status = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["username", "name", "thumbnail", "status"]

    def get_status(self, obj):
        if obj.pending_them:
            return "pending-them"
        elif obj.pending_me:
            return "pending-me"
        elif obj.connected:
            return "connected"
        return "no-connection"


class RequestSerializer(serializers.ModelSerializer):
    sender = UserSerialzier()
    receiver = UserSerialzier()

    class Meta:
        model = Connection
        fields = ["id", "sender", "receiver", "created"]


class FriendSerializer(serializers.ModelSerializer):
    friend = serializers.SerializerMethodField()
    preview = serializers.SerializerMethodField()
    updated = serializers.SerializerMethodField()

    class Meta:
        model = Connection
        fields = ["id", "friend", "preview", "updated"]

    def get_friend(self, obj):
        # If I'm the sender
        if self.context['user'] == obj.sender:
            return UserSerialzier(obj.receiver).data

        # If I'm the receiver
        elif self.context['user'] == obj.receiver:
            return UserSerialzier(obj.sender).data
        else:
            print("Error : No user found in friendSerializer")

    def get_updated(self, obj):
        if not hasattr(obj, "latest_created"):
            date = obj.updated
        else:
            date = obj.latest_created or obj.updated
        return date.isoformat()

    def get_preview(self, obj):
        if not hasattr(obj, "latest_text"):
            return "New connection. Say hii.."
        return obj.latest_text


class MessageSerializer(serializers.ModelSerializer):
    is_me = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ["id", "is_me", "text", "created"]

    def get_is_me(self, obj):
        return self.context["user"] == obj.user
