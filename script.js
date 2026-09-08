/* ============================================================
   ERI'S UNIVERSE — FIRST MONTHSARY SURPRISE
   Marc ❤️ Eri

   FLOW:
   Intro
      ↓
   Galaxy
      ↓
   Heart made of stars
      ↓
   Journey through space
      ↓
   Earth
      ↓
   "Do you want to continue loving Marc?"
      ↓
   Evil NO button 😭
      ↓
   YES ❤️
      ↓
   Eri's Garden
      ↓
   Flower Heart + Letter
   ============================================================ */


/* ============================================================
   CONFIGURATION
   ============================================================ */

const CONFIG = {

    finalMilestone: 15,

    midMilestoneMin: 8,
    midMilestoneMax: 12,

    milestoneMessage:
        "Look how beautiful it became. ❤️",

    finalMessage:
`Happy 1st Monthsary, Eri! ❤️

I know you accidentally discovered the flowers before I could surprise you.

So...

I had to make the universe a little bigger. 🤭

I may not always be able to give you the biggest or most expensive things,
but I hope you know that everything I give you comes with a lot of thought,
effort, and love.

Every flower you planted here represents another little memory
I hope we get to make together.

And among all the stars,
all the planets,
and all the people in this huge world...

I'm really happy that somehow,
I found you.

Thank you for being my favorite person,
my favorite notification,
my favorite kausap,
and one of the best things that happened to me.

Happy first monthsary, baby. ❤️

Here's to more months,
more memories,
more kulit,
more lambing,
more adventures,
and hopefully...

many more trips around the sun together.

I love youu, Erina. ❤️

— Marc`,

    flowerPalettes: {

        rose: {
            colors: [
                '#b3273f',
                '#8c1f34',
                '#d84a63'
            ],
            petals: 10,
            glow: 'rgba(179,39,63,0.5)'
        },

        daisy: {
            colors: [
                '#f6ead9',
                '#ffffff',
                '#f2dcc4'
            ],
            petals: 12,
            glow: 'rgba(246,234,217,0.55)',
            center: '#e8c073'
        },

        tulip: {
            colors: [
                '#f2a6b0',
                '#e0607a',
                '#c94f6d'
            ],
            petals: 5,
            glow: 'rgba(242,166,176,0.5)'
        },

        sunflower: {
            colors: [
                '#e8c073',
                '#e0a83f',
                '#f0cd80'
            ],
            petals: 14,
            glow: 'rgba(232,192,115,0.55)',
            center: '#5c3a21'
        },

        peony: {
            colors: [
                '#f2a6b0',
                '#f6ead9',
                '#d84a63'
            ],
            petals: 16,
            glow: 'rgba(242,166,176,0.5)'
        }
    }
};


const FLOWER_TYPES =
    Object.keys(CONFIG.flowerPalettes);


const AFFIRMATIONS = [

    'You are so loved',

    'You are enough',

    'You are beautiful, inside and out',

    'You are safe here',

    'Fuerte ka mucho',

    'Proud mucho yo contigo',

    'You make my world brighter',

    'Ikaw akong paboritong tawo',

    'Your smile is my favorite view',

    'You deserve every good thing',

    'Bien querido ka conmigo',

    'I love you endlessly',

    'You are worthy of love',

    'Maayo kaayo imong gibuhat',

    'Mahal na mahal kita',

    'Ikaw akong puluy-anan',

    'Importante kaayo ka para nako',

    'Precious kaayo ka para nako',

    'Valid ang imong feelings',

    'You light up every room'
];



/* ============================================================
   BASIC REFERENCES
   ============================================================ */

const bgMusic =
    document.getElementById('bg-music');

const musicBtn =
    document.getElementById('music-btn');

const musicIcon =
    document.getElementById('music-icon');

const skyEl =
    document.getElementById('sky');

const garden =
    document.getElementById('garden');

const flowerLayer =
    document.getElementById('flower-layer');

const instruction =
    document.getElementById('instruction');

const counterNum =
    document.getElementById('counter-num');

const milestoneToast =
    document.getElementById('milestone-toast');

const finalScene =
    document.getElementById('final-scene');

const letterText =
    document.getElementById('letter-text');

const plantMoreBtn =
    document.getElementById('plant-more-btn');

const bubbleLayer =
    document.getElementById('bubble-layer');


const prefersReducedMotion =
    window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;



/* ============================================================
   CREATE CINEMATIC HTML
   ============================================================ */

