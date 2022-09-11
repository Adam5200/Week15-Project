import React from "react"
import NewRoomForm from "./new-room-form"

export default class House extends React.Component {
    render() {
        const rooms = this.props.data.rooms
            ? this.props.data.rooms.map((room, index) =>
                <li key={index}>
                    {room.name} Area: {room.area}
                    <button onClick={e =>
                        this.props.deleteRoom(e, this.props.data, room)
                    }>Delete</button>
                </li>)
            : null
        return (
            <div>
                <div className="card-header bg-primary text-white">
                <h1>{this.props.data.name}</h1>
                </div>
                <div className="card-body">
                    <ul>
                        {rooms}
                    </ul>
                    <h3>Add a new room:</h3>
                    <NewRoomForm
                    addNewRoom={this.props.addNewRoom} data={this.props.data} />
                </div>               
            </div>
        )
    }
}