export const getWorkers = async () => {
  const workers = await navigator.serviceWorker.getRegistrations();
  const hasWorkers = workers.length > 0;
  return { workers, hasWorkers };
};

export const addButton = ({ onclick, name, useOnce = false }) => {
  const $btn = document.createElement("button");
  $btn.innerText = name;
  window.app.appendChild($btn);
  if (useOnce) {
    $btn.onclick = async (...args) => {
      $btn.disabled = true;
      await onclick(...args);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    };
  } else {
    $btn.onclick = onclick;
  }
};
