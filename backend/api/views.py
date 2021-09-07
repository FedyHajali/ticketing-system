from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from auth.serializers import UserSerializer
from .models import Ticket
from .serializers import TicketSerializer
# from django.contrib.auth.decorators import login_required
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


@api_view(['GET'])
def ticketList(request):
    tickets = Ticket.objects.all()
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def ticketDestinationList(request, pk):
    tickets = Ticket.objects.filter(destination__username=pk)
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def ticketGroupList(request, pk):
    tickets = Ticket.objects.filter(groups__name=pk)
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def ticketDetail(request, pk):
    tickets = Ticket.objects.get(id=pk)
    serializer = TicketSerializer(tickets, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def ticketCreate(request):
    serializer = TicketSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['PUT'])
def ticketUpdate(request, pk):
    ticket = Ticket.objects.get(id=pk)
    serializer = TicketSerializer(instance=ticket, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def ticketDelete(request, pk):
    ticket = Ticket.objects.get(id=pk)
    ticket.delete()

    return Response('Item succsesfully delete!')
