const viewButton = document.getElementById("view-btn");

const welcomeScreen = document.getElementById("welcome-screen");

const mainMenu = document.getElementById("main-menu");


/* VIEW BUTTON */

viewButton.addEventListener("click", () => {

    welcomeScreen.classList.add("hidden");

    mainMenu.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* OPEN SECTION */

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
                block: "center"
            });

        }, 100);

    }

}


/* CLOSE SECTION */

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

        button.style.background = "#00ff88";

        button.style.color = "#000";

        setTimeout(() => {

            button.innerText = oldText;

            button.style.background = "";

            button.style.color = "";

        }, 1500);

    } catch (error) {

        alert("Copy failed. Please copy it manually.");

    }

}