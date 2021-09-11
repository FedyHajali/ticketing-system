from copy import error
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import Group, User
from auth.serializers import UserSerializer, GroupSerializer
from .models import Comment, Ticket, Topic
from .serializers import CommentSerializer, TicketSerializer, TopicSerializer, UserNameSerializer
from .permission import IsStaff, IsSuperuser
from django.contrib.auth.decorators import login_required
# Create your views here.


#################### API ####################


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


#################### TICKET ####################


# creazione di un ticket

# @login_required(login_url='/auth/login/')
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketCreate(request):
    serializer = TicketSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        print()
    return Response(serializer.errors)


# lista dei ticket esistenti

# @login_required(login_url='/auth/login/')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsStaff])
def ticketList(request):
    tickets = Ticket.objects.filter(receivers=request.user)
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data)

# lista dei ricevitori del ticket
#  pk identifica il ticket
# ritorna gli id dei destinatari

# @login_required(login_url='/auth/login/')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketReceiversList(request, pk):
    ticket = Ticket.objects.get(id=pk)
    serializer = TicketSerializer(ticket, many=False)
    return Response(serializer.data['receivers'])


# lista dei ticket del creatore
# pk identifica l'utente
# ritorna gli id dei destinatari

# @login_required(login_url='/auth/login/')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketListCreator(request, pk):
    ticket = Ticket.objects.get(creator=pk)
    serializer = TicketSerializer(ticket, many=False)
    return Response(serializer.data['receivers'])


# lista dei ticket in un gruppo
# ritorna tutta la struttura del ticket

# @login_required(login_url='/auth/login/')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsStaff])
def ticketGroupList(request, pk):
    tickets = Ticket.objects.filter(groups__id=pk)
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data)

# info del ticket

# @login_required(login_url='/auth/login/')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketDetail(request, pk):
    tickets = Ticket.objects.get(id=pk)
    serializer = TicketSerializer(tickets, many=False)
    return Response(serializer.data)


# update del ticket per il creatore, può mettere solo Closed o Open
# pk identifica il ticket

# @login_required(login_url='/auth/login/')
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketCreatorUpdate(request, pk):
    if request.data['status'] not in ('CL', 'OP'):
        return Response('Only Closed or Open are possible')
    ticket = Ticket.objects.get(id=pk, creator=request.user)  # gestione errore
    serializer = TicketSerializer(instance=ticket, data=request.data)
    if (serializer.is_valid()):
        serializer.save()

    return Response(serializer.data)


# update del ticket per il ricevitore, può mettere solo Pending Resolved
# ovviamente bisogna mostrare solo i biglietti in stato OPEN, gli altri sono giò in stato closed/pending/resolved
# pk identifica il ticket

# @login_required(login_url='/auth/login/')
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketReceiverUpdate(request, pk):
    if request.data['status'] not in ('PE', 'RE'):
        return Response('Only Pendign or Resolved are possible')
    ticket = Ticket.objects.get(id=pk, receivers=request.user)
    serializer = TicketSerializer(instance=ticket, data=request.data)
    if (serializer.is_valid()):
        serializer.save()

    return Response(serializer.data)


# lo staff può mettere in qualsiasi stato, per comodità.. però tranne expired, che dipende dalla data
# nel caso, per uno dello staff sarebbe meglio cambiare la data
# pk identifica il ticket

# @login_required(login_url='/auth/login/')
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsStaff])
def ticketStaffUpdate(request, pk):
    if request.data['status'] in ('EX'):
        return Response('Expired is not possible')
    ticket = Ticket.objects.get(id=pk)
    serializer = TicketSerializer(instance=ticket, data=request.data)
    if (serializer.is_valid()):
        serializer.save()

    return Response(serializer.data)

# elimina un ticket dal database

# @login_required(login_url='/auth/login/')
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsStaff])
def ticketDelete(request, pk):

    ticket = Ticket.objects.get(id=pk)
    ticket.delete()

    return Response('Item succsesfully delete!')


#################### TOPIC ####################

# creazione topic

# @login_required(login_url='/auth/login/')
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsStaff])
def topicCreate(request):
    serializer = TopicSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

# info del topic

# @login_required(login_url='/auth/login/')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def topicDetail(request, pk):
    topic = Topic.objects.get(id=pk)
    serializer = TopicSerializer(topic, many=False)
    return Response(serializer.data)

# aggiugne un utente al topic

# @login_required(login_url='/auth/login/')
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def topicUsersAdd(request, pk):
    topic = Topic.objects.get(id=pk)  # oppure name=
    user = User.objects.get(id=request.user.id)
    topic.users.add(user)

    return Response('Sei stato iscritto al Topic')


# lista dei topic di un gruppo
# pk identifica il gruppo

# @login_required(login_url='/auth/login/')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def topicGroupList(request, pk):
    topics = Topic.objects.filter(group__name=pk)
    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data)


# lista dei topic di un gruppo a cui l'utente è iscritto
# pk è il gruppo

# @login_required(login_url='/auth/login/')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def topicUserGroupList(request, pk):
    topics = Topic.objects.filter(group__name=pk, users_id=request.user.id)
    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data)


# lista dei topic a cui staff non è iscritto

# @login_required(login_url='/auth/login/')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsStaff])
def topicNotStaffList(request, pk):
    topics = Topic.objects.exclude(
        Topic.objects.filter(users_id=request.user.id))
    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data)

# questa non va
# lista di tutti i topic dei gruppi di cui fa parte un utente

# @login_required(login_url='/auth/login/')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def topicUserList(request):
    groups = request.user.groups
    topics = Topic.objects.filter(group__in=groups)
    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data)

# gli utenti iscritti al topic
# pk identifica il topic

# @login_required(login_url='/auth/login/')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def topicUsers(request, pk):
    topic = Topic.objects.get(name=pk)
    serializer = TopicSerializer(topic, many=False)
    return Response(serializer.data['users'])


# manca la delete etcetc


#################### COMMENT ####################

# aggiungi un commento ad un ticket

# @login_required(login_url='/auth/login/')
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def commentCreate(request):
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


# info del topic

# @login_required(login_url='/auth/login/')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def commentDetail(request, pk):
    comment = Comment.objects.get(id=pk)
    serializer = CommentSerializer(comment, many=False)
    return Response(serializer.data)

# manca lista dei commenti, delete etc etc
