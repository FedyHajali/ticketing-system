from django.contrib.auth.models import Group, User
from django.contrib.auth.models import User
from .serializers import GroupSerializer, NameGroupSerializer, GroupUsersSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.


@api_view(['POST'])
def registration(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer._errors)


@api_view(['GET'])
def groupUsers(request, pk):
    users = User.objects.filter(groups__name=pk)
    serializer = GroupUsersSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def groupList(request):
    groups = Group.objects.all()
    serializer = GroupSerializer(groups, many=True)
    return Response(serializer.data)
