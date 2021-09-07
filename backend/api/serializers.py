from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Ticket


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name', )


class DestinationAndCreatedBySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', )


class TicketSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)
    created_by = DestinationAndCreatedBySerializer()
    destination = DestinationAndCreatedBySerializer(many=True)

    class Meta:
        model = Ticket
        fields = '__all__'
