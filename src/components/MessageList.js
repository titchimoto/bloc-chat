import React, { Component } from 'react';

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
      username: this.props.user,
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

  // retrieveMessages(e) {
  //   this.props.firebase.database().ref('/messages').on('value', function(snapshot) {
  //   console.log(snapshot.val());
  // });
  //   }

  componentWillReceiveProps(nextProps) {
     if (nextProps.activeRoom !== this.props.activeRoom) {
       const messagesRef =  this.props.firebase.database().ref("rooms/" + nextProps.activeRoom.key + "/messages");
       messagesRef.on('value', snapshot => {
         let activeRoomMessages = [];
         snapshot.forEach((message) => {
             activeRoomMessages.push({
               key: message.key,
               username: message.val().username,
               content: message.val().content,
               sentAt: message.val().sentAt
             });
         });
         this.setState({ messages: activeRoomMessages});
       });
     }
   }

  render() {
    const messagesRef = this.props.firebase.database().ref('rooms/' + this.props.activeRoom.key + '/messages');

    return (
      <div>
      <h1>{this.props.activeRoom.name}</h1>

        <form onSubmit={ (e) => this.sendMessage(e) }>
          <input type="text" placeholder="Send a message..."  value={this.state.content} onChange={ (e) => this.handleChange(e) }/>
          <input type="submit" value="Send" />
        </form>

        <h2>{this.props.activeRoom.key}</h2>

        {
          this.state.messages.map( (message, index) =>
            <li key={message.key}>{message.username} @ {message.sent}: {message.content}</li>
        )
      }

      </div>
    );
  }
}

export default MessageList;
