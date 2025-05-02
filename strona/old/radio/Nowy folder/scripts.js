document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("playButton");
    const radioPlayer = document.getElementById("radioPlayer");
    const radioStream = "http://reliveradio.ddns.net:8000/stream";
    const scheduleTable = document.getElementById("scheduleTable");
    const dayNameElement = document.getElementById("dayName");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const days = ["Niedzielę", "Poniedziałek", "Wtorek", "Środę", "Czwartek", "Piątek", "Sobotę"];
    let currentDayIndex = new Date().getDay();
    let previousDayIndex = currentDayIndex; 


    playButton.addEventListener("click", () => {
        if (radioPlayer.paused) {
            radioPlayer.src = radioStream;
            radioPlayer.play();
            playButton.textContent = "⏸";
        } else {
            radioPlayer.pause();
            playButton.textContent = "▶";
        }
    });

const style = document.createElement('style');
style.innerHTML = `
    .active-program {
        background-color: #4CAF50; /* Pomarańczowe tło */
        font-weight: bold;
        color: #ffffff; /* Biały kolor tekstu */
    }
`;
document.head.appendChild(style);

    // Aktualizacja harmonogramu
    function updateSchedule() {
        const dayName = days[currentDayIndex];
        dayNameElement.textContent = dayName;
        scheduleTable.innerHTML = "<tr><th>Godzina</th><th>Program</th></tr>";

        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        let currentTime = currentHour * 60 + currentMinute; // aktualny czas w minutach

        scheduleData[dayName].forEach(([time, program]) => {
            const [startTime, endTime] = time.split(" - ");
            const [startHour, startMinute] = startTime.split(":").map(Number);
            const [endHour, endMinute] = endTime.split(":").map(Number);

            const startInMinutes = startHour * 60 + startMinute;
            const endInMinutes = endHour * 60 + endMinute;

            const isActive = currentTime >= startInMinutes && currentTime < endInMinutes;
            const rowClass = (currentDayIndex === new Date().getDay() && isActive) ? "active-program" : ""; // Tylko dla bieżącego dnia

            scheduleTable.innerHTML += `<tr class="${rowClass}"><td>${time}</td><td>${program}</td></tr>`;
        });
    }

    // Przełączanie dni
    document.getElementById("prevDay").addEventListener("click", () => {
        previousDayIndex = currentDayIndex; // Zapisz poprzedni dzień
        currentDayIndex = (currentDayIndex - 1 + days.length) % days.length;
        updateSchedule();
    });
    document.getElementById("nextDay").addEventListener("click", () => {
        previousDayIndex = currentDayIndex; // Zapisz poprzedni dzień
        currentDayIndex = (currentDayIndex + 1) % days.length;
        updateSchedule();
    });
    document.getElementById("today").addEventListener("click", () => {
        currentDayIndex = new Date().getDay();
        updateSchedule();
    });

    // Podświetlanie aktywnej strony w menu
    function setActiveLink() {
        const currentPage = window.location.pathname.split("/").pop();
        document.querySelectorAll(".menu a").forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === currentPage);
        });
    }
    setActiveLink();

    // Tryb ciemny
    function applyDarkMode(enabled) {
        document.body.classList.toggle("dark-mode", enabled);
        localStorage.setItem("darkMode", enabled ? "enabled" : "disabled");
        darkModeToggle.textContent = enabled ? "☀ Tryb jasny" : "🌙 Tryb ciemny";
    }
    darkModeToggle.addEventListener("click", () => {
        applyDarkMode(!document.body.classList.contains("dark-mode"));
    });
    applyDarkMode(localStorage.getItem("darkMode") === "enabled");

    updateSchedule();
});

