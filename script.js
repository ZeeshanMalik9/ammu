
// Common Configuration
const CONFIG = {
    floatingElementsCount: 20,
    floatingSpeedRange: [3, 8], // seconds
    floatingSizeRange: [1.5, 3], // rem
};

// Emoji Maps for different days
const DAY_EMOJIS = {
    'rose': ['🌹', '🌷', '💐', '🥀'],
    'propose': ['💍', '💎', '💖', '💘'],
    'chocolate': ['🍫', '🍬', '🍩', '🍪', '🌰'],
    'teddy': ['🧸', '🐼', '🐨', '🐻'],
    'promise': ['🤞', '🤝', '💝', '📜'],
    'hug': ['🤗', '🫂', '👐', '💞'],
    'kiss': ['💋', '😽', '😗', '👄'],
    'valentine': ['❤️', '💘', '💖', '💗', '💓', '🥰']
};

document.addEventListener('DOMContentLoaded', () => {
    const pageId = document.body.id; // e.g., 'rose-day'
    const dayKey = pageId.split('-')[0]; // 'rose'

    // 1. Initialize Floating Background (Common)
    if (DAY_EMOJIS[dayKey]) {
        createFloatingBackground(DAY_EMOJIS[dayKey]);
    } else {
        createFloatingBackground(['❤️', '✨', '🎁']); // Default
    }

    // 2. Initialize Page Specific Logic
    if (pageId === 'rose-day') initRoseGame();
    if (pageId === 'propose-day') initProposeGame();
    if (pageId === 'chocolate-day') initChocolateGame();
    if (pageId === 'teddy-day') initTeddyGame();
    if (pageId === 'promise-day') initPromisePage();
    if (pageId === 'hug-day') initHugGame();
    if (pageId === 'kiss-day') initKissGame();
    if (pageId === 'valentine-day') initValentinePage();

    // Initialize common magic button
    initMagicButton();

    // Apply typing effect if greeting exists
    const greeting = document.getElementById('greeting');
    if (greeting) {
        greeting.classList.add('fade-in-text'); // Simple fade in
        // or applyTypewriter(greeting); // Complex one
    }
});

// --- Common Functions ---

function createFloatingBackground(emojis) {
    const container = document.createElement('div');
    container.className = 'floating-container';
    document.body.appendChild(container);

    // Initial batch
    for (let i = 0; i < CONFIG.floatingElementsCount; i++) {
        spawnFloater(container, emojis);
    }

    // Continuous spawning
    setInterval(() => {
        spawnFloater(container, emojis);
    }, 800);
}

function spawnFloater(container, emojis) {
    const el = document.createElement('div');
    el.className = 'floater';
    el.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    // Random Position
    el.style.left = Math.random() * 100 + 'vw';

    // Random Animation Duration
    const duration = Math.random() * (CONFIG.floatingSpeedRange[1] - CONFIG.floatingSpeedRange[0]) + CONFIG.floatingSpeedRange[0];
    el.style.animationDuration = duration + 's';

    // Random Size
    const size = Math.random() * (CONFIG.floatingSizeRange[1] - CONFIG.floatingSizeRange[0]) + CONFIG.floatingSizeRange[0];
    el.style.fontSize = size + 'rem';

    container.appendChild(el);

    // Cleanup after animation
    setTimeout(() => {
        el.remove();
    }, duration * 1000);
}

function showResult(text) {
    const res = document.getElementById('game-result');
    if (res) {
        res.innerText = text;
        res.style.opacity = 1;
        res.classList.remove('hidden');
    }
    // Confetti burst
    createConfetti();
}

function createConfetti() {
    // Simple burst effect
    for (let i = 0; i < 30; i++) {
        const c = document.createElement('div');
        c.style.position = 'fixed';
        c.style.left = '50%';
        c.style.top = '50%';
        c.style.width = '10px';
        c.style.height = '10px';
        c.style.backgroundColor = ['#f00', '#0f0', '#00f', '#ff0', '#0ff'][Math.floor(Math.random() * 5)];
        c.style.transition = 'all 1s ease-out';
        document.body.appendChild(c);

        setTimeout(() => {
            c.style.transform = `translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) rotate(${Math.random() * 360}deg)`;
            c.style.opacity = 0;
        }, 10);

        setTimeout(() => c.remove(), 1000);
    }
}

// --- Page Specific Logic ---

// 1. Rose Day: Catch 5 Roses
function initRoseGame() {
    let score = 0;
    const gameArea = document.getElementById('game-area');
    const scoreBoard = document.getElementById('score');

    // Spawn Clickable Roses
    setInterval(() => {
        if (score >= 10) return; // Win condition
        const rose = document.createElement('div');
        rose.innerText = '🌹';
        rose.style.position = 'absolute';
        rose.style.fontSize = '2rem';
        rose.style.cursor = 'pointer';
        rose.style.left = Math.random() * (gameArea.clientWidth - 40) + 'px';
        rose.style.top = -50 + 'px';
        rose.style.transition = 'top 3s linear';

        rose.onclick = () => {
            score++;
            scoreBoard.innerText = score;
            rose.remove();
            if (score === 10) {
                showResult("Yay! A perfect bouquet for you! 💐");
            }
        };

        gameArea.appendChild(rose);

        // Trigger animation
        setTimeout(() => {
            rose.style.top = (gameArea.clientHeight + 50) + 'px';
        }, 100);

        // Cleanup
        setTimeout(() => {
            if (rose.parentNode) rose.remove();
        }, 3100);

    }, 800);
}

