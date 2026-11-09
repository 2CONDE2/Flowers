
const welcome = document.getElementById("welcome");
const experience = document.getElementById("experience");
const openButton = document.getElementById("open-button");
const bouquet = document.getElementById("bouquet");
const audio = document.getElementById("bg-music");
const verse = document.getElementById("verse");
const counter = document.getElementById("counter");
const replayButton = document.getElementById("replay-button");
const petalContainer = document.getElementById("petal-container");

// Versos en el orden indicado
const verses = [
    "Mi canción esconde otra bien guardada",
    "Y hacés que esta muerte valga la pena",
    "Lo que pasa es que te quiero",
    "Caprichosa aprendiz de hechicera",
    "Mi regreso significa que me fui",
    "Tu milagro mágico del tiempo",
    "Esperame y yo te espero",
    "I think you're freaky and I like you a lot (Creo que sos rara y me gusta mucho)",
    "Yo te busqué entre las mujeres de Dios",
    "Y tus ojitos me llevaron a vos"
];

let currentVerse = 0;
let petalInterval;

// Iniciar la experiencia y la música
openButton.addEventListener("click", async () => {
    try {
        await audio.play();

        welcome.classList.add("fade-out");

        setTimeout(() => {
            welcome.style.display = "none";
            experience.classList.remove("hidden");
            startFallingPetals();
        }, 900);

    } catch (error) {
        alert("No se pudo reproducir la canción. Revisá que el archivo de música esté en la carpeta correcta.");
        console.error("Error al reproducir el audio:", error);
    }
});

// Clic en el ramo: mostrar el siguiente verso
bouquet.addEventListener("click", () => {

    if (currentVerse >= verses.length) {
        verse.textContent = "Y así, entre flores y canciones, termina este pequeño regalo para vos. 💜";
        return;
    }

    verse.textContent = verses[currentVerse];

    currentVerse++;

    counter.textContent = `${currentVerse} / ${verses.length}`;

    // Animación visual del verso
    verse.style.animation = "none";
    void verse.offsetWidth;
    verse.style.animation = "verseAppear 0.8s ease";

    // Pétalo especial al hacer clic
    createPetal(true);
});

// Crear un pétalo
function createPetal(special = false) {
    const petal = document.createElement("div");

    petal.classList.add("falling-petal");

    const size = special
        ? 22
        : Math.random() * 10 + 8;

    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.4}px`;

    if (special) {
        const rect = bouquet.getBoundingClientRect();

        petal.style.left = `${rect.left + rect.width / 2}px`;
        petal.style.top = `${rect.top + rect.height / 3}px`;
    } else {
        petal.style.left = `${Math.random() * 100}vw`;
    }

    petal.style.setProperty(
        "--drift",
        `${Math.random() * 180 - 90}px`
    );

    petal.style.animationDuration =
        `${special ? 3 : Math.random() * 5 + 5}s`;

    petalContainer.appendChild(petal);

    // Eliminar el pétalo cuando termina su animación
    petal.addEventListener("animationend", () => {
        petal.remove();
    });
}

// Caída continua de pétalos
function startFallingPetals() {
    if (petalInterval) return;

    petalInterval = setInterval(() => {
        createPetal();
    }, 350);
}

// Reproducir la canción desde el principio
replayButton.addEventListener("click", async () => {
    audio.currentTime = 0;

    try {
        await audio.play();
    } catch (error) {
        console.error("No se pudo reproducir la canción:", error);
    }
});

