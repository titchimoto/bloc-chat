import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


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
      activeRoom: '',
      user: ''
    };
    this.activeRoom = this.activeRoom.bind(this)
    this.setUser = this.setUser.bind(this);


  }

  activeRoom(room) {
    this.setState({ activeRoom: room })
  }

  setUser(user) {
    this.setState({ user: user });
}




  render() {
    const currentUser = this.state.user === null ? "Guest" : this.state.user.displayName;

    return (
      <div className="App">
      <h1>{ "Select A Room" }</h1>

        <User firebase={firebase} setUser={this.setUser} user={this.state.user} greet={currentUser}/>
        <RoomList firebase={firebase} activeRoom={this.activeRoom} />
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />


      </div>


    );
  }
}

export default App;
