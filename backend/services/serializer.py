from rest_framework import serializers
from api.models import Comment, Ticket, Topic
from django.contrib.auth.models import Group, User


# Serializers define the API representation.

################# AUTH ######################

class GroupSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Group
        fields = ('id', 'name', 'permissions')


class UserSerializer(serializers.ModelSerializer):
    # groups = GroupSerializer(many=True)

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        password_data = validated_data.pop('password')
        groups_data = validated_data.pop('groups')
        user = super().create(validated_data)
        user.set_password(password_data)
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
    users = UserSerializer(many=True, read_only=True)
    group = GroupSerializer()

    class Meta:
        model = Topic
        fields = '__all__'

    def create(self, validated_data):
        group = validated_data.pop('group')
        topic_group = Group.objects.get(pk=group['id'])
        topic = Topic.objects.create(group=topic_group, **validated_data)
        return topic


class TicketSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)
    receivers = UserSerializer(many=True)
    topics = TopicSerializer(many=True)
    comments = CommentSerializer(many=True)
    creator = UserSerializer()
    last_updated_by = UserSerializer()

    class Meta:
        model = Ticket
        fields = '__all__'
