export default class Message {
  public event: string;
  public data?: any;

  constructor(message: any) {
    this.event = message.event || '';
    this.data = message.data || null;
  }

  static deserialize(message: string): Message {
    return new Message(JSON.parse(message));
  }

  public serialize(): string {
    return JSON.stringify({
      event: this.event,
      data: this.data
    });
  }
}
