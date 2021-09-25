from rest_framework import serializers
from api.models import Comment, Ticket, Topic
from django.contrib.auth.models import Group, User


# Serializers define the API representation.

################# AUTH ######################

class GroupSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Group
        fields = ('id', 'name', 'permissions')
        extra_kwargs = {
            'name': {'validators': []},
        }


class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)
    id = serializers.IntegerField(required=False)

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'username': {'validators': []},
        }

    def create(self, validated_data):
        password_data = validated_data.pop('password')
        groups_data = validated_data.pop('groups')
        user = super().create(validated_data)
        user.set_password(password_data)
        for group_data in groups_data:
            user.groups.add(group_data['id'])

        user.save()
        return user


############### API ################


class CommentSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Comment
        fields = '__all__'

    def create(self, validated_data):
        creator = validated_data.pop('creator')
        user_obj = User.objects.get(pk=creator['id'])
        comment = Comment.objects.create(creator=user_obj, **validated_data)
        return comment


class TopicSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)
    group = GroupSerializer()
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Topic
        fields = '__all__'

    def create(self, validated_data):
        group = validated_data.pop('group')
        topic_group = Group.objects.get(pk=group['id'])
        topic = Topic.objects.create(group=topic_group, **validated_data)
        return topic


class TicketSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    groups = GroupSerializer(many=True)
    receivers = UserSerializer(many=True)
    topics = TopicSerializer(many=True)
    comments = CommentSerializer(many=True, required=False)
    creator = UserSerializer()
    last_updated_by = UserSerializer()

    class Meta:
        model = Ticket
        fields = '__all__'

    def create(self, validated_data):
        creator = validated_data.pop('creator')
        last_updated_by = validated_data.pop('last_updated_by')
        groups = validated_data.pop('groups')
        topics = validated_data.pop('topics')
        receivers = validated_data.pop('receivers')
        creator_obj = User.objects.get(pk=creator['id'])
        last_updated_by_obj = User.objects.get(pk=last_updated_by['id'])

        ticket = Ticket.objects.create(
            creator=creator_obj, last_updated_by=last_updated_by_obj, ** validated_data)

        for group in groups:
            groups_obj = Group.objects.get(pk=group['id'])
            ticket.groups.add(groups_obj)

        for topic in topics:
            topics_obj = Topic.objects.get(pk=topic['id'])
            ticket.topics.add(topics_obj)

        for receiver in receivers:
            receivers_obj = User.objects.get(pk=receiver['id'])
            ticket.receivers.add(receivers_obj)

        return ticket

    def update(self, instance, validated_data):
        instance.status = validated_data['status']
        last_updated_by = validated_data['last_updated_by']
        last_updated_by_obj = User.objects.get(pk=last_updated_by['id'])
        instance.last_updated_by = last_updated_by_obj
        instance.save()

        return instance
