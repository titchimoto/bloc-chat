import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';


<script src="https://www.gstatic.com/firebasejs/4.8.1/firebase.js"></script>

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCa83P80xirAuOWPDL4sno-i3ZpEA7O_0A",
    authDomain: "bloc-chat-moto.firebaseapp.com",
    databaseURL: "https://bloc-chat-moto.firebaseio.com",
    projectId: "bloc-chat-moto",
    storageBucket: "bloc-chat-moto.appspot.com",
    messagingSenderId: "188913699155"
  };
  firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: ''
    };
    this.activeRoom = this.activeRoom.bind(this)
  }

  activeRoom(room) {
    this.setState({ activeRoom: room })
  }




  render() {
    return (
      <div className="App">
      <h1>{ this.state.activeRoom.name || "Select A Room" }</h1>


        <RoomList firebase={firebase} activeRoom={this.activeRoom} />
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />

      </div>


    );
  }
}

export default App;
