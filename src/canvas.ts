import { blackCat } from "./levels";

type Scale = {
    squareSize: number,
    x: (pos: number) => number,
    y: (pos: number) => number,
};

const timeFrame = 500; // ms

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;


export function setupCanvas() {
    // Získání poměru pixelů zařízení pro správné škálování.
    const dpr = window.devicePixelRatio || 1;

    // Získání skutečné velikosti okna prohlížeče v CSS pixelech.
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Nastavení skutečné velikosti kreslící plochy canvasu (násobeno DPR).
    // Tím zajistíme, že na každý CSS pixel připadá správný počet fyzických pixelů.
    canvas.width = screenWidth * dpr;
    canvas.height = screenHeight * dpr;

    // Nastavení velikosti elementu v CSS (zůstává 1:1 s velikostí okna).
    canvas.style.width = `${screenWidth}px`;
    canvas.style.height = `${screenHeight}px`;

    // Škálování kontextu, aby všechny kreslící operace (např. fillRect)
    // používaly jednotky CSS pixelů a byly správně zvětšeny.
    ctx.scale(dpr, dpr);
}

export function drawLevel(level: Level, state: GameState) {
    const { size, start, end, boxes, cats } = level;

    const scale = getScale(size);

    drawLand(size, scale);
    drawEnd(end, scale);

    if (state.type === "home") {
        drawEyes({ x: size.x / 2 + 1, y: 1.5 }, 2, state.timeStart + 4000, 9999999999999, 1, scale);
        drawPlayer(start, start, scale);
    } else if (state.type === "before") {
        drawEyes({ x: size.x / 2 + 1, y: 1.5 }, 2, state.timeStart, 9999999999999, 1, scale);
        drawPlayer(start, start, scale);
    } else if (state.type === "cat") {
        drawEyes({ x: size.x / 2 + 1, y: 1.5 }, 2, 0, state.timeStart, 1, scale);
        drawPlayer(start, start, scale);
        // draw cats
        cats.forEach(cat => drawCat(cat, state.timeStart, size, boxes, scale));
    } else if (state.type === "game") {
        drawPlayer(state.positionBefore, state.positionAfter, scale);
    } else if (state.type === "catastrophe") {
        drawPlayer(state.position, state.position, scale);
        drawCatastrophe(state.position, scale);
    } else {
        drawPlayer(state.position, state.position, scale);
    }

    boxes.forEach(box => drawBox(box, scale));
}


function getScale(size: Size): Scale {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const squareSize = Math.min(width / (size.x + 2), height / (size.y + 2));

    const landWidth = size.x * squareSize;
    const landHeight = size.y * squareSize;

    const x = (width - landWidth) / 2;
    const y = (height - landHeight) / 2;

    return {
        squareSize,
        x: (pos: number) => x + (pos - 1) * squareSize,
        y: (pos: number) => y + (pos - 1) * squareSize,
    };
}

export function getTimeScale(speed = 1, delay = 0) {
    const frame = Math.floor(timeFrame / speed);
    const rest = (Date.now() - delay * frame) % frame;
    return rest / frame;
}

function getTimePos(positionFrom: number, positionTo: number, speed = 1) {
    const timeScale = getTimeScale(speed);
    return positionFrom + (positionTo - positionFrom) * timeScale;
}

function getTimePosition(positionFrom: Position, positionTo: Position): Position {
    return {
        x: getTimePos(positionFrom.x, positionTo.x),
        y: getTimePos(positionFrom.y, positionTo.y),
    };
}

/** t is from 0 to 1 */
function easeInOut(t: number) {
    return 0.5 * (1 - Math.cos(Math.PI * t * 2));
}

function elseInOutAtTime(time: number, duration: number) {
    const now = Date.now();
    if (now < time) return 0;
    if (now > time + duration) return 1;
    return easeInOut((now - time) / duration / 2);
}

const landColor = '#9a7d5f';
const grassColor = "#117c13";
const grassTopColor = "#138510";
const gridColor = 'rgba(255, 255, 255, 0.15)';

const eyesCount = 3;
let eyes: { position: Position, sizeEyes: number, opacity: number, timeStart: number, timeEnd: number }[] = [];

