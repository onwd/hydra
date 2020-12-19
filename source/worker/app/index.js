(() => {
  const { BrowserWebsocketTransport, Worker } = require('../../../build');

  const statusEnum = {
    LOCATING:         1,
    FAILED_TO_LOCATE: 2,
    CONNECTING:       3,
    CONNECTED:        4,
    NO_CONNECTION:    6
  };

  const statusElem = document.getElementsByClassName('status')[0];

  let worker = null;
  let masterUrl = null;

  locate();

  function setStatus(status) {
    const statusToText = {};
    statusToText[statusEnum.LOCATING] = 'Locating master...';
    statusToText[statusEnum.FAILED_TO_LOCATE] = 'Failed to locate master';
    statusToText[statusEnum.CONNECTING] = 'Connecting...';
    statusToText[statusEnum.CONNECTED] = 'Connected';
    statusToText[statusEnum.NO_CONNECTION] = 'No connection';

    const statusToClass = {};
    statusToClass[statusEnum.LOCATING] = 'status-locating';
    statusToClass[statusEnum.FAILED_TO_LOCATE] = 'status-failedtolocate';
    statusToClass[statusEnum.CONNECTING] = 'status-connecting';
    statusToClass[statusEnum.CONNECTED] = 'status-connected';
    statusToClass[statusEnum.NO_CONNECTION] = 'status-noconnection';

    statusElem.innerText = statusToText[status];
    statusElem.className = `status ${statusToClass[status]}`;
  }

  function locate() {
    setStatus(statusEnum.LOCATING);

    const script = document.createElement('script');

    script.src = 'https://onwd.github.io/hydra/configuration.js';

    script.onload = () => {
      document.body.removeChild(script);

      masterUrl = window.hydraConfiguration.masterUrl;
      delete window.hydraConfiguration;

      connect();
    };

    script.onerror = () => {
      document.body.removeChild(script);
      onLocationFailed();
    };

    document.body.appendChild(script);
  }

  function onLocationFailed() {
    setStatus(statusEnum.FAILED_TO_LOCATE);
    setTimeout(locate, 3000);
  }

  function connect() {
    if (!worker) {
      setStatus(statusEnum.CONNECTING);

      worker = new Worker({
        transport: new BrowserWebsocketTransport({
          url: masterUrl
        }),
        onConnected: onConnected,
        onConnectionClosed: onConnectionClosed
      });

      worker.start();
    }
  }

  function disconnect() {
    if (worker) {
      worker.stop();
      worker = null;
    }
  }

  function onConnected() {
    setStatus(statusEnum.CONNECTED);
  }

  function onConnectionClosed() {
    disconnect();
    setStatus(statusEnum.NO_CONNECTION);
    setTimeout(locate, 3000);
  }
})();
