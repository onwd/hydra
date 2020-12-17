import { Space } from './space';

export class Task {
  public dependencies: Array<string>;
  public f: Function;
  public space: Space;
  public getSubspace: Function;

  constructor(task?: Partial<Task>) {
    this.dependencies = task?.dependencies ?? [];
    this.f = task?.f ?? null;
    this.space = task?.space ?? null;
    this.getSubspace = task?.getSubspace ?? null;
  }
}
