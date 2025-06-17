import logging

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from app.players.models import Player
from app.players.serializers import CreatePlayerSerializer, PlayerSerializer

from django.db import IntegrityError

from .models import Session
from .serializers import SessionSerializer

logger = logging.getLogger(__name__)


@api_view(["POST"])
def create_session(request):
    session = Session.objects.create()
    serializer = SessionSerializer(session)
    logger.info(
        "New session is created with ID: '%s', short_id: '%s'",
        session.id,
        session.short_id,
    )
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def get_session(request, id):
    try:
        session = Session.objects.get(id=id)
        logger.info("Get session by ID: %s successful)", session.id)
    except Session.DoesNotExist:
        logger.error("Session not found: '%s'", id)
        return Response(
            {"detail": "Session not found"}, status=status.HTTP_404_NOT_FOUND
        )

    serializer = SessionSerializer(session)
    return Response(serializer.data)


@api_view(["GET"])
def get_session_by_short_id(request, short_id):
    try:
        session = Session.objects.get(short_id=short_id)
        logger.info("Get session by short ID: %s successful", session.short_id)
    except Session.DoesNotExist:
        logger.error("Session not found: '%s'", short_id)
        return Response(
            {"detail": "Session not found"}, status=status.HTTP_404_NOT_FOUND
        )

    serializer = SessionSerializer(session)
    return Response(serializer.data)


@api_view(["POST"])
def join_session(request, short_id):
    try:
        session = Session.objects.get(short_id=short_id)
    except Session.DoesNotExist:
        return Response(
            {"detail": "Session not found"}, status=status.HTTP_404_NOT_FOUND
        )

    serializer = CreatePlayerSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    try:
        player = Player.objects.create(session=session, **serializer.validated_data)
    except IntegrityError:
        return Response(
            {
                "code": "player_name_taken",
                "detail": "Player with this name already exists in the session",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response(PlayerSerializer(player).data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
def reveal_session(request, short_id):
    try:
        session = Session.objects.get(short_id=short_id)
    except Session.DoesNotExist:
        return Response(
            {"detail": "Session not found"}, status=status.HTTP_404_NOT_FOUND
        )

    session.revealed = True
    session.save()

    return Response({"status": "session revealed"})


@api_view(["POST"])
def reset_session(request, short_id):
    try:
        session = Session.objects.get(short_id=short_id)
    except Session.DoesNotExist:
        return Response(
            {"detail": "Session not found"}, status=status.HTTP_404_NOT_FOUND
        )

    session.revealed = False
    session.save()

    # Reset all players' votes in the session
    Player.objects.filter(session=session).update(vote=None)

    return Response({"status": "session reset"})
