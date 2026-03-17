document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initNavActiveLink();
    initModals();
    initVideoModal();
    initDemoForm();
    initMobileMenu();
    initScrollAnimations();
    initShowcaseTabs();
});

/* ---- Navigation: Scroll-based background transition ---- */
function initNavScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const SCROLL_THRESHOLD = 80;

    function updateNav() {
        if (window.scrollY > SCROLL_THRESHOLD) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    // Initial check
    updateNav();

    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateNav();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* ---- Navigation: Active link tracking via IntersectionObserver ---- */
function initNavActiveLink() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    if (!navLinks.length || !sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
}

/* ---- Modal System ---- */
function initModals() {
    // Demo modal triggers via data-action="demo"
    document.querySelectorAll('[data-action="demo"]').forEach(btn => {
        btn.addEventListener('click', () => openModal('demo-modal'));
    });

    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) closeModal(modal.id);
        });
    });

    // Click backdrop to close
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', () => {
            const modal = backdrop.closest('.modal');
            if (modal) closeModal(modal.id);
        });
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.open').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus trap: move focus to first input or close button
    requestAnimationFrame(() => {
        const firstInput = modal.querySelector('input, button.modal-close');
        if (firstInput) firstInput.focus();
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    // If video modal, stop video
    if (modalId === 'video-modal') {
        const iframe = document.getElementById('video-iframe');
        if (iframe) iframe.src = '';
    }

    modal.classList.remove('open');
    document.body.style.overflow = '';
}

/* ---- Video Modal ---- */
function initVideoModal() {
    document.querySelectorAll('[data-action="video"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const videoId = btn.getAttribute('data-video');
            if (!videoId) return;

            const iframe = document.getElementById('video-iframe');
            if (iframe) {
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            }
            openModal('video-modal');
        });
    });
}

/* ---- Demo Form (Brevo via Cloudflare Worker) ---- */
// TODO: Replace with your Cloudflare Worker URL after deployment
const WORKER_URL = 'https://aurafusen-form.YOUR-SUBDOMAIN.workers.dev';

function initDemoForm() {
    const form = document.getElementById('demo-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Clear any previous errors
        const existingError = form.querySelector('.form-error');
        if (existingError) existingError.remove();

        const payload = {
            name: form.querySelector('#demo-name').value.trim(),
            email: form.querySelector('#demo-email').value.trim(),
            company: form.querySelector('#demo-company').value.trim(),
            team_size: form.querySelector('#demo-size').value.trim(),
        };

        try {
            const response = await fetch(WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.success) {
                form.innerHTML = `
                    <div class="success-message">
                        <p>Thank you! We'll be in touch within 24 hours.</p>
                    </div>
                `;

                setTimeout(() => {
                    closeModal('demo-modal');
                }, 3000);
            } else {
                throw new Error(data.message || 'Form submission failed');
            }
        } catch (err) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            const errorEl = document.createElement('p');
            errorEl.className = 'form-error';
            errorEl.textContent = 'Something went wrong. Please try again or email us at hello@aurafusen.com';
            form.appendChild(errorEl);
        }
    });
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ---- Scroll Animations ---- */
function initScrollAnimations() {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = document.querySelectorAll(
        '.feature-card, .step, .pilot-card, .trust-metric, .ucm-card, .showcase-viewer'
    );

    elements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));

    // Stagger siblings within grid containers
    const grids = document.querySelectorAll(
        '.features-hero-grid, .features-support-grid, .steps-strip, .pilot-grid, .trust-metrics, .use-case-mockup'
    );

    grids.forEach(grid => {
        const gridObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.querySelectorAll('.reveal');
                    children.forEach((child, i) => {
                        child.style.transitionDelay = `${i * 0.08}s`;
                        child.classList.add('visible');
                    });
                    gridObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        gridObserver.observe(grid);
    });
}

/* ---- Product Showcase Tabs ---- */
function initShowcaseTabs() {
    const tabs = document.querySelectorAll('.showcase-tab');
    const slides = document.querySelectorAll('.showcase-slide');
    const descs = document.querySelectorAll('.showcase-desc');

    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const index = tab.getAttribute('data-tab');

            // Update tabs
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Update slides
            slides.forEach(s => s.classList.remove('active'));
            const targetSlide = document.querySelector(`.showcase-slide[data-slide="${index}"]`);
            if (targetSlide) targetSlide.classList.add('active');

            // Update descriptions
            descs.forEach(d => d.classList.remove('active'));
            const targetDesc = document.querySelector(`.showcase-desc[data-desc="${index}"]`);
            if (targetDesc) targetDesc.classList.add('active');
        });
    });
}
