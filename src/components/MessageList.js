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
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }

  componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: this.props.user.displayName,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }


  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.props.user,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
    this.setState({username: '', content: '', sentAt: '', roomId: ''});
  }


  render() {
    const activeRoom = this.props.activeRoom;
    return (
      <div>
      <h1>{this.props.activeRoom.name}</h1>

        <form onSubmit={ (e) => this.createMessage(e) }>
          <input type="text" placeholder="Send a message..." onChange={ (e) => this.handleChange(e) }/>
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}


export default MessageList;
