
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from .permission import IsSuperuser
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group, User
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from .serializers import GroupSerializer, GroupUsersSerializer, AuthUserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes

# Create your views here.


#################### USER ####################


@swagger_auto_schema(
    method="post",
    operation_description='Registration of a new user',
    operation_summary='Sign In',
    request_body=AuthUserSerializer,
    responses={201: openapi.Response('Created', AuthUserSerializer),
               400: openapi.Response('Bad Request')})
@api_view(['POST'])
def registration(request):
    serializer = AuthUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def userDetail(request):
    try:
        user = User.objects.get(id=request.user.id)
    except User.DoesNotExist:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)
    
    serializer = AuthUserSerializer(user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


#################### GROUP ####################

# lista di tutti i gruppi

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([AllowAny, ])
def groupList(request):
    groups = Group.objects.all()
    serializer = GroupSerializer(groups, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def groupUsers(request, pk):
    users = User.objects.filter(groups=pk)
    if users.count() == 0:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)
    serializer = AuthUserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# creazione gruppo solo da SUPERUSER
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsSuperuser])
def groupCreate(request):
    serializer = GroupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# eliminazione gruppo solo da SUPERUSER
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsSuperuser])
def groupDelete(request, pk):
    try:
        group = Group.objects.filter(id=pk)
    except Group.DoesNotExist:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)
        
    group.delete()
    return Response("Delete OK", status=status.HTTP_200_OK)
