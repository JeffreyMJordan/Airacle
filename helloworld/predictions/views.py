from django.shortcuts import render
from django.http import HttpResponse 
from django.http import JsonResponse
from estimators.models import Estimator
from django.views.decorators.csrf import csrf_exempt
import json


# It needs to be an array of 4


@csrf_exempt
def home(request):
  
  if request.method == "POST":


    json_arr = request.POST.get('key', 'N/A')
    
    try: 
      json_object = json.loads(json_arr)
    except ValueError:
      return JsonResponse({'error': "Not valid JSON"})

    arr = json.loads(json_arr)
    if (isinstance(arr, list)):
      if (len(arr) == 4):
        est = Estimator.objects.last()
        prediction = est.estimator.predict([arr])
        return JsonResponse({'prediction': prediction[0]})
      else:
        return JsonResponse({'error': "Not the correct length (4)"})
      
    else:
      return JsonResponse({"error": "Not an array"})
    
  else:
    return HttpResponse("GET")