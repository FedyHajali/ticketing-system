from rest_framework import serializers
from api.models import Comment, Ticket, Topic
from django.contrib.auth.models import Group, User


# Serializers define the API representation.

################# AUTH ######################

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    # groups = GroupSerializer(many=True)

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        password_data = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password_data)
        groups_data = validated_data.pop('groups')
        for group_data in groups_data:
            user.groups.add(group_data)

        user.save()
        return user


############### API ################


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class TopicSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True)
    group = GroupSerializer()

    class Meta:
        model = Topic
        fields = '__all__'


class TicketSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)
    receivers = UserSerializer(many=True)
    topics = TopicSerializer(many=True)
    comments = CommentSerializer(many=True)
    creator = UserSerializer()

    class Meta:
        model = Ticket
        fields = '__all__'
