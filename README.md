# Airacle

## Jeff's contributions 
I was responsible for developing Airacle's Django backend. In addition to this, 
I also defined the classes for training Airacle's logistic regression model, persisted Airacle's predictions and flight information in its state, implemented Airacle's dropdown forms, and 
handled the Redux cycle for Airacle's information slice of state. 

### Django Backend
The most signifcant challenge I faced while developing Airacle's backend was how to store our machine learning model. 
Training sklearn models on 2 years' worth of flight data took quite some time, so I quickly realized that 
recreating our model from our training data each time our server started up wasn't feasible. I opted to store a local instance
of our trained model using Python's pickle library (a library for serializing instances of python objects). Whenever Airacle wants 
to make a prediction, it unpickles our trained model as follows: 

```python 
    estimator = pickle.load(open( 'flightdata.sav','rb'))
    classes = estimator.classes_.tolist()
    predictions = estimator.predict_proba([arr])[0].tolist()
    pred_obj = {}
    for x in range(0, len(classes)):
      pred_obj[classes[x]] = round(predictions[x], 2)
    return JsonResponse({'probabilities': pred_obj, 'highest': estimator.predict([arr])[0].item()})
```

### Classes for Airacle's Logistic Regression model
To make Airacle more informative, I decided that our LR model should predict the likelihood that a flight would have no delay, 
a less than 15 minutes, less than 30 minutes, less than 45 minutes, and over 45 minutes. Without this division, our LR model would
have considered each unique delay (for example, 16 minutes v. 17 minutes) its own separate class, and made predictions about which class 
a given flight belonged to accordingly. I defined our classes by iterating through our dataset as follows: 

```python
    a = db['ARR_DELAY_NEW']
    a = a.fillna(0).astype(int)
    idx = 0
    for val in np.nditer(a):
	   if val <= 15 and val>10:
		  a[idx] = 15
	   if val<=30 and val>15:
		  a[idx] = 30
	   if val<=45 and val>30:
		  a[idx] = 45
	   if val>45:
		  a[idx] = 46
	   idx = idx+1
```

### Persisting prediction and flight information 
When a user returns Airacle's prediction page, Airacle's most recent prediction and the user's previously entered flight is already waiting for them. I persisted this information by setting them as cookies in the user's browser, then using this information to define a preloaded Redux state. 

### Dropdown Forms 
When training our model, we found that it was easier to use each airline and airport's identification number rather than their name. However, we didn't want our users to have to enter IDs rather than each airline/airport's English name. To solve this issue, I created our dropdown forms' options so that each ID was mapped to each airline/airport's name as follows: 
```javascript
//Airports
  let airportNameToIDArr = [];
  Object.keys(CityToAirportCode).forEach((city) => {
    let codeArr = CityToAirportCode[city];
    codeArr.forEach((code) => {
      if(AirportCodeToID[code]!=undefined){
        airportNameToIDArr.push({label: `${city} (${code})`, value: AirportCodeToID[code]});
      }
    });
  });
  masterObj["AirportCodeOptions"] = airportNameToIDArr;

  //Airlines
  let airlineCodeToIDArr = [];
  Object.keys(AirlineCodeToID).forEach((code) => {
    airlineCodeToIDArr.push({label: code, value: AirlineCodeToID[code]});
  });
  masterObj["AirlineCodeOptions"] = airlineCodeToIDArr;
```

### Information slice of state 
I wanted our users to be able to see information about their flight on Airacle's prediction page. I opted to create a flight-information slice of state and define a redux cycle to pass our prediction components this information. 
