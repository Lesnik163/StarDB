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
    selectedPerson: null
  }
  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };
  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  }
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
        
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList  onItemSelected={this.onPersonSelected}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        </div>

      {/* <PeoplePage />
      <PeoplePage />
      <PeoplePage /> */}
      </div>
    );
  }
};

