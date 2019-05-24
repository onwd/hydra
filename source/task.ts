import Space from './space';

export default class Task {
  public dependencies: Array<string>;
  public f: Function;
  public space: Space;

  constructor(options: any) {
    this.dependencies = options.dependencies || [];
    this.f = options.f || null;
    this.space = options.space || null;
  }
}
