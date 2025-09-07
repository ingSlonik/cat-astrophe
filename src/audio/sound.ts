import { getStore } from "../app";

// Karel Plíhal - Pohádka
const tabs = `
|------------0b--|----2b----------|----0b----------|
|----0b--1b------|3b------0b--0-3-|1b----------3-1-|
|0b----0---0---0-|--0---0---0-----|--0---0-2b------|
|--0-------------|----------------|----------0-----|
|----------------|----------------|----------------|
|----------------|----------------|----------------|

|--------------|----------0b--|----2b----------|
|0b--0b3-------|--0b--1b------|3b------0b--0-3-|
|--0-----0b----|0---0---0---0b|--0---0---0-----|
|----------4b2b|--------------|----------------|
|--------------|--------------|----------------|
|--------------|--------------|----------------|

|----0b----------|----------------|
|1b----------3-1-|0b----------3---|
|--0---0b2b------|----2b0b2b------|
|----------0b----|--0-------0---0-|
|----------------|----------------|
|----------------|----------------|`;

/*
const tabs = `
|------------------------01234-
|-------------------01234------
|---------------0123-----------
|----------01234---------------
|-----01234--------------------
|01234-------------------------
`;
*/

type Song = { note: string, flag: string, freq: number, volume: number }[][];

const allNotes = "C C# D D# E F F# G G# A A# B".split(" ");
const guitarStrings = "E4 B3 G3 D3 A2 E2".split(" ");

function getSongFromTabs(tabs: string): Song {
    const tabLines = tabs.trim().split("\n\n");
    const tabLine = ["", "", "", "", "", ""];

    tabLines.forEach(tl => tl
        .split("\n")
        .forEach((line, string) => tabLine[string] += line.replaceAll("|", ""))
    );

    const song: Song = [];

    for (let t = 0; t < tabLine[0].length; t++) {
        const step: Song[number] = [];

        for (let s = 0; s < guitarStrings.length; s++) {
            const value = tabLine[s][t];
            if (isNumber(value)) {
                const threshold = parseInt(value);

                const [stringNoteChar, stringNoteNumber] = guitarStrings[s];

                const stringNoteIndex = allNotes.indexOf(stringNoteChar);
                const noteIndex = stringNoteIndex + threshold;
                const noteChar = allNotes[noteIndex % allNotes.length];
                const noteNumber = noteIndex < allNotes.length ? stringNoteNumber : parseInt(stringNoteNumber) + 1;

                const note = noteChar + noteNumber;

                const flagChar = tabLine[s][t + 1];
                const flag = isLetter(flagChar) ? flagChar : "";

                step.push({
                    note,
                    flag,
                    freq: getNoteFrequency(note),
                    volume: 1,
                })
            }
        }

        song.push(step);
    }

    return song;
}

function isNumber(char: string) {
    const num = parseInt(char);
    return num.toString() === char;
}
function isLetter(char?: string) {
    if (!char) return false;
    return /[a-zA-Z]/.test(char);
}

