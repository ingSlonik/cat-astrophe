const TEMPO = 60;
const QUARTER_NOTE_DURATION = 60 / TEMPO;
const EIGHTH_NOTE_DURATION = QUARTER_NOTE_DURATION / 2;

const bassLine = [
    { freq: 130.81, duration: QUARTER_NOTE_DURATION }, // C3
    { freq: 130.81, duration: QUARTER_NOTE_DURATION }, // C3
    { freq: 196.00, duration: QUARTER_NOTE_DURATION }, // G3
    { freq: 155.56, duration: QUARTER_NOTE_DURATION }, // Eb3
];

const arpeggio = [
    { freq: 523.25, duration: EIGHTH_NOTE_DURATION }, // C5
    { freq: 622.25, duration: EIGHTH_NOTE_DURATION }, // Eb5
    { freq: 783.99, duration: EIGHTH_NOTE_DURATION }, // G5
    { freq: 932.33, duration: EIGHTH_NOTE_DURATION }, // Bb5
    { freq: 783.99, duration: EIGHTH_NOTE_DURATION }, // G5
    { freq: 622.25, duration: EIGHTH_NOTE_DURATION }, // Eb5
    { freq: 523.25, duration: EIGHTH_NOTE_DURATION }, // C5
    { freq: 392.00, duration: EIGHTH_NOTE_DURATION }, // G4 (bridge down)
];

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
    const note = arpeggio[step % arpeggio.length];

    setTimeout(() => playNote(step + 1), note.duration * 1000);

    playMeow(note.freq, note.duration * 0.9, 0.7);

    if (step % 2 === 0) {
        const noteBass = bassLine[(step / 2) % bassLine.length];
        playBass(noteBass.freq, noteBass.duration, 1);
    }
}

function playBass(frequency: number, duration: number, volume = 1) {
    const now = audioCtx.currentTime;

    const masterGain = audioCtx.createGain();
    masterGain.connect(audioCtx.destination);
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.7, now + 0.05);
    masterGain.gain.linearRampToValueAtTime(0, now + duration);

    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.value = frequency;
    oscillator.connect(masterGain);

    oscillator.start(now);
    oscillator.stop(now + duration);
}


export function playMeow(frequency: number, duration: number, volume = 1) {
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

function createHarmonic(context: AudioContext, mainGain: GainNode, startTime, duration, baseFreqs, harmonicMultiplier, volume) {
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