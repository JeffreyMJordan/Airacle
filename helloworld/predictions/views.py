from django.shortcuts import render
from django.http import HttpResponse 
from estimators.models import Estimator
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def home(request):
  
  if request.method == "POST":
    thing = request.POST.get('key', 'N/A')
    json_object = json.loads(thing)
    return HttpResponse("POST")
  else:
    return HttpResponse("GET")