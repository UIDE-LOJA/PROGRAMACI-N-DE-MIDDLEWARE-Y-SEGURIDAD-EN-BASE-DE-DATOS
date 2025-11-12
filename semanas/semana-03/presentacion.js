// Simple Presentation Controller - No Mermaid complexity
class PresentationController {
    constructor() {
        console.log('🔍 Constructor iniciado');
        this.slides = document.querySelectorAll('.slide');
        console.log(`📊 Slides encontrados: ${this.slides.length}`);
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isTransitioning = false;

        // Cache DOM elements
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlideEl = document.getElementById('currentSlide');
        this.totalSlidesEl = document.getElementById('totalSlides');
        this.progressBar = document.getElementById('progressBar');

        console.log('🔍 Botones:', {
            prevBtn: this.prevBtn ? '✅' : '❌',
            nextBtn: this.nextBtn ? '✅' : '❌',
            currentSlideEl: this.currentSlideEl ? '✅' : '❌',
            totalSlidesEl: this.totalSlidesEl ? '✅' : '❌',
            progressBar: this.progressBar ? '✅' : '❌'
        });

        this.totalSlidesEl.textContent = this.totalSlides;

        // Initialize immediately without loading screen
        this.bindEvents();
        this.initializePresentation();
    }

    bindEvents() {
        console.log('🔗 Enlazando eventos...');
        this.prevBtn.addEventListener('click', () => {
            console.log('⬅️ Botón anterior clickeado');
            this.previousSlide();
        });
        this.nextBtn.addEventListener('click', () => {
            console.log('➡️ Botón siguiente clickeado');
            this.nextSlide();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isTransitioning) return;

            switch (e.code) {
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
        console.log(`📍 goToSlide(${index}) - actual: ${this.currentSlide}, total: ${this.totalSlides}`);

        if (index < 0 || index >= this.totalSlides || this.isTransitioning) {
            console.log('❌ Navegación bloqueada:', { index, totalSlides: this.totalSlides, isTransitioning: this.isTransitioning });
            return;
        }

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

        console.log(`✅ Slide cambiado a ${index + 1}/${this.totalSlides}`);

        // CRITICAL: Re-render Mermaid diagrams in the new slide
        this.renderMermaidInCurrentSlide();

        this.isTransitioning = false;
    }

    renderMermaidInCurrentSlide() {
        const currentSlideElement = this.slides[this.currentSlide];

        // Usar la función global de mermaid-config.js
        if (typeof window.renderMermaidInContainer === 'function') {
            window.renderMermaidInContainer(currentSlideElement);
        } else {
            console.warn('⚠️ renderMermaidInContainer no está disponible');
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

        // Render Mermaid in the first slide after a delay
        setTimeout(() => {
            console.log('🎨 Inicializando renderizado de Mermaid...');
            this.renderMermaidInCurrentSlide();
        }, 300);

        console.log('✅ Presentation initialized successfully');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PresentationController();
});

console.log('🚀 Simple presentation system loaded');