//import { zzfx } from 'ZzFX';
import { getRandom } from '../common';
import { getStore } from '../app';
import { playMeow } from './meow';
import { subtitles } from '../dom';
// import zzfxM from './zzfxm';

export function playMusic() {
    const { controls: { music } } = getStore();
    if (music) {
        // TODO: add music
    }
}

const cats = ["🐈", "🐱", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"];

export function meow() {
    const { controls: { sound } } = getStore();

    if (sound) {
        playMeow(Math.random() * 500 + 700, 0.6);
        const cat = getRandom(cats);
        subtitles.innerText = cat + " Meow " + cat;
        subtitles.className = "";
        setTimeout(() => subtitles.className = "hide", 500);
    }
    // speak("meow", "meow");
}

const directionDialogs = {
    "up": [
        "Up",
        "Up we go.",
        "Going up.",
        "To the top.",
        "Upwards.",
        "Climbing.",
        "Higher.",
        "Let's ascend.",
        "Up again?",
        "This way up.",
        "Why up?",
        "Gravity calls.",
        "To the sky."
    ],
    "down": [
        "Down",
        "Going down.",
        "Downward.",
        "Deeper.",
        "Let's drop.",
        "Descending.",
        "To the depths.",
        "Watch your step.",
        "Down we go.",
        "What's below?",
        "Down there?",
        "Easy now.",
        "Here I go."
    ],
    "left": [
        "Left",
        "To the left.",
        "Going left.",
        "Left it is.",
        "Leftward.",
        "This way.",
        "A left.",
        "On my left.",
        "Left again.",
        "Why left?",
        "Nothing's right.",
        "That way?",
        "Alright, left."
    ],
    "right": [
        "Right",
        "To the right.",
        "Going right.",
        "Right away.",
        "Rightward.",
        "That's right.",
        "Correct.",
        "On my right.",
        "Right again?",
        "Over here.",
        "Why this way?",
        "Seems right.",
        "Okay, right."
    ]
};

export function speakDirection(direction: Direction) {
    const text = getRandom(directionDialogs[direction]);
    speak(text, "soldier", 0.8, 1.2);
}

const startGameDialogs = [
    "Alright, boss, let's get that candy!",
    "Time to hunt for some sugar. What could go wrong?",
    "Let's do this! My sweet tooth is tingling.",
    "A sweet reward for a sweet hero. Let's go!",
    "No superstitions can stop me. Onward!",

    "Okay, deep breaths. Just... avoid all shadows.",
    "I have a bad feeling about this. Did you see that cat?",
    "Hopefully, my luck holds out. That candy better be worth it.",
    "I just saw a black cat. I'm not going that way.",
    "Let's just get this over with. Carefully.",

    "A quest for candy, avoiding feline-induced doom. My life is complete.",
    "Great. Another day, another chance to be tripped by a cat.",
    "Is that a black cat or just a void with legs? Nope, not finding out.",
    "Let's see... Ladders, black cats, broken mirrors. What else you got?",
    "I swear, if I step on a crack, I'm blaming you."
];
export function speakStartGame() {
    const text = getRandom(startGameDialogs);
    speak(text, "soldier");
}

const catastropheDialogs = {
    soldier: [
        "I think I just stepped in what that cat left behind.",
        "Achoo! Oh great, cat allergies.",
        "Did that cat just... trip me? On purpose?",
        "That's it, I'm officially on that cat's hit list.",
        "My shoelace! The cat snagged my shoelace!",
        "Who leaves a banana peel here? Seriously?",
        "A falling anvil? Is this a cartoon?",
        "I slipped. Dignity: zero. Pain: plenty.",
        "My back! I've thrown out my back!",
        "A rake. I stepped on a rake. Of course I did.",
        "Just got a text. My warranty has expired.",
        "Oh look, a bill. An overdue bill. Wonderful.",
        "My phone's battery just died. Of course it did.",
        "Did a bird just... you know... on my head?",
        "My WiFi signal! It's gone! We're doomed!",
        "Yep, that's it. The universe officially hates me.",
        "Why me? What did I do to deserve this?",
        "I should have stayed in bed. I definitely should have stayed in bed.",
        "Is this bad luck, or am I just that clumsy?",
        "Okay, this is fine. Everything is fine. I'm not panicking.",
    ],
    funeral: [
        "Breaking news: A localized, one-by-one meter meteor has just struck a pedestrian. Experts are baffled.",
        "We interrupt this program to report a sudden, high-velocity banana peel incident in your area. The victim is reportedly... slipping.",
        "A citizen has reportedly been attacked by what they describe as 'a highly tactical flock of pigeons.' More at eleven.",
        "Reports are coming in of an individual who has spontaneously combusted, leaving behind only a faint smell of burnt toast. Witnesses are confused.",
        "Anvil sales have plummeted today following a tragic, yet cartoonishly predictable, gravity-related accident.",

        "Hot off the press: A person has mysteriously vanished, leaving only their underwear behind. Police are asking the public: have you seen this person?",
        "A local resident has been unexpectedly teleported three feet to the left, directly into a lamppost. The cause remains unknown.",
        "We're getting live reports that a black cat has just opened a small portal, causing a citizen to trip into another dimension. They are expected back Tuesday.",
        "In a strange turn of events, a man has been swapped with a garden gnome. Family members say the gnome is 'a better listener'.",
        "A citizen has reportedly been abducted by squirrels. They were last seen being dragged up a tree while protesting.",

        "Weather alert: A tiny, personal-sized raincloud has formed over a local resident. Heavy downpours and mild embarrassment are expected.",
        "Scientists are investigating a bizarre phenomenon where the ground directly under one person's feet turned into quicksand for exactly five seconds.",
        "A sudden gust of wind has just de-pantsed a local pedestrian. The suspect is still at large.",
        "This just in: A single, perfectly-aimed lightning bolt has just struck an individual's ice cream cone. The cone did not survive."
    ],
    laugh: [
        "You thought that would work? Adorable.",
        "You truly are a walking disaster.",
        "That look on your face was priceless.",
        "And the 'Most Unlucky' award goes to you.",
        "You never fail to disappoint.",

        "You actually did that. Unbelievable.",
        "Seriously? A banana peel in this day and age?",
        "That was a masterpiece of failure.",
        "I didn't think anyone could fail like that.",
        "You have truly outdone yourself.",

        "Oh, you poor, clumsy thing.",
        "Did you have a little trip?",
        "Don't worry, I'm sure it only gets worse.",
        "My condolences for your dignity.",
        "That almost looked painful. Almost.",

        "A truly 'cat-astrophic' failure.",
        "The cat didn't even have to lift a paw.",
        "This is better than television.",
        "Now that was a good one.",
        "Flawless execution of a mistake.",
    ],
};
export function speakCatastrophe() {
    const voice = getRandom(Object.keys(catastropheDialogs)) as keyof typeof catastropheDialogs;
    const text = getRandom(catastropheDialogs[voice]);
    speak(text, voice);
}

const winDialogs = [
    "Yes! This is exactly what I needed.",
    "Victory is sweet! Literally.",
    "Worth it. Every single cursed step.",
    "I faced down fate and black cats for this. And I'd do it again.",
    "Finally! My precious!",
    "If I don't get some sugar, I might just jump out of this screen and slap you. You're lucky!",
    "About time! My blood sugar was getting dangerously low.",
    "This better be good. I went through heck for this donut.",
    "Give it to me. The sugar cravings... they're getting stronger.",
    "One more minute and I would not have been responsible for my actions.",
    "Oh, look. A cake. All that for a piece of cake. Fantastic.",
    "Well, that was an ordeal. This better have extra frosting.",
    "I can't believe that actually worked. Now, where's the fork?",
    "So, is this my reward for not being crushed by a meteor? I'll take it.",
    "Task completed. Now initiating sugar consumption protocol.",
    "Hello, beautiful. I've missed you.",
    "Don't mind if I do. And I do.",
    "The sight, the smell... the glorious taste awaits!",
    "Time to ruin my dinner. And it feels so good.",
    "I'm going to eat this so fast, you won't even see it happen."
];
export function speakWin() {
    const text = getRandom(winDialogs);
    speak(text, "soldier");
}


// Works only for Mac :/
const voicesCatalog = {
    normal: [
        "Daniel",
        "Aaron",
    ],
    meow: [
        "Superstar",
        "Samantha",
    ],
    robot: [
        "Trinoids",
        "Zarvox",
    ],
    robotSing: [
        "Organ",
    ],
    soldier: [
        "Whisper",
    ],
    laugh: [
        "Jester",
        "Wobble",
    ],
    chiming: [
        "Bells",
    ],
    bubbling: [
        "Bubbles",
    ],
    sing: [
        "Cellos",
    ],
    funeral: [
        "Bad News"
    ],
}


const synth = window.speechSynthesis;

export function speak(text: string, voiceType: keyof typeof voicesCatalog = "normal", volume = 1, rate = 1) {
    // Show subtitles
    subtitles.className = "";
    subtitles.innerText = text;

    const { controls: { sound } } = getStore();
    if (!sound)
        return setTimeout(() => subtitles.className = "hide", 4000);


    let voiceNames = voicesCatalog[voiceType];
    let voice = voices.find(v => voiceNames.includes(v.name.split(" ")[0]));

    // If not special voice, try normal
    if (!voice && voiceType !== "normal")
        return speak(text, "normal");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    if (voice) {
        utterance.lang = voice.lang;
        utterance.voice = voice;
    }

    utterance.volume = volume;
    utterance.rate = rate;
    // utterance.pitch = 1.5;

    // Only once per time!!!
    speakStop();
    synth.speak(utterance);

    utterance.onend = () => subtitles.className = "hide";
}

export function speakStop() {
    synth.cancel();
}

// for chrome
let voices: SpeechSynthesisVoice[] = [];

function setVoices() {
    voices = speechSynthesis.getVoices().filter(v => v.localService && v.lang.includes("en"));
}

speechSynthesis.onvoiceschanged = setVoices;
setVoices();


// Safari
/*
9 - robot žena
13 - ovce
14 - voják - potichu
16 - smích - dědek!!
17 - ROBOT - Zpěv
18 - ROBOT - Zpěv lepší
19 - robot - klasik
25 - odbíjecí hodiny
26 -robot -klasik
30 - pružina
31 - voják - potichu - lepší
32 - zpěv - super
33 - smích - babka
34 - hluboký zpěv (závěr)
35 - bublinky

*/

// FF
/*
1 - zpívající muž
3 - odbíjející hodiny
5 - bubliny
6 - HP robot zpívá
8 - smející se dedek
14 - spívající mini robot
19 - Smích - hodně!!!
24 - ROBOT - zpěv
38 - robot - kalsik
39 - voják - potichu
40 - robot - kalsik víc
*/

// Chrome
// [1] - napůl robot
// [3] - zpívající stroj - pomalé
// [5] - staré hodiny
// [7] - bubláni
// [9] - zpěv nadpřirozené bytosti
// [16] - Zpěv - udělat fakt píseh
// [17] - REP
// [22] - Směje se!!!
// [29] - ROBOT - zpívá
// [43] - Robot - klasika
// [44] - Voják - potichu
// [46] - ROBOT - jako ve FF 