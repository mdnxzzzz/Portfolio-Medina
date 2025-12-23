const cursor = document.querySelector('.cursor-glow');
const particlesContainer = document.querySelector('.particles');
const preloader = document.getElementById('preloader');
const loaderText = document.querySelector('.loader-text');
const loginOverlay = document.getElementById('login-overlay');
const nameInput = document.getElementById('user-name-input');
const loginSubmit = document.getElementById('login-submit');

// Personalization Logic
function updateDynamicNames(name) {
    document.querySelectorAll('.dynamic-name').forEach(el => {
        el.textContent = name;
    });
}

const gatewayActions = document.getElementById('gateway-actions');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const loaderSpinner = document.getElementById('loader-spinner');

function handleLogin() {
    // Show gateway actions after short delay to ensure assets are ready
    setTimeout(() => {
        loaderSpinner.classList.add('hidden');
        gatewayActions.classList.remove('hidden');
    }, 2000);
}

btnYes.addEventListener('click', () => {
    // 1. Enter Fullscreen
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log("Fullscreen blocked:", err);
        });
    }

    // 2. Hide Gateway, Show Login
    gatewayActions.classList.add('hidden');
    const question = document.getElementById('gateway-question');
    question.textContent = "IDENTIFICACIÓN REQUERIDA";
    setTimeout(() => {
        preloader.classList.add('fade-out');
        loginOverlay.classList.remove('hidden');
    }, 1000);
});

btnNo.addEventListener('click', () => {
    const question = document.getElementById('gateway-question');
    question.textContent = "VALE, ¡VUELVE CUANDO QUIERAS! 🐧";
    gatewayActions.classList.add('hidden');
});

loginSubmit.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const nameLower = name.toLowerCase();
    const forbiddenWords = ['mierda', 'puta', 'polla', 'coño', 'cabron', 'maricon', 'gilipollas', 'joder', 'sexo', 'porno', 'pene', 'vagina', 'fuck', 'shit', 'nude', '18+', 'puss', 'dick'];

    const hasForbidden = forbiddenWords.some(word => nameLower.includes(word));

    if (hasForbidden) {
        nameInput.style.borderColor = "#ff5f56";
        nameInput.value = "";
        nameInput.placeholder = "Nombre no permitido ❌";
        return;
    }

    if (name) {
        localStorage.setItem('medina_user_name', name);
        updateDynamicNames(name);

        // Trigger Fullscreen
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log("Fullscreen blocked:", err);
            });
        }

        // Hide login
        loginOverlay.classList.add('hidden');

        // If preloader is visible, show welcome and fade out
        if (!preloader.classList.contains('fade-out')) {
            loaderText.textContent = `¡Bienvenido ${name}!`;
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 1500);
        }
    }
});

// Preloader handling
window.addEventListener('load', handleLogin);

function createParticles() {
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 200 + 50;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 20 + 10) + 's';
        p.style.animationDelay = (Math.random() * 5) + 's';
        particlesContainer.appendChild(p);
    }
}
createParticles();

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Typing Effect
const typingText = document.getElementById('typing');
const professions = [
    "la informática 💻",
    "el mundo Linux 🐧",
    "Gentoo (\"I use Gentoo btw\") ⚙️",
    "la tecnología 🚀",
    "optimizar dispositivos ⚡"
];
let profIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const current = professions[profIndex];
    if (isDeleting) {
        typingText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        profIndex = (profIndex + 1) % professions.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}
type();

// 3D Tilt Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
    });
});

const surpriseBtn = document.getElementById('surprise-btn');
const terminalContainer = document.getElementById('terminal-container');
const terminalText = document.getElementById('terminal-text');
const message = " echo 'os quiero a todos ❤️'";

