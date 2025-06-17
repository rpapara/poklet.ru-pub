# app/players/urls.py
from django.urls import path

from .views import vote

urlpatterns = [
    path("<uuid:player_id>/vote/", vote, name="player-vote"),
]
