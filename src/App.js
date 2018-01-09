import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './RoomList';
import MessageList from './MessageList';


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
  render() {
    return (
      <div className="App">


        <RoomList firebase={firebase} />
        <MessageList firebase={firebase} />

      </div>


    );
  }
}

export default App;
