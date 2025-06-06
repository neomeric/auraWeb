// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Initialize glitch text effect
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        glitchText.setAttribute('data-text', glitchText.textContent);
    }

    // Modal functionality
    const modal = document.getElementById('waitlist-modal');
    const waitlistBtns = document.querySelectorAll('.waitlist-btn, .cta-btn');
    const closeModal = document.querySelector('.close-modal');
    
    waitlistBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Animate modal entrance
            const modalContent = document.querySelector('.modal-content');
            modalContent.style.opacity = '0';
            modalContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                modalContent.style.transition = 'all 0.3s ease';
                modalContent.style.opacity = '1';
                modalContent.style.transform = 'translateY(0)';
            }, 10);
        });
    });
    
    closeModal.addEventListener('click', () => {
        const modalContent = document.querySelector('.modal-content');
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            const modalContent = document.querySelector('.modal-content');
            modalContent.style.opacity = '0';
            modalContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });
    
    // Form submission
    const waitlistForm = document.getElementById('waitlist-form');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = waitlistForm.querySelector('input[type="email"]').value;
            
            // In a real application, you would send this to a server
            console.log('Email submitted:', email);
            
            // Show success message
            waitlistForm.innerHTML = '<p class="success-message">Thank you for joining our waitlist. We\'ll notify you when AuraFusen is ready.</p>';
        });
    }
    
    // Animated data fusion visualization
    initDataFusionAnimation();
    
    // Initialize neural network animation
    animateNeuralNetwork();
    
    // Initialize tech section animations
    initTechSectionAnimations();
    
    // Initialize use cases interaction
    initUseCasesInteraction();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Case card hover effects
    initCaseCardEffects();
});

// Data fusion animation
function initDataFusionAnimation() {
    const animationContainer = document.querySelector('.data-fusion-animation');
    if (!animationContainer) return;
    
    // Create animation elements
    const dataTypes = ['Text', 'Voice', 'Video'];
    const colors = ['#6e00ff', '#00c2ff', '#ff00c8'];
    
    dataTypes.forEach((type, index) => {
        const dataStream = document.createElement('div');
        dataStream.className = 'data-stream';
        dataStream.style.position = 'absolute';
        dataStream.style.top = `${20 + index * 30}%`;
        dataStream.style.left = '10%';
        dataStream.style.width = '25%';
        dataStream.style.height = '10px';
        dataStream.style.background = colors[index];
        dataStream.style.borderRadius = '5px';
        dataStream.style.opacity = '0.7';
        
        const dataLabel = document.createElement('div');
        dataLabel.className = 'data-label';
        dataLabel.textContent = type;
        dataLabel.style.position = 'absolute';
        dataLabel.style.top = `${20 + index * 30 - 20}%`;
        dataLabel.style.left = '5%';
        dataLabel.style.color = colors[index];
        dataLabel.style.fontWeight = 'bold';
        
        animationContainer.appendChild(dataLabel);
        animationContainer.appendChild(dataStream);
        
        // Animate data stream
        animateDataStream(dataStream, index);
    });
    
    // Create fusion point
    const fusionPoint = document.createElement('div');
    fusionPoint.className = 'fusion-point';
    fusionPoint.style.position = 'absolute';
    fusionPoint.style.top = '50%';
    fusionPoint.style.left = '50%';
    fusionPoint.style.transform = 'translate(-50%, -50%)';
    fusionPoint.style.width = '50px';
    fusionPoint.style.height = '50px';
    fusionPoint.style.borderRadius = '50%';
    fusionPoint.style.background = 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(110,0,255,0.5) 100%)';
    fusionPoint.style.boxShadow = '0 0 20px rgba(110,0,255,0.7)';
    fusionPoint.style.animation = 'pulse 2s infinite';
    
    // Create result stream
    const resultStream = document.createElement('div');
    resultStream.className = 'result-stream';
    resultStream.style.position = 'absolute';
    resultStream.style.top = '50%';
    resultStream.style.left = '65%';
    resultStream.style.width = '25%';
    resultStream.style.height = '15px';
    resultStream.style.background = 'linear-gradient(90deg, #6e00ff, #00c2ff, #ff00c8)';
    resultStream.style.borderRadius = '7px';
    resultStream.style.opacity = '0.9';
    
    const resultLabel = document.createElement('div');
    resultLabel.className = 'result-label';
    resultLabel.textContent = 'Emotional Intelligence';
    resultLabel.style.position = 'absolute';
    resultLabel.style.top = '40%';
    resultLabel.style.right = '5%';
    resultLabel.style.color = '#ffffff';
    resultLabel.style.fontWeight = 'bold';
    
    animationContainer.appendChild(fusionPoint);
    animationContainer.appendChild(resultStream);
    animationContainer.appendChild(resultLabel);
    
    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.7; }
            50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.7; }
        }
        
        @keyframes dataFlow {
            0% { transform: scaleX(0.3); opacity: 0.5; }
            50% { transform: scaleX(1); opacity: 0.9; }
            100% { transform: scaleX(0.3); opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
}

function animateDataStream(element, index) {
    element.style.animation = `dataFlow ${1.5 + index * 0.5}s infinite`;
    element.style.transformOrigin = 'left center';
}

// Scroll animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        if (section !== document.querySelector('.hero')) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.8s ease';
            observer.observe(section);
        }
    });
}

