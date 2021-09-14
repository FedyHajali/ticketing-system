from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Comment, Ticket, Topic


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', )


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class TopicSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True)
    class Meta:
        model = Topic
        fields = '__all__'


class TopicNameSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Topic
        fields = ('name',)


class TicketSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)
    receivers = UserSerializer(many=True)
    topics = TopicSerializer(many=True)
    creator = UserSerializer()

    class Meta:
        model = Ticket
        fields = '__all__'