function createCinematicScenes() {

    const cinematic = document.createElement('div');

    cinematic.id = 'cinematic';


    cinematic.innerHTML = `

        <!-- INTRO -->

        <section
            id="intro-scene"
            class="cinematic-scene active"
        >

            <div class="intro-stars"></div>

            <div class="scene-content intro-content">

                <p class="scene-small">
                    FOR MY FAVORITE PERSON
                </p>

                <h1 class="cinematic-title">
                    Hi, Eri. ❤️
                </h1>

                <p class="cinematic-text">
                    So... you accidentally discovered
                    my little flower surprise.
                </p>

                <p class="cinematic-text delayed-text">
                    Which means I had to improvise.
                    🤭
                </p>

                <p class="cinematic-text delayed-text-2">
                    I made our little universe
                    a bit bigger instead.
                </p>

                <button
                    id="enter-universe-btn"
                    class="universe-btn"
                >
                    Enter our little universe ✨
                </button>

            </div>

        </section>



        <!-- GALAXY -->

        <section
            id="galaxy-scene"
            class="cinematic-scene"
        >

            <div id="galaxy-stars"></div>

            <div class="galaxy-core"></div>

            <div class="galaxy-cloud cloud-one"></div>
            <div class="galaxy-cloud cloud-two"></div>
            <div class="galaxy-cloud cloud-three"></div>

            <div
                id="galaxy-message"
                class="space-message"
            >

                <p>
                    The universe is ridiculously huge.
                </p>

            </div>

        </section>



        <!-- HEART CONSTELLATION -->

        <section
            id="heart-scene"
            class="cinematic-scene"
        >

            <div id="heart-star-field"></div>

            <div
                id="star-heart"
                aria-hidden="true"
            ></div>

            <div
                id="heart-message"
                class="space-message heart-message"
            >

                <p>
                    And somewhere between
                    all these stars...
                </p>

                <h2>
                    I still found my
                    favorite person.
                </h2>

                <span>
                    ❤️
                </span>

            </div>

        </section>



        <!-- SPACE JOURNEY -->

        <section
            id="journey-scene"
            class="cinematic-scene"
        >

            <div id="warp-stars"></div>

            <div class="planet planet-one"></div>

            <div class="planet planet-two"></div>

            <div class="planet planet-three"></div>

            <div class="shooting-star shooting-one"></div>

            <div class="shooting-star shooting-two"></div>

            <div
                id="journey-message"
                class="space-message"
            >

                <p>
                    Okay...
                </p>

                <h2>
                    let's go back to Earth.
                </h2>

            </div>

        </section>



        <!-- EARTH -->

        <section
            id="earth-scene"
            class="cinematic-scene"
        >

            <div id="earth-stars"></div>

            <div class="earth-wrapper">

                <div class="earth-glow"></div>

                <div class="earth">

                    <div class="earth-rotator">

                        <div class="earth-land land-one"></div>

                        <div class="earth-land land-two"></div>

                        <div class="earth-land land-three"></div>

                        <div class="earth-land land-four"></div>

                        <div class="earth-land land-five"></div>

                    </div>

                    <div class="earth-clouds"></div>

                    <div class="earth-shading"></div>

                </div>

                <div class="moon-orbit">

                    <div class="moon"></div>

                </div>

            </div>


            <div
                id="earth-message"
                class="space-message earth-message"
            >

                <p>
                    Out of everyone
                    on this planet...
                </p>

                <h2>
                    I have one important
                    question for you.
                </h2>

            </div>

        </section>



        <!-- QUESTION -->

        <section
            id="question-scene"
            class="cinematic-scene"
        >

            <div id="question-stars"></div>

            <div
                class="question-card"
                id="question-card"
            >

                <p class="scene-small">
                    VERY IMPORTANT QUESTION
                </p>

                <h1>
                    Do you want to continue
                    loving Marc?
                </h1>

                <p
                    id="question-reaction"
                    class="question-reaction"
                >
                    Choose wisely, baby. 🤨
                </p>

                <p class="question-hint">
                    psst — zoom out (Ctrl/Cmd + −) kung gusto mo makita saan tumatakbo si No 👀
                </p>

                
                <div
                    id="answer-area"
                    class="answer-area"
                >

                    <button
                        id="yes-btn"
                        class="answer-btn yes-btn"
                    >
                        YES ❤️
                    </button>

                    <button
                        id="no-btn"
                        class="answer-btn no-btn"
                    >
                        No 😭
                    </button>

                </div>

            </div>

        </section>



        <!-- YES CELEBRATION -->

        <section
            id="yes-scene"
            class="cinematic-scene"
        >

            <div id="celebration-stars"></div>

            <div class="celebration-content">

                <div class="big-heart">
                    ❤️
                </div>

                <h1>
                    I KNEW IT
                </h1>

                <p>
                    HAHAHAHAHA
                </p>

                <span>
                    Good choice, baby. 😌
                </span>

            </div>

        </section>

    `;


    document.body.prepend(cinematic);
}



/* ============================================================
   INITIALIZE CINEMATIC
   ============================================================ */

createCinematicScenes();


const cinematic =
    document.getElementById('cinematic');

const introScene =
    document.getElementById('intro-scene');

const galaxyScene =
    document.getElementById('galaxy-scene');

const heartScene =
    document.getElementById('heart-scene');

const journeyScene =
    document.getElementById('journey-scene');

const earthScene =
    document.getElementById('earth-scene');

const questionScene =
    document.getElementById('question-scene');

const yesScene =
    document.getElementById('yes-scene');


const enterUniverseBtn =
    document.getElementById('enter-universe-btn');

const yesBtn =
    document.getElementById('yes-btn');

const noBtn =
    document.getElementById('no-btn');

const questionReaction =
    document.getElementById('question-reaction');

const answerArea =
    document.getElementById('answer-area');



/* ============================================================
   INITIAL STATE
   ============================================================ */

garden.style.opacity = '0';
garden.style.pointerEvents = 'none';

if (bubbleLayer) {
    bubbleLayer.style.opacity = '0';
}



/* ============================================================
   GENERAL SCENE TRANSITION
   ============================================================ */

function switchScene(from, to) {

    if (!from || !to) return;

    from.classList.add('scene-leaving');

    setTimeout(() => {

        from.classList.remove('active');

        from.classList.remove('scene-leaving');

        to.classList.add('active');

    }, 1100);
}



/* ============================================================
   STAR GENERATOR
   ============================================================ */

function generateStars(
    container,
    count = 100,
    className = 'cinematic-star'
) {

    if (!container) return;

    const fragment =
        document.createDocumentFragment();


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const star =
            document.createElement('span');

        star.className = className;

        star.style.left =
            Math.random() * 100 + '%';

        star.style.top =
            Math.random() * 100 + '%';

        const size =
            Math.random() * 2.7 + 0.8;

        star.style.width =
            size + 'px';

        star.style.height =
            size + 'px';

        star.style.opacity =
            Math.random() * 0.7 + 0.25;

        star.style.animationDelay =
            Math.random() * 5 + 's';

        star.style.animationDuration =
            (
                Math.random() * 3 + 2
            ) + 's';

        fragment.appendChild(star);
    }


    container.appendChild(fragment);
}



