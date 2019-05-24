import Space from './space';

export default class Task {
  public dependencies: Array<string>;
  public compute: Function;
  public space: Space;

  constructor(options: any) {
    this.dependencies = options.dependencies || [];
    this.compute = options.compute || null;
    this.space = options.space || null;
  }
}
