const viewButton = document.getElementById("view-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const mainMenu = document.getElementById("main-menu");
const toast = document.getElementById("toast");


/* EXPLORE BUTTON */

viewButton.addEventListener("click", () => {

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


/* OPEN A SECTION */

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


/* CLOSE SECTIONS */

function closeSections() {

    const sections = document.querySelectorAll(".info-box");

    sections.forEach(section => {
        section.classList.add("hidden");
    });

}


/* COPY TO CLIPBOARD */

async function copyText(text, button) {

    try {

        await navigator.clipboard.writeText(text);

        const oldText = button.innerText;

        button.innerText = "COPIED ✓";

        showToast();

        setTimeout(() => {
            button.innerText = oldText;
        }, 1500);

    } catch (error) {

        /* Backup copy method */

        const textarea = document.createElement("textarea");

        textarea.value = text;

        document.body.appendChild(textarea);

        textarea.select();

        document.execCommand("copy");

        textarea.remove();

        showToast();

    }

}


/* TOAST MESSAGE */

function showToast() {

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);

}


/* INTERACTIVE MOUSE EFFECT FOR CARDS */

const cards = document.querySelectorAll(".menu-card");

cards.forEach(card => {

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
