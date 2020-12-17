# Hydra

Hydra is a distributed computing framework for Node.js. It provides a way to distribute calculation of some arbitrary function `f(x)` over arbitrary space `S` between many computation nodes (browsers or other Node.js processes) connected to master node via websockets.

## Install

```bash
$ yarn add @onwd/hydra
```

## Usage

### Master

1. Create a task:

```ts
// master/tasks/example-task.ts

import { Space, Task } from '@onwd/hydra';

function f(x: number): boolean {
  return x * x === 64;
}

const space = new Space({
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
});

export const task = new Task({ f, space });
```

2. Create `Master` instance and start the server.

```ts
// master/index.ts

import { Master } from '@onwd/hydra';
import { task } from './tasks/example-task';

const master = new Master({ task });

master.start();
```

### Worker

Create `Worker` instance and connect to `Master`.

```ts
import { Worker } from '@onwd/hydra';

const worker = new Worker({
  url: 'ws://localhost:9000'
});

worker.start();
```

## Concept

Hydra provides the following entities:
  - **Master**:
    - stores `Task` definition as well as algorithm to generate `Space` and sub-`Spaces`;
    - handles incoming connections from `Workers` and stores their current work state;
    - provides the `Task` definition to `Workers` as well as sub-`Spaces` they should work on;
    - stores the `Task` completion state.
  - **Worker**:
    - connects to `Master` and requests a `Task` definition and a sub-`Space` to work on;
    - installs dependencies listed in a `Task`;
    - works on a `Task` using provided definition and a sub-`Space`;
    - responds to `Master` with calculation result.
  - **Task**:
    - stores `dependencies`, `f(x)` and a `Space`.
  - **Space**:
    - stores `type` of the `Space`, `values` array or a value generator function.