/* ============================================================
   GENERATE SPACE BACKGROUNDS
   ============================================================ */

generateStars(
    document.querySelector('.intro-stars'),
    100
);

generateStars(
    document.getElementById('galaxy-stars'),
    180
);

generateStars(
    document.getElementById('heart-star-field'),
    130
);

generateStars(
    document.getElementById('earth-stars'),
    150
);

generateStars(
    document.getElementById('question-stars'),
    110
);

generateStars(
    document.getElementById('celebration-stars'),
    180
);



/* ============================================================
   HEART MADE OF STARS
   ============================================================ */

function createStarHeart() {

    const heart =
        document.getElementById('star-heart');

    if (!heart) return;


    const STAR_COUNT = 150;


    for (
        let i = 0;
        i < STAR_COUNT;
        i++
    ) {

        const star =
            document.createElement('span');

        star.className =
            'heart-star';


        /*
            Parametric heart equation

            x = 16 sin³(t)

            y =
            13 cos(t)
            - 5 cos(2t)
            - 2 cos(3t)
            - cos(4t)
        */

        const t =
            Math.random() *
            Math.PI *
            2;


        const x =
            16 *
            Math.pow(
                Math.sin(t),
                3
            );


        const y =
            13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t);


        /*
            Add some thickness so it
            doesn't look like only an outline.
        */

        const depth =
            Math.random() * 0.35 + 0.65;


        const finalX =
            x * depth;


        const finalY =
            y * depth;


        star.style.left =
            (
                50 +
                finalX * 2.4
            ) + '%';


        star.style.top =
            (
                48 -
                finalY * 2.4
            ) + '%';


        const size =
            randomFloat(
                1.5,
                4.5
            );


        star.style.width =
            size + 'px';

        star.style.height =
            size + 'px';


        star.style.animationDelay =
            randomFloat(
                0,
                3
            ) + 's';


        heart.appendChild(star);
    }
}


createStarHeart();



/* ============================================================
   WARP / MOVING STARS
   ============================================================ */

function createWarpStars() {

    const container =
        document.getElementById('warp-stars');

    if (!container) return;


    const count =
        window.innerWidth < 600
            ? 65
            : 110;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const star =
            document.createElement('span');

        star.className =
            'warp-star';


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            randomInt(
                30,
                350
            );


        star.style.setProperty(
            '--angle',
            angle + 'rad'
        );


        star.style.setProperty(
            '--distance',
            distance + 'px'
        );


        star.style.animationDelay =
            Math.random() *
            2 +
            's';


        container.appendChild(star);
    }
}


createWarpStars();



/* ============================================================
   START MUSIC
   ============================================================ */

function startMusic() {

    if (!bgMusic) return;


    bgMusic.volume = 0;


    bgMusic
        .play()
        .then(() => {

            musicBtn?.classList.add(
                'playing'
            );

            musicBtn?.setAttribute(
                'aria-pressed',
                'true'
            );


            if (musicIcon) {
                musicIcon.textContent = '♫';
            }


            /*
                Smooth fade-in
            */

            let volume = 0;


            const fade =
                setInterval(() => {

                    volume += 0.025;

                    bgMusic.volume =
                        Math.min(
                            volume,
                            0.55
                        );


                    if (
                        volume >= 0.55
                    ) {

                        clearInterval(
                            fade
                        );
                    }

                }, 90);

        })
        .catch(() => {

            /*
                If browser blocks it,
                music button still works.
            */

        });
}



/* ============================================================
   CINEMATIC TIMELINE
   ============================================================ */

enterUniverseBtn.addEventListener(
    'click',
    () => {

        startMusic();

        switchScene(
            introScene,
            galaxyScene
        );


        /*
            GALAXY
        */

        setTimeout(() => {

            const message =
                document.getElementById(
                    'galaxy-message'
                );

            message?.classList.add(
                'message-visible'
            );

        }, 1800);


        /*
            HEART CONSTELLATION
        */

        setTimeout(() => {

            switchScene(
                galaxyScene,
                heartScene
            );

        }, 5500);


        setTimeout(() => {

            document
                .getElementById(
                    'star-heart'
                )
                ?.classList.add(
                    'heart-visible'
                );

        }, 6800);


        setTimeout(() => {

            document
                .getElementById(
                    'heart-message'
                )
                ?.classList.add(
                    'message-visible'
                );

        }, 8300);


        /*
            SPACE JOURNEY
        */

        setTimeout(() => {

            switchScene(
                heartScene,
                journeyScene
            );

        }, 12500);


        setTimeout(() => {

            document
                .getElementById(
                    'journey-message'
                )
                ?.classList.add(
                    'message-visible'
                );

        }, 14500);


        /*
            EARTH
        */

        setTimeout(() => {

            switchScene(
                journeyScene,
                earthScene
            );

        }, 18000);


        setTimeout(() => {

            document
                .getElementById(
                    'earth-message'
                )
                ?.classList.add(
                    'message-visible'
                );

        }, 20000);


        /*
            QUESTION
        */

        setTimeout(() => {

            switchScene(
                earthScene,
                questionScene
            );

        }, 24500);

    }
);



/* ============================================================
   EVIL NO BUTTON HAHAHAHA
   ============================================================ */

let noAttempts = 0;

let yesScale = 1;

let yesTakeover = false;

