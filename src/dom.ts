import { handleEnter } from "./app";

export const scoreElement = document.getElementById('score') as HTMLDivElement;
export const textElement = document.getElementById('text') as HTMLDivElement;
export const button = document.querySelector('button') as HTMLButtonElement;

export const directions: Direction[] = [];

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      directions.push('up');
      break;
    case 'ArrowDown':
      directions.push('down');
      break;
    case 'ArrowLeft':
      directions.push('left');
      break;
    case 'ArrowRight':
      directions.push('right');
      break;
    case 'Enter':
    case " ":
      handleEnter();
      break;
  }
});

window.addEventListener('mousedown', (event) => {
  event.preventDefault();

  const x = event.clientX / window.innerWidth;
  const y = event.clientY / window.innerHeight;

  console.log({ x, y })
  if (x < 0.5 && y < 0.5)
    directions.push(x < y ? 'left' : 'up');

  if (x < 0.5 && y > 0.5)
    directions.push(x > y ? 'left' : 'down');

  if (x > 0.5 && y < 0.5)
    directions.push(x < y ? 'right' : 'up');

  if (x > 0.5 && y > 0.5)
    directions.push(x > y ? 'right' : 'down');
});
