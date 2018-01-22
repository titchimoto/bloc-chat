import React, { Component } from 'react';
import '.././styles/RoomList.css';


class RoomList extends Component {
  constructor(props){
    super(props);
    this.state = {
      rooms: [],
      newRoomName: '',
      updateRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    if (!this.state.newRoomName) { return }
    this.roomsRef.push({ name: this.state.newRoomName })
    this.setState({ newRoomName: ''})
  }

  selectRoom(room) {
    this.props.activeRoom(room)
  }

  deleteRoom(roomKey) {
    let room = this.props.firebase.database().ref("rooms/" + roomKey);
    room.remove();
  }

  renameRoom(roomKey) {
    let answer = prompt("What would you like to change it to?");
    let room = this.props.firebase.database().ref("rooms/" + roomKey);
    room.update({ name: answer });
    this.setState({ name: ''});
  }

  render() {
    return (
      <section className="room-window">
      <div id="room-input">
              <form onSubmit={ (e) => this.createRoom(e) } >
                <label>Create A Chat Room: </label>
                <input type="text" value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e) }/>
                <input type="submit" value="Submit"  />
              </form>
      </div>

      <div id="room-list">
      {
        this.state.rooms.map( (room, index) =>
          <li className="room-name" key={room.key} onClick={(e) => this.selectRoom(room , e) }>{room.name}
          <span className="ion-trash-a" onClick={ () => this.deleteRoom(room.key)}></span>
          <span className="ion-edit" onClick={ () => this.renameRoom(room.key)}></span>
          </li>
      )
    }

      </div>
      </section>
    );
  }
}



export default RoomList;
