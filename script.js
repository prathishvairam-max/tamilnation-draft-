const viewButton = document.getElementById("view-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const mainMenu = document.getElementById("main-menu");
const toast = document.getElementById("toast");

/* =========================
   EXPLORE BUTTON
========================= */

viewButton?.addEventListener("click", () => {
    welcomeScreen.style.opacity = "0";
    welcomeScreen.style.transform = "scale(1.03)";

    setTimeout(() => {
        welcomeScreen.classList.add("hidden");
        mainMenu.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 500);
});


/* =========================
   OPEN A SECTION
========================= */

function openSection(sectionId) {

    const sections = document.querySelectorAll(".info-box");

    sections.forEach(section => {
        section.classList.add("hidden");
    });

    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {

        selectedSection.classList.remove("hidden");

        setTimeout(() => {
            selectedSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);

    }

}


/* =========================
   CLOSE SECTIONS
========================= */

function closeSections() {

    const sections = document.querySelectorAll(".info-box");

    sections.forEach(section => {
        section.classList.add("hidden");
    });

}


/* =========================
   COPY TO CLIPBOARD
========================= */

async function copyText(text, button) {

    try {

        await navigator.clipboard.writeText(text);

    } catch {

        const textarea = document.createElement("textarea");

        textarea.value = text;

        document.body.appendChild(textarea);

        textarea.select();

        document.execCommand("copy");

        textarea.remove();

    }

    const oldText = button.innerText;

    button.innerText = "COPIED ✓";

    showToast();

    setTimeout(() => {
        button.innerText = oldText;
    }, 1500);

}


/* =========================
   TOAST MESSAGE
========================= */

function showToast() {

    toast?.classList.add("show");

    setTimeout(() => {
        toast?.classList.remove("show");
    }, 2000);

}


/* =========================
   INTERACTIVE 3D CARDS
========================= */

document.querySelectorAll(".menu-card").forEach(card => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 25;
        const rotateY = (x - centerX) / 25;

        card.style.transform =
            `translateY(-15px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================
   FEATURE 1
   HERO TYPING + BACKSPACE
========================= */

const rotatingWord = document.getElementById("rotating-word");

const words = [
    "RELOADED",
    "TAMIL COMMUNITY",
    "BUILD. PLAY. CONQUER.",
    "UNITED AS ONE",
    "YOUR NEXT ADVENTURE"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeLoop() {

    if (!rotatingWord) return;

    const word = words[wordIndex];

    rotatingWord.textContent =
        word.slice(0, charIndex);


    if (!deleting && charIndex < word.length) {

        charIndex++;

        setTimeout(typeLoop, 95);

    }

    else if (!deleting) {

        deleting = true;

        setTimeout(typeLoop, 1300);

    }

    else if (deleting && charIndex > 0) {

        charIndex--;

        setTimeout(typeLoop, 45);

    }

    else {

        deleting = false;

        wordIndex =
            (wordIndex + 1) % words.length;

        setTimeout(typeLoop, 300);

    }

}

typeLoop();


/* =========================
   FEATURE 2
   DAILY MISSION
========================= */

const missions = [

    "TODAY'S MISSION: SURVIVE. BUILD. CONQUER.",

    "TODAY'S MISSION: EXPLORE ONE NEW PLACE.",

    "TODAY'S MISSION: HELP A FELLOW PLAYER.",

    "TODAY'S MISSION: CREATE SOMETHING LEGENDARY.",

    "TODAY'S MISSION: JOIN THE COMMUNITY AND MAKE A MEMORY.",

    "TODAY'S MISSION: DEFEND THE NATION AND HAVE FUN."

];


const missionEl =
    document.getElementById("daily-mission");


if (missionEl) {

    const start =
        new Date(
            new Date().getFullYear(),
            0,
            0
        );

    const day =
        Math.floor(
            (Date.now() - start) / 86400000
        );

    missionEl.textContent =
        missions[day % missions.length];

}


/* =========================
   FEATURE 3
   ACCESS TERMINAL
========================= */

const terminalModal =
    document.getElementById("terminal-modal");

const terminalOutput =
    document.getElementById("terminal-output");


const terminalLines = [

    "CONNECTING TO TAMILNATION...",

    "VERIFYING COMMUNITY ACCESS...",

    "ACCESS GRANTED ✓",

    "WELCOME, PLAYER."

];


let terminalTimer;


function openTerminal() {

    terminalModal?.classList.remove("hidden");


    if (!terminalOutput) return;


    terminalOutput.innerHTML = "";


    clearTimeout(terminalTimer);


    let line = 0;
    let character = 0;


    function write() {

        if (line >= terminalLines.length) {

            document
                .getElementById("terminal-actions")
                ?.classList.remove("hidden");

            return;

        }


        const current =
            terminalLines[line];


        if (character < current.length) {

            terminalOutput.innerHTML +=
                current[character++];

            terminalTimer =
                setTimeout(write, 35);

        }

        else {

            terminalOutput.innerHTML += "<br>";

            line++;

            character = 0;

            terminalTimer =
                setTimeout(write, 260);

        }

    }


    document
        .getElementById("terminal-actions")
        ?.classList.add("hidden");


    write();

}


function closeTerminal() {

    clearTimeout(terminalTimer);

    terminalModal?.classList.add("hidden");

}


function terminalGo(section) {

    closeTerminal();


    if (section === "discord") {

        mainMenu?.scrollIntoView({
            behavior: "smooth"
        });

        setTimeout(() => {
            openSection("discord");
        }, 300);

    }


    else if (section === "minecraft") {

        mainMenu?.scrollIntoView({
            behavior: "smooth"
        });

        setTimeout(() => {
            openSection("minecraft");
        }, 300);

    }


    else {

        mainMenu?.scrollIntoView({
            behavior: "smooth"
        });

        setTimeout(() => {
            openSection("staff");
        }, 300);

    }

}


/* =========================
   FEATURE 4
   RANDOM SERVER TIP
========================= */

const tips = [

    "Use /home to return to your saved home.",

    "Keep your valuables safe before exploring dangerous areas.",

    "Join events to earn rewards and meet more players.",

    "Build something unique — your next project could become a server landmark.",

    "Team up with other players for bigger adventures.",

    "Check Discord for announcements and community events."

];


function newTip() {

    const tipElement =
        document.getElementById("server-tip-text");


    if (!tipElement) return;


    tipElement.style.opacity = "0";


    setTimeout(() => {

        tipElement.textContent =
            tips[
                Math.floor(
                    Math.random() * tips.length
                )
            ];

        tipElement.style.opacity = "1";

    }, 180);

}


/* =========================
   FEATURE 5
   TAMILNATION FACTS
========================= */

const facts = [

    "TAMILNATION SEASON 2 IS RELOADED AND READY FOR NEW ADVENTURES.",

    "THIS WEBSITE IS BUILT FOR BOTH PC AND MOBILE PLAYERS.",

    "THE COMMUNITY HAS JAVA AND BEDROCK CONNECTION DETAILS IN ONE PLACE.",

    "THE NATION IS STRONGEST WHEN PLAYERS BUILD TOGETHER.",

    "EVERY GREAT SERVER STORY STARTS WITH ONE PLAYER JOINING."

];


function newFact() {

    const factElement =
        document.getElementById("fact-text");


    if (!factElement) return;


    factElement.style.opacity = "0";


    setTimeout(() => {

        factElement.textContent =
            facts[
                Math.floor(
                    Math.random() * facts.length
                )
            ];

        factElement.style.opacity = "1";

    }, 180);

}


/* =========================
   FEATURE 6
   SECRET EASTER EGG

   CLICK THE TAMILNATION
   LOGO 5 TIMES
========================= */

let logoClicks = 0;

let clickReset;


document
    .querySelectorAll(".logo, .tamil, .nation")
    .forEach(element => {

        element.addEventListener("click", () => {

            logoClicks++;

            clearTimeout(clickReset);


            clickReset = setTimeout(() => {

                logoClicks = 0;

            }, 2500);


            if (logoClicks >= 5) {

                logoClicks = 0;


                document
                    .getElementById("secret-modal")
                    ?.classList.remove("hidden");


                document.body.classList
                    .add("glitch-mode");


                setTimeout(() => {

                    document.body.classList
                        .remove("glitch-mode");

                }, 1600);

            }

        });

    });


function closeSecret() {

    document
        .getElementById("secret-modal")
        ?.classList.add("hidden");

}
