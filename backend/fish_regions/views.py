from django.shortcuts import render
from .tasks import update_regions
import time
from django.http import HttpResponse


def index(request):

    # update_regions.delay()

    return HttpResponse(f"executed for - ")