let lastEscapeTime = 0;

const ESCAPE_COOLDOWN_MS = 550;


const NO_REACTIONS = [

    'Ay? Sure ka? 🤨',

    'Oops. Tumakas siya HAHAHA',

    'Nice try, baby 😌',

    'Hindi yata gumagana yung No 🤔',

    'Hmm... try mo ulit HAHAHA',

    'Grabe gusto mo talaga pindutin? 😭',

    'Baby naman 😔 HAHAHA',

    'Okay. Last chance mo na 😌',

    'Wala na. Tapos na. HAHAHAHA'
];



function escapeNoButton() {

    if (yesTakeover) {
        return;
    }


    /*
        Cooldown so a single hover near the
        button can't fire dozens of times per
        second (mousemove fires very often) and
        instantly blow through every stage.
    */

    const now = Date.now();

    if (now - lastEscapeTime < ESCAPE_COOLDOWN_MS) {
        return;
    }

    lastEscapeTime = now;


    noAttempts++;


    /*
        Change reaction
    */

    const reactionIndex =
        Math.min(
            noAttempts - 1,
            NO_REACTIONS.length - 1
        );


    questionReaction.textContent =
        NO_REACTIONS[
            reactionIndex
        ];



    /*
        Move NO somewhere random
        inside the visible viewport.
    */

    const buttonRect =
        noBtn.getBoundingClientRect();


    const safePadding = 25;


    const maxX =
        window.innerWidth
        - buttonRect.width
        - safePadding;


    const maxY =
        window.innerHeight
        - buttonRect.height
        - safePadding;


    const randomX =
        randomInt(
            safePadding,
            Math.max(
                safePadding,
                maxX
            )
        );


    const randomY =
        randomInt(
            100,
            Math.max(
                120,
                maxY
            )
        );


    noBtn.style.position =
        'fixed';


    noBtn.style.left =
        randomX + 'px';


    noBtn.style.top =
        randomY + 'px';


    noBtn.style.zIndex =
        '9999';


    noBtn.style.transform =
        `rotate(${randomInt(-18, 18)}deg)`;



    /*
        YES grows every time.
    */

    yesScale += 0.22;


    yesBtn.style.setProperty(
        '--yes-scale',
        yesScale
    );


    yesBtn.style.zIndex =
        50;



    /*
        Make YES increasingly dramatic.
    */

    if (noAttempts >= 3) {

        yesBtn.classList.add(
            'yes-glowing'
        );
    }


    if (noAttempts >= 5) {

        questionReaction.textContent =
            'Parang YES talaga ang sagot dito baby 😭❤️';
    }


    if (noAttempts >= 7) {

        questionReaction.textContent =
            'Okay... pinipilit mo ako HAHAHAHA';
    }



    /*
        After enough attempts...

        YES TAKES OVER THE SCREEN.
    */

    if (noAttempts >= 8) {

        activateYesTakeover();
    }
}



/* ============================================================
   YES FULL SCREEN TAKEOVER
   ============================================================ */

function activateYesTakeover() {

    if (yesTakeover) return;


    yesTakeover = true;


    questionReaction.textContent =
        'WALA KA NANG CHOICE HAHAHAHAHA 😭❤️';


    noBtn.classList.add(
        'no-defeated'
    );


    noBtn.style.transform =
        'scale(.5)';


    setTimeout(() => {

        noBtn.style.display =
            'none';

    }, 350);


    yesBtn.classList.add(
        'yes-takeover'
    );


    yesBtn.textContent =
        'YES ❤️ HAHAHAHA';
}



/* ============================================================
   NO BUTTON EVENTS

   By design: the No button does NOT move on hover. It stays
   put and only jumps to a new random spot, plays a reaction,
   and grows Yes a little more, the moment it's actually
   clicked/tapped. After enough clicks it disappears for good.
   ============================================================ */

/*
   Mobile:
   Tapping it counts as a click.
*/

noBtn.addEventListener(
    'touchstart',
    event => {

        event.preventDefault();

        escapeNoButton();

    },
    {
        passive: false
    }
);


/*
   Just in case she somehow manages
   to click it 😭
*/

noBtn.addEventListener(
    'click',
    event => {

        event.preventDefault();

        escapeNoButton();

    }
);



/* ============================================================
   YES BUTTON
   ============================================================ */

yesBtn.addEventListener(
    'click',
    () => {

        switchScene(
            questionScene,
            yesScene
        );


        createCelebrationHearts();


        setTimeout(() => {

            enterGarden();

        }, 4500);

    }
);



/* ============================================================
   CELEBRATION HEARTS
   ============================================================ */

function createCelebrationHearts() {

    const scene =
        document.getElementById(
            'yes-scene'
        );


    if (!scene) return;


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const heart =
            document.createElement(
                'span'
            );


        heart.className =
            'celebration-heart';


        heart.textContent =
            Math.random() > 0.25
                ? '❤️'
                : '✨';


        heart.style.left =
            randomInt(
                0,
                100
            ) + 'vw';


        heart.style.animationDelay =
            randomFloat(
                0,
                2
            ) + 's';


        heart.style.fontSize =
            randomFloat(
                0.8,
                2.2
            ) + 'rem';


        scene.appendChild(
            heart
        );


        setTimeout(
            () => heart.remove(),
            6500
        );
    }
}



/* ============================================================
   ENTER ORIGINAL GARDEN
   ============================================================ */

