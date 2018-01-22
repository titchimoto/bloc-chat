import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import '.././styles/MessageList.css';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      content: '',
      sentAt: '',
      roomId: '',
      messages: [],
    }
    const messagesRef = this.props.firebase.database().ref('rooms/' + this.props.activeRoom.key + '/messages');
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const messagesRef = this.props.firebase.database().ref('rooms/' + this.props.activeRoom.key + '/messages');

    messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
      });
    }

  handleChange(e) {
    this.setState({
      username: this.props.username,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key
    });
  }

  sendMessage(e) {
    const messagesRef = this.props.firebase.database().ref('rooms/' + this.props.activeRoom.key + '/messages');
    e.preventDefault();
    if (!this.state.content) { return }
    if (!this.state.roomId) { return }
    messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    })
    this.setState({ username: '', content: '', sentAt: '', roomId: ''})
  }

  deleteMessage(messageKey) {
    let message = this.props.firebase.database().ref('rooms/' + this.props.activeRoom.key + '/messages/' + messageKey);
    message.remove();
  }

  editMessage(messageKey) {
    let message = this.props.firebase.database().ref('rooms/' + this.props.activeRoom.key + '/messages/' + messageKey);
    let answer = prompt("What would you like to change your message to?", "testing");
    message.update({ content: answer });
    this.setState({ content: '' });
    //console.log(this.props.firebase.database().ref('rooms/-L2XGk78mmBtqVyJQP3n/messages/-L2XUwQdck1GCsF8_pbH'));
  }

  componentWillReceiveProps(nextProps) {
     if (nextProps.activeRoom !== this.props.activeRoom) {
       const messagesRef =  this.props.firebase.database().ref('rooms/' + nextProps.activeRoom.key + '/messages');
       messagesRef.on('value', snapshot => {
         let activeRoomMessages = [];
         snapshot.forEach((message) => {
             activeRoomMessages.push({
               key: message.key,
               username: message.val().username,
               content: message.val().content,
               sentAt: message.val().sentAt,
               roomId: message.val().roomId
             });
         });
         this.setState({ messages: activeRoomMessages});
       });
     }
   }

  render() {
    //const messagesRef = this.props.firebase.database().ref('rooms/' + this.props.activeRoom.key + '/messages');

    return (
      <section>
      <div className="message-window">
      <h1>{this.props.activeRoom.name}</h1>

        {
          this.state.messages.map( (message, index) =>
            <li key={message.key}>{message.username} @ <Moment format="HH:MM MM/DD/YYYY">{message.sent}</Moment>: {message.content}
              <span className="ion-trash-a" onClick={ () => this.deleteMessage(message.key) }></span>
              <span className="ion-edit" onClick={ () => this.editMessage(message.key) }></span>
            </li>
        )
      }
      </div>

      <div id="message-bar">
        <form onSubmit={ (e) => this.sendMessage(e) }>
          <input id="message-input" type="text" placeholder="Send a message..."  value={this.state.content} onChange={ (e) => this.handleChange(e) }/>
          <input id="message-send" type="submit" value="Send"/>
        </form>
      </div>
      </section>
    );
  }
}

export default MessageList;
