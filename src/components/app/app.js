import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorButton from '../error-button';
import './app.css';
import PeoplePage from '../people-page';
import ErrorIndicator from '../error-indicator/error-indicator';
import SwapiService from '../../services/swapi-service';

export default class App extends React.Component {
  swapiService = new SwapiService()
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
        {/* <div className="row mb2">
          <div className="col-md-6">
            <ItemList  
            onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllPlanets} 
            renderItem = {(item) => <span>{item.name}<button>!</button></span>} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        </div>
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList  
            onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllStarships} 
            renderItem = {(item) => item.name} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        </div> */}
      </div>
    );
  }
};

