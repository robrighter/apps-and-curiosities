// Interactive elements and animations for Rob Righter's Apps & Curiosities

document.addEventListener('DOMContentLoaded', function() {
    // Animate neural network on hover
    const neuralNetwork = document.querySelector('.neural-network');
    if (neuralNetwork) {
        neuralNetwork.addEventListener('mouseenter', function() {
            animateNeuralNetwork();
        });
    }

    // Select and display random featured experiment
    const articles = [
        {
            title: "NEURAL NETWORK VISUALIZER",
            url: "mathematics/neural-network-simulator/index.html",
            image: "mathematics/neural-network-simulator/nn.png",
            description: "Artificial Intelligence often feels like magic—a \"black box\" where data goes in and answers come out, with little visibility into the machinery in between. This Neural Network Visualizer is designed to strip away that mystery. It offers a real-time window into the microscopic decisions that power modern AI, scaling down the complexity of massive language models into a single, observable Multi-Layer Perceptron (MLP). By focusing on fundamental logic problems like the XOR gate, we can witness the foundational \"spark\" of learning that occurs when a machine figures out a pattern it wasn't explicitly programmed to solve.",
            category: "Category: Mathematics"
        },
        {
            title: "LUNAR LANDER",
            url: "games/luner-lander/index.html",
            image: "games/luner-lander/ll.png",
            description: "There's something timeless about Atari's 1979 arcade classic Lunar Lander. Before polygons, before texture mapping, before ray tracing—there were vectors. Crisp white lines glowing against the infinite black of space, a tiny spacecraft fighting gravity with nothing but thrust and nerve. This recreation brings that classic to your browser, complete with authentic physics simulation using Newtonian mechanics. Fight lunar gravity as you pilot your lander to the surface, balancing thrust and rotation to achieve a safe touchdown. The original wasn't just a game—it was one of the first physics simulations accessible to the general public.",
            category: "Category: Games"
        },
        {
            title: "SOLAR SYSTEM SIMULATOR",
            url: "mathematics/solar-system-simulator/index.html",
            image: "mathematics/solar-system-simulator/ss.png",
            description: "Have you ever wondered where Mars was on the day you were born? Or where Jupiter will be exactly 100 years from now? This solar system simulator can answer these questions with remarkable precision. Set it to any date – past, present, or future – and it will show you the exact positions of all eight planets as they would appear from above the solar system. This isn't just an animation; it's a mathematical model that solves the same equations astronomers use to predict planetary positions using Kepler's equations and celestial mechanics.",
            category: "Category: Mathematics"
        }
    ];

    // Pick a random article for featured experiment
    const featuredLink = document.getElementById('featured-link');
    const featuredImg = document.getElementById('featured-img');
    const featuredDescription = document.getElementById('featured-description');
    const featuredMoreLink = document.getElementById('featured-more-link');
    const featuredCategory = document.getElementById('featured-category');

    // Only proceed if all required elements exist

    if (featuredLink && featuredImg && featuredDescription && featuredMoreLink && featuredCategory) {
        const randomArticle = articles[Math.floor(Math.random() * articles.length)];

        featuredLink.textContent = randomArticle.title;
        featuredLink.href = randomArticle.url;
        featuredImg.src = randomArticle.image;
        featuredImg.alt = randomArticle.title;
        featuredDescription.textContent = randomArticle.description;
        featuredMoreLink.href = randomArticle.url;
        featuredCategory.textContent = randomArticle.category;
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
