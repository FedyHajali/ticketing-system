
from .permission import IsSuperuser
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group, User
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import GroupSerializer, GroupUsersSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes

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


#################### USER ####################

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def userDetail(request):
    user = User.objects.get(id=request.user.id)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


#################### GROUP ####################

# creazione gruppo solo da SUPERUSER
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsSuperuser])
def groupCreate(request):
    serializer = GroupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

# lista di tutti i gruppi

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def groupList(request):
    groups = Group.objects.all()
    serializer = GroupSerializer(groups, many=True)
    return Response(serializer.data)

# manca la delete etce
