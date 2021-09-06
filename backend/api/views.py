from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from django.contrib.auth.models import Group, User
from .serializers import TicketSerializer
from auth.serializers import  UserSerializer
import json
from .models import Ticket
# Create your views here.


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': 'http://localhost:8000/api/ticket-list/',
        'Detail': 'http://localhost:8000/api/ticket-detail/<str:pk>/',
        'Create': 'http://localhost:8000/api/ticket-create/',
        'Update': 'http://localhost:8000/api/ticket-update/<str:pk>/',
        'Delete': 'http://localhost:8000/api/ticket-delete/<str:pk>/',
    }

    return Response(api_urls)


@login_required(login_url='/auth/api-auth/login')
@api_view(['GET'])
def ticketList(request):
    tickets = Ticket.objects.filter(destination=request.user)
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data)


@login_required(login_url='/auth/api-auth/login')
@api_view(['GET'])
def ticketDetail(request, pk):
    tickets = Ticket.objects.get(id=pk)
    serializer = TicketSerializer(tickets, many=False)
    return Response(serializer.data)


@login_required(login_url='/auth/api-auth/login')
@api_view(['POST'])
def ticketCreate(request):
    serializer = TicketSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@login_required(login_url='/auth/api-auth/login')
@api_view(['POST'])
def ticketUpdate(request, pk):
    ticket = Ticket.objects.get(id=pk)
    serializer = TicketSerializer(instance=ticket, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@login_required(login_url='/auth/api-auth/login')
@api_view(['DELETE'])
def ticketDelete(request, pk):
    ticket = Ticket.objects.get(id=pk)
    ticket.delete()

    return Response('Item succsesfully delete!')

@api_view(['GET'])
def groupUsers(request, pk):
	users = User.objects.filter(groups__name=pk)
	serializer = UserSerializer(users, many=True)
	return Response(serializer.data)