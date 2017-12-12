from django.shortcuts import render
from django.http import HttpResponse 
from estimators.models import Estimator

def home(request):
  ests = Estimator.objects.all()
  print(ests)
  return HttpResponse("Ayyy lamo")