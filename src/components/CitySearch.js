import React from 'react';
import './CitySearch.css'
import CityCard from './CityCard.js'
import { fetchCities, fetchCityData } from './API.js'

class CitySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
      cities: [],
      filteredCites: [],
      selectedCities: [],
      open: false
    };
    this.handleTextInput = this.handleTextInput.bind(this);
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

  handleTextInput(event) {
    let cities = this.state.cities
    let search = event.target.value
    var regex = new RegExp('^' + search, 'i');
    let filterCities = cities.filter((city, index) => {
      return regex.test(city.city);
    })
    this.setState({
      textInput: event.target.value,
      filteredCites: filterCities,
      open: true
    });
  }

  selectCity(id) {
    let { city } = this.state.filteredCites[id]
    let selectedCities = this.state.selectedCities;
    return fetchCityData(city)
      .then(data => {
        selectedCities.push(data.results[0])
      })
      .then(() =>
        this.setState({
          selectedCities,
          open: false,
          textInput: ''
        })
      )
  }

  removeCity = (index) => {
    let selectedCities = this.state.selectedCities;
    if (selectedCities.length < 2) {
      selectedCities = []
    } else {
      selectedCities.splice(index, 1)
    }
    this.setState({ selectedCities: selectedCities })
  }


  render() {
    return (
      <div className="citySearchContainer">
    <input id="icon" className="cityInput" type="text" value={this.state.textInput} onChange={this.handleTextInput} placeholder="Enter city name..." />

        {this.state.open &&
          <div className="dropdown">
            <ul>
              {this.state.filteredCites.map((city, index) => {
                return <li key={index} onClick={() => this.selectCity(index)}>{city.city}</li>
              })}
            </ul>
          </div>
        }
        {this.state.selectedCities &&
          <div className="cityCardContainer">
            {this.state.selectedCities.map((selectedCity, cityIndex) =>
              <CityCard key={cityIndex} index={cityIndex} city={selectedCity} delete={this.removeCity} />
            )}
          </div>
        }
      </div>
    );
  }
}

export default CitySearch;


