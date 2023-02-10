import React, { Component } from 'react'
import './people-page.css'
import ItemList from '../item-list'
import PersonDetails from '../person-details'
import ErrorIndicator from '../error-indicator/error-indicator'
import SwapiService from '../../services/swapi-service'
import ErrorBoundary from '../error-boundary/error-boundary'

const Row = ({left, right}) => {
    return (
        <div className="row mb2">
          <div className="col-md-6">
            {left}
          </div>
          <div className="col-md-6">
            {right}
          </div>
        </div>
    )
}

export default class PeoplePage extends Component {
    swapiService = new SwapiService()
    state = {
        selectedPerson: 1,
        // hasError: false
    }
    componentDidCatch(){
      this.setState({
        hasError: true
      })
    }
    onPersonSelected = (selectedPerson) => {
        this.setState({selectedPerson})
    }
  render() {   
    if(this.state.hasError) {
      return < ErrorIndicator />
    }
    const itemList = (
        <ItemList  
            onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllPeople}> 
            {(i) => (
                `${i.name} (${i.birth_year})`
                )} 
        </ItemList>
    )
    const personDetails = (
        <ErrorBoundary>
            <PersonDetails personId={this.state.selectedPerson}/>
        </ErrorBoundary>
            )
    return(
        <Row left={itemList} right={personDetails} />     
    )
  }
}

