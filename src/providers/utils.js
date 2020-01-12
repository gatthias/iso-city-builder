export const stateToB64 = obj =>
  Buffer.from(JSON.stringify(obj)).toString("base64");

export const B64ToState = str => JSON.parse(Buffer.from(str, "base64"));

export const debouce = (cb, delay) => {
  const now = performance.now();
  if (debouce.lastCall && now - debouce.lastCall < delay) {
    window.clearTimeout(debouce.lastTimerId);
  }

  debouce.lastCall = now;
  debouce.lastTimerId = window.setTimeout(() => {
    cb();
    debouce.lastCall = 0;
    debouce.lastTimerId = null;
  }, delay);
};

export const saveToHash = obj => {
  window.location.hash = stateToB64(obj);
};

export const loadFromHash = () => {
  let data = null;
  try {
    const hash = window.location.hash.substr(1);
    data = B64ToState(hash);
  } catch (e) {
    /* This can safely fail */
  }

  return data;
};
