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

## Don's contributions 
I tried to be the glue guy and contribute wherever it was needed. This included connecting the backend with the frontend, a majority of the styling, setting up the skeleton for the frontend, deploying to heroku and debugging assists.

### Setting up the app
The first thing I needed to do was connect Edan and Jeff's work together. To do this, I created a discrete route to the view file (like a controller in ruby) Jeff created. I then created the form component and a corresponding redux cycle to take input from the form and pass it to Jeff's view. I then took the response from the view with the predictions and passed them on to Edan's D3 histogram. 

```python
// urls.py
urlpatterns = [
    url(r'^getprediction/', views.home, name="home"),
    url(r'^',ReactAppView.as_view())
]
```
```javascript
// form.jsx
 handleSubmit(e) {
    e.preventDefault();
    // console.log(this.state);
    let paramsArr = [ this.state.month, this.state.airline, this.state.originAirport, this.state.destAirport, this.state.distance ];
    // this.state.params = paramsArr;
    

    this.props.fetchPrediction(paramsArr)
 }

 // formcontainer.js
const mapDispatchToProps = (dispatch) => ({
  fetchPrediction: paramsArr => dispatch(fetchPrediction(paramsArr)),
});

export default connect(
  null, 
  mapDispatchToProps
)(Form);

// prediction_util.js
import $ from 'jquery';
export const fetchPrediction = (paramsArr) => {
  return $.ajax({
    url: "getprediction/",
    method: "POST",
    data: { "key": `${JSON.stringify(paramsArr)}` }
  });
};


```

### Styling 
Form page: I selected a background, font for the logo, created a short blurb and styled the page. 
<br>
Graph page: ^ selected a background, created the layout, styled the components and their hover effects. 

```css
.form-cont {
  display:flex; 
  justify-content: center;
  align-items: baseline;
  background-size: cover;
  height: 100%;
  font-family: 'Roboto', sans-serif;
  background-image: url("/static/backgrounds/flying-airplane-plane-landing1.jpg");
}
```

## Christine's contributions
I handled cleaning the dataset for testing, training the algorithm, and saving the trained model to an estimator. The main difficulties were choosing which variables to keep, standardizing all the values across the variables, clearing out empty values, and optimizing numeric probability of the output by iteratively minimizing the cross entropy of the trained model. I also handled creating JSON objects for easy access on the frontend so that the user could import an airport name and find the related cities, as well as handling the distance between various airports. 

### Cleaning the data 
Using various methods imported from pandas, I downloaded and imported enormous datasets off the Bureau of Transportation Statistic's website, read them into csv files, and reset the index so that they would continuous in the larger file, eventually all concating the files together into an enormous dataset. 
```python 
a = pd.read_csv(jan2016, low_memory=False) 
b = pd.read_csv(feb2016, low_memory=False)
b = b.reset_index(drop=True) 
...
twenty17 = pd.concat([a, b, c, d, e, f, g, h, i, j, k, l,v, w, x, y, z, aa, bb, cc, dd, ee, ff, gg], axis=0, ignore_index=True)

```

I then kept only the data that I needed, removing all unnecessary columns and resetting all floats to integers. 
```python
keep_col = ['MONTH', 'AIRLINE_ID', 'ORIGIN_AIRPORT_ID', 'DEST_AIRPORT_ID', 'DISTANCE']
fixedcolumns = twenty17[keep_col]
flightdata = pd.concat([fixedcolumns, finalcolumn], axis=1)
flightdata['DISTANCE'] = flightdata['DISTANCE'].astype(int)
flightdata['ARR_DELAY_NEW'] = flightdata['ARR_DELAY_NEW'].astype(int)
```
### Training the Model 
In training the model, I set the validation size to 20% of the overall dataset and using imported methods from sklearn, fit the model to a LogisticRegression algorithm and saved the output to a .sav file through terminal. 

```python
array = flightdata.values     
X = array[:,0:5]
Y = array[:,5] 
validation_size = 0.20
seed = 7
X_train, X_validation, Y_train, Y_validation = model_selection.train_test_split(X, Y, test_size=validation_size, random_state=seed)
lr = LogisticRegression() 
lr.fit(X_train, Y_train) 
predictions = lr.predict(X_validation)
```

### Connecting Airports by City 
In order to create a JSON object that connects airports by city, I had to scrape a table from Wikipedia using Beautiful Soup 4. I figured out how to gain access by letting Wikipedia know that I wasn't a bot by importing a header object that specified my browser and browser version. 

```python
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen

site= "https://en.wikipedia.org/wiki/List_of_airports_in_the_United_States"
hdr = {'User-Agent': 'Mozilla/5.0'}
req = Request(site,headers=hdr)
page = urlopen(req)
soup = BeautifulSoup(page, "lxml")

table = soup.find("table", { "class" : "wikitable sortable" })

for row in table.findAll("tr"):
    cells = row.findAll("td")
    #For each "tr", assign each "td" to a variable.
    if len(cells) == 4:
        area = cells[0].find(text=True)
        district = cells[1].findAll(text=True)
        town = cells[2].find(text=True)
        county = cells[3].find(text=True)
``` 
I then had to reorganize the structure of the table so that it was a readable JSON object, without the unnecessary brackets and encodings. 
