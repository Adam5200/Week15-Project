import React from "react"
import './App.css';
import House from "./house"
import {NewHouseForm} from "./new-house-form"

const HOUSES_ENDPOINT = "https://ancient-taiga-31359.herokuapp.com/api/houses"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.addNewRoom = this.addNewRoom.bind(this)
    this.deleteRoom = this.deleteRoom.bind(this)
  }

  render() {
    const houses = this.state
      ? this.state.houses.map((house, index) =>
        <House 
          key={index}
          data={house}
          addNewRoom={this.addNewRoom}
          deleteRoom={this.deleteRoom} />)
      : null;
      return (
        <div>
          <NewHouseForm addNewHouse={this.addNewHouse}/>
          <br/>
          {houses}
        </div>
      )  
  }

  //method to add a new house entirely
  addNewHouse(e, name) {
    fetch(HOUSES_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: {name}
      })
    })
  }

  //handling the data given from the api, passing its content into our state, so it can render
  componentDidMount() {
    fetch(HOUSES_ENDPOINT)
      .then(res => res.json())
      .then(data => {
        this.setState({
          houses: data
        })
      })
  }

  //function to delete a room, with the house we are working with passed as a parameter, along with the room
  deleteRoom(e, house, room) {
    //find the index of the room we wish to delete
    const index = house.rooms.indexOf(room)
    //remove the room
    house.rooms.splice(index, 1)
    //make the backend aware of the change we made
    updateHouse(house)
      .then(() => {
        this.setState(state => {
          for (let h of state.houses) {
            if (h._id === house._id) {
              let h = house
              break
            }
          }
          return state
        })
      })
      //don't refresh the page when we click the delete button
      e.preventDefault()
  }

  //almost identical to the function above, though this time we are adding a room, not deleting one
  //see new-room-form
  addNewRoom(e, house, room) {
    house.rooms.push(room)
    updateHouse(house)
      .then(() => {
        this.setState(state => {
          for (let h of state.houses) {
            if (h._id === house._id) {
              let h = house
              break
            }
          }
          return state
        })
      })
      e.preventDefault()
  }
}

//function which includes the POST method to update a house, once we have modified it or it's contents
function updateHouse(house) {
  return fetch(`${HOUSES_ENDPOINT}/${house._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(house)
  })
}