function enterGarden() {

    yesScene.classList.add(
        'scene-leaving'
    );


    setTimeout(() => {

        cinematic.style.display =
            'none';


        garden.style.opacity =
            '1';


        garden.style.pointerEvents =
            'auto';


        garden.style.transition =
            'opacity 2s ease';


        if (bubbleLayer) {

            bubbleLayer.style.opacity =
                '1';

            bubbleLayer.style.transition =
                'opacity 2s ease';
        }


        skyEl.style.opacity =
            '1';


        instruction.textContent =
            '✿ Now plant our little garden ✿';


    }, 1200);
}



/* ============================================================
   ORIGINAL GARDEN SKY
   ============================================================ */

function initSky() {

    const starsWrap =
        document.getElementById(
            'stars'
        );


    if (!starsWrap) return;


    const starCount =
        window.innerWidth < 600
            ? 60
            : 110;


    const fragment =
        document.createDocumentFragment();


    for (
        let i = 0;
        i < starCount;
        i++
    ) {

        const star =
            document.createElement(
                'div'
            );


        star.className =
            'star';


        star.style.left =
            Math.random() *
            100 +
            '%';


        star.style.top =
            Math.random() *
            70 +
            '%';


        star.style.setProperty(
            '--s',
            (
                Math.random() *
                1.8 +
                1
            ).toFixed(2) +
            'px'
        );


        star.style.setProperty(
            '--o',
            (
                Math.random() *
                0.5 +
                0.35
            ).toFixed(2)
        );


        star.style.setProperty(
            '--dur',
            (
                Math.random() *
                3 +
                2.5
            ).toFixed(2) +
            's'
        );


        star.style.setProperty(
            '--delay',
            (
                Math.random() *
                4
            ).toFixed(2) +
            's'
        );


        fragment.appendChild(
            star
        );
    }


    starsWrap.appendChild(
        fragment
    );


    /*
        Fireflies
    */

    if (
        !prefersReducedMotion
    ) {

        const fireWrap =
            document.getElementById(
                'fireflies'
            );


        if (!fireWrap) return;


        const fireCount =
            window.innerWidth < 600
                ? 5
                : 9;


        for (
            let i = 0;
            i < fireCount;
            i++
        ) {

            const firefly =
                document.createElement(
                    'div'
                );


            firefly.className =
                'firefly';


            firefly.style.left =
                Math.random() *
                100 +
                '%';


            firefly.style.top =
                40 +
                Math.random() *
                55 +
                '%';


            firefly.style.setProperty(
                '--dur',
                (
                    Math.random() *
                    6 +
                    9
                ) +
                's'
            );


            firefly.style.setProperty(
                '--delay',
                (
                    Math.random() *
                    6
                ) +
                's'
            );


            firefly.style.setProperty(
                '--dx',
                (
                    Math.random() *
                    80 -
                    40
                ) +
                'px'
            );


            firefly.style.setProperty(
                '--dy',
                (
                    Math.random() *
                    -80 -
                    20
                ) +
                'px'
            );


            firefly.style.setProperty(
                '--dx2',
                (
                    Math.random() *
                    80 -
                    40
                ) +
                'px'
            );


            firefly.style.setProperty(
                '--dy2',
                (
                    Math.random() *
                    -160 -
                    60
                ) +
                'px'
            );


            fireWrap.appendChild(
                firefly
            );
        }
    }
}



/* ============================================================
   FLOWER VARIABLES
   ============================================================ */

let flowerCount = 0;


let midMilestoneTarget =
    randomInt(
        CONFIG.midMilestoneMin,
        CONFIG.midMilestoneMax
    );


let midMilestoneShown =
    false;


let finalSceneTriggered =
    false;


const plantedFlowers = [];



/* ============================================================
   FLOWER SVG GENERATOR
   ============================================================ */

function buildBloomSVG(
    type,
    size,
    colorSet
) {

    const palette =
        CONFIG.flowerPalettes[
            type
        ];


    const cx =
        size / 2;


    const cy =
        size / 2;


    const petalCount =
        palette.petals +
        randomInt(
            -2,
            2
        );


    const svgNS =
        'http://www.w3.org/2000/svg';


    const svg =
        document.createElementNS(
            svgNS,
            'svg'
        );


    svg.setAttribute(
        'width',
        size
    );


    svg.setAttribute(
        'height',
        size
    );


    svg.setAttribute(
        'viewBox',
        `0 0 ${size} ${size}`
    );


    const petalGroup =
        document.createElementNS(
            svgNS,
            'g'
        );



    for (
        let i = 0;
        i < petalCount;
        i++
    ) {

        const angle =
            (
                360 /
                petalCount
            ) *
            i +
            randomFloat(
                -6,
                6
            );


        const petalColor =
            colorSet[
                i %
                colorSet.length
            ];


        const petal =
            document.createElementNS(
                svgNS,
                'ellipse'
            );


        let rx;
        let ry;
        let dist;


        if (
            type === 'rose' ||
            type === 'peony'
        ) {

            rx =
                size *
                0.20 *
                randomFloat(
                    0.85,
                    1.15
                );


            ry =
                size *
                0.28 *
                randomFloat(
                    0.9,
                    1.15
                );


            dist =
                size *
                0.13 *
                (
                    1 +
                    (
                        i % 3
                    ) *
                    0.32
                );

        }

        else if (
            type === 'tulip'
        ) {

            rx =
                size *
                0.17;

            ry =
                size *
                0.36;

            dist =
                size *
                0.06;

        }

        else if (
            type === 'sunflower'
        ) {

            rx =
                size *
                0.115;

            ry =
                size *
                0.32;

            dist =
                size *
                0.15;

        }

        else {

            rx =
                size *
                0.10;

            ry =
                size *
                0.33;

            dist =
                size *
                0.13;
        }


        const rad =
            (
                angle *
                Math.PI
            ) /
            180;


        const px =
            cx +
            Math.cos(
                rad
            ) *
            dist;


        const py =
            cy +
            Math.sin(
                rad
            ) *
            dist;


        petal.setAttribute(
            'cx',
            px
        );


        petal.setAttribute(
            'cy',
            py
        );


        petal.setAttribute(
            'rx',
            rx
        );


        petal.setAttribute(
            'ry',
            ry
        );


        petal.setAttribute(
            'fill',
            petalColor
        );


        petal.setAttribute(
            'opacity',
            (
                0.9 +
                Math.random() *
                0.1
            ).toFixed(2)
        );


        petal.setAttribute(
            'transform',
            `rotate(${angle} ${px} ${py})`
        );


        petalGroup.appendChild(
            petal
        );
    }


    svg.appendChild(
        petalGroup
    );


    /*
        Center
    */

    const center =
        document.createElementNS(
            svgNS,
            'circle'
        );


    center.setAttribute(
        'cx',
        cx
    );


    center.setAttribute(
        'cy',
        cy
    );


    center.setAttribute(
        'r',
        size *
        (
            type ===
            'sunflower'
                ? 0.16
                : 0.09
        )
    );


    center.setAttribute(
        'fill',
        palette.center ||
        '#e8c073'
    );


    svg.appendChild(
        center
    );


    return svg;
}



