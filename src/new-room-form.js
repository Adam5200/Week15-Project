import React from "react"

export default class NewRoomForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameValue: "",
            areaValue: ""
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleAreaChange = this.handleAreaChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    //keeping track of the "name" variable as we type it out, passing it into state
    handleNameChange(e) {
        this.setState({nameValue: e.target.value})
    }

    //same as above function, only for the "area" variable
    handleAreaChange(e) {
        this.setState({areaValue: e.target.value})
    }

    //function called when the "Add Room" button is clicked. See the "addNewRoom" function in App.js
    handleClick(e) {
        this.props.addNewRoom(e, this.props.data,
            {name: this.state.nameValue, area: this.state.areaValue})
        //reset the textboxes so they are empty once more
        this.setState({nameValue: "", areaValue: ""})
    }

    render() {
        return(
            <div>
                <input type="text" placeholder="Name" onChange={this.handleNameChange} value = {this.state.nameValue} />
                <input type="text" placeholder="Area" onChange={this.handleAreaChange} value = {this.state.areaValue} />
                <button onClick={this.handleClick}>Add Room</button>
            </div>
        )
    }
}