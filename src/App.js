import React from 'react';
import './App.css';
import CitySearch from './components/CitySearch.js'

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