/* ============================================================
   PLANT FLOWER
   ============================================================ */

function plantFlower(
    x,
    y
) {

    if (
        finalSceneTriggered
    ) {
        return;
    }


    spawnRipple(
        x,
        y
    );


    const type =
        FLOWER_TYPES[
            randomInt(
                0,
                FLOWER_TYPES.length - 1
            )
        ];


    const palette =
        CONFIG.flowerPalettes[
            type
        ];


    const stemHeight =
        randomInt(
            90,
            150
        );


    const bloomSize =
        randomInt(
            96,
            150
        );


    const tilt =
        randomFloat(
            -6,
            6
        );


    const bloomRotate =
        randomFloat(
            -10,
            10
        );


    const growDur =
        randomFloat(
            1,
            1.4
        );


    const bloomDur =
        randomFloat(
            1.1,
            1.5
        );


    const bloomDelay =
        growDur;


    const swayDur =
        randomFloat(
            3.6,
            5.4
        );


    const swayDelay =
        randomFloat(
            0,
            1.5
        );



    const flowerEl =
        document.createElement(
            'div'
        );


    flowerEl.className =
        'flower';


    flowerEl.style.left =
        x + 'px';


    flowerEl.style.setProperty(
        '--tilt',
        tilt + 'deg'
    );


    flowerEl.style.transform =
        `rotate(${tilt}deg)`;



    /* STEM */

    const stem =
        document.createElement(
            'div'
        );


    stem.className =
        'stem';


    stem.style.height =
        stemHeight +
        'px';


    stem.style.setProperty(
        '--grow-dur',
        growDur +
        's'
    );


    flowerEl.appendChild(
        stem
    );



    /* LEAVES */

    const leafCount =
        randomInt(
            1,
            2
        );


    for (
        let i = 0;
        i < leafCount;
        i++
    ) {

        const leaf =
            document.createElement(
                'div'
            );


        leaf.className =
            'leaf';


        const side =
            i % 2 === 0
                ? 1
                : -1;


        const leafY =
            stemHeight *
            randomFloat(
                0.3,
                0.6
            );


        const lw =
            randomInt(
                14,
                20
            );


        const lh =
            randomInt(
                8,
                12
            );


        leaf.style.setProperty(
            '--lw',
            lw + 'px'
        );


        leaf.style.setProperty(
            '--lh',
            lh + 'px'
        );


        leaf.style.bottom =
            leafY +
            'px';


        leaf.style.left =
            `calc(50% + ${
                side *
                (
                    lw *
                    0.7
                )
            }px)`;


        const lrot =
            side *
            randomFloat(
                25,
                45
            );


        leaf.style.setProperty(
            '--lrot',
            lrot + 'deg'
        );


        leaf.style.setProperty(
            '--leaf-delay',
            (
                growDur *
                0.5 +
                i *
                0.15
            ) +
            's'
        );


        flowerEl.appendChild(
            leaf
        );
    }



    /* BLOOM */

    const bloomWrap =
        document.createElement(
            'div'
        );


    bloomWrap.className =
        'bloom';


    bloomWrap.style.bottom =
        stemHeight -
        4 +
        'px';


    bloomWrap.style.setProperty(
        '--brot',
        bloomRotate +
        'deg'
    );


    bloomWrap.style.setProperty(
        '--bloom-dur',
        bloomDur +
        's'
    );


    bloomWrap.style.setProperty(
        '--bloom-delay',
        bloomDelay +
        's'
    );


    bloomWrap.style.setProperty(
        '--glow-color',
        palette.glow
    );


    const svg =
        buildBloomSVG(
            type,
            bloomSize,
            palette.colors
        );


    bloomWrap.appendChild(
        svg
    );


    flowerEl.appendChild(
        bloomWrap
    );


    flowerLayer.appendChild(
        flowerEl
    );


    plantedFlowers.push({

        el: flowerEl,

        bloomWrap,

        stemHeight,

        x
    });



    /*
        Start swaying
    */

    const totalDelay =
        (
            bloomDelay +
            bloomDur
        ) *
        1000;


    setTimeout(
        () => {

            if (
                !prefersReducedMotion
            ) {

                flowerEl
                    .classList
                    .add(
                        'swaying'
                    );


                flowerEl
                    .style
                    .setProperty(
                        '--sway-dur',
                        swayDur +
                        's'
                    );


                flowerEl
                    .style
                    .setProperty(
                        '--sway-delay',
                        swayDelay +
                        's'
                    );
            }


            spawnBloomParticles(
                x,
                y -
                stemHeight,
                palette.colors[0]
            );

        },
        totalDelay
    );


    registerFlowerPlanted();
}



