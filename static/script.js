// Interactive elements and animations for Rob Righter's Apps & Curiosities

document.addEventListener('DOMContentLoaded', function() {
    // Animate neural network on hover
    const neuralNetwork = document.querySelector('.neural-network');
    if (neuralNetwork) {
        neuralNetwork.addEventListener('mouseenter', function() {
            animateNeuralNetwork();
        });
    }

    // Add typewriter effect to latest experiment description
    const experimentDescription = document.querySelector('.experiment-description p:first-child');
    if (experimentDescription && !sessionStorage.getItem('typedOnce')) {
        const originalText = experimentDescription.textContent;
        experimentDescription.textContent = '';
        typeWriter(experimentDescription, originalText, 0);
        sessionStorage.setItem('typedOnce', 'true');
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add parallax effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        projectCards.forEach((card, index) => {
            const rate = scrolled * -0.05 * (index % 2 === 0 ? 1 : -1);
            card.style.transform = `translateY(${rate}px)`;
        });
    });

    // Animate SVG gears rotation
    const gears = document.querySelectorAll('.project-card svg circle, .illustration-container svg circle');
    gears.forEach((gear, index) => {
        if (gear.parentElement.classList.contains('gears') || 
            (gear.getAttribute('r') && parseInt(gear.getAttribute('r')) > 10)) {
            gear.style.transformOrigin = 'center';
            animateGear(gear, index % 2 === 0);
        }
    });

    // Add vintage paper texture effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.body.style.backgroundPosition = `${x * 50}px ${y * 50}px`;
    });

    // Create random "age spots" effect on article pages
    if (document.querySelector('.article-content')) {
        createAgeSpots();
    }

    // Add click animation to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.animation = 'cardFlip 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });

    // Add printing date stamp
    if (window.location.pathname.includes('article')) {
        addPrintingStamp();
    }
});

// Typewriter effect function
function typeWriter(element, text, index) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeWriter(element, text, index + 1), 20);
    }
}

// Animate neural network connections
function animateNeuralNetwork() {
    const lines = document.querySelectorAll('.neural-network line');
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.strokeWidth = '2';
            line.style.opacity = '0.6';
            line.style.stroke = '#8B7355';
            
            setTimeout(() => {
                line.style.strokeWidth = '1';
                line.style.opacity = '0.3';
                line.style.stroke = '#2C2416';
            }, 500);
        }, index * 50);
    });
}

// Animate gear rotation
function animateGear(gear, clockwise) {
    let rotation = 0;
    setInterval(() => {
        rotation += clockwise ? 1 : -1;
        gear.setAttribute('transform', `rotate(${rotation} ${gear.getAttribute('cx')} ${gear.getAttribute('cy')})`);
    }, 50);
}

// Create age spots effect
function createAgeSpots() {
    const articleContent = document.querySelector('.article-content');
    if (!articleContent) return;
    
    for (let i = 0; i < 5; i++) {
        const spot = document.createElement('div');
        spot.className = 'age-spot';
        spot.style.cssText = `
            position: absolute;
            width: ${Math.random() * 30 + 10}px;
            height: ${Math.random() * 30 + 10}px;
            background: radial-gradient(circle, rgba(139, 115, 85, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            z-index: 0;
        `;
        articleContent.appendChild(spot);
    }
}

// Add printing stamp effect
function addPrintingStamp() {
    const stamp = document.createElement('div');
    stamp.className = 'printing-stamp';
    stamp.innerHTML = `
        <svg viewBox="0 0 100 30" style="width: 150px; height: 45px;">
            <text x="50" y="20" font-family="Courier Prime" font-size="10" text-anchor="middle" 
                  fill="#8B7355" opacity="0.3" transform="rotate(-5 50 20)">
                PRINTED ${new Date().toLocaleDateString()}
            </text>
        </svg>
    `;
    stamp.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        pointer-events: none;
        z-index: 1000;
    `;
    document.body.appendChild(stamp);
}

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes cardFlip {
        0% { transform: rotateY(0deg); }
        50% { transform: rotateY(5deg); }
        100% { transform: rotateY(0deg); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .project-card {
        animation: fadeIn 0.5s ease-in;
        transform-style: preserve-3d;
        perspective: 1000px;
    }
    
    .age-spot {
        animation: fadeIn 2s ease-in;
    }
`;
document.head.appendChild(style);

// Console easter egg
console.log('%c📚 Welcome to Rob Righter\'s Apps & Curiosities 📚', 
    'font-family: "Courier Prime", monospace; font-size: 20px; color: #8B7355; font-weight: bold;');
console.log('%cEst. 1978 - Exploring the intersection of vintage computing and modern curiosity', 
    'font-family: "Courier Prime", monospace; font-size: 12px; color: #2C2416;');
