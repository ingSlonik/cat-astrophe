import { getRandom } from "./common";
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
    const dpr = window.devicePixelRatio || 1;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    canvas.width = screenWidth * dpr;
    canvas.height = screenHeight * dpr;

    canvas.style.width = `${screenWidth}px`;
    canvas.style.height = `${screenHeight}px`;

    ctx.scale(dpr, dpr);
}

export function drawLevel(level: Level, state: GameState) {
    const { size, start, end, boxes, cats } = level;

    const scale = getScale(size);

    drawLand(size, scale);
    drawEnd(end, scale);
    boxes.forEach((box, i) => drawBox(box, scale, i));

    if (state.type === "home") {
        drawEyes({ x: size.x / 2 + 1, y: 1 }, 2, state.timeStart + 4000, 9999999999999, 1, scale);
        drawPlayer(start, start, scale);
        drawNotMove(start, scale);
    } else if (state.type === "before") {
        drawEyes({ x: size.x / 2 + 1, y: 1 }, 2, state.timeStart, 9999999999999, 1, scale);
        drawPlayer(start, start, scale);
        drawNotMove(start, scale);
    } else if (state.type === "cat") {
        drawEyes({ x: size.x / 2 + 1, y: 1 }, 2, 0, state.timeStart, 1, scale);
        drawPlayer(start, start, scale);
        drawNotMove(start, scale);
        // draw cats
        if (state.timeStart <= Date.now())
            cats.forEach(cat => drawCat(cat, state.timeStart, size, boxes, scale));
    } else if (state.type === "game") {
        drawPlayer(state.positionBefore, state.positionAfter, scale);
        drawNotMove(start, scale, state.timeStart);
    } else if (state.type === "catastrophe") {
        drawPlayer(state.position, state.position, scale);
        drawCatastrophe(state.position, scale);
    } else {
        drawPlayer(state.position, state.position, scale);
    }
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

export function getNextNow(speed = 1) {
    const now = Date.now();
    const frame = Math.floor(now / timeFrame / speed);
    return (frame + 1) * timeFrame * speed;
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
function sinInOut(t: number) {
    return 0.5 * (1 - Math.sin(Math.PI * t * 2));
}
function easeOut(t: number) {
    if (t < 0) return 1;
    if (t > 1) return 0;
    return -4.375 * (t ** 2) + 3.375 * t + 1;
}
function easeIn(t: number) {
    if (t < 0) return 0;
    if (t > 1) return 1;
    return -4.375 * (t ** 2) + 5.375 * t;
}

function elseInOutAtTime(time: number, duration: number, now = Date.now()) {
    if (now < time) return 0;
    if (now > time + duration) return 1;
    return easeInOut((now - time) / duration / 2);
}

const landColor = '#9a7d5f';
const grassColor = "#117c13";
const grassTopColor = "#138510";
const gridColor = 'rgba(255, 255, 255, 0.15)';

const eyesCount = 7;
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
    const landRound = scale.squareSize * 0.4;

    // ctx.fillStyle = landColor;
    // ctx.fillRect(landX, landY, landWidth, landHeight);


    // Draw grass
    const animationLand3 = easeInOut(getTimeScale(0.05, 0));
    ctx.fillStyle = "#696f6f55";
    ctx.beginPath();
    ctx.roundRect(landX + 30 + animationLand3 * 5, landY + 30 + animationLand3 * 5, landWidth, landHeight, landRound);
    ctx.fill();

    const animationLand2 = easeInOut(getTimeScale(0.05, 0.2));
    ctx.fillStyle = "#543b0e";
    ctx.beginPath();
    ctx.roundRect(landX + 20 + animationLand2 * 3, landY + 20 + animationLand2 * 3, landWidth, landHeight, landRound);
    ctx.fill();

    const animationLand1 = easeInOut(getTimeScale(0.05, 0.4));
    ctx.fillStyle = "#674107";
    ctx.beginPath();
    ctx.roundRect(landX + 10 + animationLand1 * 2, landY + 10 + animationLand1 * 2, landWidth, landHeight, landRound);
    ctx.fill();

    ctx.fillStyle = grassColor;
    ctx.beginPath();
    ctx.roundRect(landX, landY, landWidth, landHeight, landRound);
    ctx.fill();

    ctx.save();

    ctx.beginPath();
    ctx.roundRect(landX, landY, landWidth, landHeight, landRound);
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

export function drawDirections(directions: Direction[], size: Size) {
    const dirs = directions.map(d => d === "up" ? "↑" : d === "down" ? "↓" : d === "left" ? "←" : "→")

    const scale = getScale(size);

    const x = scale.x(1);
    const y = scale.y(size.y + 1.1);

    ctx.font = `18px sans-serif`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#AAA';
    ctx.fillText(dirs.join(' '), x, y);
}

function drawNotMove(position: Position, scale: Scale, timeHide?: number) {
    const x = scale.x(position.x + 0.7);
    const y = scale.y(position.y + 0.7);

    const animation = easeInOut(getTimeScale(0.5)) - 0.5;

    ctx.save();

    if (timeHide)
        ctx.globalAlpha = 1 - elseInOutAtTime(timeHide, 300);

    ctx.font = `${scale.squareSize * 0.4}px sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText("🚧", x, y + animation * scale.squareSize * 0.02);

    ctx.restore();
}

const candies = ["🍬", "🍭", "🍮", "🍫", "🍯", "🎂", "🍰", "🍩", "🍪", "🧁", "🥧"];
let candy = getRandom(candies);
export function getCandy() {
    return candy;
}
export function setNewEnd() {
    return candy = getRandom(candies);
}

function drawEnd(position: Position, scale: Scale) {
    const x = scale.x(position.x + 0.5);
    const y = scale.y(position.y + 0.7);

    const animation = easeInOut(getTimeScale(0.5)) - 0.5;

    ctx.font = `${Math.floor(scale.squareSize * 0.5)}px sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(candy, x, y + animation * scale.squareSize * 0.1);
    /*
    const primaryColor = '#FFD700';
    const secondaryColor = '#DC143C';

    ctx.beginPath();
    ctx.fillStyle = primaryColor;
    ctx.roundRect(x - candyWidth / 2, y - candyHeight / 2, candyWidth, candyHeight, 15);
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = secondaryColor;
    ctx.lineCap = "round";
    ctx.lineWidth = candySide * 0.4;
    ctx.moveTo(x - candyWidth / 3, y + candyHeight / 2);
    ctx.lineTo(x + candyWidth / 3, y - candyHeight / 2);
    ctx.stroke();

    // Left side
    ctx.beginPath();
    ctx.fillStyle = secondaryColor;
    ctx.moveTo(x - candyWidth / 2, y);
    ctx.lineTo(x - candyWidth / 2 - candySide, y - candyHeight / 2);
    ctx.lineTo(x - candyWidth / 2 - candySide * 0.8, y);
    ctx.lineTo(x - candyWidth / 2 - candySide, y + candyHeight / 2);
    ctx.closePath();
    ctx.fill();

    // Right side
    ctx.beginPath();
    ctx.fillStyle = secondaryColor;
    ctx.moveTo(x + candyWidth / 2, y);
    ctx.lineTo(x + candyWidth / 2 + candySide, y - candyHeight / 2);
    ctx.lineTo(x + candyWidth / 2 + candySide * 0.8, y);
    ctx.lineTo(x + candyWidth / 2 + candySide, y + candyHeight / 2);
    ctx.closePath();
    ctx.fill();
    */
}

const boxesEyes: { timeShow: number, opacity: number, size: number }[] = [];
/**
 * 📦 🗃️ 🗳️ 🎁
 */
function drawBox(position: Position, scale: Scale, index = 0) {
    const x = scale.x(position.x + 0.1);
    const y = scale.y(position.y + 0.2);
    const width = scale.squareSize * 0.8;
    const height = scale.squareSize * 0.8;

    const boxDepth = height * 0.6; // Hloubka krabice
    const flapOffset = 10; // Jak moc se klopa "zvedá"

    const animation = easeInOut(getTimeScale(0.5)) - 0.5;
    const animationEyes = easeInOut(getTimeScale(0.03));

    // Bottom
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.rect(x, y + flapOffset, width, boxDepth);
    ctx.fill();

    ctx.fillStyle = '#C2B280';
    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x, y + flapOffset + boxDepth);
    ctx.lineTo(x, y + flapOffset + boxDepth + height * 0.2);
    ctx.lineTo(x + width, y + flapOffset + boxDepth + height * 0.2);
    ctx.lineTo(x + width, y + flapOffset + boxDepth);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y + flapOffset);
    ctx.lineTo(x, y + flapOffset - height * 0.2);
    ctx.lineTo(x + width, y + flapOffset - height * 0.2);
    ctx.lineTo(x + width, y + flapOffset);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y + flapOffset);
    ctx.lineTo(x, y + flapOffset + boxDepth);
    ctx.lineTo(x - boxDepth * 0.2 + animation * boxDepth * 0.1, y + flapOffset + boxDepth * 1.2);
    ctx.lineTo(x - boxDepth * 0.2 + animation * boxDepth * 0.1, y + flapOffset - height * 0.2 + boxDepth * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + width, y + flapOffset);
    ctx.lineTo(x + width, y + flapOffset + boxDepth);
    ctx.lineTo(x + width + boxDepth * 0.2 - animation * boxDepth * 0.1, y + flapOffset + boxDepth * 1.2);
    ctx.lineTo(x + width + boxDepth * 0.2 - animation * boxDepth * 0.1, y + flapOffset - height * 0.2 + boxDepth * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (!boxesEyes[index])
        boxesEyes[index] = {
            timeShow: Math.random() * 5000 + 5000,
            opacity: Math.random() * 0.6 + 0.3,
            size: Math.random() * 0.2 + 0.05,
        };

    const eyes = boxesEyes[index];

    drawEyes(
        { x: position.x + 0.5, y: position.y + 0.5 },
        scale.squareSize / 100 * eyes.size,
        eyes.timeShow, 10_000,
        eyes.opacity,
        scale,
        animationEyes * 10_000
    );
}

