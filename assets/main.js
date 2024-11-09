/*----------------------------------------------
1. Preloader
----------------------------------------------*/
(function ($) {
    'use strict';

	$(window).on('load', function () {
		const svg = document.getElementById("loader");
		const tl = gsap.timeline();

		const startShape = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
		const endShape = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

		// Animation for text fading out
		tl.to(".loader-container .loaded", {
			delay: 1.2,
			y: -50,
			opacity: 0,
			duration: 0.6,
		});

		// Animate the SVG morphing from start shape to end shape
		tl.to(svg, {
			duration: 0.6,
			attr: { d: startShape },
			ease: "power1.easeIn",
		}).to(svg, {
			duration: 0.6,
			attr: { d: endShape },
			ease: "power1.easeOut",
		});

		// Move and hide the preloader
		tl.to(".preloader", {
			y: -1000,
			duration: 0.8,
		}).to(".preloader", {
			zIndex: -1,
			display: "none",
		});
	});

}(jQuery));

/*----------------------------------------------
2. Cursor
----------------------------------------------*/
(function ($) {
    'use strict';

    const cursor = document.getElementById('cursor');
    const hoverElements = document.querySelectorAll('a');

    // Helper function to animate the cursor with GSAP
    const animateCursor = (props) => {
        if (cursor) {
            gsap.to(cursor, {
                ...props,
                duration: 0.3,
                ease: props.ease || 'power2.out'
            });
        }
    };

    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        animateCursor({ x: e.clientX, y: e.clientY, opacity: 1 });
    });

    // Add hover effects for specified elements
    const addHoverEffects = (element) => {
        element.addEventListener('mouseenter', () => {
            cursor?.classList.add('hovered');
            animateCursor({ scale: 2, opacity: 0, ease: 0.1 });
        });

        element.addEventListener('mouseleave', () => {
            cursor?.classList.remove('hovered');
            animateCursor({ scale: 1, opacity: 1 });
        });
    };

    // Apply hover effects to all elements in hoverElements
    hoverElements.forEach(addHoverEffects);

}(jQuery));

/*----------------------------------------------
3. Smooth Scroll
----------------------------------------------*/
(function ($) {

    'use strict';

	const lenis = new Lenis();
	lenis.on('scroll', ScrollTrigger.update);

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000)
	});

	gsap.ticker.lagSmoothing(0);

}(jQuery));

