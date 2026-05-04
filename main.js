document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Adjust for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Video Placeholder Interaction (Simulate playing a video)
    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        videoWrapper.addEventListener('click', () => {
            // Here you would typically initialize a real video player or open a modal
            // For now, we'll just add a visual feedback
            const placeholder = videoWrapper.querySelector('.video-placeholder');
            placeholder.innerHTML = '<div class="spinner" style="width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: #fff; animation: spin 1s ease-in-out infinite;"></div><style>@keyframes spin { to { transform: rotate(360deg); } }</style>';
            
            setTimeout(() => {
                placeholder.innerHTML = '<span>Vídeo estaria tocando aqui... :)</span>';
            }, 1500);
        });
    }

    // Checkout Modal Logic
    const checkoutBtns = document.querySelectorAll('.checkout-btn');
    const modal = document.getElementById('disclaimerModal');
    const agreeBtn = document.getElementById('agreeBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    let currentCheckoutUrl = '';

    if (modal && agreeBtn && cancelBtn) {
        checkoutBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                currentCheckoutUrl = btn.getAttribute('href');
                modal.classList.add('active');
            });
        });

        agreeBtn.addEventListener('click', () => {
            if (currentCheckoutUrl) {
                window.location.href = currentCheckoutUrl;
            }
        });

        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            currentCheckoutUrl = '';
        });

        // Close on clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                currentCheckoutUrl = '';
            }
        });
    }
});
