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

    if (state.type === "home" || state.type === "before") {
        drawPlayer(start, start, scale);
    } else if (state.type === "cat") {
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

export function getTimeScale(frame = timeFrame) {
    const rest = Date.now() % frame;
    return rest / frame;
}

function getTimePos(positionFrom: number, positionTo: number) {
    const timeScale = getTimeScale();
    return positionFrom + (positionTo - positionFrom) * timeScale;
}

function getTimePosition(positionFrom: Position, positionTo: Position): Position {
    return {
        x: getTimePos(positionFrom.x, positionTo.x),
        y: getTimePos(positionFrom.y, positionTo.y),
    };
}




const landColor = 'gray';
const gridColor = 'rgba(255, 255, 255, 0.2)';

function drawLand(size: Size, scale: Scale) {

    // Draw land
    ctx.fillStyle = landColor;
    ctx.fillRect(scale.x(1), scale.y(1), scale.x(size.x + 1) - scale.x(1), scale.y(size.y + 1) - scale.y(1));

    // Draw grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    // Vertical lines
    for (let i = 1; i <= size.x; i++) {
        const lineX = scale.x(i);
        ctx.beginPath();
        ctx.moveTo(lineX, scale.y(1));
        ctx.lineTo(lineX, scale.y(size.y + 1));
        ctx.stroke();
    }

    // Horizontal lines
    for (let i = 1; i <= size.y; i++) {
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