/* ============================================================
   PLANT RIPPLE
   ============================================================ */

function spawnRipple(
    x,
    y
) {

    const ripple =
        document.createElement(
            'div'
        );


    ripple.className =
        'plant-ripple';


    ripple.style.left =
        x +
        'px';


    ripple.style.bottom =
        (
            window.innerHeight -
            y
        ) +
        'px';


    garden.appendChild(
        ripple
    );


    setTimeout(
        () => ripple.remove(),
        750
    );
}



/* ============================================================
   FLOWER PARTICLES
   ============================================================ */

function spawnBloomParticles(
    x,
    yFromBottom,
    color
) {

    if (
        prefersReducedMotion
    ) {
        return;
    }


    const count =
        randomInt(
            5,
            8
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const particle =
            document.createElement(
                'div'
            );


        particle.className =
            'bloom-particle';


        particle.style.left =
            x +
            randomInt(
                -6,
                6
            ) +
            'px';


        particle.style.bottom =
            yFromBottom +
            randomInt(
                -6,
                6
            ) +
            'px';


        particle.style.background =
            color;


        particle.style.setProperty(
            '--px',
            randomInt(
                -30,
                30
            ) +
            'px'
        );


        particle.style.setProperty(
            '--py',
            randomInt(
                -30,
                10
            ) +
            'px'
        );


        garden.appendChild(
            particle
        );


        setTimeout(
            () => particle.remove(),
            950
        );
    }
}



/* ============================================================
   FLOWER PROGRESSION
   ============================================================ */

function registerFlowerPlanted() {

    flowerCount++;


    counterNum.textContent =
        flowerCount;


    if (
        flowerCount === 1
    ) {

        instruction
            .classList
            .add(
                'hidden'
            );
    }


    if (
        !midMilestoneShown &&
        flowerCount ===
        midMilestoneTarget
    ) {

        midMilestoneShown =
            true;


        showMilestoneToast(
            CONFIG.milestoneMessage
        );
    }


    if (
        !finalSceneTriggered &&
        flowerCount >=
        CONFIG.finalMilestone
    ) {

        finalSceneTriggered =
            true;


        setTimeout(
            triggerFinalScene,
            500
        );
    }
}



/* ============================================================
   MILESTONE MESSAGE
   ============================================================ */

function showMilestoneToast(
    text
) {

    milestoneToast.textContent =
        text;


    milestoneToast
        .classList
        .remove(
            'hidden'
        );


    requestAnimationFrame(
        () => {

            milestoneToast
                .classList
                .add(
                    'show'
                );
        }
    );


    setTimeout(
        () => {

            milestoneToast
                .classList
                .remove(
                    'show'
                );


            setTimeout(
                () => {

                    milestoneToast
                        .classList
                        .add(
                            'hidden'
                        );

                },
                1500
            );

        },
        3200
    );
}



/* ============================================================
   FINAL FLOWER HEART
   ============================================================ */

function triggerFinalScene() {

    const cx =
        window.innerWidth /
        2;


    const cyFromBottom =
        window.innerHeight *
        0.42;


    const scale =
        Math.min(
            window.innerWidth,
            window.innerHeight
        ) /
        32;



    plantedFlowers.forEach(
        (flower, index) => {

            const t =
                (
                    index /
                    plantedFlowers.length
                ) *
                Math.PI *
                2;


            const hx =
                16 *
                Math.pow(
                    Math.sin(t),
                    3
                );


            const hy =
                13 *
                Math.cos(t)

                - 5 *
                Math.cos(
                    2 * t
                )

                - 2 *
                Math.cos(
                    3 * t
                )

                - Math.cos(
                    4 * t
                );


            const targetX =
                cx +
                hx *
                scale -
                flower.x;


            const targetYFromBottom =
                cyFromBottom +
                hy *
                scale;


            flower.el.style.transition =
                `transform ${
                    2 +
                    Math.random() *
                    0.6
                }s cubic-bezier(0.65,0,0.35,1)`;


            flower.el.style.transform =
                `translate(
                    ${targetX}px,
                    ${-targetYFromBottom}px
                )
                scale(${
                    randomFloat(
                        0.26,
                        0.36
                    )
                })
                rotate(0deg)`;


            flower.el
                .classList
                .remove(
                    'swaying'
                );
        }
    );



    skyEl.style.filter =
        'brightness(0.45) saturate(0.85)';



    setTimeout(
        () => {

            finalScene
                .classList
                .remove(
                    'hidden'
                );


            requestAnimationFrame(
                () => {

                    finalScene
                        .classList
                        .add(
                            'show'
                        );
                }
            );


            typeLetter(
                CONFIG.finalMessage
            );

        },
        1500
    );
}



/* ============================================================
   LETTER TYPEWRITER
   ============================================================ */

function typeLetter(
    fullText
) {

    letterText.textContent =
        '';


    letterText
        .classList
        .add(
            'typing'
        );


    if (
        prefersReducedMotion
    ) {

        letterText.textContent =
            fullText;


        letterText
            .classList
            .remove(
                'typing'
            );


        return;
    }


    let i = 0;


    const speed =
        22;


    function step() {

        if (
            i <=
            fullText.length
        ) {

            letterText.textContent =
                fullText.slice(
                    0,
                    i
                );


            i++;


            setTimeout(
                step,
                speed
            );

        }

        else {

            letterText
                .classList
                .remove(
                    'typing'
                );
        }
    }


    setTimeout(
        step,
        500
    );
}



