import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorButton from '../error-button';
import './app.css';
import PeoplePage from '../people-page';
import ErrorIndicator from '../error-indicator/error-indicator';

export default class App extends React.Component {
  state = {
    showRandomPlanet: true,
    hasError: false,
  }
  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };
  
  componentDidCatch() {
    this.setState({hasError:true})
  }
  render() {
    if(this.state.hasError){
      return <ErrorIndicator />
    }
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
    return (
      <div className='stardb-app'>
        <Header />
        {planet}
        
        <div className='row mb2 button-row'>
          <button className='toggle-planet btn btn-warning btn-lg'
          onClick={this.toggleRandomPlanet} >
            Toggle random planet
          </button>
          <ErrorButton />
        </div>
        <PeoplePage />
        <PeoplePage />
        <PeoplePage />
      </div>
    );
  }
};

