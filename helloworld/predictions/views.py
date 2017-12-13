from django.shortcuts import render
from django.http import HttpResponse 
from django.http import JsonResponse
from estimators.models import Estimator
from django.views.decorators.csrf import csrf_exempt
import json
import pickle 


# It needs to be an array of 4


@csrf_exempt
def home(request):
  
  if request.method == "POST":

    print(request.POST)
    json_arr = request.POST.get('key', 'N/A')
    
    try: 
      json_object = json.loads(json_arr)
    except ValueError:
      return JsonResponse({'error': "Not valid JSON"})

    arr = json.loads(json_arr)
    if (isinstance(arr, list)):
      if (len(arr) == 4):
        estimator = pickle.load(open( 'trained_model.sav','rb'))
        classes = estimator.classes_.tolist()
        predictions = estimator.predict_proba([arr])[0].tolist()
        pred_obj = {}
        for x in range(0, len(classes)):
          pred_obj[classes[x]] = predictions[x]
        return JsonResponse({'probabilities': pred_obj, 'highest': estimator.predict([arr])[0]})
      else:
        return JsonResponse({'error': "Not the correct length (4)"})
      
    else:
      return JsonResponse({"error": "Not an array"})
    
  else:
    return HttpResponse("GET")