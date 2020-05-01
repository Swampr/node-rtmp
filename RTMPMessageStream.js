const EventEmitter = require('events');
const RTMPMessageStreamHandler = require('./RTMPMessageStreamHandler');

class RTMPMessageStream extends EventEmitter {
  constructor(messageTransport) {
    super();

    this.messageStreamHandlers = new Map();
    this.controlStream = new RTMPMessageStreamHandler(this.emit.bind(this));
    this.messageStreamHandlers.set(0, this.controlStream);

    this.onMessage = this.onMessage.bind(this);
    this.messageTransport = messageTransport;
    this.messageTransport.on('message', this.onMessage);
    
    this.controlStream.on('createStream', 
  }

  formatMessage(message) {
    return this.messageTransport.formatMessage(message);
  }

  onData(data) {
    this.messageTransport.onData(data);
  }

  onMessage(message) {
    if (this.messageStreamHandlers.has(message.streamId)) {
      this.messageStreamHandlers.get(message.streamId).onMessage(message);
    } else {
      // log error invalid stream id
    }
  }
}

module.exports = RTMPMessageStream;