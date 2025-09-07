export const blackCat = "#000000";
const brownCat = "#654321";
const whiteCat = "#FFFFFF";
const orangeCat = "#FF4500";
const fawnCat = "#FFFDD0";
const creamCat = "#F5F5DC";

export default [
    /*
    // 1
    {
        size: { x: 5, y: 5 },
        start: { x: 1, y: 3 },
        end: { x: 5, y: 3 },
        boxes: [{ x: 3, y: 2 }],
        cats: [{
            color: blackCat,
            speed: 1,
            start: { x: 3, y: 6, direction: "up" },
            change: [],
        }],
    },
    // 2
    {
        size: { x: 5, y: 5 },
        start: { x: 1, y: 3 },
        end: { x: 5, y: 3 },
        boxes: [{ x: 2, y: 2 }, { x: 4, y: 4 }],
        cats: [{
            color: blackCat,
            speed: 1,
            start: { x: 2, y: 6, direction: "up" },
            change: [],
        }, {
            color: blackCat,
            speed: 1,
            start: { x: 4, y: 0, direction: "down" },
            change: [],
        }],
    },
    // 3
    {
        size: { x: 7, y: 5 },
        start: { x: 1, y: 3 },
        end: { x: 7, y: 3 },
        boxes: [{ x: 4, y: 2 }, { x: 4, y: 4 }],
        cats: [{
            color: blackCat,
            speed: 1,
            start: { x: 2, y: 6, direction: "up" },
            change: [{ step: 4, direction: "right" }],
        }, {
            color: blackCat,
            speed: 1,
            start: { x: 6, y: 0, direction: "down" },
            change: [{ step: 4, direction: "left" }],
        }],
    },
    // 4
    {
        size: { x: 8, y: 8 },
        start: { x: 1, y: 4 },
        end: { x: 5, y: 4 },
        boxes: [{ x: 4, y: 4 }],
        cats: [{
            color: blackCat,
            speed: 1,
            start: { x: 4, y: 4, direction: "up" },
            change: [
                { step: 1, direction: "right" },
                { step: 3, direction: "down" },
                { step: 6, direction: "left" },
                { step: 10, direction: "up" },
                { step: 15, direction: "right" },
                { step: 21, direction: "down" },
                { step: 28, direction: "left" },
            ],
        }],
    },
    */
    // 5
    {
        size: { x: 5, y: 5 },
        start: { x: 1, y: 3 },
        end: { x: 5, y: 3 },
        boxes: [],
        cats: [{
            color: brownCat,
            speed: 1,
            start: { x: 3, y: 6, direction: "up" },
            change: [],
        }],
    },
] as Level[];