// Case card hover effects
function initCaseCardEffects() {
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const otherCards = Array.from(caseCards).filter(c => c !== card);
            otherCards.forEach(c => {
                c.style.opacity = '0.5';
                c.style.transform = 'scale(0.98)';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            caseCards.forEach(c => {
                c.style.opacity = '1';
                c.style.transform = '';
            });
        });
    });
}

// Technology section animations
function initTechSectionAnimations() {
    const techItems = document.querySelectorAll('.tech-spec-item');
    
    techItems.forEach((item, index) => {
        // Add delay to stagger the animations
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            
            // Start the animation after a small delay
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
        
        // Add hover effect for stats
        const stats = item.querySelectorAll('.stat');
        
        item.addEventListener('mouseenter', () => {
            stats.forEach((stat, i) => {
                setTimeout(() => {
                    stat.style.transform = 'translateY(-10px)';
                    stat.style.transition = 'transform 0.3s ease';
                }, i * 100);
            });
        });
        
        item.addEventListener('mouseleave', () => {
            stats.forEach(stat => {
                stat.style.transform = 'translateY(0)';
            });
        });
    });
    
    // Animate the stat numbers with counting effect
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Only animate if it's a number or has a number with a suffix
                if (/^\d+(\.\d+)?%?x?\+?$/.test(finalValue)) {
                    let startValue = 0;
                    const duration = 2000; // ms
                    const suffix = finalValue.replace(/[\d.]/g, '');
                    const endValue = parseFloat(finalValue);
                    const increment = endValue / (duration / 16); // 60fps
                    
                    function updateCount() {
                        startValue += increment;
                        if (startValue < endValue) {
                            target.textContent = Math.floor(startValue) + suffix;
                            requestAnimationFrame(updateCount);
                        } else {
                            target.textContent = finalValue;
                        }
                    }
                    
                    updateCount();
                    
                    // Unobserve after animation starts
                    observer.unobserve(target);
                }
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
    
    // Initialize expandable tech feature cards
    initExpandableFeatures();
    
    // Add hover effects to tech metrics
    addMetricsHoverEffects();
}

// Initialize expandable tech feature cards
function initExpandableFeatures() {
    const featureCards = document.querySelectorAll('.tech-feature-card');
    
    featureCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        if (!expandBtn) return;
        
        expandBtn.addEventListener('click', () => {
            // Toggle expanded state
            card.classList.toggle('expanded');
            
            // Toggle icon rotation
            const icon = expandBtn.querySelector('i');
            if (card.classList.contains('expanded')) {
                icon.style.transform = 'rotate(180deg)';
                // Expand the card with additional content
                expandCard(card);
            } else {
                icon.style.transform = 'rotate(0deg)';
                // Collapse the card
                collapseCard(card);
            }
        });
    });
}

// Expand a feature card with additional content
function expandCard(card) {
    // Get the feature title to determine which content to show
    const title = card.querySelector('h3').textContent;
    
    // Create expanded content container if it doesn't exist
    let expandedContent = card.querySelector('.expanded-content');
    if (!expandedContent) {
        expandedContent = document.createElement('div');
        expandedContent.className = 'expanded-content';
        card.appendChild(expandedContent);
    }
    
    // Set expanded content based on feature type
    let contentHTML = '';
    
    switch(title) {
        case 'Real-Time Analysis':
            contentHTML = `
                <ul class="feature-details">
                    <li>Processes multiple input streams simultaneously</li>
                    <li>Detects micro-expressions in under 30ms</li>
                    <li>Contextual awareness across conversation history</li>
                </ul>
            `;
            break;
        case 'Emotional Intelligence':
            contentHTML = `
                <ul class="feature-details">
                    <li>Recognizes 64+ distinct emotional states</li>
                    <li>Understands cultural variations in expression</li>
                    <li>Adapts to individual communication styles</li>
                </ul>
            `;
            break;
        case 'Modular Architecture':
            contentHTML = `
                <ul class="feature-details">
                    <li>Plug-and-play components for custom solutions</li>
                    <li>Flexible API integration with existing systems</li>
                    <li>Scalable from edge devices to cloud deployment</li>
                </ul>
            `;
            break;
        case 'Quantum-Inspired Processing':
            contentHTML = `
                <ul class="feature-details">
                    <li>Probabilistic emotion state modeling</li>
                    <li>42x faster than traditional neural networks</li>
                    <li>Handles ambiguity in emotional expressions</li>
                </ul>
            `;
            break;
        case 'Enterprise-Grade Security':
            contentHTML = `
                <ul class="feature-details">
                    <li>Zero-knowledge processing options</li>
                    <li>GDPR and CCPA compliant by design</li>
                    <li>SOC 2 Type II certified infrastructure</li>
                </ul>
            `;
            break;
        case 'Edge Computing Optimization':
            contentHTML = `
                <ul class="feature-details">
                    <li>5MB model footprint for mobile devices</li>
                    <li>Operates offline with full functionality</li>
                    <li>Adaptive power consumption based on workload</li>
                </ul>
            `;
            break;
    }
    
    expandedContent.innerHTML = contentHTML;
    
    // Animate the expanded content
    expandedContent.style.maxHeight = '0';
    expandedContent.style.opacity = '0';
    
    setTimeout(() => {
        expandedContent.style.transition = 'all 0.5s ease';
        expandedContent.style.maxHeight = '200px';
        expandedContent.style.opacity = '1';
    }, 10);
}

