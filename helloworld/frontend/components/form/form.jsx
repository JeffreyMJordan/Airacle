import React from 'react';
import {withRouter} from "react-router-dom";
import Select from 'react-select';

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
  }

  handleSubmit(e) {
    e.preventDefault();
    let paramsArr = [ this.state.month, this.state.airline, this.state.originAirport, this.state.destAirport, this.state.distance ];
    // this.state.params = paramsArr;
    this.props.fetchPrediction(paramsArr.map((el) => parseInt(el))).then((e) => this.props.history.push("/graph"));
  }

  handleChange(selectedOption){
    this.setState({ dummy: selectedOption.value});
    console.log(this.state.dummy);
  }

  update(input) {
    return e => this.setState({
      [input]: e.currentTarget.value
    });
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

          <Select
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
            onChange={this.handleChange}
            value={this.state.dummy}
            clearable={true}
          />

            <input
              // className="session-input"
              type="number"
              // value={this.state.month}
              onChange={this.update("month")}
              placeholder="Month"
            />
            <input
              // className="session-input"
              type="number"
              // value={this.state.airline}
              onChange={this.update("airline")}
              placeholder="Airline"
            />
            <input
              // className="session-input"
              type="number"
              // value={this.state.originAirport}
              onChange={this.update("originAirport")}
              placeholder="Origin Airport"
            />
            <input
              // className="session-input"
              type="number"
              // value={this.state.destAirport}
              onChange={this.update("destAirport")}
              placeholder="Destination Airport"
            />

            <input
              // className="session-input"
              type="number"
              // value={this.state.destAirport}
              onChange={this.update("distance")}
              placeholder="Distance"
            />

            <input className="session-submit" type="submit" value="Predict flower" />

          </div>
         
        </form>
      </div>
    );
  }
}


export default withRouter(Form);