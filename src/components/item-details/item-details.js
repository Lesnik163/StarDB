import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-button';
import './item-details.css';

export default class ItemDetails extends Component {
  swapiService = new SwapiService();

  state = {
    item: null,
    image: null
  }
  componentDidMount() {
    this.updateItem();
  }
  componentDidUpdate(prevProps) {
    if(this.props.itemId !== prevProps.itemId){
      this.updateItem()
    }
  }
  updateItem = () => {
    const {itemId, getData, getImageUrl} = this.props;
    if (!itemId) {
      return
    }

    getData(itemId)
    .then(item => {
      this.setState({
        item,
        image: getImageUrl(item)
      })
    })
  }
  render() {
    const {image} = this.state
    if(!this.state.item) {
      return <span>Select a item from a list</span>  
    }
    const {id, name, gender, birthYear, eyeColor} = this.state.item //!
    return (
      <div className="item-details card">
        <img className="item-image"
          src={image}
          alt='item'/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}