// 2. Propose Day: Yes/No Button
function initProposeGame() {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');

    // Make 'No' run away
    noBtn.addEventListener('mouseover', () => {
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);
        noBtn.style.position = 'fixed';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    });

    yesBtn.addEventListener('click', () => {
        showResult("I knew it! Besties Forever! 💖");
        createConfetti();
    });
}

// 3. Chocolate Day: Unwrap
function initChocolateGame() {
    const wrapper = document.querySelector('.chocolate-wrapper');
    wrapper.addEventListener('click', () => {
        wrapper.classList.toggle('unwrapped');
        if (wrapper.classList.contains('unwrapped')) {
            setTimeout(() => {
                showResult("Sweetness Overloaded! 🍫");
            }, 600);
        }
    });
}

// 4. Teddy Day: Find the Hidden Teddy
function initTeddyGame() {
    // Logic inside HTML for simplicity using onClick
}

// 5. Promise Day: reveal promise
function initPromisePage() {
    // Mostly handled in CSS/HTML structure
}

// 6. Hug Day: Hug Meter
function initHugGame() {
    const btn = document.getElementById('hug-btn');
    const meter = document.getElementById('hug-meter-fill');
    let width = 0;

    btn.addEventListener('mousedown', () => {
        btn.innerText = "Hugging...";
        const interval = setInterval(() => {
            width += 5;
            meter.style.width = width + '%';
            if (width >= 100) {
                clearInterval(interval);
                btn.innerText = "Super Hug Sent! 🤗";
                showResult("Generating Warmth... 100%");
                createConfetti();
            }
        }, 100);

        btn.addEventListener('mouseup', () => {
            clearInterval(interval);
            if (width < 100) {
                btn.innerText = "Hold to Hug Longer!";
            }
        }, { once: true });
    });
}

// 7. Kiss Day: Send Kisses
function initKissGame() {
    // Handled in HTML
}

// 8. Valentine: Reveal Gift
function initValentinePage() {
    const box = document.getElementById('gift-box');
    box.addEventListener('click', () => {
        box.src = "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif"; // Open gif placeholder or just change content
        document.getElementById('final-msg').classList.remove('hidden');
        createConfetti();
    });
}

// --- New Features ---

function initMagicButton() {
    // Create button container
    const container = document.createElement('div');
    container.className = 'magic-btn-container';

    // Magic Toggle Button
    const btn = document.createElement('button');
    btn.className = 'magic-btn';
    btn.innerHTML = '✨';
    btn.title = "Ammu's Magic Button";

    // Options
    const options = document.createElement('div');
    options.className = 'magic-options';

    // Option 1: Music
    const musicBtn = document.createElement('button');
    musicBtn.className = 'option-btn';
    musicBtn.innerText = '🎵 play music';
    musicBtn.onclick = () => spawnMusicNotes();

    // Option 2: Why Special
    const specialBtn = document.createElement('button');
    specialBtn.className = 'option-btn';
    specialBtn.innerText = '💖 Why Special?';
    specialBtn.onclick = () => showSurprise();

    options.appendChild(musicBtn);
    options.appendChild(specialBtn);

    container.appendChild(options);
    container.appendChild(btn);
    // Append to body
    document.body.appendChild(container);

    // Toggle menu
    btn.addEventListener('click', () => {
        options.classList.toggle('show');
        btn.style.transform = options.classList.contains('show') ? 'rotate(45deg)' : 'rotate(0)';
    });
}

function spawnMusicNotes() {
    const notes = ['🎵', '🎶', '🎼', '🎹', '🎷'];
    // Create floating notes visual effect
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const note = document.createElement('div');
            note.className = 'note';
            note.innerText = notes[Math.floor(Math.random() * notes.length)];
            note.style.left = Math.random() * 90 + 'vw';
            note.style.bottom = '-50px';
            note.style.fontSize = (Math.random() * 2 + 1) + 'rem';
            document.body.appendChild(note);

            setTimeout(() => note.remove(), 5000); // cleanup
        }, i * 300);
    }
}

function showSurprise() {
    const reasons = [
        "Because you are my Dost with Benefits (of unlimited laughter)! 😂",
        "Because you tolerate my annoyance! 😜",
        "Because you are the sweetest Ammu! 🍫",
        "Because our bond is unbreakable! 🤝",
        "Because you deserve all the happiness! ✨"
    ];
    // Create a custom modal or alert
    const msg = reasons[Math.floor(Math.random() * reasons.length)];

    const alertBox = document.createElement('div');
    alertBox.style.position = 'fixed';
    alertBox.style.top = '50%';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translate(-50%, -50%)';
    alertBox.style.background = 'white';
    alertBox.style.padding = '20px';
    alertBox.style.borderRadius = '10px';
    alertBox.style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';
    alertBox.style.zIndex = '2000';
    alertBox.style.textAlign = 'center';
    alertBox.innerHTML = `<h3>💖 Special Message for Ammu 💖</h3><p style="font-size: 1.2rem; margin: 15px 0;">${msg}</p><button class="btn" style="font-size: 1rem; padding: 5px 15px;" onclick="this.parentNode.remove()">Close</button>`;

    document.body.appendChild(alertBox);
    createConfetti();
}
