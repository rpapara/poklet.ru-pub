import uuid

from django.db import models

from app.sessions.models import Session


class Player(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session = models.ForeignKey(
        Session, on_delete=models.CASCADE, related_name="players"
    )
    client_id = models.CharField(max_length=64)
    name = models.CharField(max_length=50)
    vote = models.CharField(max_length=10, null=True, blank=True)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [
            ("session", "client_id"),
            ("session", "name"),
        ]

    def __str__(self):
        return f"{self.name} ({self.client_id}) in {self.session.short_id}"
