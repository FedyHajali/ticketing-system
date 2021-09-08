from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from auth.serializers import UserSerializer
from .models import Ticket
from .serializers import TicketSerializer
from .permission import IsStaff
from django.contrib.auth.decorators import login_required
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


@login_required(login_url='/auth/login/')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketList(request):
    tickets = Ticket.objects.all()
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data)


@login_required(login_url='/auth/login/')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketDestinationList(request, pk):
    tickets = Ticket.objects.filter(destination__username=pk)
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data)


@login_required(login_url='/auth/login/')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketGroupList(request, pk):
    tickets = Ticket.objects.filter(groups__name=pk)
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data)


@login_required(login_url='/auth/login/')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketDetail(request, pk):
    tickets = Ticket.objects.get(id=pk)
    serializer = TicketSerializer(tickets, many=False)
    return Response(serializer.data)


@login_required(login_url='/auth/login/')
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketCreate(request):
    serializer = TicketSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@login_required(login_url='/auth/login/')
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketUpdate(request, pk):
    ticket = Ticket.objects.get(id=pk)
    serializer = TicketSerializer(instance=ticket, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@login_required(login_url='/auth/login/')
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketDelete(request, pk):
    
    ticket = Ticket.objects.get(id=pk)
    ticket.delete()

    return Response('Item succsesfully delete!')
