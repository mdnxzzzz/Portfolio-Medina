const cursor = document.querySelector('.cursor-glow');
const particlesContainer = document.querySelector('.particles');

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
        { type: 'line', content: "¡MEDINA HA DETENIDO LA OPERACIÓN!", class: 'success', pause: 1000 },
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
