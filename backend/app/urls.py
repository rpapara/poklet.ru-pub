from django.urls import include, path
from . import views

urlpatterns = [
    path("version/", views.version_view, name="app.version"),
    path("sessions/", include("app.sessions.urls")),
    path("players/", include("app.players.urls")),
]
