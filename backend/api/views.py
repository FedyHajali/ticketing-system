from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Comment, Ticket, Topic
from .permission import IsStaff
from .serializers import CommentSerializer, TicketSerializer, TopicSerializer
from rest_framework import status
# Create your views here.

#################### TICKET ####################


@swagger_auto_schema(
    method="post",
    operation_description='Creation of a new Ticket',
    operation_summary='Ticket Creation',
    request_body=TicketSerializer)
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketCreate(request):
    serializer = TicketSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method="get",
    operation_description='List of tickets for which the active user is a receiver',
    operation_summary='Ticket list received by the active user')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsStaff])
def ticketListReceiver(request):
    tickets = Ticket.objects.filter(receivers=request.user)
    if tickets.count() == 0:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@swagger_auto_schema(
    method="get",
    operation_description='List of tickets for which the active user is a creator',
    operation_summary='Ticket list created by the active user')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketListCreator(request, pk):
    tickets = Ticket.objects.filter(creator=pk)
    if tickets.count() == 0:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="get",
    operation_description='List of tickets for a specific group',
    operation_summary='Ticket list for a specific group')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsStaff])
def ticketListGroup(request, pk):
    tickets = Ticket.objects.filter(groups__id=pk)
    if tickets.count() == 0:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@swagger_auto_schema(
    method="get",
    operation_description='List of ticket receivers',
    operation_summary='List of ticket receivers')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketReceiversList(request, pk):
    ticket = Ticket.objects.get(id=pk)
    if ticket.DoesNotExist:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    serializer = TicketSerializer(ticket, many=False)
    return Response(serializer.data['receivers'], status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="get",
    operation_description='Returns all information of a ticket',
    operation_summary='Ticket detail')
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketDetail(request, pk):
    try:
        ticket = Ticket.objects.get(id=pk)
    except Ticket.DoesNotExist:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    serializer = TicketSerializer(ticket, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="put",
    operation_description='Change of ticket status for creator who can only put Closed or Open',
    operation_summary='Ticket status update for Creator')
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


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsStaff])
def ticketDelete(request, pk):

    ticket = Ticket.objects.get(id=pk)
    ticket.delete()

    return Response('Item succsesfully delete!')


#################### TOPIC ####################

# creazione topic

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsStaff])
def topicCreate(request):
    serializer = TopicSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

# info del topic


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def topicDetail(request, pk):
    topic = Topic.objects.get(id=pk)
    serializer = TopicSerializer(topic, many=False)
    return Response(serializer.data)

# aggiugne un utente al topic


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

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def topicGroupList(request, pk):
    topics = Topic.objects.filter(group__name=pk)
    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data)


# lista dei topic di un gruppo a cui l'utente è iscritto
# pk è il gruppo

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def topicUserGroupList(request, pk):
    topics = Topic.objects.filter(group__name=pk, users_id=request.user.id)
    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data)


# lista dei topic a cui staff non è iscritto

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

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def commentCreate(request):
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


# info del topic

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def commentDetail(request, pk):
    comment = Comment.objects.get(id=pk)
    serializer = CommentSerializer(comment, many=False)
    return Response(serializer.data)

# manca lista dei commenti, delete etc etc
