const hydra = require('../index');

const worker = new hydra.Worker({
  url: 'wss://localhost:9000'
});

worker.start();