/* ============================================================
   PLANT MORE
   ============================================================ */

plantMoreBtn.addEventListener(
    'click',
    () => {

        finalScene
            .classList
            .remove(
                'show'
            );


        setTimeout(
            () => {

                finalScene
                    .classList
                    .add(
                        'hidden'
                    );

            },
            1200
        );


        skyEl.style.filter =
            '';


        plantedFlowers.length =
            0;


        flowerLayer.innerHTML =
            '';


        flowerCount =
            0;


        counterNum.textContent =
            '0';


        midMilestoneTarget =
            randomInt(
                CONFIG.midMilestoneMin,
                CONFIG.midMilestoneMax
            );


        midMilestoneShown =
            false;


        finalSceneTriggered =
            false;


        instruction
            .classList
            .remove(
                'hidden'
            );


        instruction.textContent =
            '✿ Click anywhere to plant another garden ✿';
    }
);



/* ============================================================
   GARDEN INPUT
   ============================================================ */

function handlePlantEvent(
    clientX,
    clientY,
    targetEl
) {

    if (
        targetEl.closest(
            '#music-btn, #final-scene, #counter'
        )
    ) {
        return;
    }


    plantFlower(
        clientX,
        clientY
    );
}



garden.addEventListener(
    'click',
    event => {

        handlePlantEvent(
            event.clientX,
            event.clientY,
            event.target
        );
    }
);



garden.addEventListener(
    'touchend',
    event => {

        if (
            event.changedTouches.length ===
            0
        ) {
            return;
        }


        const touch =
            event.changedTouches[0];


        handlePlantEvent(
            touch.clientX,
            touch.clientY,
            event.target
        );

    },
    {
        passive: true
    }
);



/* ============================================================
   MUSIC BUTTON
   ============================================================ */

musicBtn?.addEventListener(
    'click',
    event => {

        /*
            Don't let clicking music
            plant a flower.
        */

        event.stopPropagation();


        if (
            bgMusic.paused
        ) {

            bgMusic.volume =
                0.55;


            bgMusic
                .play()
                .catch(
                    () => {}
                );


            musicBtn
                .classList
                .add(
                    'playing'
                );


            musicBtn
                .setAttribute(
                    'aria-pressed',
                    'true'
                );


            musicBtn
                .setAttribute(
                    'aria-label',
                    'Pause background music'
                );


            if (
                musicIcon
            ) {

                musicIcon.textContent =
                    '♫';
            }

        }

        else {

            bgMusic.pause();


            musicBtn
                .classList
                .remove(
                    'playing'
                );


            musicBtn
                .setAttribute(
                    'aria-pressed',
                    'false'
                );


            musicBtn
                .setAttribute(
                    'aria-label',
                    'Play background music'
                );


            if (
                musicIcon
            ) {

                musicIcon.textContent =
                    '♪';
            }
        }
    }
);



/* ============================================================
   AFFIRMATION BUBBLES
   ============================================================ */

function spawnAffirmationBubble() {

    if (!bubbleLayer) {
        return;
    }


    const bubble =
        document.createElement(
            'div'
        );


    bubble.className =
        'aff-bubble';


    bubble.textContent =
        AFFIRMATIONS[
            randomInt(
                0,
                AFFIRMATIONS.length - 1
            )
        ];


    const startX =
        randomInt(
            4,
            92
        );


    bubble.style.left =
        startX +
        'vw';


    bubble.style.setProperty(
        '--bsize',
        randomFloat(
            0.85,
            1.15
        ).toFixed(2) +
        'rem'
    );


    if (
        prefersReducedMotion
    ) {

        bubble.style.setProperty(
            '--bstatic-y',
            randomInt(
                10,
                70
            ) +
            'vh'
        );


        bubble.style.setProperty(
            '--bdur',
            randomFloat(
                5,
                7
            ).toFixed(1) +
            's'
        );

    }

    else {

        bubble.style.setProperty(
            '--bdur',
            randomFloat(
                12,
                18
            ).toFixed(1) +
            's'
        );


        bubble.style.setProperty(
            '--bdx',
            randomInt(
                -60,
                60
            ) +
            'px'
        );
    }


    bubbleLayer.appendChild(
        bubble
    );


    const lifespan =
        prefersReducedMotion
            ? 7000
            : 19000;


    setTimeout(
        () => bubble.remove(),
        lifespan
    );
}



function startAffirmationBubbles() {

    function loop() {

        /*
            Only spawn once garden
            has actually been revealed.
        */

        if (
            cinematic.style.display ===
            'none'
        ) {

            spawnAffirmationBubble();
        }


        const nextIn =
            randomInt(
                2600,
                5200
            );


        setTimeout(
            loop,
            nextIn
        );
    }


    loop();
}



/* ============================================================
   RANDOM UTILITIES
   ============================================================ */

function randomInt(
    min,
    max
) {

    return Math.floor(
        Math.random() *
        (
            max -
            min +
            1
        )
    ) +
    min;
}



function randomFloat(
    min,
    max
) {

    return (
        Math.random() *
        (
            max -
            min
        )
        +
        min
    );
}



/* ============================================================
   INITIALIZE
   ============================================================ */

initSky();

startAffirmationBubbles();


/* ============================================================
   LITTLE CONSOLE EASTER EGG ❤️
   ============================================================ */

console.log(
    '%cHi Eri ❤️',
    'font-size:24px; color:#f2a6b0; font-weight:bold;'
);


console.log(
    '%cIf you somehow opened DevTools... Marc really did code all of this for you HAHAHA.',
    'font-size:14px; color:#e8c073;'
);