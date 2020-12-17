import { Space, Task } from '../../../source/framework';

function f(x: number): boolean {
  return x * x === 64;
}

const space = new Space({
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
});

export const task = new Task({ f, space });
