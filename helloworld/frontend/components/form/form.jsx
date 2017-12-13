import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spLength: 0,
      spWidth: 0,
      ptLength: 0,
      ptWidth: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let paramsArr = [ this.state.spLength, this.state.spWidth, this.state.ptLength, this.state.ptWidth ];
    this.props.fetchPrediction(paramsArr);
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
            <input
              // className="session-input"
              type="number"
              value={this.state.spLength}
              onChange={this.update("spLength")}
              placeholder="sepal-length"
            />
            <input
              // className="session-input"
              type="number"
              value={this.state.spWidth}
              onChange={this.update("spWidth")}
              placeholder="sepal-width"
            />
            <input
              // className="session-input"
              type="number"
              value={this.state.ptLength}
              onChange={this.update("ptLength")}
              placeholder="petal-length"
            />
            <input
              // className="session-input"
              type="number"
              value={this.state.ptWidth}
              onChange={this.update("ptWidth")}
              placeholder="petal-width"
            />
            <input className="session-submit" type="submit" value="Let's find out!" />

          </div>
         
        </form>
      </div>
    );
  }
}
