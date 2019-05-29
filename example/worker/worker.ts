import { Worker } from '../../source/index';

const worker = new Worker({
  url: 'ws://localhost:9000'
});

worker.start();