/*----------------------------------------------
5. Navigation
----------------------------------------------*/
(function ($) {

    'use strict';

    var position = $(window).scrollTop();
    var topThreshold = 50; // Adjust this value to control when the navbar reappears

    $(window).scroll(function () {

        let scroll = $(window).scrollTop();
        let navbar = $('.navbar');

        if (!navbar.hasClass('relative')) {

            if (scroll > topThreshold) { // Scrolling down or up, but not near the top
                navbar.fadeOut('fast'); // Hide the navbar
            } else { // Near the top of the page
                navbar.slideDown('fast'); // Show the navbar
            }

            position = scroll; // Update the position for the next scroll event
		}
    });
    $(document).on('click', '.smooth-anchor', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    $(document).on('click', 'a[href="#"]', function (event) {
        event.preventDefault();
    });

}(jQuery));

/*----------------------------------------------
7. Magnetic Button
----------------------------------------------*/
(function ($) {

    'use strict';

	$('.magnetic-button')
	.on('mouseenter', function(e) {
		var parentOffset = $(this).offset(),
			relX = e.pageX - parentOffset.left,
			relY = e.pageY - parentOffset.top;
		$(this).find('span').css({top:relY, left:relX})
	})
	.on('mouseout', function(e) {
		var parentOffset = $(this).offset(),
			relX = e.pageX - parentOffset.left,
			relY = e.pageY - parentOffset.top;
		$(this).find('span').css({top:relY, left:relX})
	});

}(jQuery));

/*----------------------------------------------
8. Slides
----------------------------------------------*/
(function ($) {

    'use strict';

    setTimeout(function() {

        $('.no-slider .left').addClass('init');

    }, 1200)

    var animation = function(slider) {

        let image = $(slider + ' .swiper-slide-active img');
        let title = $(slider + ' .title');
        let description = $(slider + ' .description');
        let btn = $(slider + ' .btn');
        let nav = $(slider + ' nav');

        image.toggleClass('aos-animate');
        title.toggleClass('aos-animate');
        description.toggleClass('aos-animate');
        btn.toggleClass('aos-animate');
        nav.toggleClass('aos-animate');

        setTimeout(function() {

            image.toggleClass('aos-animate');
            title.toggleClass('aos-animate');
            description.toggleClass('aos-animate');
            btn.toggleClass('aos-animate');
            nav.toggleClass('aos-animate');

            AOS.refresh();

        }, 100)

    }

	var minSlider = new Swiper(".slider-min", {
		autoplay: true,
        loop: true,
		effect: "creative",
		creativeEffect: {
			prev: {
				shadow: true,
				translate: ["-120%", 0, -500],
			},
			next: {
				shadow: true,
				translate: ["120%", 0, -500],
			},
		},
		pagination: {
            el: '.swiper-pagination',
			type: "fraction",
        },
	});

	minSlider.on('slideChangeTransitionStart', function () {
		$('.testimonial-thumb img').removeClass('animated zoomIn').css('opacity', '0');
	});

	minSlider.on('slideChangeTransitionEnd', function () {
		$('.testimonial-thumb img').addClass('animated zoomIn').css('opacity', '1');
	});

    var sliderDisabled = new Swiper('.no-slider', {

        autoplay: false,
        loop: false,
        keyboard: false,
        grabCursor: false,
        allowTouchMove: false,
        on: {
            init: function() {
                animation('.no-slider')
            }
        }
    })
}(jQuery));

/*----------------------------------------------
9. Rounded Div
----------------------------------------------*/
(function ($) {

    'use strict';

	gsap.to(".rounded-div-wrapper", {
		height: "0px", // Target height
		ease: "power1.out", // Smooth easing
		scrollTrigger: {
			trigger: ".content-round",
			start: "top 80%",
			end: "bottom top",
			scrub: true
		}
	});

}(jQuery));

/*----------------------------------------------
10. Reveal Text
----------------------------------------------*/
(function ($) {

    'use strict';

    const splitTypes = document.querySelectorAll(".reveal-text");
    const rootStyles = getComputedStyle(document.documentElement);
    
    // Get initial colors
    let primaryColor = rootStyles.getPropertyValue('--primary-t-color').trim();
    let secondaryColor = rootStyles.getPropertyValue('--primary-t-color-2').trim();

    // Check for 'odd' class in body or parent
    if (document.body.classList.contains('odd')) {
        primaryColor = rootStyles.getPropertyValue('--secondary-t-color').trim();
        secondaryColor = rootStyles.getPropertyValue('--secondary-t-color-2').trim();
    }

    splitTypes.forEach((char) => {
        const text = new SplitType(char, { types: 'words, chars' });

        gsap.fromTo(text.chars,
            { color: secondaryColor }, // Initial color from SCSS variable
            {
                color: primaryColor, // Target color from SCSS variable
                scrollTrigger: {
                    trigger: char,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: true,
                    markers: false
                },
                stagger: 0.1,
            }
        );
    });

}(jQuery));

/*----------------------------------------------
11. Reveal Image
----------------------------------------------*/
(function ($) {

	'use strict';

	let itemAnimate = document.querySelectorAll('.reveal-img');

	itemAnimate.forEach(current => {
		let img = current.querySelector('img');

		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: current,
				toggleActions: 'restart none none reset',
			}
		})

		tl.set(current, {autoAlpha: 1});

		tl.from(current, 1.5, {
			xPercent: -100,
			ease: Power2.out,
		})

		tl.from(img, 1.5, {
			xPercent: 100,
			scale: 1.3,
			delay: -1.5, 
			ease: Power2.out,
		})

	})

}(jQuery));


/*----------------------------------------------
14. Progress Bar
----------------------------------------------*/
(function ($) {

    'use strict';

	const progressBars = document.querySelectorAll('.progress-bar');

	function showProgress() {
		progressBars.forEach(progressBar => {
			const value = progressBar.dataset.progress;
			progressBar.style.opacity = 1;
			progressBar.style.width = `${value}%`;
		});
	}

	$(document).ready(function () {
        const skillsSection = document.getElementById('skills');

        if (skillsSection) {
            $(window).on('scroll', function () {
                const sectionPos = skillsSection.getBoundingClientRect().top;
                const screenPos = window.innerHeight;

                if (sectionPos < screenPos) {
                    showProgress();
                }
            });
        }
    });

}(jQuery));
