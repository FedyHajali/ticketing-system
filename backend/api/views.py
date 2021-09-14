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
    try:
        ticket = Ticket.objects.get(id=pk)
    except Ticket.DoesNotExist:
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
    serializer = TicketSerializer(data=request.data)
    if (serializer.is_valid()):
        if request.data['status'] not in ('CL', 'OP'):
            return Response('Only Closed or Open are possible', status=status.HTTP_400_BAD_REQUEST)
        try:
            ticket = Ticket.objects.get(id=pk, creator=request.user)  
        except Ticket.DoesNotExist:
            return Response('Not Found', status=status.HTTP_404_NOT_FOUND)
    else:
         return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

    serializer = TicketSerializer(instance=ticket, data=request.data)
    if (serializer.is_valid()):
        serializer.save()

    return Response(serializer.data, status=status.HTTP_200_OK)


# update del ticket per il ricevitore, può mettere solo Pending Resolved
# ovviamente bisogna mostrare solo i biglietti in stato OPEN, gli altri sono giò in stato closed/pending/resolved
# pk identifica il ticket

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def ticketReceiverUpdate(request, pk):
    serializer = TicketSerializer(data=request.data)
    if (serializer.is_valid()):
        if request.data['status'] not in ('PE', 'RE'):
            return Response('Only Pendign or Resolved are possible', status.HTTP_400_BAD_REQUEST)
        try:
            ticket = Ticket.objects.get(id=pk, receivers=request.user)
        except Ticket.DoesNotExist:
            return Response('Not Found', status=status.HTTP_404_NOT_FOUND)
    else:
         return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

    serializer = TicketSerializer(instance=ticket, data=request.data)
    if (serializer.is_valid()):
        serializer.save()

    return Response(serializer.data, status=status.HTTP_200_OK)


# lo staff può mettere in qualsiasi stato, per comodità.. però tranne expired, che dipende dalla data
# nel caso, per uno dello staff sarebbe meglio cambiare la data
# pk identifica il ticket

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsStaff])
def ticketStaffUpdate(request, pk):
    serializer = TicketSerializer(data=request.data)
    if (serializer.is_valid()):
        if request.data['status'] in ('EX'):
            return Response('Expired is not possible', status=status.HTTP_400_BAD_REQUEST)
        try:   
            ticket = Ticket.objects.get(id=pk)
        except Ticket.DoesNotExist:
            return Response('Not Found', status=status.HTTP_404_NOT_FOUND)
    else:
         return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

    serializer = TicketSerializer(instance=ticket, data=request.data)
    if (serializer.is_valid()):
        serializer.save()

    return Response(serializer.data, status=status.HTTP_200_OK)

# elimina un ticket dal database


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsStaff])
def ticketDelete(request, pk):
    
    try:   
        ticket = Ticket.objects.get(id=pk)
    except Ticket.DoesNotExist:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    ticket.delete()

    return Response('Item succsesfully delete!', status=status.HTTP_200_OK)


#################### TOPIC ####################

# creazione topic

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsStaff])
def topicCreate(request):
    serializer = TopicSerializer(data=request.data)
    if (serializer.is_valid()):
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.data, status=status.HTTP_201_CREATED)
    
# info del topic


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def topicDetail(request, pk):
    try:   
        topic = Topic.objects.get(id=pk)
    except Topic.DoesNotExist:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    serializer = TopicSerializer(topic, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

# aggiunge un utente al topic


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def topicUsersAdd(request, pk):
    try:
        topic = Topic.objects.get(id=pk)  # oppure name=
    except Topic.DoesNotExist:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)
    try:    
        user = User.objects.get(id=request.user.id)
    except User.DoesNotExist:
        return Response('Not Found user', status=status.HTTP_404_NOT_FOUND)

    topic.users.add(user)

    return Response('Sei stato iscritto al Topic', status.HTTP_200_OK)


# lista dei topic di un gruppo
# pk identifica il gruppo

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def topicGroupList(request, pk):
    topics = Topic.objects.filter(group__name=pk)
    if topics.count() == 0:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

#OCCHIO CHE QUA DENTRO NON ABBIAMO LE STRUTTURE DATI, SOLO GLI ID
# lista dei topic di un gruppo a cui l'utente è iscritto
# pk è il gruppo

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def topicUserGroupList(request, pk):
    topics = Topic.objects.filter(group=pk, users=request.user.id)
    if topics.count() == 0:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# lista dei topic a cui staff non è iscritto

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsStaff])
def topicNotStaffList(request, pk):
    topics = Topic.objects.exclude(
        Topic.objects.filter(users_id=request.user.id))
    if topics.count() == 0:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# lista di tutti i topic dei gruppi di cui fa parte un utente


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def topicUserList(request):
    groups = request.user.groups
    topics = Topic.objects.filter(group__in=groups.all())
    if topics.count() == 0:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data, status.HTTP_200_OK)

#ritorna una lista semplice di id
# gli utenti iscritti al topic
# pk identifica il topic


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def topicUsers(request, pk):
    try:
        topic = Topic.objects.get(id=pk)  # oppure name=
    except Topic.DoesNotExist:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    serializer = TopicSerializer(topic, many=False)
    return Response(serializer.data['users'], status.HTTP_200_OK)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsStaff])
def topicDelete(request, pk):
    
    try:   
        topic = Topic.objects.get(id=pk)
    except Topic.DoesNotExist:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    topic.delete()

    return Response('Item succsesfully delete!', status=status.HTTP_200_OK)


#################### COMMENT ####################

# aggiungi un commento ad un ticket

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def commentCreate(request):
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# info del commento

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def commentDetail(request, pk):
    try:
        comment = Comment.objects.get(id=pk)
    except Comment.DoesNotExist:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    serializer = CommentSerializer(comment, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

#lista commenti di un ticket
#manca comments nei serializer del ticket
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, ])
def commentTicketList(request, pk):
    try:
        ticket = Ticket.objects.get(id=pk)  # oppure name=
    except Topic.DoesNotExist:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    serializer = TicketSerializer(ticket, many=False)
    return Response(serializer.data['comments'], status.HTTP_200_OK)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsStaff])
def commentDelete(request, pk):
    
    try:   
        comment = Comment.objects.get(id=pk)
    except Comment.DoesNotExist:
        return Response('Not Found', status=status.HTTP_404_NOT_FOUND)

    comment.delete()

    return Response('Item succsesfully delete!', status=status.HTTP_200_OK)
