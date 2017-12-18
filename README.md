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

## Edan's contributions
I was primarily responsible for the data visualization on the frontend of the app. This was accomplished using D3.js and ReactJs. After initially creating a line graph, we decided that a bar chart would more clearly display our data shape, and decided to render that instead.

### Using D3.js along with ReactJs
The first challenge that I initially ran into was simply incorporating both D3.js and ReactJs together on the frontend. This was tricky because both libraries are designed to take control of the DOM. I solved this by relying on React to handle all rendering and D3 to handle all my math and transitions. React passed a HTML svg tag to my D3 components, and then threaded information as props to my subcomponents.

### Bar transitions
I used the D3 transitions library to animate all of my bars and make them interactive. In order to animate them upon the page loading, I also utilized the react lifecycle. I initially set all bar y values to the y coordinate of my x axis and all bar heights to 0. Then, upon the component mounting, I called a transition that selected each bar and adjusted their height and y values to their actual height through a for loop.
```javascript
componentDidMount() {
      let t = d3.transition()
        .duration(2000)
        .ease(d3.easeLinear)

      for(let i = 0; i < this.props.data.length; i++) {
        d3.select(`.bar${i}`).transition(t)
        .attr("height", 360  - this.props.yScale(this.props.data[i][1]))
        .attr("y", this.props.yScale(this.props.data[i][1]))
        .style("fill", "rgb(2, 175, 182)")
      }
    }
    ```
    
### Tooltips
After debating whether or not to store tooltips in their own subsomponents, I opted to store them inside the bars component as I was still new to D3 and this provided greater control. I decided to render the tooltips alongside the bars, except with an opacity value of 0. Adding a `onMouseOver` and `onMouseOut` on each bar allowed me to change alter the opacity of each tooltip to reveal and hide the information on hovering.

### Customizing Axes
Getting the axes to render properly was somewhat of an arduous process. Each axis was a different scale (one ordinal and the other linear). I created two axis objects and passed them down to axis subcomponent as props for rendering. The `renderAxis` method in this component used D3 to properly scale and append a title to each axis, and then tie that axis to the component render method with a ref.
```javascript
renderAxis() {
    let axis;
    if(this.props.orient === 'left') {
      axis = d3.axisLeft().ticks(5).scale(this.props.scale);
    } else {
      axis = d3.axisBottom().ticks(5).tickFormat("").scale(this.props.scale);
    }
    let node = this.refs.axis;
    
    d3.select(node).call(axis);
    d3.select(".axis").append("text")
      .attr("transform", `${this.props.titleTranslate} ${this.props.titleRotation}`)
      .style("text-anchor", "middle")
      .text(`${this.props.text}`);
  }
  ```
  
