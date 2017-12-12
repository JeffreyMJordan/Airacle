from django.shortcuts import render
from django.http import HttpResponse 
from estimators.models import Estimator
from django.views.decorators.csrf import csrf_exempt
import json


# It needs to be an array of 4
@csrf_exempt
def home(request):
  
  if request.method == "POST":
    thing = request.POST.get('key', 'N/A')
    json_object = json.loads(thing)
    est = Estimator.objects.last()
    thing = est.estimator.predict([json_object])
    print(thing)
    return HttpResponse(thing[0])
  else:
    return HttpResponse("GET")