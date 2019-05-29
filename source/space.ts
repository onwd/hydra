export default class Space {
  public type: string;
  public values: Array<any>;
  public getNext: Function;

  constructor(options: any) {
    this.type = options.type || 'array';
    this.values = options.values || [];
    this.getNext = options.getNext || null;
  }
}