function getNoteFrequency(noteString: string) {
    const semitonesFromA = {
        'C': -9, 'C#': -8, 'Db': -8,
        'D': -7, 'D#': -6, 'Eb': -6,
        'E': -5,
        'F': -4, 'F#': -3, 'Gb': -3,
        'G': -2, 'G#': -1, 'Ab': -1,
        'A': 0,
        'A#': 1, 'Bb': 1,
        'B': 2, 'H': 2
    };

    const noteRegex = /^([A-G|H])([#b]?)([0-8])$/;
    const match = noteString.match(noteRegex);

    if (!match)
        throw new Error("Neplatný formát noty. Použijte např. 'A4', 'C#5', 'Gb3'.")

    const noteName = match[1];
    const accidental = match[2];
    const octave = parseInt(match[3], 10);

    const fullNoteName = noteName + accidental;

    if (!(fullNoteName in semitonesFromA))
        throw new Error(`Neznámá nota: ${fullNoteName}`);

    const octaveDifference = octave - 4;
    const octaveSteps = octaveDifference * 12;
    const noteSteps = semitonesFromA[fullNoteName];

    const totalSemitonesFromA4 = octaveSteps + noteSteps;

    const referenceFrequency = 440.0; // A4
    const frequency = referenceFrequency * Math.pow(2, totalSemitonesFromA4 / 12);

    return frequency;
}


const song = getSongFromTabs(tabs);

let audioCtx: AudioContext;

let isMusicPlaying = false;

export function playMusic() {
    if (!audioCtx)
        audioCtx = new AudioContext();

    if (isMusicPlaying) return;

    isMusicPlaying = true;
    playNote(0);
}

function playNote(step = 0) {
    const { controls: { music } } = getStore();

    if (!music)
        return isMusicPlaying = false;

    const noteDuration = 0.2;
    const beat = song[step];

    // song end, play again
    if (!beat)
        return playNote(0);


    setTimeout(() => playNote(step + 1), noteDuration * 1000);

    beat.forEach(note => {
        if (note.flag === "b") {
            playGuitarTone(note.freq, 3 * noteDuration, note.volume * 0.4);
        } else {
            playGuitarTone(note.freq, 2 * noteDuration, note.volume * 0.2);
        }
    });
}

function playGuitarTone(frequency: number, duration: number, volume: number, type: OscillatorType = "sine") {
    const now = audioCtx.currentTime;

    const masterGain = audioCtx.createGain();
    masterGain.connect(audioCtx.destination);

    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(volume * 0.5, now + 0.02);
    // normal
    masterGain.gain.linearRampToValueAtTime(volume * 0.2, now + duration / 2);
    masterGain.gain.linearRampToValueAtTime(0, now + duration);
    // staccato
    // masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const harmonics = [1, 2, 3, 4, 5, 6];
    const harmonicGains = [1, 0.5, 0.3, 0.15, 0.1, 0.05];

    harmonics.forEach((harmonic, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = type;
        osc.frequency.value = frequency * harmonic;

        gain.gain.value = harmonicGains[index];

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + duration);
    });

    // strings noise
    const noiseSource = audioCtx.createBufferSource();
    const bufferSize = audioCtx.sampleRate * 0.05;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    noiseSource.buffer = buffer;

    // noise filter
    const bandpass = audioCtx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1500;
    bandpass.Q.value = 1;

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    noiseSource.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(masterGain);

    noiseSource.start(now);
    noiseSource.stop(now + 0.05);
}


// ----------------------------------  meow  -----------------------------------
type BaseFrequencies = {
    start: number,
    peak: number,
    end: number,
}

export function playMeow(frequency: number, duration: number, volume = 0.5) {
    if (!audioCtx)
        audioCtx = new AudioContext();

    const now = audioCtx.currentTime;

    // Cat modulation
    const baseFrequencies = {
        start: frequency * 0.9,
        peak: frequency * 1.02,
        end: frequency * 0.8,
    };

    const masterGain = audioCtx.createGain();
    masterGain.connect(audioCtx.destination);
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.7, now + 0.05);
    masterGain.gain.linearRampToValueAtTime(0, now + duration);

    createHarmonic(audioCtx, masterGain, now, duration, baseFrequencies, 1, volume * 1.0);
    createHarmonic(audioCtx, masterGain, now, duration, baseFrequencies, 2, volume * 0.4);
    createHarmonic(audioCtx, masterGain, now, duration, baseFrequencies, 3, volume * 0.2);
    createHarmonic(audioCtx, masterGain, now, duration, baseFrequencies, 4, volume * 0.1);
}

function createHarmonic(context: AudioContext, mainGain: GainNode, startTime: number, duration: number, baseFreqs: BaseFrequencies, harmonicMultiplier: number, volume: number) {
    const now = startTime;

    const harmonicGain = context.createGain();
    harmonicGain.gain.setValueAtTime(volume, now);
    harmonicGain.connect(mainGain);

    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.connect(harmonicGain);

    oscillator.frequency.setValueAtTime(baseFreqs.start * harmonicMultiplier, now);
    oscillator.frequency.linearRampToValueAtTime(baseFreqs.peak * harmonicMultiplier, now + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(baseFreqs.end * harmonicMultiplier, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
}