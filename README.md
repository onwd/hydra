# Hydra

Hydra is a distributed computing framework for Node.js. It provides a way to distribute calculation of some arbitrary function `f(x)` over arbitrary space `S` between many computation nodes (browsers or other Node.js processes) connected to master node via websockets.

## Install

```bash
$ npm i @onwd/hydra
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

const task = new Task({ f, space });

export default task;
```

2. Create `Master` instance and start the server.

```ts
// master/index.ts

import exampleTask from './tasks/example-task';
import { Master } from '@onwd/hydra';

const master = new Master({
  tasks: [exampleTask]
});

master.start();
```

### Worker

Create `Worker` instance and connect to `Master`.

```ts
import { Worker } from '@onwd/hydra';

const worker = new Worker({
  url: 'wss://localhost:9000'
});

worker.start();
```

## Concept

Hydra provides the following entities:
  - **Master**:
    - stores `Tasks` definitions as well as algorithm to generate their `Space` and `Subspaces`;
    - handles incoming connections from `Workers` and stores their current work state;
    - provides the `Tasks` definitions to `Workers` as well as `Subspace` they should work on;
    - stores the `Tasks` completion state.
  - **Worker**:
    - connects to `Master` and requests a `Task` definition and a `Subspace` to work on;
    - installs dependencies listed in a `Task`;
    - works on a `Task` using provided definition and a `Subspace`;
    - responds to `Master` with calculation result.
  - **Task**:
    - stores `dependencies`, `f(x)` and a `Space`.
  - **Space**:
    - stores `type` of the `Space`, `values` array or a value generator function.
  - **Subspace**:
    - stores the chunk of `Space`'s `values`.
