class Message {
  private uid: string;
  private name: string;
  private message: string;

  constructor(uid: string, name: string, message: string) {
    this.uid = uid;
    this.name = name;
    this.message = message;
  }
}

export default Message;
