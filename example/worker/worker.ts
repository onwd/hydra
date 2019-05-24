import { Worker } from '../../source/index';

const worker = new Worker({
  url: 'wss://localhost:9000'
});

worker.start();
