const hydra = require('../index');

const master = new hydra.Master({
  tasks: require('./tasks')
});

master.start();