let playerDirection = 1;
function drawPlayer(positionBefore: Position, positionAfter: Position, scale: Scale) {
    const position = getTimePosition(positionBefore, positionAfter);

    if (positionBefore.x < positionAfter.x)
        playerDirection = 1;
    else if (positionBefore.x > positionAfter.x)
        playerDirection = 3;
    else if (positionBefore.y < positionAfter.y)
        playerDirection = 2;
    else if (positionBefore.y > positionAfter.y)
        playerDirection = 0;

    const isMoving = positionBefore.x !== positionAfter.x || positionBefore.y !== positionAfter.y;

    const animationBoots = sinInOut(getTimeScale(1)) - 0.5;
    const animationSmoke = sinInOut(getTimeScale(0.2)) - 0.5;


    const hatColor = '#5C4033';
    const cigarColor = '#A0522D';
    const cigarTipColor = '#FF0000';
    const outlineColor = '#000000';

    const s = scale.squareSize / 2;
    const lineWidth = s * 0.02;

    ctx.save();

    ctx.translate(scale.x(position.x + 0.5), scale.y(position.y + 0.5));

    ctx.rotate(playerDirection * Math.PI / 2);

    // Boots
    if (isMoving) {
        drawBoot(scale, s * -0.1, animationBoots);
        drawBoot(scale, -s * 0.6, -animationBoots);
    }

    // Cigar
    const cigarLength = s * 0.3;
    const cigarWidth = s * 0.1;
    const cigarAngle = -Math.PI / 3; // Úhel doutníku

    const cigarStartX = s * 0.22;
    const cigarStartY = s * -0.37;

    ctx.save(); // Uložit aktuální stav transformace
    ctx.translate(cigarStartX, cigarStartY); // Přesunout se na počáteční bod
    ctx.rotate(cigarAngle); // Otočit o úhel

    ctx.strokeStyle = outlineColor;
    ctx.beginPath();
    ctx.roundRect(0, -cigarWidth / 2, cigarLength, cigarWidth, s * 0.1);
    ctx.fillStyle = cigarColor;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cigarLength, 0, cigarWidth / 2, -Math.PI / 2, Math.PI / 2, false);
    ctx.fillStyle = cigarTipColor;
    ctx.fill();
    ctx.stroke();

    ctx.restore();

    // Hat
    const hatRadius = s * 0.6;
    ctx.strokeStyle = outlineColor;
    ctx.fillStyle = hatColor;
    ctx.lineWidth = lineWidth;

    ctx.beginPath();
    ctx.arc(0, 0, hatRadius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, hatRadius * 0.55, 0, Math.PI * 2, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(0, 0, hatRadius * 0.2, hatRadius * 0.37, 0, 0, 2 * Math.PI, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(hatRadius * 0.4, hatRadius * 0.1);
    ctx.quadraticCurveTo(
        hatRadius * 0.25, hatRadius * -0.1,
        hatRadius * 0.25, hatRadius * -0.35,
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(hatRadius * -0.4, hatRadius * 0.1);
    ctx.quadraticCurveTo(
        hatRadius * -0.25, hatRadius * -0.1,
        hatRadius * -0.25, hatRadius * -0.35,
    );
    ctx.stroke();


    // Smoke
    ctx.lineWidth = s * 0.1;
    ctx.lineCap = "round";

    const grad = ctx.createLinearGradient(s * 0.4, s * -0.6, s * 0.4, s * -0.3);
    grad.addColorStop(0, "rgba(180, 180, 180, 0.9)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0.1)");

    ctx.strokeStyle = grad;

    ctx.beginPath();
    ctx.moveTo(s * 0.4, s * -0.56);
    ctx.bezierCurveTo(
        s * 0.4 + animationSmoke * s * 0.18, s * -0.5,
        s * 0.4 - animationSmoke * s * 0.18, s * -0.4,
        s * 0.4, s * -0.3
    );
    ctx.stroke();


    ctx.restore();


    /*
    const x = scale.x(position.x + 0.5);
    const headY = scale.y(position.y);
    const headRadius = scale.squareSize * 0.15;

    const neckY = scale.y(position.y + 0.2);
    const elbowY = scale.y(position.y + 0.3);
    const elbowXR = scale.squareSize * 0.3;
    const torsoY = scale.y(position.y + 0.5);
    const torsoX = scale.x(position.x + 0.5 + animation * 0.1);
    const kneesY = scale.y(position.y + 0.7);
    const feetY = scale.y(position.y + 0.8);

    const headColor = '#f1c27d';
    const bodyColor = '#444';

    ctx.fillStyle = headColor;
    ctx.strokeStyle = headColor;
    ctx.lineWidth = headRadius * 0.6;

    ctx.beginPath();
    ctx.arc(x, headY, headRadius, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
    ctx.fill();

    // Neck
    ctx.beginPath();
    ctx.moveTo(x, headY);
    ctx.lineTo(x, neckY);
    ctx.stroke();

    ctx.strokeStyle = bodyColor;

    // Torso
    ctx.beginPath();
    ctx.moveTo(x, neckY);
    ctx.quadraticCurveTo(x, (neckY + torsoY) / 2, torsoX, torsoY);
    ctx.stroke();

    // Left hand
    ctx.beginPath();
    ctx.moveTo(x, neckY);
    ctx.quadraticCurveTo(x - elbowXR, elbowY, x - elbowXR * 0.4, torsoY);
    ctx.stroke();

    // Right hand
    ctx.beginPath();
    ctx.moveTo(x, neckY);
    ctx.quadraticCurveTo(x + elbowXR, elbowY, x + elbowXR * 0.4, torsoY);
    ctx.stroke();

    // Left leg
    ctx.beginPath();
    ctx.moveTo(torsoX, torsoY);
    ctx.quadraticCurveTo(x - elbowXR * 0.7, kneesY, x - elbowXR * 0.7, feetY);
    ctx.stroke();

    // Right leg
    ctx.beginPath();
    ctx.moveTo(torsoX, torsoY);
    ctx.quadraticCurveTo(x + elbowXR * 0.7, kneesY, x + elbowXR * 0.7, feetY);
    ctx.stroke();
    */
}

function drawBoot(scale: Scale, translateX = 0, animation = 0) {

    const s = scale.squareSize / 2;
    const lineWidth = s * 0.02;

    const outlineColor = '#000000';
    const bootColor = '#D2B48C';
    const spurColor = '#EEE';
    const bootCircleColor = "#999";

    ctx.save();

    ctx.translate(translateX, animation * s * 0.9 + s * -0.4);

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = outlineColor;
    ctx.fillStyle = bootColor;
    ctx.beginPath();
    ctx.roundRect(s * 0.2, 0, s * 0.3, s * 0.7, s * 0.2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = spurColor;
    ctx.beginPath();
    ctx.roundRect(s * 0.25, s * 0.05, s * 0.2, s * 0.6, s * 0.2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(s * 0.3, s * 0.18);
    ctx.lineTo(s * 0.4, s * 0.18);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(s * 0.3, s * 0.22);
    ctx.lineTo(s * 0.4, s * 0.22);
    ctx.stroke();

    ctx.fillStyle = bootCircleColor;
    ctx.beginPath();
    ctx.arc(s * 0.35, s * 0.72, s * 0.07, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

/**
 * 🐈 🐈‍⬛ 🐱 😺...(faces)
 */
function drawCat(cat: Cat, timeStart: number, size: Size, boxes: Position[], scale: Scale) {
    const { isDone, position, direction, state } = getCatPosition(cat, timeStart, size, boxes);

    if (isDone)
        return;

    ctx.save();

    const animation = easeInOut(getTimeScale(1.5)) - 0.5;

    const s = scale.squareSize;
    const x = 0;

    // Move to position
    ctx.translate(scale.x(position.x + 0.5), scale.y(position.y + 0.5));

    // Jump
    let animationJump = 1;
    if (state === "jumpIn")
        animationJump = easeIn(getTimeScale(1));
    if (state === "jumpOut")
        animationJump = easeOut(getTimeScale(1));
    ctx.scale(animationJump, animationJump);

    // Rotate
    switch (direction) {
        case "down": ctx.rotate(0); break;
        case "up": ctx.rotate(Math.PI); break;
        case "right": ctx.rotate(-Math.PI / 2); break;
        case "left": ctx.rotate(Math.PI / 2); break;
    }

    // Y shift
    ctx.translate(0, - s / 2);

    const tailTopY = s * 0.1;
    const tailCenterY = s * 0.2;
    const assY = s * 0.4;
    const bodyY = s * 0.5;
    const headY = s * 0.7;
    const r = s * 0.15;

    ctx.fillStyle = cat.color;
    ctx.strokeStyle = cat.color;

    // Paws
    ctx.lineWidth = r * 0.6;
    ctx.lineCap = "round";

    if (state === "walk") {
        ctx.beginPath();
        ctx.moveTo(x - r * 0.3, headY);
        ctx.lineTo(x - r * 0.3, headY + r * (0.7 + animation * 0.5));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + r * 0.3, headY);
        ctx.lineTo(x + r * 0.3, headY + r * (0.7 - animation * 0.5));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x - r * 0.3, assY);
        ctx.lineTo(x - r * 0.3, assY - r * (0.3 + animation * 0.5));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + r * 0.3, assY);
        ctx.lineTo(x + r * 0.3, assY - r * (0.3 - animation * 0.5));
        ctx.stroke();
    } else {
        // Jump
        ctx.beginPath();
        ctx.moveTo(x - r * 0.3, headY);
        ctx.lineTo(x - r * 0.3, headY + r * (0.7 + 0.5));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + r * 0.3, headY);
        ctx.lineTo(x + r * 0.3, headY + r * (0.7 + 0.5));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x - r * 0.3, assY);
        ctx.lineTo(x - r * 0.3, assY - r * (0.3 + 0.5));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + r * 0.3, assY);
        ctx.lineTo(x + r * 0.3, assY - r * (0.3 + 0.5));
        ctx.stroke();
    }

    // Cat body
    ctx.lineWidth = r * 0.2;

    ctx.beginPath();
    ctx.moveTo(x, assY);
    ctx.quadraticCurveTo(x - animation * r * 0.4, tailCenterY, x, tailTopY);
    ctx.stroke();

    ctx.lineWidth = r * 1.4;

    ctx.beginPath();
    ctx.moveTo(x, assY);
    ctx.quadraticCurveTo(x + animation * r * 0.2, bodyY, x, headY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, headY, r, 0, 2 * Math.PI);
    ctx.fill();

    // Ears
    const grad = ctx.createLinearGradient(x - r * 0.1, headY + r * 0.1, x - r * 0.1, headY - r * 0.4);
    if (cat.color.includes("FF") || cat.color.includes("F5")) {
        grad.addColorStop(0, "rgba(0, 0, 0, 0.4)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0.9)");
    } else {
        grad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0.9)");
    }
    ctx.strokeStyle = grad;
    ctx.lineWidth = s * 0.01;

    ctx.beginPath();
    ctx.moveTo(x - r * 0.1, headY + r * 0.1);
    ctx.lineTo(x - r * 0.5, headY - r * 0.4);
    ctx.lineTo(x - r * 0.8, headY + r * 0.1);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + r * 0.1, headY + r * 0.1);
    ctx.lineTo(x + r * 0.5, headY - r * 0.4);
    ctx.lineTo(x + r * 0.8, headY + r * 0.1);
    ctx.stroke();

    ctx.restore();
}

