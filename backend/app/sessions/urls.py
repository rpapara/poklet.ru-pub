from django.urls import path

from .views import (
    create_session,
    get_session_by_short_id,
    join_session,
    reset_session,
    reveal_session,
)

urlpatterns = [
    path("", create_session, name="create_session"),
    path("<str:short_id>/", get_session_by_short_id, name="get_session"),
    path("<str:short_id>/join/", join_session, name="join-session"),
    path("<str:short_id>/reveal/", reveal_session, name="reveal-session"),
    path("<str:short_id>/reset/", reset_session, name="reset-session"),
]
