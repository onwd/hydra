export default class Space {
  public type: string;
  public values: Array<any>;
  public getNextValue: Function;

  constructor(options: any) {
    this.type = options.type || 'array';
    this.values = options.values || [];
    this.getNextValue = options.getNextValue || null;
  }
}
