from rest_framework import serializers
from django.contrib.auth.models import Group, User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator


# Serializers define the API representation.

class NameGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name',
                  'last_name', 'password', 'groups', 'is_staff')

    def create(self, validated_data):
        password_data = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password_data)
        groups_data = validated_data.pop('groups')
        for group_data in groups_data:
            user.groups.add(group_data)

        user.save()
        return user


class GroupUsersSerializer(serializers.ModelSerializer):
    groups = NameGroupSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name',
                  'last_name', 'password', 'groups')