function drawLand(size: Size, scale: Scale) {

    // Small eyes
    const now = Date.now();
    eyes = eyes.filter(eye => now < eye.timeEnd + 2000);

    if (eyes.length < eyesCount) {
        const x = Math.random();
        const y = Math.random();
        const sizeEyes = Math.random() / 3 + 0.1;
        const opacity = Math.random() / 2 + 0.1;
        const timeStart = now + 5000 + 7000 * Math.random();
        const timeEnd = timeStart + 5000 + 2000 * Math.random();

        const pos = Math.random();
        if (pos < 0.25) {
            // top
            eyes.push({ timeStart, timeEnd, sizeEyes, opacity, position: { x: size.x * x + 1, y } });
        } else if (pos < 0.5) {
            // bottom
            eyes.push({ timeStart, timeEnd, sizeEyes, opacity, position: { x: size.x * x + 1, y: size.y + y + 1 } });
        } else if (pos < 0.75) {
            // left
            eyes.push({ timeStart, timeEnd, sizeEyes, opacity, position: { x: x, y: size.y * y } });
        } else {
            // right
            eyes.push({ timeStart, timeEnd, sizeEyes, opacity, position: { x: size.x + x + 1, y: size.y * y + 1 } });
        }
    }
    eyes.forEach(eye => drawEyes(eye.position, eye.sizeEyes, eye.timeStart, eye.timeEnd, eye.opacity, scale));

    // Draw land
    const landX = scale.x(1);
    const landY = scale.y(1);
    const landWidth = scale.x(size.x + 1) - scale.x(1);
    const landHeight = scale.y(size.y + 1) - scale.y(1);

    // ctx.fillStyle = landColor;
    // ctx.fillRect(landX, landY, landWidth, landHeight);


    // Draw grass
    ctx.fillStyle = grassColor;
    ctx.beginPath();
    ctx.fillRect(landX, landY, landWidth, landHeight);

    ctx.save();

    ctx.beginPath();
    ctx.rect(landX, landY, landWidth, landHeight);
    ctx.clip();

    const width = scale.squareSize / 2;
    const animation = getTimeScale(0.03, 0);

    ctx.translate(scale.x(animation * (size.x + 3)), scale.y(1));

    ctx.strokeStyle = grassTopColor;
    ctx.lineWidth = width;
    ctx.lineCap = "square";
    ctx.beginPath();

    ctx.moveTo(1 * width, 0);
    ctx.bezierCurveTo(
        -1 * width, scale.y(size.y * 0.33),
        0 * width, scale.y(size.y * 0.66),
        -2 * width, scale.y(size.y * 1),
    );
    ctx.stroke();

    ctx.restore();



    /* Too expensive
    ctx.lineWidth = 1;

    const sizeX = size.x + 1;
    const sizeY = size.y + 1;
    const sizeTop = 8;
    const animation = easeInOut(getTimeScale(0.2)) - 0.5;

    for (let x = 1; x <= sizeX; x += sizeX / 200) {
        const lineX = scale.x(x);
        for (let y = 1; y <= sizeY; y += sizeY / 200) {
            const lineY = scale.y(y);
            ctx.strokeStyle = grassColor;
            ctx.beginPath();
            ctx.moveTo(lineX, lineY);
            ctx.lineTo(lineX + animation * 2, lineY - sizeTop * 1.3);
            ctx.stroke();
            ctx.strokeStyle = grassTopColor;
            ctx.beginPath();
            ctx.moveTo(lineX + animation * 2, lineY - sizeTop * 1.3);
            ctx.lineTo(lineX + animation * 5, lineY - sizeTop * 2);
            ctx.stroke();
        }
    }
    */


    // Draw grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    // Vertical lines
    for (let i = 2; i <= size.x; i++) {
        const lineX = scale.x(i);
        ctx.beginPath();
        ctx.moveTo(lineX, scale.y(1));
        ctx.lineTo(lineX, scale.y(size.y + 1));
        ctx.stroke();
    }

    // Horizontal lines
    for (let i = 2; i <= size.y; i++) {
        const lineY = scale.y(i);
        ctx.beginPath();
        ctx.moveTo(scale.x(1), lineY);
        ctx.lineTo(scale.x(size.x + 1), lineY);
        ctx.stroke();
    }
}


function drawEnd(position: Position, scale: Scale) {
    ctx.fillStyle = "blue";
    ctx.fillRect(scale.x(position.x + 0.1), scale.y(position.y + 0.1), scale.squareSize * 0.8, scale.squareSize * 0.8);
}

function drawBox(position: Position, scale: Scale) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(scale.x(position.x + 0.1), scale.y(position.y + 0.1), scale.squareSize * 0.8, scale.squareSize * 0.8);
}

