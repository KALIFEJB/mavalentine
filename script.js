// Générer des cœurs qui tombent continuellement
function createFallingHearts() {
    const hearts = ['💕', '💗', '💖', '💝', '💓', '💞', '❤️'];
    const container = document.querySelector('.hearts-container');
    
    setInterval(() => {
        const heart = document.createElement('div');
        const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
        const size = Math.random() * 20 + 15;
        const left = Math.random() * 100;
        
        heart.classList.add('falling-heart');
        heart.textContent = randomHeart;
        heart.style.fontSize = size + 'px';
        heart.style.left = left + '%';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's';
        
        container.appendChild(heart);
        
        // Retirer le cœur après l'animation
        setTimeout(() => heart.remove(), 10000);
    }, 300);
}

// Explosion de cœurs pour la surprise
function createHeartExplosion() {
    const hearts = ['💕', '💗', '💖', '💝', '💓', '💞', '❤️', '✨', '💫', '⭐'];
    const messages = [
        'Je t\'aime Khady! 💕',
        'Tu es mon amour éternel! 💖',
        'Mon âme, mon souffle, mon amour! 💗',
        'Tu es parfaite! ✨',
        'À toi pour toujours! 💞',
        'Tu illumines ma vie! ⭐'
    ];
    
    // Afficher un message aléatoire
    const messageBox = document.getElementById('message-box');
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageBox.textContent = randomMessage;
    messageBox.style.animation = 'slideInUp 0.6s ease-out';
    
    // Créer une explosion de cœurs
    const container = document.querySelector('.hearts-container');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const angle = (i / 20) * Math.PI * 2;
        const velocity = 5 + Math.random() * 5;
        const size = Math.random() * 25 + 20;
        
        heart.classList.add('explosion-heart');
        heart.textContent = randomHeart;
        heart.style.fontSize = size + 'px';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.opacity = '1';
        
        container.appendChild(heart);
        
        // Animer l'explosion
        animateExplosion(heart, angle, velocity, 100);
    }
    
    // Faire vibrer le bouton
    const button = document.querySelector('.love-button');
    button.style.animation = 'none';
    setTimeout(() => {
        button.style.animation = 'pulse 0.5s ease-out';
    }, 10);
}

// Animer l'explosion de cœurs
function animateExplosion(element, angle, velocity, duration) {
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress < 1) {
            const distance = velocity * progress * 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
            element.style.opacity = 1 - progress;
            
            requestAnimationFrame(animate);
        } else {
            element.remove();
        }
    }
    
    animate();
}

// Scroll smooth et animations au défilement
function observeElements() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'slideInUp 0.8s ease-out';
            }
        });
    }, options);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Ajouter des cœurs qui flottent quand on passe la souris
document.addEventListener('mousemove', (e) => {
    // Optionnel: ajouter des petits cœurs sous le curseur
    if (Math.random() > 0.95) {
        const heart = document.createElement('div');
        const hearts = ['💕', '💗', '💖'];
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.pointer = 'none';
        heart.style.fontSize = '1rem';
        heart.style.opacity = '0.5';
        heart.style.zIndex = '100';
        
        document.body.appendChild(heart);
        
        // Animer le cœur
        let opacity = 0.5;
        let duration = 1000;
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                heart.style.opacity = 0.5 - (progress * 0.5);
                heart.style.transform = `translateY(-${progress * 30}px)`;
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        }
        
        animate();
    }
});

// Créer un style dynamique pour les cœurs qui explosent
const style = document.createElement('style');
style.textContent = `
    .explosion-heart {
        animation: none !important;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialiser les animations au chargement
window.addEventListener('DOMContentLoaded', () => {
    createFallingHearts();
    observeElements();
    
    // Ajouter un Easter egg: taper "love" affiche un message spécial
    let keystrokes = '';
    document.addEventListener('keydown', (e) => {
        keystrokes += e.key.toLowerCase();
        
        if (keystrokes.includes('love')) {
            createHeartExplosion();
            keystrokes = '';
        }
        
        if (keystrokes.length > 10) {
            keystrokes = keystrokes.slice(-10);
        }
    });
});

// Ajouter un délai pour les animations de défilement
document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const parallaxElements = document.querySelectorAll('.welcome-section');
    
    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${scrollY * 0.5}px)`;
    });
});

// Son optionnel au survol du bouton (comment activé)
document.querySelector('.love-button').addEventListener('mouseenter', function() {
    // Vous pouvez ajouter un son ici si désiré
});

// Message personnalisé dans la console
console.log('%c❤️ Bienvenue dans ma déclaration d\'amour pour Khady Diouf ❤️', 'color: #ff1744; font-size: 16px; font-weight: bold;');
console.log('%cMon âme, mon souffle, mon amour', 'color: #f50057; font-size: 14px; font-style: italic;');
console.log('%cCe site a été créé avec tout mon amour et devotion.', 'color: #ff5983; font-size: 12px;');