surpriseBtn.addEventListener('click', () => {
    terminalContainer.classList.remove('hidden');
    terminalContainer.classList.remove('red-alert');
    const terminalBody = document.getElementById('terminal-body');
    terminalBody.innerHTML = '<div class="terminal-line"><span class="prompt">medina@linux-pc:~$</span> <span id="terminal-text"></span><span class="cursor">_</span></div>';
    const textSpan = document.getElementById('terminal-text');

    const sequence = [
        { type: 'text', content: "sudo rm -rf /*", delay: 100 },
        { type: 'line', content: "Password: ••••••••", class: '', pause: 500 },
        { type: 'line', content: "[!] INITIATING SYSTEM DESTRUCTION...", class: 'danger', pause: 800 },
        { type: 'line', content: "> DELETING /home...", class: 'danger', pause: 300 },
        { type: 'effect', action: 'distort' },
        { type: 'line', content: "> DELETING /root...", class: 'danger', pause: 300 },
        { type: 'effect', action: 'shake' },
        { type: 'line', content: "> DELETING /etc...", class: 'danger', pause: 300 },
        { type: 'effect', action: 'meltdown' },
        { type: 'line', content: "CRITICAL SYSTEM FAILURE - 0x0001FF", class: 'danger', pause: 1000 },
        { type: 'alert', content: 'red-alert' },
        { type: 'line', content: "----------------------------------------", class: 'highlight' },
        { type: 'line', content: `¡${localStorage.getItem('medina_user_name') || 'MEDINA'} HA DETENIDO LA OPERACIÓN!`, class: 'success', pause: 1000 },
        { type: 'effect', action: 'restore' },
        { type: 'line', content: "Sistema restaurado con éxito. ✅", class: 'success', pause: 500 },
        { type: 'line', content: "(Recuerda que estás en buenas manos aquí 😉)", class: 'highlight', pause: 2000 },
        { type: 'effect', action: 'final' }
    ];

    let step = 0;

    function runSequence() {
        if (step >= sequence.length) return;

        const current = sequence[step];
        const sections = document.querySelectorAll('section, nav, footer');

        if (current.type === 'text') {
            let i = 0;
            function typeChar() {
                if (i < current.content.length) {
                    textSpan.textContent += current.content.charAt(i);
                    i++;
                    setTimeout(typeChar, current.delay);
                } else {
                    step++;
                    setTimeout(runSequence, 500);
                }
            }
            typeChar();
        } else if (current.type === 'line') {
            const newLine = document.createElement('div');
            newLine.className = 'terminal-line ' + (current.class || '');
            newLine.textContent = current.content;
            terminalBody.appendChild(newLine);
            terminalBody.scrollTop = terminalBody.scrollHeight;
            step++;
            setTimeout(runSequence, current.pause || 0);
        } else if (current.type === 'alert') {
            terminalContainer.classList.add(current.content);
            step++;
            runSequence();
        } else if (current.type === 'effect') {
            if (current.action === 'distort') {
                sections.forEach(s => s.classList.add('distorted'));
            } else if (current.action === 'shake') {
                document.body.classList.add('disintegrating');
            } else if (current.action === 'meltdown') {
                sections.forEach(s => {
                    const randomSkew = (Math.random() - 0.5) * 40;
                    s.style.transform = `skew(${randomSkew}deg) rotate(${randomSkew / 2}deg)`;
                    s.style.opacity = "0.5";
                });
            } else if (current.action === 'restore') {
                document.body.classList.remove('disintegrating');
                sections.forEach(s => {
                    s.classList.remove('distorted');
                    s.style.transform = "";
                    s.style.opacity = "";
                });
                terminalContainer.classList.remove('red-alert');
            } else if (current.action === 'final') {
                const overlay = document.getElementById('final-overlay');
                overlay.classList.remove('hidden');
                setTimeout(() => {
                    overlay.classList.add('hidden');
                    terminalContainer.classList.add('hidden');
                }, 4000);
            }
            step++;
            runSequence();
        }
    }

    setTimeout(runSequence, 500);
});

// Close terminal on click outside
window.addEventListener('click', (e) => {
    if (e.target === terminalContainer) {
        terminalContainer.classList.add('hidden');
    }
});

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
});

// Fullscreen Toggle
const fsBtn = document.getElementById('fullscreen-btn');
const fsIcon = fsBtn.querySelector('i');

fsBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
        fsBtn.innerHTML = '<i data-lucide="minimize"></i>';
    } else {
        document.exitFullscreen();
        fsBtn.innerHTML = '<i data-lucide="maximize"></i>';
    }
    lucide.createIcons();
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.boxShadow = "var(--shadow)";
        nav.style.padding = "1rem 5%";
    } else {
        nav.style.boxShadow = "none";
        nav.style.padding = "1.5rem 5%";
    }
});

// Reset Name Logic
const resetNameBtn = document.getElementById('reset-name-btn');
resetNameBtn.addEventListener('click', () => {
    nameInput.placeholder = "Tu nombre...";
    nameInput.style.borderColor = "";
    loginOverlay.classList.remove('hidden');
});

// Visitor Counter Logic
async function fetchVisits() {
    const totalEl = document.getElementById('total-visits');
    const monthlyEl = document.getElementById('monthly-visits');
    if (!totalEl || !monthlyEl) return;

    try {
        const now = new Date();
        const monthKey = `medina_portfolio_${now.getFullYear()}_${now.getMonth() + 1}`;
        const totalKey = `medina_portfolio_total_v2`;

        const fetchWithTimeout = async (url) => {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), 6000);
            try {
                const response = await fetch(url, { signal: controller.signal });
                clearTimeout(id);
                return response;
            } catch (e) {
                clearTimeout(id);
                throw e;
            }
        };

        const [totalResp, monthlyResp] = await Promise.all([
            fetchWithTimeout(`https://api.counterapi.dev/v1/mdnxzzzz/${totalKey}/up`).catch(() => null),
            fetchWithTimeout(`https://api.counterapi.dev/v1/mdnxzzzz/${monthKey}/up`).catch(() => null)
        ]);

        if (totalResp && totalResp.ok) {
            const data = await totalResp.json();
            totalEl.textContent = data.count || "29";
        } else {
            totalEl.textContent = "Live";
        }

        if (monthlyResp && monthlyResp.ok) {
            const data = await monthlyResp.json();
            monthlyEl.textContent = data.count || "31";
        } else {
            monthlyEl.textContent = "Live";
        }
    } catch (error) {
        console.warn('Counter blocked:', error);
        totalEl.textContent = "Live";
        monthlyEl.textContent = "Live";
    }
}

setTimeout(fetchVisits, 1500);
