import React, { Component } from 'react';
import 'react-chat-elements/dist/main.css';
import { MessageList, Input, Button } from 'react-chat-elements';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [],
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    });
  }

  sendMessage() {
    const { message } = this.state;
    if (message.length > 0) {
      this.setState({
        messageList: [
          ...this.state.messageList,
          {
            position: 'right',
            type: 'text',
            text: message,
            date: new Date()
          }
        ],
        message: ''
      });
      this.refs.input.clear();
    }
  }

  receiveMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [
          ...this.state.messageList,
          {
            position: 'left',
            type: 'text',
            text,
            date: new Date()
          }
        ]
      });
    }
  }


  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleKeyDown = e => {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="sm-12 md-6">
          </div>
          <div className="sm-12 md-6" style={{ overflowY: 'scroll', maxHeight: '90%'}}>
            <MessageList

              className="message-list"
              lockable={true}
              dataSource={this.state.messageList}
            />
          </div>
        </div>
        <div className="chatContainer">
          <Input
            placeholder="Type here..."
            ref="input"
            value={this.state.message}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            rightButtons={
              <Button
                color="white"
                backgroundColor="black"
                text="Send"
                onClick={this.sendMessage}
              />
            }
          />
        </div>
      </div>
    );
  }
}
export default Chat;
