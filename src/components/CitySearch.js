import React from 'react';
import './CitySearch.css'
import { fetchCities, fetchCityData } from './API.js'

class CitySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      cities: [],
      filteredCites: [],
      selectedCities: [],
      open: false
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    return fetchCities()
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
      open: true
    });
  }

  selectCity(id) {
    let {city} = this.state.filteredCites[id]
    // this.setState ({ open: false })
    let selectedCities = this.state.selectedCities;
    return fetchCityData(city)
      .then(data => selectedCities.push(data.results))
      .then(() => this.setState({ selectedCities,
                                  open: false,
                                  value: ''
                                }))
  }


  render() {
    console.log(this.state.selectedCities, "selectedCities")
    return (
      <div>
        <input className="cityInput" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter city name..." />
        {this.state.open &&
          <div className="dropdown">
            <ul>
              {this.state.filteredCites.map((city, index) => {
                return <li key={index} onClick={() => this.selectCity(index)}>{city.city}</li>
              })}
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default CitySearch;