import React from 'react';
import './CityCard.css'

class CityCard extends React.Component {

  render() {
    let selectedCity = this.props.city
    let cityKey = this.props.index
    console.log(selectedCity, "selectedCity")
    console.log(cityKey, "cityKey")
    console.log(this.props, "this.props")

    return (
      <div className="cityCard">
        <div className="cityCardClose">X</div>
        <div className="cardUpdated">Updated TODO</div>
        <div className="cardLocationPrimary">{selectedCity[0].location}</div>
        <div className="cardLocationSecondary">in {selectedCity[0].city}, United Kingdom</div>
        <div className="cardValues">
          <p className="cardMeasure">Values:</p>
          {selectedCity[0].measurements.map((measure, measureIndex) =>
            <p className="cardMeasure">{measure.parameter}: {measure.value},</p>)}
        </div>
      </div>
    )
  }
}

export default CityCard;

