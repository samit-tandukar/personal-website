document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const navbar = document.querySelector('.navbar');

   // ==========================================
    // 1. THEME TOGGLE LOGIC
    // ==========================================
    const savedTheme = localStorage.getItem('theme');

    // Only set an explicit theme if the user saved one previously
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }

    // Toggle event
    toggleBtn.addEventListener('click', () => {
        let currentTheme = htmlElement.getAttribute('data-theme');
        
        // If no theme is set on the HTML tag, check what the OS is currently using
        if (!currentTheme) {
            currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        // Swap it
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // ==========================================
    // 2. STICKY NAVBAR EFFECT
    // ==========================================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 3. BULLETPROOF CUSTOM SMOOTH SCROLLING
    // ==========================================
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Completely stop Safari's default instant jump
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const startPosition = window.pageYOffset;
                // Calculate target position while accounting for the sticky navbar
                const targetPosition = targetElement.getBoundingClientRect().top + startPosition - navbarHeight;
                const distance = targetPosition - startPosition;
                
                const duration = 800; // Animation time in milliseconds (0.8 seconds)
                let start = null;

                // Custom "Ease In Out" mathematical curve for a premium feel
                function easeInOutCubic(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t * t + b;
                    t -= 2;
                    return c / 2 * (t * t * t + 2) + b;
                }

                // The frame-by-frame animation loop
                function animationStep(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    
                    // Calculate the exact pixel position for this specific millisecond
                    const newPosition = easeInOutCubic(progress, startPosition, distance, duration);
                    window.scrollTo(0, newPosition);
                    
                    // Keep looping until the duration is reached
                    if (progress < duration) {
                        window.requestAnimationFrame(animationStep);
                    } else {
                        // Snap exactly to the final pixel at the very end
                        window.scrollTo(0, targetPosition);
                    }
                }

                // Trigger the engine
                window.requestAnimationFrame(animationStep);
            }
        });
    });
});