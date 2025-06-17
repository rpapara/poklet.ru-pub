# app/players/views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Player


@api_view(["PATCH"])
def vote(request, player_id):
    try:
        player = Player.objects.select_related("session").get(id=player_id)
    except Player.DoesNotExist:
        return Response(
            {"detail": "Player not found"}, status=status.HTTP_404_NOT_FOUND
        )

    if player.session.revealed:
        return Response(
            {"detail": "Voting is closed, session already revealed"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    vote_value = request.data.get("vote")
    if not vote_value:
        return Response(
            {"detail": "Vote is required"}, status=status.HTTP_400_BAD_REQUEST
        )

    valid_votes = ["0", "1", "2", "3", "5", "8", "13", "20", "∞", "?", "☕"]
    if vote_value not in valid_votes:
        return Response(
            {"detail": "Invalid vote value"}, status=status.HTTP_400_BAD_REQUEST
        )

    player.vote = vote_value
    player.save()

    return Response({"status": "vote recorded"})
