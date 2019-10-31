(() => {
  const statusEnum = {
    LOCATING:         1,
    FAILED_TO_LOCATE: 2,
    CONNECTING:       3,
    CONNECTED:        4,
    NO_CONNECTION:    6
  };

  const statusElem = document.getElementsByClassName('status')[0];
  const progressElem = document.getElementsByClassName('progress')[0];

  let wss = null;
  let masterUrl = 'ws://localhost:9000';

  // setStatus(statusEnum.CONNECTED);
  // setProgress('Solved 1 chunks');

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

  function setProgress(progress) {
    progressElem.innerText = progress;
  }

  function locate() {
    setStatus(statusEnum.LOCATING);
    setTimeout(connect, 3000);
  }

  function onLocationFailed() {
    setStatus(statusEnum.FAILED_TO_LOCATE);
    setTimeout(locate, 3000);
  }

  function connect() {
    if (wss) {
      return;
    }

    setStatus(statusEnum.CONNECTING);

    wss = new WebSocket(masterUrl);

    wss.onopen = onConnected;
    wss.onclose = onConnectionClosed;
    wss.onmessage = onMessageReceived;
  }

  function disconnect() {
    if (wss) {
      wss.close();
      wss = null;
    }
  }

  function onConnected() {
    setStatus(statusEnum.CONNECTED);
  }

  function onConnectionClosed() {
    setStatus(statusEnum.NO_CONNECTION);
    disconnect();
    setTimeout(locate, 3000);
  }

  function onMessageReceived() {

  }
})();
