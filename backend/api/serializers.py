from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Ticket, Topic


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name', )


class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', )


class TopicSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)
    users = UserNameSerializer(many=True)

    class Meta:
        model = Topic
        fields = '__all__'


class TopicNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ('name',)


class TicketSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)
    creator = UserNameSerializer()
    receivers = UserNameSerializer(many=True)
    topics = TopicNameSerializer(many=True)

    class Meta:
        model = Ticket
        fields = '__all__'