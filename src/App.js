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
    this.state = {
            value: '',
            cities: [],
            filteredCites: []
          };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.openaq.org/v1/cities?limit=200&country=GB", { method: 'GET' })
      .then(res => res.json())
      .then(
        (resultsObj) => {
          console.log(resultsObj.results)
          this.setState({
            isLoaded: true,
            cities: resultsObj.results
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  handleChange(event) {
    let cities = this.state.cities
    let search = event.target.value

    var regex = new RegExp('^' + search, 'i');
    let filterCities = cities.filter((city, index) => {
      return regex.test(city.city);
    })
    console.log(regex, "regex")
    console.log(filterCities, "filterCities")
    this.setState({
      value: event.target.value,
      filteredCites: filterCities,
    });
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