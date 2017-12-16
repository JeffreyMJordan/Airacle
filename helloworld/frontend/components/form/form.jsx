import React from 'react';
import {withRouter} from "react-router-dom";
import Select from 'react-select';
import optionsGenerator from './data/optionsGenerator';
import codesToDistance from './data/CombinedCodesToDistance';
// import 'react-select/dist/react-select.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: 0,
      airline: 0,
      originAirport: 0,
      destAirport: 0,
      distance: 0,
      dummy: "Lol"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    let allOptions = optionsGenerator();
    this.airportOptions = allOptions["AirportCodeOptions"];
    this.airlineOptions = allOptions["AirlineCodeOptions"];
    this.monthOptions = allOptions["MonthOptions"];
    this.nonDropdownChange = this.nonDropdownChange.bind(this);
    this.combinedCode = {"destAirport": "", "originAirport": ""};
    this.regex = /\((.+)\)/;
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    let paramsArr = [ this.state.month, this.state.airline, this.state.originAirport, this.state.destAirport, this.state.distance ];
    // this.state.params = paramsArr;
    

    this.props.fetchPrediction(paramsArr.map((el) => parseInt(el))).then((e) => this.props.history.push("/graph"));
  }

  handleChange(selectedOption){
    this.setState({ dummy: selectedOption.value});
    console.log(this.state.dummy);
  }

  nonDropdownChange(input){
    return (e) => {
      this.setState({[input]: e.target.value});
    };
  }

  update(input) {
    return (selectedOption) => {
      this.setState({[input]: selectedOption.value});
      console.log(this.state);

      if(input==="originAirport" || input==="destAirport"){
        
        this.combinedCode[input] = this.regex.exec(selectedOption.label)[1]
        let codeStr = this.combinedCode["destAirport"] + this.combinedCode["originAirport"];
        
        if(codeStr.length===6){
          console.log(codesToDistance["ABEATL"]);
          console.log(codeStr);
          if(codesToDistance[codeStr]){
            this.setState({distance: codesToDistance[codeStr]});
          }else{
            this.setState({distance: 0});
          }
        }
      }

    };
  }

  render() {
    return (
      <div className="form-cont">
        {/* <input type="text" placeholder="Origin Airport"></input>
        <input type="text" placeholder="Destination Airport"></input>
        <input type="text" placeholder="Airline"></input>
        <input type="date" placeholder="Date"></input>
        <input type="time" placeholder="Time"></input>
        <button type="submit">Analyze Flight</button> */}
        {/* Hey Eden sorry to mess w your front end, just tryna test the estimator we have rn below */}
        <form onSubmit={this.handleSubmit} className="params-form">

          <div>
            <div className="welcome">
              <h2>No more delays</h2>
              <p>With the power of machine learning, find out if your flight will be delayed before you book your flight!</p>
            </div>
            <div>
              <p>Select your flight below</p>
            </div>

            <div className="flight-input">

          {/* Outside component from a node package. Found here: https://jedwatson.github.io/react-select/ */}
         
          {/* <Select
            name="form-field-name"
            options={[
              { value: 'one', label: 'One' },
              { value: 'two', label: 'Two' },
              { value: 'three', label: 'Three' },
              { value: 'four', label: 'Four' },
              { value: 'five', label: 'Five' },
            ]}
            autoFocus
            searchable={true}
            onChange={this.update('month')}
            value={this.state.month}
            // clearable={true}
          /> */}
            <div className="input-form">
              <input
                // className="session-input"
                type="date"
                // value={this.state.month}
                onChange={this.nonDropdownChange("month")}
                placeholder="Month"
                />

            </div>


              {/* <input
                // className="session-input"
                type="number"
                // value={this.state.airline}
                onChange={this.nonDropdownChange("airline")}
                placeholder="Airline"
              /> */}
              <div className="input-form">

                {/* <p>Airline Code</p> */}
                <Select
                  name="form-field-name"
                  options={this.airlineOptions}
                  autoFocus
                  searchable={true}
                  onChange={this.update('airline')}
                  value={this.state.airline}
                  // clearable={true}
                  />
              </div>


              {/* <input
                // className="session-input"
                type="number"
                // value={this.state.originAirport}
                onChange={this.update("originAirport")}
                placeholder="Origin Airport"
              /> */}
              <div className="input-form">
                {/* <p>Origin Airport Code</p> */}
                <Select
                name="form-field-name"
                options={this.airportOptions}
                autoFocus
                searchable={true}
                onChange={this.update('originAirport')}
                value={this.state.originAirport}
                // clearable={true}
                />
              </div>
              <div className="input-form">
                {/* <p>Destination Airport Code</p> */}
                  <Select
                  name="form-field-name"
                  options={this.airportOptions}
                  autoFocus
                  searchable={true}
                  onChange={this.update('destAirport')}
                  value={this.state.destAirport}
                  // clearable={true}
                  />
              </div>

              {/* <input
                // className="session-input"
                type="number"
                // value={this.state.destAirport}
                onChange={this.update("destAirport")}
                placeholder="Destination Airport"
              /> */}
              {/* <div className="input-form">

                <input
                  // className="session-input"
                  type="number"
                  // value={this.state.destAirport}
                  onChange={this.nonDropdownChange("distance")}
                  placeholder="Distance"
                  />
              </div> */}

              <input className="session-submit" type="submit" value="Predict delay" />

            </div>
          </div> 
        </form>
      </div>
    );
  }
}


export default withRouter(Form);