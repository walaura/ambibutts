export const getWorkers = async () => {
  const workers = await navigator.serviceWorker.getRegistrations();
  const hasWorkers = workers.length > 0;
  return { workers, hasWorkers };
};

export const registerWorker = () =>
  navigator.serviceWorker.register("../sw.ts");

export const addButton = ({
  onclick,
  name,
  useOnce = false,
  secondary = false
}) => {
  const $btn = document.createElement("button");
  $btn.innerText = name;
  window.app.appendChild($btn);
  if (secondary) {
    $btn.dataset.secondary = true;
  }
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
