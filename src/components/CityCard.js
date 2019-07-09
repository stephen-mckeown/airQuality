import React from 'react';
import './CityCard.css'

class CityCard extends React.Component {

  timeConversion = (millisec) => {
    let seconds = (millisec / 1000).toFixed(1);
    let minutes = (millisec / (1000 * 60)).toFixed(1);
    let hours = (millisec / (1000 * 60 * 60)).toFixed(1);
    let days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);
    let weeks = (millisec / (1000 * 60 * 60 * 24 * 7)).toFixed(1);
    if (seconds < 60) {
      return seconds + " seconds ago";
    } else if (minutes < 60) {
      return "Less than " + Math.ceil(minutes) + " minutes ago";
    } else if (hours < 24) {
      return "Less than " + Math.ceil(hours) + " hours ago";
    } else if (days < 7) {
      return Math.ceil(days) + " days ago"
    } else {
      return weeks + " weeks ago"
    }
  }

  render() {
    let selectedCity = this.props.city;
    let cityKey = this.props.index;
    const today = new Date()
    const lastUpdate = new Date(this.props.city.measurements[0].lastUpdated)
    let timeDiff = Math.abs(today - lastUpdate);
    let time = this.timeConversion(timeDiff)

    return (
      <div className="cityCard">
        <div onClick={() => this.props.delete(cityKey)} className="cityCardClose">X</div>
        <div className="cardUpdated">{time}</div>
        <div className="cardLocationPrimary">{selectedCity.location}</div>
        <div className="cardLocationSecondary">in {selectedCity.city}, United Kingdom</div>
        <div className="cardValues">
          <p className="cardMeasure">Values:</p>
          {selectedCity.measurements.map((measure, measureIndex) =>
            <p key={measureIndex} className="cardMeasure">{measure.parameter}: {measure.value},</p>)}
        </div>
      </div>
    )
  }
}

export default CityCard;

