import { Worker } from '../../source/framework';

const worker = new Worker({
  url: 'ws://localhost:9000'
});

worker.start();
