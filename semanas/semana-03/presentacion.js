// Simple Presentation Controller - No Mermaid complexity
class PresentationController {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isTransitioning = false;
        
        // Cache DOM elements
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlideEl = document.getElementById('currentSlide');
        this.totalSlidesEl = document.getElementById('totalSlides');
        this.progressBar = document.getElementById('progressBar');
        
        this.totalSlidesEl.textContent = this.totalSlides;
        
        // Initialize immediately without loading screen
        this.bindEvents();
        this.initializePresentation();
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isTransitioning) return;
            
            switch(e.code) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case 'Space':
                    e.preventDefault();
                    this.nextSlide();
                    break;
            }
        }, { passive: false });
    }

    goToSlide(index) {
        if (index < 0 || index >= this.totalSlides || this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Hide current, show new
        this.slides[this.currentSlide].style.display = 'none';
        this.slides[index].style.display = 'flex';
        
        this.currentSlide = index;
        
        // Update UI
        this.currentSlideEl.textContent = index + 1;
        this.progressBar.style.width = `${((index + 1) / this.totalSlides) * 100}%`;
        this.prevBtn.disabled = index === 0;
        this.nextBtn.disabled = index === this.totalSlides - 1;
        
        // CRITICAL: Re-render Mermaid diagrams in the new slide
        this.renderMermaidInCurrentSlide();
        
        this.isTransitioning = false;
    }

    renderMermaidInCurrentSlide() {
        const currentSlideElement = this.slides[this.currentSlide];
        const mermaidElements = currentSlideElement.querySelectorAll('.mermaid');

        if (mermaidElements.length > 0) {
            console.log(`🔄 Processing ${mermaidElements.length} Mermaid diagrams in slide ${this.currentSlide + 1}`);

            mermaidElements.forEach((element, index) => {
                // Check if this element has already been processed
                if (!element.hasAttribute('data-processed') && !element.hasAttribute('data-processing')) {
                    console.log(`📊 Rendering diagram ${index + 1} in slide ${this.currentSlide + 1}`);

                    // Mark as processing immediately to prevent duplicate renders
                    element.setAttribute('data-processing', 'true');

                    // Use setTimeout to ensure the slide is fully visible in DOM
                    setTimeout(() => {
                        if (typeof mermaid !== 'undefined') {
                            try {
                                // CRITICAL: Verify element is in DOM and visible
                                const isVisible = element.offsetParent !== null;
                                const isInDOM = document.body.contains(element);

                                if (!isVisible || !isInDOM) {
                                    console.warn(`⚠️ Element ${index + 1} not visible or not in DOM yet, skipping`);
                                    element.removeAttribute('data-processing');
                                    return;
                                }

                                // Store original content for potential re-render
                                const originalContent = element.textContent;

                                // Use mermaid.run for better control
                                if (mermaid.run) {
                                    mermaid.run({ nodes: [element] }).then(() => {
                                        element.setAttribute('data-processed', 'true');
                                        element.removeAttribute('data-processing');
                                        console.log(`✅ Diagram ${index + 1} rendered successfully`);
                                    }).catch(error => {
                                        console.error(`❌ Error rendering diagram ${index + 1}:`, error);
                                        element.removeAttribute('data-processing');
                                        // Restore original content on error
                                        element.textContent = originalContent;
                                    });
                                } else {
                                    // Fallback to mermaid.init (deprecated but safer)
                                    try {
                                        mermaid.init(undefined, element);
                                        element.setAttribute('data-processed', 'true');
                                        element.removeAttribute('data-processing');
                                        console.log(`✅ Diagram ${index + 1} rendered with init`);
                                    } catch (initError) {
                                        console.error(`❌ Error with mermaid.init:`, initError);
                                        element.removeAttribute('data-processing');
                                    }
                                }
                            } catch (error) {
                                console.error(`❌ Critical error rendering diagram ${index + 1}:`, error);
                                element.removeAttribute('data-processing');
                            }
                        } else {
                            console.warn('⚠️ Mermaid library not loaded');
                            element.removeAttribute('data-processing');
                        }
                    }, 200 + (index * 150)); // Stagger rendering to avoid race conditions
                } else if (element.hasAttribute('data-processed')) {
                    console.log(`✅ Diagram ${index + 1} already processed`);
                } else {
                    console.log(`⏳ Diagram ${index + 1} is currently processing`);
                }
            });
        }
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    
    initializePresentation() {
        // Hide all slides except the first one
        for (let i = 1; i < this.slides.length; i++) {
            this.slides[i].style.display = 'none';
        }
        
        // Show first slide
        this.slides[0].style.display = 'flex';
        
        // Update display
        this.currentSlideEl.textContent = 1;
        this.progressBar.style.width = `${(1 / this.totalSlides) * 100}%`;
        this.prevBtn.disabled = true;
        this.nextBtn.disabled = this.totalSlides === 1;
        
        // Render Mermaid in the first slide
        setTimeout(() => {
            this.renderMermaidInCurrentSlide();
        }, 100);
        
        console.log('✅ Presentation initialized successfully');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PresentationController();
});

console.log('🚀 Simple presentation system loaded');