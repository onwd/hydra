# Hydra

Hydra is a distributed computing framework for Node.js. It provides a way to distribute calculation of some arbitrary function `f(x)` over arbitrary space `S` between many computation nodes (browsers or other Node.js processes).

## Concept

Hydra provides `5` classes:
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
    - stores `dependencies`, `f(x)` to calculate and a `Space`.
  - **Space**:
    - stores `type` of the `Space`, `values` array or a value generator function.
  - **Space**:
    - stores the chunk of `Space`'s `values`.
