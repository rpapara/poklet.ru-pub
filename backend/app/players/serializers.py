from rest_framework import serializers

from .models import Player


class CreatePlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ["name", "client_id"]


class PlayerSerializer(serializers.ModelSerializer):
    vote = serializers.SerializerMethodField()
    has_voted = serializers.SerializerMethodField()

    class Meta:
        model = Player
        fields = ["id", "name", "client_id", "vote", "has_voted", "joined_at"]
        read_only_fields = ["id", "vote", "has_voted"]

    def get_vote(self, obj):
        session = obj.session
        if session.revealed:
            return obj.vote
        return None

    def get_has_voted(self, obj):
        return obj.vote is not None
