import { IUser } from "../interfaces/interfaces";
import Message from "./Message";

class Chat {
  private messages: Message[];
  private users: Record<string, IUser>;
  constructor() {
    this.messages = [];
    this.users = {};
  }

  get last10Msgs() {
    this.messages = this.messages.slice(0, 10);
    return this.messages;
  }

  get usersArr() {
    return Object.values(this.users); // [ {}, {}, {}]
  }

  sendMessage(uid: string, name: string, message: string) {
    this.messages.unshift(new Message(uid, name, message));
  }

  connectUser(user: IUser) {
    this.users[user.id] = user;
  }

  disconnectUser(id: string) {
    delete this.users[id];
  }
}

export default Chat;
