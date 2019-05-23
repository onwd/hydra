const hydra = require('../index');
const tasks = require('./tasks');

const master = new hydra.Master({ tasks });

master.start();
