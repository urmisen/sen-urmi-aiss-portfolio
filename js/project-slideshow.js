// Project Slideshow Functionality
(function() {
    'use strict';

    // Initialize all slideshows when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        const slideshows = document.querySelectorAll('.project-slideshow');
        
        slideshows.forEach(function(slideshow) {
            initSlideshow(slideshow);
        });
    });

    function initSlideshow(slideshow) {
        const slidesWrapper = slideshow.querySelector('.slides-wrapper');
        const slides = slidesWrapper.querySelectorAll('.slide');
        const prevBtn = slideshow.querySelector('.slide-nav.prev');
        const nextBtn = slideshow.querySelector('.slide-nav.next');
        const indicators = slideshow.querySelectorAll('.indicator');
        
        let currentSlide = 0;
        const totalSlides = slides.length;

        // Function to show a specific slide
        function showSlide(index) {
            // Ensure index is within bounds
            if (index < 0) {
                currentSlide = totalSlides - 1;
            } else if (index >= totalSlides) {
                currentSlide = 0;
            } else {
                currentSlide = index;
            }

            // Update slides - all slides remain in flex container for transform
            slides.forEach(function(slide, idx) {
                if (idx === currentSlide) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            // Update indicators
            indicators.forEach(function(indicator, idx) {
                indicator.classList.remove('active');
                if (idx === currentSlide) {
                    indicator.classList.add('active');
                }
            });

            // Update slides wrapper position using transform
            slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                showSlide(currentSlide - 1);
            });
        }

        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                showSlide(currentSlide + 1);
            });
        }

        // Indicator click
        indicators.forEach(function(indicator, index) {
            indicator.addEventListener('click', function() {
                showSlide(index);
            });
        });

        // Keyboard navigation
        slideshow.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                showSlide(currentSlide - 1);
            } else if (e.key === 'ArrowRight') {
                showSlide(currentSlide + 1);
            }
        });

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        slideshow.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slideshow.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50; // Minimum swipe distance
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    showSlide(currentSlide + 1);
                } else {
                    // Swipe right - previous slide
                    showSlide(currentSlide - 1);
                }
            }
        }

        // Make slideshow focusable for keyboard navigation
        slideshow.setAttribute('tabindex', '0');

        // Initialize first slide
        showSlide(0);
    }

    // Center About Section Dynamically
    function centerAboutSection() {
        const aboutSection = document.getElementById('section-about');
        const navbar = document.getElementById('pb-navbar');
        
        if (aboutSection && navbar) {
            const viewportHeight = window.innerHeight;
            const navbarHeight = navbar.offsetHeight;
            const availableHeight = viewportHeight - navbarHeight;
            
            // Get the content height
            const container = aboutSection.querySelector('.container');
            if (container) {
                const contentHeight = container.scrollHeight;
                
                // Calculate padding to center content
                const paddingTop = Math.max(0, (availableHeight - contentHeight) / 2);
                const paddingBottom = Math.max(0, (availableHeight - contentHeight) / 2);
                
                container.style.paddingTop = paddingTop + 'px';
                container.style.paddingBottom = paddingBottom + 'px';
            }
        }
    }

    // Initialize centering on page load
    window.addEventListener('DOMContentLoaded', function() {
        centerAboutSection();
    });

    // Recalculate on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            centerAboutSection();
        }, 100);
    });

    // Also center after images load
    window.addEventListener('load', function() {
        centerAboutSection();
    });
})();
