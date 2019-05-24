import { Space, Task } from '../../../source/index';

function f(x) {
  return x * x === 64;
}

const space = new Space({
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
});

const task = new Task({ f, space });

export default task;
