
const slides = Array.from(document.querySelectorAll(".slide"));

let currentSlide = 0;

const counter = document.getElementById("slide-counter");
const progress = document.getElementById("progress");
const overview = document.getElementById("overview");
const overviewGrid = document.getElementById("overview-grid");
const speakerNotes = document.getElementById("speaker-notes");
const notesContent = document.getElementById("notes-content");

function showSlide(index) {
    currentSlide = Math.max(
        0,
        Math.min(index, slides.length - 1)
    );

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentSlide);

        if (i !== currentSlide) {
            slide.querySelectorAll("video").forEach(video => {
                video.pause();
            });
        }
    });

    counter.textContent =
        String(currentSlide + 1).padStart(2, "0") +
        " / " +
        String(slides.length).padStart(2, "0");

    progress.style.width =
        ((currentSlide + 1) / slides.length * 100) + "%";

    const notes = slides[currentSlide].querySelector(".notes");

    notesContent.textContent = notes
        ? notes.textContent.trim()
        : "No speaker notes.";

    slides[currentSlide].scrollTop = 0;

    document.querySelectorAll(".overview-card").forEach((card, i) => {
        card.classList.toggle("current", i === currentSlide);
    });

    document.title =
        slides[currentSlide].dataset.title + " | One Stroke";
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function previousSlide() {
    showSlide(currentSlide - 1);
}

function toggleNotes() {
    speakerNotes.hidden = !speakerNotes.hidden;
}

function toggleOverview() {
    overview.hidden = !overview.hidden;
}

async function toggleFullscreen() {
    try {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    } catch (error) {
        console.log("Fullscreen unavailable:", error);
    }
}

document.getElementById("next")
    .addEventListener("click", nextSlide);

document.getElementById("prev")
    .addEventListener("click", previousSlide);

document.getElementById("notes-button")
    .addEventListener("click", toggleNotes);

document.getElementById("overview-button")
    .addEventListener("click", toggleOverview);

document.getElementById("fullscreen-button")
    .addEventListener("click", toggleFullscreen);

document.getElementById("close-overview")
    .addEventListener("click", () => {
        overview.hidden = true;
    });

document.getElementById("close-notes")
    .addEventListener("click", () => {
        speakerNotes.hidden = true;
    });

document.addEventListener("keydown", event => {
    if (
        event.target.matches(
            "input, textarea, select, video, button, a"
        )
    ) {
        return;
    }

    switch (event.key.toLowerCase()) {
        case "arrowright":
        case "arrowdown":
        case "pagedown":
        case " ":
            event.preventDefault();
            nextSlide();
            break;

        case "arrowleft":
        case "arrowup":
        case "pageup":
            event.preventDefault();
            previousSlide();
            break;

        case "home":
            event.preventDefault();
            showSlide(0);
            break;

        case "end":
            event.preventDefault();
            showSlide(slides.length - 1);
            break;

        case "f":
            toggleFullscreen();
            break;

        case "n":
            toggleNotes();
            break;

        case "o":
            toggleOverview();
            break;

        case "escape":
            overview.hidden = true;
            speakerNotes.hidden = true;
            break;
    }
});

// SLIDE OVERVIEW

slides.forEach((slide, index) => {
    const button = document.createElement("button");

    button.className = "overview-card";

    const number = document.createElement("small");
    number.textContent =
        "SLIDE " + String(index + 1).padStart(2, "0");

    const title = document.createElement("strong");
    title.textContent = slide.dataset.title;

    button.append(number, title);

    button.addEventListener("click", () => {
        showSlide(index);
        overview.hidden = true;
    });

    overviewGrid.appendChild(button);
});

// FIRST ITERATION BILL OF MATERIALS

