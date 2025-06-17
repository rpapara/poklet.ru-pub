from rest_framework import serializers

from app.players.serializers import PlayerSerializer

from .models import Session


class SessionSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Session
        fields = ["id", "short_id", "created_at", "revealed", "players"]
