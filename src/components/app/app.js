import React from 'react';
import { Row } from '../people-page/people-page';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import './app.css';
import PeoplePage from '../people-page';
import ErrorIndicator from '../error-indicator/error-indicator';
import SwapiService from '../../services/swapi-service';
import ItemDetails from '../item-details';

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
    const {getPerson, getStarship, getPersonImage, getStarshipImage} = this.swapiService
    const personDetails = (
      <ItemDetails 
      itemId={11}
      getData={getPerson} 
      getImageUrl = {getPersonImage} />
    )
    const starshipDetails = (
      <ItemDetails itemId={5} 
      getData={getStarship} 
      getImageUrl = {getStarshipImage} />
    )
    return (
      <div className='stardb-app'>
        <Header />
        {/* {planet} */}
        <Row
        left={personDetails}
        right={starshipDetails}
        />
        {/* <div className='row mb2 button-row'>
          <button className='toggle-planet btn btn-warning btn-lg'
          onClick={this.toggleRandomPlanet} >
            Toggle random planet
          </button>
          <ErrorButton />
        </div> */}
        {/* <PeoplePage /> */}
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

