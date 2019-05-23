const hydra = require('../../../index');

function compute(x) {
  return x * x === 64;
}

const space = new hydra.Space({
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
});

module.exports = new hydra.Task({ compute, space });
