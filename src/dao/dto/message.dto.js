export default class MessageDTO {
  constructor(message) {
    this.userId = message.userId;
    this.text = message.text;
    this.timestamp = Date();
    this.isReply = message.isReply || false;
  }
}
