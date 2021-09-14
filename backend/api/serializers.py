from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Comment, Ticket, Topic


class ApiGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class ApiUserSerializer(serializers.ModelSerializer):
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
    users = ApiUserSerializer(many=True)
    group = ApiGroupSerializer()

    class Meta:
        model = Topic
        fields = '__all__'


class TopicNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topic
        fields = ('name',)


class TicketSerializer(serializers.ModelSerializer):
    groups = ApiGroupSerializer(many=True)
    receivers = ApiUserSerializer(many=True)
    topics = TopicSerializer(many=True)
    comments = CommentSerializer(many=True)
    creator = ApiUserSerializer()

    class Meta:
        model = Ticket
        fields = '__all__'
