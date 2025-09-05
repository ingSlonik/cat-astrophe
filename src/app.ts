import { directions, button, scoreElement, textElement } from "./dom";
import { drawLevel, getCatPosition, getMovedPosition, getTimeScale, isBox, isOut, setupCanvas } from "./canvas";
import levels from "./levels";

let store: Store = {
    state: { type: "home", timeStart: Date.now() },
    score: {
        level: 0,
        catastrophes: 0,
    },
};

export function handleEnter() {
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

button.onclick = handleEnter;

function changeState(stateType: GameState["type"], map?: boolean[][]) {
    const level = levels[store.score.level];
    const position = store.state.type === "game" ? store.state.positionAfter : level.start;

    if (stateType === "home") {
        store = {
            state: { type: "home", timeStart: Date.now() },
            score: {
                level: 0,
                catastrophes: 0,
            },
        };
        textElement.innerText = "Cross the black cat's path and trigger a true Cat-astrophe!\n\nUse the arrow keys or tap the edges of the screen to move.\n\nGood luck!";
        button.innerText = "Start Game";
        textElement.className = button.className = "";

    } else if (stateType === "before") {
        store = {
            ...store,
            state: { type: "before", timeStart: Date.now() },
        };
        textElement.innerText = "Brace Yourself!\n\nThe cats are on the prowl. Get ready for the fur-midable challenge ahead!";
        button.innerText = "Start Level";
        textElement.className = button.className = "";

    } else if (stateType === "cat") {
        store = {
            ...store,
            state: { type: stateType, timeStart: Date.now() },
        };
        textElement.className = button.className = "hide";

    } else if (stateType === "game") {
        if (!map) throw new Error("map is undefined");

        store = {
            ...store,
            state: {
                type: "game",
                positionBefore: level.start,
                positionAfter: level.start,
                map,
            }
        };

        // clear directions
        directions.splice(0, directions.length);
        textElement.className = button.className = "hide";

    } else if (stateType === "catastrophe") {
        store = {
            ...store,
            state: { type: "catastrophe", position }
        };

        textElement.innerText = "You crossed the black cat's path! Superstition is real, and now you've got 7 years of bad luck... or at least until you restart the level.";
        button.innerText = "Try Again";
        textElement.className = button.className = "";

    } else if (stateType === "end") {
        store = {
            ...store,
            state: { type: "end", position },
        };

        textElement.innerText = `You Survived the Cat-astrophe!\n\nYou only experienced ${store.score.catastrophes} Cat-astrophes!\n\nYou've successfully navigated the feline chaos and finished the game. You're the cat's whiskers!\nThanks for playing.`;
        button.innerText = "Play Again";
        textElement.className = button.className = "";
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

        } else if (state.type === "game") {
            const position = state.positionAfter;

            // WIN - next level
            if (position.x === end.x && position.y === end.y) {
                const newLevel = store.score.level + 1;
                if (newLevel >= levels.length) {
                    changeState("end");
                } else {
                    store.score.level++;
                    changeState("before");
                }
            }

            // CAT-ASTROPHE
            if (state.map[position.y - 1][position.x - 1]) {
                store.score.catastrophes++;
                changeState("catastrophe");
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

    scoreElement.innerText = `Level: ${score.level + 1}, Cat-astrophes: ${score.catastrophes}`;

    setupCanvas();
    drawLevel(levels[score.level], state);
}

function animationLoop() {
    draw();
    requestAnimationFrame(animationLoop);
}


// ---------------------------------  Main  ------------------------------------

changeState("home");
animationLoop();