const bom = [
    {
        name: "AplysiaTech Magnets",
        amount: "80",
        cad: "Complete",
        price: 21.59,
        category: "Electronics"
    },
    {
        name: "Ktheloy M3 Threaded Inserts",
        amount: "150",
        cad: "Complete",
        price: 9.98,
        category: "Mechanical"
    },
    {
        name: "Fgruh Screws Assortment",
        amount: "750",
        cad: "Complete",
        price: 9.99,
        category: "Mechanical"
    },
    {
        name: "DIANN USB-C Breakout Board",
        amount: "5",
        cad: "Complete",
        price: 5.99,
        category: "Electronics"
    },
    {
        name: "Elegoo Dupont Wire Kit",
        amount: "120",
        cad: "Not needed",
        price: 6.98,
        category: "Electronics"
    },
    {
        name: "Elegoo Breadboard Kit",
        amount: "3",
        cad: "Complete",
        price: 8.99,
        category: "Electronics"
    },
    {
        name: "HiLetgo Time-of-Flight Sensor",
        amount: "1",
        cad: "Complete",
        price: 13.90,
        category: "Electronics"
    },
    {
        name: "Cunyuer Pressure Sensor",
        amount: "4",
        cad: "Complete",
        price: 7.59,
        category: "Electronics"
    },
    {
        name: "Allecin Hall Effect Sensor",
        amount: "20",
        cad: "Complete",
        price: 6.99,
        category: "Electronics"
    },
    {
        name: "Elegoo ESP32 Development Board",
        amount: "3",
        cad: "Complete",
        price: 19.99,
        category: "Electronics"
    },
    {
        name: "Black EVA Foam Roll",
        amount: '49" × 13.5"',
        cad: "Complete",
        price: 9.59,
        category: "Surface"
    },
    {
        name: "Ponsonbay Golf Putting Mat",
        amount: "9 ft × 1 ft",
        cad: "Complete",
        price: 32.09,
        category: "Surface"
    },
    {
        name: "Harfington Dowel Pin",
        amount: "50",
        cad: "Complete",
        price: 13.90,
        category: "Mechanical"
    },
    {
        name: "3M Dual Lock",
        amount: "1 in × 8 ft",
        cad: "Not needed",
        price: 24.60,
        category: "Surface"
    },
    {
        name: "Loctite Super Glue",
        amount: "0.14 oz",
        cad: "Not needed",
        price: 7.79,
        category: "Mechanical"
    },
    {
        name: "3M Spray Adhesive",
        amount: "7.35 oz",
        cad: "Not needed",
        price: 10.68,
        category: "Surface"
    }
];

function currency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(value);
}

const bomTotal = bom.reduce(
    (sum, component) => sum + component.price,
    0
);

document.getElementById("bom-total").textContent =
    currency(bomTotal);

document.getElementById("bom-table-total").textContent =
    currency(bomTotal);

const bomBody = document.getElementById("bom-body");

bom.forEach(component => {
    const row = document.createElement("tr");

    [
        component.name,
        component.amount,
        component.cad,
        currency(component.price)
    ].forEach(value => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
    });

    bomBody.appendChild(row);
});

const categories = [
    {
        key: "Electronics",
        label: "Electronics and sensing"
    },
    {
        key: "Mechanical",
        label: "Mechanical hardware"
    },
    {
        key: "Surface",
        label: "Surface and attachment"
    }
];

const bomSummary = document.getElementById("bom-summary");

categories.forEach(category => {
    const total = bom
        .filter(item => item.category === category.key)
        .reduce((sum, item) => sum + item.price, 0);

    const panel = document.createElement("div");
    panel.className = "panel";

    const metric = document.createElement("div");
    metric.className = "metric";
    metric.textContent = currency(total);

    const label = document.createElement("p");
    label.textContent = category.label;

    panel.append(metric, label);
    bomSummary.appendChild(panel);
});

// IMAGE ERROR HANDLING

document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
        img.style.display = "none";

        const message = document.createElement("p");

        message.className = "image-caption";
        message.textContent =
            "Missing image: " + img.getAttribute("src");

        img.parentElement.appendChild(message);
    });
});

// INITIALIZE

showSlide(0);