const scheduleData = {
    "Niedzielę": [
        ["06:00 - 09:00", "Przebojowy poranek"],
        ["09:00 - 12:00", "Najlepsze covery"],
        ["12:00 - 15:00", "Wiadomości i muzyka"],
        ["15:00 - 18:00", "Muzyczne podróże"],
        ["18:00 - 21:00", "Retro vibes"],
        ["21:00 - 00:00", "Elektroniczne brzmienia"]
    ],
    "Poniedziałek": [
        ["06:00 - 09:00", "Poranny program informacyjny"],
        ["09:00 - 12:00", "Muzyczne początki dnia"],
        ["12:00 - 15:00", "Technologia na start"],
        ["15:00 - 18:00", "Kulturalne popołudnie"],
        ["18:00 - 21:00", "Gorące tematy"],
        ["21:00 - 00:00", "Night vibes"]
    ],
    "Wtorek": [
        ["06:00 - 09:00", "Dzień dobry, świat!"],
        ["09:00 - 12:00", "Wstajemy z muzyką"],
        ["12:00 - 15:00", "Podróże po muzyce"],
        ["15:00 - 18:00", "Na luzie do wieczora"],
        ["18:00 - 21:00", "Muzyczne inspiracje"],
        ["21:00 - 00:00", "Elektronika na żywo"]
    ],
    "Środę": [
        ["06:00 - 09:00", "Poranek w rytmach"],
        ["09:00 - 12:00", "Covery na żywo"],
        ["12:00 - 15:00", "Technologia i kultura"],
        ["15:00 - 18:00", "Ruszaj w podróż muzyczną"],
        ["18:00 - 21:00", "Wieczór retro"],
        ["21:00 - 00:00", "Muzyczne eksplozje"]
    ],
    "Czwartek": [
        ["06:00 - 09:00", "Czwartkowy start"],
        ["09:00 - 12:00", "Hity z lat 80."],
        ["12:00 - 15:00", "Wiatr w plecy, muzyka w sercu"],
        ["15:00 - 18:00", "Wszystko o grach"],
        ["18:00 - 21:00", "Kultowe brzmienia"],
        ["21:00 - 00:00", "Ciemna strona muzyki"]
    ],
    "Piątek": [
        ["06:00 - 09:00", "Piątkowy start"],
        ["09:00 - 12:00", "Muzyczne budzenie"],
        ["12:00 - 15:00", "Kultura i technologia"],
        ["15:00 - 18:00", "Gry na weekend"],
        ["18:00 - 21:00", "Wieczór z gościem"],
        ["21:00 - 00:00", "Piątkowa noc z muzyką"]
    ],
    "Sobotę": [
        ["06:00 - 09:00", "Sobota z przytupem"],
        ["09:00 - 12:00", "Poranna muzyka"],
        ["12:00 - 15:00", "Muzyczne odkrycia"],
        ["15:00 - 18:00", "Weekendowy chill"],
        ["18:00 - 21:00", "Retro na pełnej"],
        ["21:00 - 00:00", "Elektronika na relaks"]
    ]
};
const radioPlayer = document.getElementById('radioPlayer');
const muteButton = document.getElementById('muteButton');
const volumeSlider = document.getElementById('volumeRange');

// Ustawienie początkowego poziomu głośności
radioPlayer.volume = 1; // Maksymalna głośność

// Funkcja do przełączania wyciszenia
muteButton.addEventListener('click', function() {
    if (radioPlayer.muted) {
        radioPlayer.muted = false;
        muteButton.textContent = '🔊'; // Przywrócenie ikony głośności
        muteButton.classList.remove('muted');
    } else {
        radioPlayer.muted = true;
        muteButton.textContent = '🔇'; // Ikona wyciszenia
        muteButton.classList.add('muted');
    }
});

// Obsługa zmiany poziomu głośności za pomocą paska
volumeSlider.addEventListener('input', function() {
    radioPlayer.volume = volumeSlider.value / 100;
});

// Zmiana wartości paska głośności na podstawie aktualnej głośności
volumeSlider.value = radioPlayer.volume * 100;
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("darkModeToggle");
    const body = document.body;

    // Funkcja do ustawiania trybu ciemnego
    function applyDarkMode(enabled) {
        if (enabled) {
            body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
            toggleButton.textContent = "☀ Tryb jasny";
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
            toggleButton.textContent = "🌙 Tryb ciemny";
        }
    }

    // Sprawdzenie ustawień z localStorage
    const darkModeEnabled = localStorage.getItem("darkMode") === "enabled";
    applyDarkMode(darkModeEnabled);

    // Obsługa kliknięcia w przycisk
    toggleButton.addEventListener("click", () => {
        applyDarkMode(!body.classList.contains("dark-mode"));
    });
});
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith("/radio")) {
        window.location.href = window.location.pathname + "/index.html";
    }
});

