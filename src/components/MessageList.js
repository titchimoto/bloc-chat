import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      content: '',
      sentAt: '',
      roomId: '',
      messages: []
    }
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  render() {
    return (
      <div id="message-list">
      <h1>{this.props.activeRoom.name}</h1>

      <div>{this.props.activeRoom.username}</div>
      <div>{this.props.activeRoom.content}</div>


      </div>
    );
  }
}


export default MessageList;
