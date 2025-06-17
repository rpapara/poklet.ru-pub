import uuid

from django.db import models
from nanoid import generate


def generate_short_id():
    return generate(size=12)


class Session(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    short_id = models.CharField(
        max_length=12, unique=True, editable=False, default=generate_short_id
    )
    created_at = models.DateTimeField(auto_now_add=True)
    revealed = models.BooleanField(default=False)
