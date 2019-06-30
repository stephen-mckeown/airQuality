import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Compare your Air</h1>
      <h2>Compare the air quality between cities in the UK.</h2>
      <h2>Select cities to compare using the search tool below.</h2>
      <CitySearch/>
    </div>
  );
}

export default App;


export class CitySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.value);
  //   event.preventDefault();
  // }

  render() {
    return (
        <label>
        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter city name..."  />
        </label>
    );
  }
}