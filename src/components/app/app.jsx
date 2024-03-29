import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from "../../services/swapi-service";
import DummySwapiService from '../../services/dummy-swapi-service';
import {PeoplePage, PlanetPage, StarshipPage, SecretPage, LoginPage} from '../pages'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './app.css';

import { SwapiServiceProvider } from '../swapi-service-context/swapi-service-context';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {

  state = {
    swapiService : new SwapiService(),
    isLoggedIn: false
  };
  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }
  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService
      ? DummySwapiService
      : SwapiService
      console.log(Service)
      return {
        swapiService: new Service()
      }
    })
  }
  render() {
    const {isLoggedIn} = this.state;
      return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange}/>
            <RandomPlanet />
            <Switch>
            <Route path='/' exact render={() => <h2>Welcome to StarDB</h2>} />
              <Route path='/people/:id?' component={PeoplePage} />
              <Route path='/planets' component={PlanetPage} />
              <Route path='/starships'  exact component={StarshipPage} />
              <Route path='/starships/:id'
               render={({match}) => {
               const { id } = match.params
                console.log(match)
                return <StarshipDetails itemId={id}
                />}} />
              <Route 
              path='/login' 
              render={() => (
                <LoginPage 
                  isLoggedIn={isLoggedIn}
                  onLogin={this.onLogin}/>
              )} />  
              <Route 
              path='/secret' 
              render={() => (
              <SecretPage 
              isLoggedIn={isLoggedIn}/>
              )}
              /> 
              <Route render={() => <p>This page not found</p>} /> 
            </Switch>
              
          </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}