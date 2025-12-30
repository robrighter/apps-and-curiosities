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
            title: "UNDERSTANDING RIEMANN SUMS: FROM ANCIENT INTUITION TO MODERN COMPUTATION",
            url: "mathematics/riemann-sums/index.html",
            image: "mathematics/riemann-sums/rs.png",
            description: "How do you measure the area under a curve? This deceptively simple question captivated mathematicians for millennia, from Archimedes' geometric constructions to Riemann's rigorous definitions. The answer lies in one of mathematics' most elegant ideas: approximation through subdivision. Fill a curved region with rectangles, make them narrower and narrower, and watch as discrete approximation becomes continuous truth. This interactive visualizer brings convergence to life—drag the slider from 1 to 500 rectangles and witness errors shrink, gaps vanish, and Riemann sums approach exact integrals. Toggle between Left, Right, Midpoint, and Trapezoid rules to see how different sampling strategies affect accuracy. In the dance between finite approximation and infinite limit lies one of calculus' deepest insights.",
            category: "Category: Mathematics"
        },
        {
            title: "BUILDING A TRAFFIC SIMULATOR WITH AI",
            url: "notes/traffic-simulation/index.html",
            image: "notes/traffic-simulation/ts.png",
            description: "I've always been fascinated by traffic simulations—watching tiny cars navigate a grid of streets, stopping at intersections, flowing through a city like blood through veins. Building one from scratch used to be a weekend-long project at minimum. But with AI-assisted development, what used to take days became an iterative conversation. The result? A fully functional city traffic simulation complete with buildings, stoplights, and cars that actually follow traffic laws. Click anywhere on a road to add a car. Watch them negotiate 4-way stops and traffic lights. See emergent traffic patterns form from simple rules. This is the future of creative programming: more time thinking about what you want to build, less time fighting with the how.",
            category: "Category: Notes & Inquiries"
        },
        {
            title: "PARABOLIC CANNON: LEARNING QUADRATIC EQUATIONS THROUGH PLAY",
            url: "mathematics/cannon-math-game/index.html",
            image: "mathematics/cannon-math-game/cg.png",
            description: "There's something deeply satisfying about watching a cannonball arc through the air and land exactly where you intended. Parabolic Cannon transforms the abstract world of quadratic equations into something you can see, tweak, and immediately understand. Switch between three equation forms—standard, vertex, and polar—while aiming at targets. Watch your trajectory predictions play out in real-time, with ghosted previous attempts showing your mathematical reasoning. This isn't just a game; it's an interactive laboratory for building genuine intuition about parabolas, projectile motion, and the beautiful intersection of physics and mathematics.",
            category: "Category: Mathematics"
        },
        {
            title: "THE SHAPES OF RANDOMNESS",
            url: "mathematics/statistical-distributions/index.html",
            image: "mathematics/statistical-distributions/sd.png",
            description: "There's a certain magic in watching randomness organize itself. Generate a thousand random numbers from any well-defined process, plot them on a histogram, and a shape emerges—not chaos, but structure. This interactive simulator visualizes eight fundamental statistical distributions, from the ubiquitous bell curve to the memoryless exponential. Watch the Central Limit Theorem unfold in real-time as random samples converge to their theoretical shapes. These distributions form the mathematical backbone of everything from quality control to quantum mechanics, capturing patterns that puzzled Gauss and Poisson two centuries ago and continue to emerge, reliable as ever, in modern data science.",
            category: "Category: Mathematics"
        },
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
        },
        {
            title: "TRS-80 MODEL I EMULATOR",
            url: "retro-computing/trs-80-emulator/index.html",
            image: "retro-computing/trs-80-emulator/t80.png",
            description: "I was twelve years old when my grandmother handed me a heavy beige box from a garage sale—a Radio Shack TRS-80 Model I that would change my life. Now I've built a browser-based emulator to recapture that magic. Experience the dawn of personal computing with an authentic recreation featuring green phosphor display, working BASIC interpreter, and eight classic programs on virtual floppy diskettes. Load up Space Invaders, write your own BASIC programs, or type LIST to see source code just like curious kids did in 1977. This is what personal computing felt like at the very beginning.",
            category: "Category: Retro-Computing"
        },
        {
            title: "BRINGING BACK A LEGEND: MY HP-15C CALCULATOR EMULATOR",
            url: "retro-computing/hp15c-web-emulator/index.html",
            image: "retro-computing/hp15c-web-emulator/hero.png",
            description: "When I was a kid, my dad always had an HP-15C on his desk—a legendary scientific calculator that became the tool of choice for engineers and mathematicians worldwide. Now I've recreated it as a fully functional web-based emulator. Experience authentic RPN operation, write sophisticated programs with 448 steps of memory, perform matrix operations and complex number arithmetic, and discover why this 1982 calculator is still sought after today. Click the TUTORIAL button to learn the elegant simplicity of Reverse Polish Notation and understand why engineers held onto these calculators for decades.",
            category: "Category: Retro-Computing"
        }
    ];

    // Pick a random article for featured experiment
    const featuredLink = document.getElementById('featured-link');
    const featuredImg = document.getElementById('featured-img');
    const featuredDescription = document.getElementById('featured-description');
    const featuredCategory = document.getElementById('featured-category');

    // Only proceed if all required elements exist

    if (featuredLink && featuredImg && featuredDescription && featuredCategory) {
        const randomArticle = articles[Math.floor(Math.random() * articles.length)];

        featuredLink.textContent = randomArticle.title;
        featuredLink.href = randomArticle.url;
        featuredImg.src = randomArticle.image;
        featuredImg.alt = randomArticle.title;
        featuredDescription.textContent = randomArticle.description;
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

    // Scroll-based sidebar collapse for article pages
    if (document.querySelector('.article-content')) {
        handleArticleSidebarScroll();
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

// Handle scroll-based sidebar collapse on article pages
function handleArticleSidebarScroll() {
    const articleContent = document.querySelector('.article-content');
    if (!articleContent) return;

    const SCROLL_THRESHOLD = 200; // Pixels scrolled before collapsing
    const MOBILE_BREAKPOINT = 768; // Match CSS media query

    function updateSidebarState() {
        // Don't apply sidebar collapse on mobile devices
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
            articleContent.classList.remove('sidebar-collapsed');
            return;
        }

        const scrolled = window.pageYOffset || document.documentElement.scrollTop;

        if (scrolled > SCROLL_THRESHOLD) {
            articleContent.classList.add('sidebar-collapsed');
        } else {
            articleContent.classList.remove('sidebar-collapsed');
        }
    }

    // Initial check
    updateSidebarState();

    // Listen to scroll events with throttling for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateSidebarState();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Handle window resize to ensure proper behavior when switching between mobile/desktop
    window.addEventListener('resize', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateSidebarState();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Console easter egg
console.log('%c📚 Welcome to Rob Righter\'s Apps & Curiosities 📚',
    'font-family: "Courier Prime", monospace; font-size: 20px; color: #8B7355; font-weight: bold;');
console.log('%cEst. 1978 - Exploring the intersection of vintage computing and modern curiosity',
    'font-family: "Courier Prime", monospace; font-size: 12px; color: #2C2416;');
