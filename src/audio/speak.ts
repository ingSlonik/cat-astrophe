import { getRandom } from '../common';
import { getStore } from '../app';
import { playMeow } from './sound';
import { hideSubtitles, showSubtitles, subtitles } from '../dom';


const cats = ["🐈", "🐱", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"];

export function meow() {
    const { controls: { sound } } = getStore();

    if (sound) {
        playMeow(Math.random() * 500 + 700, 0.4);
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
        "To the sky.",
    ],
    "down": [
        "Down",
        "Going down.",
        "Downward.",
        "Deeper.",
        "Let's drop.",
        "Descending.",
        "To the depths.",
        "Down we go.",
        "What's below?",
        "Down there?",
        "Easy now.",
    ],
    "left": [
        "Left",
        "To the left.",
        "Going left.",
        "Left it is.",
        "Leftward.",
        "A left.",
        "On my left.",
        "Left again.",
        "Why left?",
        "Nothing's right.",
        "Alright, left.",
    ],
    "right": [
        "Right",
        "To the right.",
        "Going right.",
        "Right away.",
        "Rightward.",
        "That's right.",
        "On my right.",
        "Right again?",
        "Seems right.",
        "Okay, right.",
    ]
};

export function speakDirection(direction: Direction) {
    const text = getRandom(directionDialogs[direction]);
    speak(text, "soldier", 0.6, 1.2);
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

const catastropheDialogs = [
    "You stepped on a Lego brick with your bare foot. The pain was so intense, you briefly saw the future.",
    "Your brain decided now was the perfect time to replay that moment in fifth grade when you accidentally called the teacher 'Mom.' The cringe was so physical you had to stop and curl into a ball.",
    "You bit into your emergency chocolate chip cookie, only to discover it was oatmeal raisin. The betrayal.",
    "Your emergency donut fell on the floor. You quickly invoked the 'five-second rule' to pick it up, only to immediately slip on it.",
    "A tiny, personal rain cloud formed directly over your head and started to pour. You suddenly felt like the main character in a very sad cartoon.",
    "For a split second, the paving stone you stepped on felt like it was made of Jell-O. The ensuing wave of uncertainty made you question the fabric of reality.",
    "A sudden gust of wind blew directly into your eyes, forcing a sneeze so powerful it sent you one involuntary step backward.",
    "You tripped, but instead of falling, you miraculously executed an elegant, albeit completely unintentional, pirouette. No one saw it, which is somehow even more tragic.",
    "You just received a call from a man with a very serious voice, informing you that your subscription to 'Cactus Monthly' has expired. You've never owned a cactus in your life.",
    "An old shopping list fell out of your pocket. Before you could grab it, a gust of wind plastered it onto the windshield of a passing bus. The world now knows you're out of toilet paper.",
    "You just realized you've been humming the jingle from a cat food commercial all day. It's now permanently stuck in your head.",
    "You spotted a coin on the ground. As you bent over to pick it up, your pants ripped in the most conspicuous way possible. You were so flustered, you left the coin behind.",
    "You're suddenly struck with the cold horror of not being 100% sure you locked your front door. You spend the next five seconds frantically replaying your morning in a high-stakes mental thriller.",
    "Your phone suddenly decides to play a video from your gallery at full volume. It's the one of you singing terribly off-key in the car. Your darkest secret is now public.",
    "You confidently stride forward, only to step directly into a puddle you didn't see. Your brand new shoe and sock are now enjoying an unsolicited mud spa.",
    "A pigeon executed a precision bombing run on you. For the rest of your walk, you pretend the new splotch on your shoulder is an avant-garde fashion statement.",
    "A wave of panic hits as you can't find your keys in your pocket. Your heart stops for a second... before you find them in your other pocket.",
    "You bit into your emergency cookie with such enthusiasm that you also bit your own tongue. For a brief moment, you saw the entire color spectrum and tasted pure, self-inflicted betrayal.",
    "With your headphones on, you started singing along to your music, completely lost in the moment. You were not alone...",
    "You put your T-shirt on inside out this morning in a rush. You spent the entire day wondering why people were giving you funny looks and why the tag was so incredibly itchy.",
    "You let out a yawn so massive your jaw popped and got stuck open for a second. In that moment, your life as a perpetually surprised goldfish flashed before your eyes.",
    "The coffee machine dispensed a cup, then proceeded to pour the coffee directly next to it. You watched the hot stream disappear, feeling a deep and personal sense of betrayal.",
    "You walked face-first into a spiderweb, sparking five minutes of frantic, flailing combat-dancing against an unseen, eight-legged foe.",
    "You answered your phone with an energetic 'Hello?!' only to realize no one was calling. You'd just accidentally unlocked it with your face and now look like you're having a heated conversation with yourself."
];
export function speakCatastrophe() {
    const text = getRandom(catastropheDialogs);
    speak(text, "normal", 1, 1, true); // normal is good to understand
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
        "daniel",
        "aaron",
    ],
    meow: [
        "superstar",
        "samantha",
    ],
    robot: [
        "trinoids",
        "zarvox",
    ],
    robotSing: [
        "organ",
    ],
    soldier: [
        "whisper",
    ],
    laugh: [
        "jester",
        "wobble",
    ],
    chiming: [
        "bells",
    ],
    bubbling: [
        "bubbles",
    ],
    sing: [
        "cellos",
    ],
    funeral: [
        "bad", // news"
    ],
}


const synth = window.speechSynthesis;


export function speak(text: string, voiceType: keyof typeof voicesCatalog = "normal", volume = 1, rate = 1, catastrophe = false) {
    const { controls: { sound } } = getStore();
    if (!sound) {
        // only subtitles
        let delay = text.length * 0.2 * 1000; // 1s for 5 letters
        if (delay < 2_000) delay = 2_000;
        if (delay > 10_000) delay = 10_000;
        if (catastrophe) delay += 5_000;
        showSubtitles(text, catastrophe);
        hideSubtitles(delay);
        return;
    }

    let voiceNames = voicesCatalog[voiceType];
    let voice = voices.find(v => voiceNames.includes(v.name.toLocaleLowerCase().split(" ")[0]));

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

    // Show subtitles
    showSubtitles(text, catastrophe);

    utterance.onend = () => hideSubtitles(catastrophe ? 5_000 : 2_000);
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

// -----------------------------------  OLD  -----------------------------------
/*
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

// Česky:
Šlápl jsi bosou nohou na kostičku Lega. Bolest byla tak intenzivní, že jsi na chvíli viděl budoucnost.
Tvůj mozek se rozhodl, že právě teď je ideální čas přehrát tu chvíli, kdy v páté třídě jsi zakřičel na paní učitelku "mami". Stud byl tak fyzický, že ses musel na chvíli zastavit a schoulit.
Ukousl sis z záložní čokoládové sušenky jen aby zjistil, že to je ve skutečnosti ovesná s rozinkami. Ta zrada.
Spadl ti na zem záložní donut. Rychle ho zvedl s tím, že "pěti vteřinové pravidlo" platí, ale uklouzl na něm.
Z ničeho nic se nad tebou vytvořil malý, osobní dešťový mrak a začal ti pršet jen a pouze na hlavu. Cítil ses jako hlavní postava ve velmi smutném animovaném filmu.
Na vteřinu se ti zdálo, že dlažební kostka, na kterou jis šlápl, byla z želatiny. Ten pocit nejistoty tě donutil zpochybnit celou realitu.
Zvedl se poryv větru, který ti foukl přímo do očí a donutil kýchnout. Kýchnutí bylo tak silné, že jis udělal nechtěný krok dozadu na start.
Zakopl jsi, ale místo pádu se ti nějakým zázrakem podařilo udělat elegantní, i když naprosto nechtěnou, piruetu. Nikdo to neviděl, což je možná ještě horší.
Právě ti zavolal neznámý muž, aby ti s vážným hlasem oznámil, že tvé předplatné na časopis o pěstování kaktusů vypršelo. Nikdy jsi žádné kaktusy nepěstoval!
Z kapsy ti vypadl starý nákupní seznam. Než jsi ho stačil zvednout, vítr ho odnesl a přilepil na čelní sklo projíždějícího autobusu, který je hned za touto mapou. Svět se teď dozví, že ti doma chybí toaletní papír.
Uvědomil jsi si, že si celý den pobrukuješ melodii z reklamy na kočičí žrádlo. Ta písnička teď už nikdy neodejde.
Všiml jsi si na zemi pětikoruny. Když jsi se pro ni sehnul, roztrhly se mu kalhoty na tom nejméně vhodném místě. Byl jsi tak roztušen, že pětikorunu jsi tam nechal.
Právě jsi si s chladnou hrůzou uvědomil, že si nejsi na 100 % jistý, jestli jsi zamknul dveře od bytu. Následujících pět vteřin jsi prožil v hlavě napínavý thriller, ve kterém jsi si snažil zrekonstruovat své ranní pohyby.
Telefon ve tvé kapse se z ničeho nic rozhodl přehrát na plnou hlasitost video z galerie. Bylo to video, kde zpíváš falešně v autě. Svět se právě dozvěděl tvé největší tajemství.
S pocitem vítězství jsi vkročil do neviditelné louže. Tvá nová bota a ponožka teď prožívají vlastní bahenní lázně.
Holub na tebe provedl precizní vzdušný útok. Zbytek cesty se tváříš, že ten flek na rameni je moderní umění.
Srdce se ti zastavilo, když jsi v kapse nenahmatal klíče. Po vteřině paniky jsi je našel v té druhé.
Kousl sis do své záložní sušenky s takovou vervou, až sis skřípl jazyk. Na okamžik jsi viděl všechny barvy vesmíru a ochutnal chuť zrady.
Se sluchátky na uších sis začal zpívat nahlas v domnění, že jsi sám. Nebyl...
Ráno jsi si ve spěchu oblékl tričko naruby. Celé dopoledne jsi nechápal, proč na tebe lidé tak divně koukají a proč tě ta cedulka tolik škrábe na krku.
Zívnul sis tak mohutně, až ti v čelisti luplo a na vteřinu nešla zavřít. Během té chvíle ti hlavou prolétl celý život v roli věčně překvapené ryby.
Automat na kávu ti vydal kelímek, ale nápoj poslal mimo. Sledoval jsi ten horký proud tekoucí do útrob stroje a cítil jsi hluboké, osobní zklamání.
Vstoupil jsi do pavučiny, kterou jsi neviděl. Následujících pět minut jsi předváděl panický bojový tanec proti neviditelnému osminohému nepříteli.
Zvedl jsi telefon a s energickým "Ano?" jsi zjistil, že nikdo nevolá. Jen sis omylem odemkl obrazovku obličejem a vypadal jsi, že si povídáš sám se sebou.


export function speakCatastrophe() {
    const voice = getRandom(Object.keys(catastropheDialogs)) as keyof typeof catastropheDialogs;
    const text = getRandom(catastropheDialogs[voice]);
    speak(text, voice);
}
*/

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