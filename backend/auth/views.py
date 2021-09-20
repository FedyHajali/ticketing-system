
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from .permission import IsSuperuser
from django.contrib.auth.models import Group, User
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from services.serializer import GroupSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes

# Create your views here.


#################### USER ####################


@swagger_auto_schema(
    method="post",
    operation_description='Registration of a new user',
    operation_summary='Create User',
    request_body=UserSerializer,
    responses={201: openapi.Response('Created', UserSerializer),
               400: openapi.Response('Bad Request')})
@api_view(['POST'])
def registration(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method="get",
    operation_description='Retrieve all User Information ',
    operation_summary='Get User Info',
    responses={200: openapi.Response('OK', UserSerializer),
               400: openapi.Response('Bad Request')})
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def userDetail(request):
    try:
        user = User.objects.get(id=request.user.id)
    except User.DoesNotExist:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


#################### GROUP ####################

@swagger_auto_schema(
    method="get",
    operation_description='List of all available groups',
    operation_summary='List all Groups',
    responses={200: openapi.Response('OK', GroupSerializer(many=True))})
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([AllowAny, ])
def groupList(request):
    groups = Group.objects.all()
    serializer = GroupSerializer(groups, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="get",
    operation_description='List of all groups of active user',
    operation_summary='List Groups of active user',
    responses={200: openapi.Response('OK', GroupSerializer(many=True))})
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([AllowAny, ])
def groupListUser(request):
    groups = request.user.groups
    groups = Group.objects.filter(pk__in=groups.all())
    serializer = GroupSerializer(groups, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="get",
    operation_description='List all users of a group',
    operation_summary='List users of group',
    responses={200: openapi.Response('OK', UserSerializer(many=True)),
               404: openapi.Response('Not Found')})
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def userListGroup(request, pk):
    users = User.objects.filter(groups=pk)
    if users.count() == 0:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="post",
    operation_description='Creation of a new Group (only SuperUser)',
    operation_summary='Create Group (only SuperUser)',
    responses={201: openapi.Response('Created', GroupSerializer),
               400: openapi.Response('Bad Request')})
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


@swagger_auto_schema(
    method="delete",
    operation_description='Delete a Group (only SuperUser)',
    operation_summary='Delete Group (only SuperUser)',
    responses={200: openapi.Response('Deleted'),
               404: openapi.Response('Not Found')})
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
