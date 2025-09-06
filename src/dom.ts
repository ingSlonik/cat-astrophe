import { handleControl, handleDirection, handleEnter } from "./app";

function getElement(selector: string) {
  const element = document.querySelector(selector);
  if (!element) throw new Error(`Element not found: ${selector}`);
  return element as HTMLElement;
}

const musicButton = getElement('#music');
const soundButton = getElement('#sound');

export const scoreElement = getElement('#score');
export const textElement = getElement('#text');
export const button = getElement('#the-button');
export const arrows = getElement('#arrows');
export const subtitles = getElement('#subtitles');


window.addEventListener('keydown', (event) => {
  // there is keyboard
  arrows.className = "hide";

  switch (event.key) {
    case 'ArrowUp':
    case 'w':
      handleDirection('up');
      break;
    case 'ArrowDown':
    case 's':
      handleDirection('down');
      break;
    case 'ArrowLeft':
    case 'a':
      handleDirection('left');
      break;
    case 'ArrowRight':
    case 'd':
      handleDirection('right');
      break;
    case 'Enter':
    case " ":
      handleEnter();
      break;
  }
});

musicButton.onclick = () => musicButton.innerText = handleControl('music') ? '🔊' : '🔇';
soundButton.onclick = () => soundButton.innerText = handleControl('sound') ? '💬' : '🚫';

getElement('#up').onclick = () => handleDirection('up');
getElement('#down').onclick = () => handleDirection('down');
getElement('#left').onclick = () => handleDirection('left');
getElement('#right').onclick = () => handleDirection('right');
button.onclick = handleEnter;
