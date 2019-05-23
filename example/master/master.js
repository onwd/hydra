const hydra = require('../index');

const master = new hydra.Master({
  port: 9000,
  tasks: require('./tasks')
});

master.start();
