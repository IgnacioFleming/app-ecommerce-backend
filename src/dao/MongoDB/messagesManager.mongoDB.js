class MessageManager {
  constructor(message) {
    this.id = message.userId;
    this.text = message.text;
    this.timestamp = message.timestamp;
    this.isReply = message.isReply;
  }
}
