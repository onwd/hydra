(() => {
  const statusEnum = {
    LOCATING:          1,
    FAILED_TO_LOCATE:  2,
    CONNECTING:        3,
    CONNECTED:         4,
    FAILED_TO_CONNECT: 6
  };

  const statusElem = document.getElementsByClassName('status')[0];
  const progressElem = document.getElementsByClassName('progress')[0];

  setStatus(statusEnum.CONNECTED);
  setProgress('Solved 1 chunks');

  function setStatus(status) {
    const statusToText = {};
    statusToText[statusEnum.LOCATING] = 'Locating admin...';
    statusToText[statusEnum.FAILED_TO_LOCATE] = 'Failed to locate admin';
    statusToText[statusEnum.CONNECTING] = 'Connecting...';
    statusToText[statusEnum.CONNECTED] = 'Connected';
    statusToText[statusEnum.FAILED_TO_CONNECT] = 'Failed to connect';

    const statusToClass = {};
    statusToClass[statusEnum.LOCATING] = 'status-locating';
    statusToClass[statusEnum.FAILED_TO_LOCATE] = 'status-failedtolocate';
    statusToClass[statusEnum.CONNECTING] = 'status-connecting';
    statusToClass[statusEnum.CONNECTED] = 'status-connected';
    statusToClass[statusEnum.FAILED_TO_CONNECT] = 'status-failedtoconnect';

    statusElem.innerText = statusToText[status];
    statusElem.className = `status ${statusToClass[status]}`;
  }

  function setProgress(progress) {
    progressElem.innerText = progress;
  }
})();
