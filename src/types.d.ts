type Store = {
    state: GameState,
    score: Score,
}

type Score = {
    level: number,
    catastrophes: number,
};

type GameState =
    | { type: "home", timeStart: number }
    | { type: "before", timeStart: number }
    | { type: "cat", timeStart: number }
    | { type: "game", positionBefore: Position, positionAfter: Position, map: boolean[][] }
    | { type: "catastrophe", position: Position }
    | { type: "end", position: Position };

type Position = {
    x: number,
    y: number,
};

type Direction = "up" | "down" | "left" | "right";

type Size = Position;

type Cat = {
    color: string,
    speed: number,
    start: Position & { direction: Direction },
    change: { step: number, direction: Direction }[],
};

type Level = {
    size: Size,
    start: Position,
    end: Position,
    boxes: Position[],
    cats: Cat[],
};