// Collapse a feature card
function collapseCard(card) {
    const expandedContent = card.querySelector('.expanded-content');
    if (!expandedContent) return;
    
    expandedContent.style.maxHeight = '0';
    expandedContent.style.opacity = '0';
    
    setTimeout(() => {
        expandedContent.remove();
    }, 500);
}

// Add hover effects to tech metrics
function addMetricsHoverEffects() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
}

// Neural network connections animation
function animateNeuralNetwork() {
    const nodes = document.querySelectorAll('.node');
    const connections = document.querySelectorAll('.connection');
    
    // Randomly change the position of nodes slightly
    setInterval(() => {
        nodes.forEach(node => {
            const currentTop = parseFloat(getComputedStyle(node).top);
            const currentLeft = parseFloat(getComputedStyle(node).left);
            
            const newTop = currentTop + (Math.random() * 2 - 1);
            const newLeft = currentLeft + (Math.random() * 2 - 1);
            
            node.style.top = `${newTop}%`;
            node.style.left = `${newLeft}%`;
        });
    }, 3000);
    
    // Add mouse interaction with the neural network
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            nodes.forEach(node => {
                const rect = node.getBoundingClientRect();
                const nodeX = rect.left + rect.width / 2;
                const nodeY = rect.top + rect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(mouseX - nodeX, 2) + 
                    Math.pow(mouseY - nodeY, 2)
                );
                
                if (distance < 200) {
                    const scale = 1 + (1 - distance / 200) * 0.5;
                    node.style.transform = `scale(${scale})`;
                    node.style.opacity = Math.min(1, node.style.opacity * 1.2);
                } else {
                    node.style.transform = '';
                }
            });
        });
    }
}

// Initialize use cases interaction
function initUseCasesInteraction() {
    const caseCards = document.querySelectorAll('.case-card');
    const caseDetail = document.getElementById('case-detail');
    
    if (!caseCards.length || !caseDetail) return;
    
    // Set initial active case
    updateCaseDetail('hr');
    
    caseCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            caseCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            card.classList.add('active');
            
            // Update case detail
            const caseType = card.getAttribute('data-case');
            updateCaseDetail(caseType);
        });
    });
}

// Update case detail content
function updateCaseDetail(caseType) {
    const caseDetail = document.getElementById('case-detail');
    const detailIcon = caseDetail.querySelector('.case-detail-icon i');
    const detailTitle = caseDetail.querySelector('.case-detail-content h3');
    const detailDesc = caseDetail.querySelector('.case-detail-content p');
    
    // Remove all icon classes except 'fas'
    detailIcon.className = 'fas';
    
    // Set content based on case type
    switch(caseType) {
        case 'hr':
            detailIcon.classList.add('fa-briefcase');
            detailTitle.textContent = 'HR & Interview AI';
            detailDesc.textContent = 'Reads confidence, engagement, and honesty in candidate responses, providing deeper insights into potential hires.';
            break;
        case 'tutor':
            detailIcon.classList.add('fa-graduation-cap');
            detailTitle.textContent = 'AI Tutors';
            detailDesc.textContent = 'Adapts in real time based on student emotions and engagement, creating personalized learning experiences.';
            break;
        case 'agent':
            detailIcon.classList.add('fa-headset');
            detailTitle.textContent = 'AI Virtual Agents';
            detailDesc.textContent = 'Understands sarcasm, frustration, and urgency for better support, revolutionizing customer interactions.';
            break;
        case 'health':
            detailIcon.classList.add('fa-heart');
            detailTitle.textContent = 'AI Mental Health Companion';
            detailDesc.textContent = 'Analyzes tone and speech patterns to offer emotional support when you need it most.';
            break;
        case 'audience':
            detailIcon.classList.add('fa-users');
            detailTitle.textContent = 'Real-Time Audience AI';
            detailDesc.textContent = 'Detects audience sentiment shifts in live events, speeches, or videos, enabling dynamic content adaptation.';
            break;
    }
    
    // Set the data-case attribute for styling
    caseDetail.setAttribute('data-case', caseType);
    
    // Animate the detail panel
    animateCaseDetail(caseDetail);
}

// Animate case detail when changing
function animateCaseDetail(detailElement) {
    detailElement.style.opacity = '0';
    detailElement.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        detailElement.style.transition = 'all 0.5s ease';
        detailElement.style.opacity = '1';
        detailElement.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        detailElement.style.transition = '';
    }, 600);
}