const catastrophes = ["❗", "⚠️", "❌", "🚫", "🛑"];
let catastrophe = getRandom(candies);
export function setNewCatastrophe() {
    return catastrophe = getRandom(catastrophes);
}

function drawCatastrophe(position: Position, scale: Scale) {
    const x = scale.x(position.x + 0.5);
    const y = scale.y(position.y + 0.5);

    const animation = easeInOut(getTimeScale(0.5)) - 0.5;

    ctx.font = `${scale.squareSize * 0.8}px sans - serif`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(catastrophe, x, y + animation * scale.squareSize * 0.1);
}

function drawEyes(position: Position, size: number, timeStart: number, timeEnd: number, opacity: number, scale: Scale, time?: number) {
    ctx.save();
    ctx.translate(-60 * size, 0);
    drawEye(position, size, timeStart, timeEnd, opacity, scale, time);
    ctx.translate(120 * size, 0);
    drawEye(position, size, timeStart, timeEnd, opacity, scale, time);
    ctx.restore();
}
function drawEye(position: Position, size: number, timeStart: number, timeEnd: number, opacity: number, scale: Scale, time?: number) {
    ctx.save();

    const animationOpacity = elseInOutAtTime(timeStart, 300, time);
    const animationOut = elseInOutAtTime(timeStart, 1000, time);
    const animationIn = elseInOutAtTime(timeStart + 1000, 1000, time);

    const animationLeave = 1 - elseInOutAtTime(timeEnd, 1000, time);

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

    let state: CatPosition["state"] = step < 1 ? "jumpIn" : "walk";
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