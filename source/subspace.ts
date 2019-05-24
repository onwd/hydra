export default class Subspace {
  public type: string;
  public values: Array<any>;

  constructor(options: any) {
    this.type = options.type || 'array';
    this.values = options.values || [];
  }
}
