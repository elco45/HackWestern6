import React, { Component } from 'react';
import 'react-chat-elements/dist/main.css';
import { MessageList, Input, Button } from 'react-chat-elements';
import axios from 'axios';
const Sentiment = require('sentiment');
const giphy = require('giphy-api')('F0Gc8za8I0dxRagRLcauHO63TDZRuo3k');

const sentiment = new Sentiment();

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
      axios
        .get(`http://34.66.11.57:3000/?question="${message}"`)
        .then(resp => {
          const { messageList } = this.state;

          messageList.push({
            position: 'right',
            type: 'text',
            text: message,
            date: new Date()
          });
          this.receiveMessage(resp.data.value);
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.setState({ message: '' });
          this.refs.input.clear();
        });
    }
  }

  receiveMessage(text) {
    if (text.length > 0) {
      const sentimentResult = sentiment.analyze(text);
      const { words } = sentimentResult;
      // if (comparative > 0.25) {
      //   console.log('Positive');
      // } else if (comparative > -0.25) {
      //   console.log('Mutual');
      // } else {
      //   console.log('Bad');
      // }

      giphy
        .search({
          q:
            words.length > 0
              ? words[Math.floor(Math.random() * words.length)] + ' Trump'
              : 'Trump',
          rating: 'g'
        })
        .then(res => {
          const { messageList } = this.state;
          messageList.push({
            position: 'left',
            type: 'text',
            text,
            date: new Date()
          });
          messageList.push({
            position: 'left',
            type: 'photo',
            data: {
              uri: `https://media.giphy.com/media/${
                res.data.length > 0
                  ? res.data[Math.floor(Math.random() * res.data.length)].id
                  : ''
              }/giphy.gif`,
              status: {
                click: false,
                loading: 0
              }
            }
          });
          this.setState({
            messageList: [...this.state.messageList]
          });
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
          <div className="sm-12 md-6"></div>
          <div
            className="sm-12 md-6"
            style={{ overflowY: 'scroll', height: '85vh' }}
          >
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