function drawPlayer(positionBefore: Position, positionAfter: Position, scale: Scale) {
    const position = getTimePosition(positionBefore, positionAfter);

    ctx.beginPath();
    ctx.arc(scale.x(position.x + 0.5), scale.y(position.y + 0.5), scale.squareSize * 0.4, 0, 2 * Math.PI);
    ctx.fillStyle = '#f1c27d';
    ctx.fill();
    ctx.closePath();
}

function drawCat(cat: Cat, timeStart: number, size: Size, boxes: Position[], scale: Scale) {
    const position = getCatPosition(cat, timeStart, size, boxes);

    if (position.isDone)
        return;

    ctx.beginPath();
    ctx.arc(scale.x(position.position.x + 0.5), scale.y(position.position.y + 0.5), scale.squareSize * 0.4, 0, 2 * Math.PI);
    ctx.fillStyle = cat.color;
    ctx.fill();
    ctx.closePath();
}

function drawCatastrophe(position: Position, scale: Scale) {
    ctx.beginPath();
    ctx.arc(scale.x(position.x + 0.5), scale.y(position.y + 0.5), scale.squareSize * 0.3, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawEyes(position: Position, size: number, timeStart: number, timeEnd: number, opacity: number, scale: Scale) {
    ctx.save();
    ctx.translate(-60 * size, 0);
    drawEye(position, size, timeStart, timeEnd, opacity, scale);
    ctx.translate(120 * size, 0);
    drawEye(position, size, timeStart, timeEnd, opacity, scale);
    ctx.restore();
}
function drawEye(position: Position, size: number, timeStart: number, timeEnd: number, opacity: number, scale: Scale) {
    ctx.save();

    const animationOpacity = elseInOutAtTime(timeStart, 300);
    const animationOut = elseInOutAtTime(timeStart, 1000);
    const animationIn = elseInOutAtTime(timeStart + 1000, 1000);

    const animationLeave = 1 - elseInOutAtTime(timeEnd, 1000);

    ctx.globalAlpha = opacity * animationOpacity * animationLeave;

    ctx.translate(scale.x(position.x) - 50 * size, scale.y(position.y) - 50 * size);
    ctx.scale(size, size);

    // Eyes
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 5;
    ctx.lineCap = "square";
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.quadraticCurveTo(50, 50 + 50 * animationOut, 100, 50);
    ctx.quadraticCurveTo(50, 50 - 50 * animationOut, 0, 50);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(50, 30);
    ctx.quadraticCurveTo(50 + 10 * animationIn, 50, 50, 70);
    ctx.quadraticCurveTo(50 - 10 * animationIn, 50, 50, 30);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

type CatPosition = {
    isDone: boolean,
    position: Position,
    direction: Direction,
    state: "jumpIn" | "jumpOut" | "walk" | "hide",
}
export function getCatPosition(cat: Cat, timeStart: number, size: Size, boxes: Position[], map?: boolean[][]): CatPosition {
    // TODO: implement speed

    const step = (Date.now() - timeStart) / timeFrame;

    let state: CatPosition["state"] = step < 0 ? "jumpIn" : "walk";
    let position = cat.start as Position;
    let direction = cat.start.direction;

    for (let i = 0; i <= step - 1; i++) {
        position = getMovedPosition(position, direction);
        // is end of land
        if (isOut(position, size)) {
            state = "hide";
            break;
        }

        if (map && cat.color === blackCat)
            map[position.y - 1][position.x - 1] = true;

        if (isBox(position, boxes)) {
            state = "hide";
            break;
        }

        const change = cat.change.find(change => change.step === i + 1);
        if (change)
            direction = change.direction;
    }

    if (state !== "hide") {
        const positionAfter = getMovedPosition(position, direction);
        if (isOut(positionAfter, size)) {
            state = "jumpOut";
        }

        if (isBox(positionAfter, boxes)) {
            state = "jumpOut";
        }

        const scale = step - Math.floor(step);
        position = {
            x: position.x + (positionAfter.x - position.x) * scale,
            y: position.y + (positionAfter.y - position.y) * scale,
        };
    }

    return { isDone: state === "hide", position, direction, state };
}

export function getMovedPosition(position: Position, direction: Direction) {
    return {
        x: position.x + (direction === "right" ? 1 : direction === "left" ? -1 : 0),
        y: position.y + (direction === "down" ? 1 : direction === "up" ? -1 : 0),
    };
}

export function isOut(position: Position, size: Size) {
    return position.x < 1 || position.x > size.x || position.y < 1 || position.y > size.y;
}
export function isBox(position: Position, boxes: Position[]) {
    const box = boxes.find(box => box.x === position.x && box.y === position.y);
    return box !== undefined;
}