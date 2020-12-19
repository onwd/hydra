import { NodeWebsocketTransport, Worker } from '../../source/framework';

const worker = new Worker({
  transport: new NodeWebsocketTransport({
    url: 'ws://localhost:9000'
  })
});

worker.start();
