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
    let i = 0;
    terminalText.textContent = "";

    function typeTerminal() {
        if (i < message.length) {
            terminalText.textContent += message.charAt(i);
            i++;
            setTimeout(typeTerminal, 100);
        } else {
            setTimeout(() => {
                const newLine = document.createElement('div');
                newLine.className = 'terminal-line';
                newLine.innerHTML = '<span class="prompt">C:\\Users\\Medina></span> os quiero a todos ❤️';
                document.getElementById('terminal-body').appendChild(newLine);

                setTimeout(() => {
                    terminalContainer.classList.add('fade-out');
                    setTimeout(() => {
                        terminalContainer.classList.add('hidden');
                        terminalContainer.classList.remove('fade-out');
                    }, 1000);
                }, 3000);
            }, 500);
        }
    }

    setTimeout(typeTerminal, 1000);
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
