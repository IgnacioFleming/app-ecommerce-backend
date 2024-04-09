export default class MessageDTO {
  constructor(message) {
    this.userId = message.userId;
    this.text = message.text;
    this.timestamp = message.timestamp;
    this.isReply = message.isReply;
  }
}
