# Create your views here.
from rest_framework.decorators import api_view
from django.http import JsonResponse
from config import version


@api_view(["GET"])
def version_view(request):
    return JsonResponse(version.version_info)
