export class Space {
  public type: string;
  public values: Array<any>;
  public getNextValue: Function;

  constructor(space?: Partial<Space>) {
    this.type = space?.type ?? 'array';
    this.values = space?.values ?? [];
    this.getNextValue = space?.getNextValue ?? null;
  }
}
