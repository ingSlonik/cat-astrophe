import { arrows, button, scoreElement, textElement } from "./dom";
import { drawDirections, drawLevel, getCandy, getCatPosition, getMovedPosition, getNextNow, getTimeScale, isBox, isOut, setNewCatastrophe, setNewEnd, setupCanvas } from "./canvas";
import levels from "./levels";
import { meow, speakCatastrophe, speakDirection, speakStartGame, speakStop, speakWin } from "./audio/speak";
import { playMusic } from "./audio/sound";

let store: Store = {
    controls: {
        music: true,
        sound: true,
    },
    state: {
        type: "home",
        timeStart: Date.now()
    },
    score: {
        level: 0,
        catastrophes: 0,
    },
};

export function getStore() {
    return store;
}

export function handleControl(type: "music" | "sound") {
    const value = !store.controls[type];
    store.controls[type] = value;

    if (type === "music" && value)
        playMusic();

    if (type === "sound" && !value)
        speakStop();

    return value;
};

const directions: Direction[] = [];

export function handleDirection(direction: Direction) {
    if (store.state.type === "game") {
        speakDirection(direction);
        directions.push(direction);
    }
}

export function handleEnter() {
    playMusic();

    const { state: { type } } = store;

    switch (type) {
        case "home":
            changeState("cat");
            break;
        case "before":
            changeState("cat");
            break;
        case "cat":
        case "game":
            // nothing
            break;
        case "catastrophe":
            changeState("cat");
            break;
        case "end":
            changeState("home");
            break;
    }
}


function changeState(stateType: GameState["type"], map?: boolean[][]) {
    const level = levels[store.score.level];
    const position = store.state.type === "game" ? store.state.positionAfter : level.start;

    if (stateType === "home") {
        store = {
            ...store,
            state: { type: "home", timeStart: Date.now() },
            score: {
                level: 0,
                catastrophes: 0,
            },
        };
        textElement.innerHTML = `<h2>Cross the black cat's path and trigger a true Cat-astrophe!</h2>
<p><b>Your mission:</b> Get the candy! ${getCandy()}</p>
<p><b>Your obstacle:</b> One very unlucky black cat. 🐈‍⬛</p>
<p><i>Use the arrows (← ↑ → ↓) to guide me.</i></p>
<p><b>Good luck! You're gonna need it. 😉</b></p>`;
        button.innerText = "Begin the Madness!";
        textElement.className = button.className = "";
        arrows.className = "hide";

    } else if (stateType === "before") {
        store = {
            ...store,
            state: { type: "before", timeStart: Date.now() },
        };
        textElement.innerHTML = `<h2>Sweet Victory! ${getCandy()}</h2>
<p>You dodged disaster and secured the goods. You're a legend! 🥳</p>
<p>But don't get too comfortable, the next level is waiting...</p>`;
        button.innerText = "Bring it on! 💪";
        textElement.className = button.className = "";
        arrows.className = "hide";

    } else if (stateType === "cat") {
        store = {
            ...store,
            state: { type: stateType, timeStart: getNextNow() },
        };
        textElement.className = button.className = "hide";

        speakStop();
        // play meow for every cat in level
        level.cats.forEach((_, i) => setTimeout(meow, i * 1500 / level.cats.length));

    } else if (stateType === "game") {
        if (!map) throw new Error("map is undefined");

        store = {
            ...store,
            state: {
                type: "game",
                timeStart: Date.now(),
                positionBefore: level.start,
                positionAfter: level.start,
                map,
            }
        };

        // clear directions
        directions.splice(0, directions.length);
        textElement.className = button.className = "hide";
        arrows.className = "";

        setNewCatastrophe();
        speakStartGame();

    } else if (stateType === "catastrophe") {
        store = {
            ...store,
            state: { type: "catastrophe", position }
        };

        textElement.innerHTML = `<h2>CAT-ASTROPHE! 🙀</h2>
<p>You crossed the path! Now suffer the comically bad luck.</p>
<p>Was it the cat? Or were you just that clumsy? 🤔</p>`;
        button.innerText = "Try Again! 😠";
        textElement.className = button.className = "";
        arrows.className = "hide";

    } else if (stateType === "end") {
        store = {
            ...store,
            state: { type: "end", position },
        };

        textElement.innerHTML = `<h2>You Survived! 🏆</h2>
<p>You only triggered <b>${store.score.catastrophes} cat-astrophes!</b> Not bad... for you. 🤕</p>
<p>You navigated the feline chaos and beat the odds.<br />You're officially the cat's pajamas! 😼</p>
<p><b>Thanks for playing! Hope you had a blast. 💥</b></p>`;
        button.innerText = "Play Again?";
        textElement.className = button.className = "";
        arrows.className = "hide";
    }
}

let timeScate = 0;

function draw() {
    const { state, score } = store;

    const scale = getTimeScale();
    if (scale < timeScate) {
        // new time frame / MOVE

        const { cats, size, boxes, end } = levels[score.level];

        if (state.type === "cat") {
            const map = Array.from({ length: size.y }, () => new Array(size.x).fill(false));
            const isDone = cats.every(cat => getCatPosition(cat, state.timeStart, size, boxes, map).isDone);
            if (isDone)
                changeState("game", map);

            // TODO: meow(); when each cat is done

        } else if (state.type === "game") {
            const position = state.positionAfter;

            // WIN - next level
            if (position.x === end.x && position.y === end.y) {
                const newLevel = store.score.level + 1;
                if (newLevel >= levels.length) {
                    changeState("end");
                } else {
                    store.score.level++;
                    setNewEnd();
                    changeState("before");
                }

                speakWin();
            }

            // CAT-ASTROPHE
            if (state.map[position.y - 1][position.x - 1]) {
                store.score.catastrophes++;
                changeState("catastrophe");
                speakCatastrophe();
                return;
            }

            const direction = directions[0];
            directions.shift();

            state.positionBefore = state.positionAfter;
            const newPosition = getMovedPosition(state.positionAfter, direction);
            if (!isOut(newPosition, size) && !isBox(newPosition, boxes))
                state.positionAfter = newPosition;
        }
    }
    timeScate = scale;

    const level = levels[score.level];

    scoreElement.innerText = `Level: ${score.level + 1} / ${levels.length}\nCat-astrophes: ${score.catastrophes}`;

    setupCanvas();
    drawLevel(level, state);
    if (state.type === "game")
        drawDirections(directions, level.size);
}

function animationLoop() {
    draw();
    requestAnimationFrame(animationLoop);
}


// ---------------------------------  Main  ------------------------------------

setNewEnd();
changeState("home");
animationLoop();