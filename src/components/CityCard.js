import React from 'react';
import './CityCard.css'

class CityCard extends React.Component {
  render() {
    // console.log(this.props, "this.props")
    let selectedCity = this.props.city;
    let cityKey = this.props.index;
    

    return (
      <div className="cityCard">
        <div onClick={() => this.props.delete(cityKey)} className="cityCardClose">X</div>
        <div className="cardUpdated">Updated TODO</div>
        <div className="cardLocationPrimary">{selectedCity.location}</div>
        <div className="cardLocationSecondary">in {selectedCity.city}, United Kingdom</div>
        <div className="cardValues">
          <p className="cardMeasure">Values:</p>
          {selectedCity.measurements.map((measure, measureIndex) =>
            <p className="cardMeasure">{measure.parameter}: {measure.value},</p>)}
        </div>
      </div>
    )
  }
}

export default CityCard;

