export const blackCat = "#000000";
const brownCat = "#654321";
const orangeCat = "#FF4500";
const fawnCat = "#FFFDD0";
const creamCat = "#F5F5DC";
const whiteCat = "#FFFFFF";

export default [
    // 1
    {
        name: "Introductions",
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
        name: "Two cats",
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
        name: "First cat turn",
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
        name: "Cat spiral",
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
    // 5
    {
        name: "Brown cat",
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
    // 6
    {
        name: "Rainbow",
        size: { x: 11, y: 6 },
        start: { x: 1, y: 3 },
        end: { x: 11, y: 4 },
        boxes: [
            { x: 1, y: 1 },
            { x: 3, y: 2 },
            { x: 5, y: 3 },
            { x: 7, y: 4 },
            { x: 9, y: 5 },
            { x: 11, y: 6 },
        ],
        cats: [{
            color: creamCat,
            speed: 1,
            start: { x: 1, y: 7, direction: "up" },
            change: [],
        }, {
            color: fawnCat,
            speed: 1,
            start: { x: 3, y: 7, direction: "up" },
            change: [],
        }, {
            color: orangeCat,
            speed: 1,
            start: { x: 5, y: 7, direction: "up" },
            change: [],
        }, {
            color: brownCat,
            speed: 1,
            start: { x: 7, y: 7, direction: "up" },
            change: [],
        }, {
            color: blackCat,
            speed: 1,
            start: { x: 9, y: 7, direction: "up" },
            change: [],
        },

        {
            color: creamCat,
            speed: 1,
            start: { x: 3, y: 2, direction: "up" },
            change: [{ step: 1, direction: "right" }],
        }, {
            color: fawnCat,
            speed: 1,
            start: { x: 5, y: 3, direction: "up" },
            change: [{ step: 1, direction: "right" }],
        }, {
            color: blackCat,
            speed: 1,
            start: { x: 7, y: 4, direction: "up" },
            change: [{ step: 1, direction: "right" }],
        }, {
            color: orangeCat,
            speed: 1,
            start: { x: 9, y: 5, direction: "up" },
            change: [{ step: 1, direction: "right" }],
        }, {
            color: brownCat,
            speed: 1,
            start: { x: 11, y: 6, direction: "up" },
            change: [{ step: 1, direction: "right" }],
        }],
    },
    // 7
    {
        name: "Cats of all colors",
        size: { x: 8, y: 8 },
        start: { x: 1, y: 4 },
        end: { x: 8, y: 4 },
        boxes: [],
        cats: [{
            color: blackCat,
            speed: 1,
            start: { x: 2, y: 0, direction: "down" },
            change: [{ step: 7, direction: "right" }, { step: 9, direction: "up" }],
        }, {
            color: blackCat,
            speed: 1,
            start: { x: 9, y: 5, direction: "left" },
            change: [{ step: 3, direction: "down" }],
        }, {
            color: blackCat,
            speed: 1,
            start: { x: 9, y: 5, direction: "left" },
            change: [{ step: 3, direction: "down" }],
        }, {
            color: brownCat,
            speed: 1,
            start: { x: 0, y: 3, direction: "right" },
            change: [{ step: 4, direction: "down" }],
        }, {
            color: brownCat,
            speed: 1,
            start: { x: 5, y: 9, direction: "up" },
            change: [{ step: 6, direction: "left" }],
        }, {
            color: orangeCat,
            speed: 1,
            start: { x: 6, y: 0, direction: "down" },
            change: [{ step: 6, direction: "left" }],
        }, {
            color: fawnCat,
            speed: 1,
            start: { x: 0, y: 5, direction: "right" },
            change: [{ step: 6, direction: "up" }],
        }, {
            color: creamCat,
            speed: 1,
            start: { x: 9, y: 7, direction: "left" },
            change: [{ step: 6, direction: "up" }, { step: 10, direction: "right" }],
        }],
    },
    // 8
    {
        name: "Box array big",
        size: { x: 11, y: 11 },
        start: { x: 1, y: 6 },
        end: { x: 11, y: 6 },
        boxes: [
            { x: 1, y: 1 }, { x: 1, y: 3 }, { x: 1, y: 5 }, { x: 1, y: 7 },
            { x: 3, y: 1 }, { x: 3, y: 3 }, { x: 3, y: 5 }, { x: 3, y: 7 }, { x: 3, y: 9 },
            { x: 5, y: 1 }, { x: 5, y: 3 }, { x: 5, y: 5 }, { x: 5, y: 7 }, { x: 5, y: 9 }, { x: 5, y: 11 },
            { x: 7, y: 1 }, { x: 7, y: 3 }, { x: 7, y: 5 }, { x: 7, y: 7 }, { x: 7, y: 9 }, { x: 7, y: 11 },
            { x: 9, y: 3 }, { x: 9, y: 5 }, { x: 9, y: 7 }, { x: 9, y: 9 }, { x: 9, y: 11 },
            { x: 11, y: 5 }, { x: 11, y: 7 }, { x: 11, y: 9 }, { x: 11, y: 11 },
        ],
        cats: [
            { color: blackCat, speed: 1, start: { x: 5, y: 7, direction: "left" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 3, y: 7, direction: "left" }, change: [] },

            { color: blackCat, speed: 1, start: { x: 3, y: 9, direction: "right" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 5, y: 9, direction: "right" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 7, y: 9, direction: "up" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 7, y: 7, direction: "up" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 7, y: 5, direction: "left" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 5, y: 5, direction: "left" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 3, y: 5, direction: "left" }, change: [] },

            { color: blackCat, speed: 1, start: { x: 7, y: 3, direction: "right" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 9, y: 3, direction: "down" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 9, y: 5, direction: "down" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 9, y: 7, direction: "down" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 9, y: 9, direction: "down" }, change: [] },

            { color: blackCat, speed: 1, start: { x: 1, y: 1, direction: "right" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 3, y: 1, direction: "right" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 5, y: 1, direction: "down" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 5, y: 3, direction: "left" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 3, y: 3, direction: "left" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 1, y: 3, direction: "up" }, change: [] },
        ],
    },
    // 9
    {
        name: "Box array small",
        size: { x: 9, y: 9 },
        start: { x: 1, y: 5 },
        end: { x: 9, y: 5 },
        boxes: [
            { x: 2, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 6 }, { x: 2, y: 8 },
            { x: 4, y: 2 }, { x: 4, y: 4 }, { x: 4, y: 6 }, { x: 4, y: 8 },
            { x: 6, y: 2 }, { x: 6, y: 4 }, { x: 6, y: 6 }, { x: 6, y: 8 },
            { x: 8, y: 2 }, { x: 8, y: 4 }, { x: 8, y: 6 }, { x: 8, y: 8 },
        ],
        cats: [
            { color: blackCat, speed: 1, start: { x: 2, y: 4, direction: "left" }, change: [] },

            { color: blackCat, speed: 1, start: { x: 2, y: 2, direction: "right" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 6, y: 2, direction: "left" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 4, y: 2, direction: "down" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 4, y: 4, direction: "down" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 4, y: 6, direction: "left" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 2, y: 6, direction: "left" }, change: [] },

            { color: blackCat, speed: 1, start: { x: 8, y: 6, direction: "left" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 6, y: 6, direction: "up" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 6, y: 4, direction: "right" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 8, y: 4, direction: "up" }, change: [] },
            { color: blackCat, speed: 1, start: { x: 8, y: 2, direction: "right" }, change: [] },

            { color: blackCat, speed: 1, start: { x: 4, y: 8, direction: "right" }, change: [] },
            { color: brownCat, speed: 1, start: { x: 2, y: 8, direction: "right" }, change: [] },
            { color: orangeCat, speed: 1, start: { x: 6, y: 8, direction: "right" }, change: [] },

            { color: fawnCat, speed: 1, start: { x: 2, y: 6, direction: "up" }, change: [] },
            { color: brownCat, speed: 1, start: { x: 2, y: 4, direction: "up" }, change: [] },
            { color: creamCat, speed: 1, start: { x: 8, y: 4, direction: "down" }, change: [] },
            { color: brownCat, speed: 1, start: { x: 6, y: 6, direction: "down" }, change: [] },
        ],
    },
    // 10
    {
        name: "Confused",
        size: { x: 11, y: 9 },
        start: { x: 1, y: 5 },
        end: { x: 11, y: 5 },
        boxes: [{ x: 7, y: 5 }],
        cats: [
            {
                color: blackCat, speed: 1, start: { x: 12, y: 1, direction: "left" }, change: [
                    { step: 11, direction: "down" },
                    { step: 14, direction: "right" },
                    { step: 16, direction: "up" },
                    { step: 19, direction: "right" },
                    { step: 26, direction: "down" },
                    { step: 30, direction: "up" },
                    { step: 34, direction: "left" },
                    { step: 40, direction: "down" },
                    { step: 46, direction: "up" },
                    { step: 50, direction: "left" },
                ]
            },
            {
                color: blackCat, speed: 1, start: { x: 0, y: 8, direction: "right" }, change: [
                    { step: 2, direction: "up" },
                    { step: 4, direction: "left" },
                    { step: 5, direction: "down" },
                    { step: 8, direction: "right" },
                    { step: 15, direction: "up" },
                    { step: 18, direction: "left" },
                    { step: 19, direction: "down" },
                    { step: 21, direction: "right" },
                    { step: 25, direction: "up" },
                    { step: 26, direction: "left" },
                    { step: 31, direction: "up" },
                    { step: 34, direction: "right" },
                    { step: 36, direction: "down" },
                ]
            },
            {
                color: brownCat, speed: 1, start: { x: 7, y: 5, direction: "up" }, change: [
                    { step: 1, direction: "left" }, { step: 2, direction: "down" }, { step: 4, direction: "right" },
                    { step: 6, direction: "up" }, { step: 8, direction: "left" }, { step: 9, direction: "down" }
                ]
            }, {
                color: fawnCat, speed: 1, start: { x: 7, y: 5, direction: "left" }, change: [
                    { step: 1, direction: "down" }, { step: 2, direction: "right" }, { step: 4, direction: "up" },
                    { step: 6, direction: "left" }, { step: 8, direction: "down" }, { step: 9, direction: "right" }
                ]
            }, {
                color: orangeCat, speed: 1, start: { x: 7, y: 5, direction: "down" }, change: [
                    { step: 1, direction: "right" }, { step: 2, direction: "up" }, { step: 4, direction: "left" },
                    { step: 6, direction: "down" }, { step: 8, direction: "right" }, { step: 9, direction: "up" }
                ]
            }, {
                color: creamCat, speed: 1, start: { x: 7, y: 5, direction: "right" }, change: [
                    { step: 1, direction: "up" }, { step: 2, direction: "left" }, { step: 4, direction: "down" },
                    { step: 6, direction: "right" }, { step: 8, direction: "up" }, { step: 9, direction: "left" }
                ]
            },
        ],
    },
    // 11
    {
        name: "Maze",
        size: { x: 10, y: 12 },
        start: { x: 1, y: 6 },
        end: { x: 10, y: 3 },
        boxes: [
            { x: 2, y: 2 },
            { x: 5, y: 2 },
            { x: 9, y: 2 },
            { x: 10, y: 4 },
            { x: 1, y: 9 },
            { x: 2, y: 11 },
            { x: 5, y: 10 },
            { x: 9, y: 11 },
        ],
        cats: [
            {
                color: blackCat, speed: 1, start: { x: 2, y: 2, direction: "right" }, change: []
            }, {
                color: blackCat, speed: 1, start: { x: 5, y: 2, direction: "left" }, change: [
                    { step: 1, direction: "down" }, { step: 2, direction: "right" }, { step: 3, direction: "down" },
                    { step: 8, direction: "right" }, { step: 10, direction: "down" },
                    { step: 14, direction: "left" }, { step: 15, direction: "down" }
                ],
            }, {
                color: blackCat, speed: 1, start: { x: 2, y: 11, direction: "right" }, change: [
                    { step: 1, direction: "up" }, { step: 2, direction: "right" }
                ],
            }, {
                color: blackCat, speed: 1, start: { x: 5, y: 10, direction: "left" }, change: [
                    { step: 2, direction: "up" }, { step: 7, direction: "left" },
                    { step: 8, direction: "up" }, { step: 9, direction: "left" }
                ],
            }, {
                color: blackCat, speed: 1, start: { x: 9, y: 11, direction: "up" }, change: [
                    { step: 5, direction: "left" }, { step: 7, direction: "up" }
                ],
            }, {
                color: blackCat, speed: 1, start: { x: 10, y: 4, direction: "left" }, change: [
                    { step: 1, direction: "up" }
                ],
            }, { color: brownCat, speed: 1, start: { x: 5, y: 2, direction: "down" }, change: [] }
        ],
    },
    // 12
    {
        name: "Direct",
        size: { x: 7, y: 7 },
        start: { x: 1, y: 4 },
        end: { x: 7, y: 4 },
        boxes: [],
        cats: [{
            color: blackCat, speed: 1, start: { x: 0, y: 5, direction: "right" }, change: [
                { step: 3, direction: "down" }, { step: 5, direction: "left" }, { step: 7, direction: "up" }, { step: 8, direction: "right" },
                { step: 13, direction: "up" }, { step: 14, direction: "left" }, { step: 16, direction: "down" }, { step: 18, direction: "left" },
                { step: 19, direction: "up" }, { step: 21, direction: "right" }, { step: 23, direction: "down" }, { step: 24, direction: "right" },
            ],
        }, {
            color: blackCat, speed: 1, start: { x: 8, y: 3, direction: "left" }, change: [
                { step: 3, direction: "up" }, { step: 5, direction: "left" }, { step: 7, direction: "down" }, { step: 8, direction: "right" },
                { step: 9, direction: "up" }, { step: 10, direction: "left" }, { step: 13, direction: "down" }, { step: 15, direction: "right" },
                { step: 17, direction: "up" }, { step: 18, direction: "right" }, { step: 19, direction: "down" }, { step: 20, direction: "up" },
                { step: 22, direction: "down" }, { step: 23, direction: "right" }
            ],
        }, {
            color: brownCat, speed: 1, start: { x: 2, y: 0, direction: "down" }, change: [
                { step: 5, direction: "right" }, { step: 8, direction: "up" }, { step: 10, direction: "left" }, { step: 12, direction: "down" },
                { step: 15, direction: "right" }, { step: 18, direction: "up" }, { step: 21, direction: "left" }, { step: 13, direction: "down" },
            ],
        }, {
            color: orangeCat, speed: 1, start: { x: 6, y: 8, direction: "up" }, change: [
                { step: 5, direction: "left" }, { step: 8, direction: "down" }, { step: 10, direction: "right" }, { step: 12, direction: "up" },
                { step: 15, direction: "left" }, { step: 18, direction: "down" }, { step: 22, direction: "right" }, { step: 23, direction: "up" },
                { step: 24, direction: "left" },
            ],
        }, {
            color: fawnCat, speed: 1, start: { x: 6, y: 0, direction: "down" }, change: [
                { step: 2, direction: "left" }, { step: 3, direction: "down" }, { step: 5, direction: "left" }, { step: 7, direction: "down" },
                { step: 10, direction: "right" }, { step: 11, direction: "up" }, { step: 14, direction: "right" }, { step: 15, direction: "down" },
                { step: 16, direction: "right" }, { step: 17, direction: "up" }, { step: 19, direction: "left" }, { step: 22, direction: "right" },
            ],
        }, {
            color: creamCat, speed: 1, start: { x: 2, y: 8, direction: "up" }, change: [
                { step: 3, direction: "right" }, { step: 5, direction: "up" }, { step: 7, direction: "right" }, { step: 9, direction: "down" },
                { step: 11, direction: "left" }, { step: 14, direction: "up" }, { step: 15, direction: "right" }, { step: 17, direction: "up" },
                { step: 20, direction: "down" }, { step: 24, direction: "right" },
            ],
        },],
    },
    {
        name: "13",
        size: { x: 7, y: 7 },
        start: { x: 1, y: 4 },
        end: { x: 7, y: 4 },
        boxes: [
            { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 5 }, { x: 2, y: 6 }, { x: 2, y: 7 },

            { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 3 },
            { x: 4, y: 4 },
            { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 6 }, { x: 6, y: 5 },

        ],
        cats: [],
    },
] as Level[];