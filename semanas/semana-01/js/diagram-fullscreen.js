// Diagram Fullscreen Functionality
class DiagramFullscreen {
    constructor() {
        this.currentZoom = 100;
        this.zoomLevels = [50, 75, 100, 125, 150, 200];
        this.currentDiagram = null;
        this.init();
    }

    init() {
        this.createFullscreenContainer();
        this.addEventListeners();
        // Deshabilitado para evitar iconos duplicados
        // setTimeout(() => {
        //     this.addFullscreenIcons();
        // }, 1000);
    }

    createFullscreenContainer() {
        // Create fullscreen container
        const fullscreenDiv = document.createElement('div');
        fullscreenDiv.id = 'diagramFullscreen';
        fullscreenDiv.className = 'diagram-fullscreen';
        
        fullscreenDiv.innerHTML = `
            <div class="diagram-fullscreen-container">
                <div class="diagram-fullscreen-header">
                    <h2 class="diagram-fullscreen-title" id="diagramFullscreenTitle">
                        Diagrama - Vista Completa
                    </h2>
                    <div class="diagram-fullscreen-controls">
                        <div class="diagram-fullscreen-zoom-controls">
                            <button class="diagram-zoom-btn" onclick="diagramFS.zoomOut()">
                                <i class="fas fa-search-minus"></i> Zoom -
                            </button>
                            <span id="zoomLevel" style="color: #233570; font-weight: 600;">100%</span>
                            <button class="diagram-zoom-btn" onclick="diagramFS.zoomIn()">
                                <i class="fas fa-search-plus"></i> Zoom +
                            </button>
                            <button class="diagram-zoom-btn" onclick="diagramFS.resetZoom()">
                                <i class="fas fa-expand-arrows-alt"></i> Ajustar
                            </button>
                        </div>
                        <button class="diagram-fullscreen-close" onclick="diagramFS.close()">
                            <i class="fas fa-times"></i> Cerrar
                        </button>
                    </div>
                </div>
                <div class="diagram-fullscreen-body" id="diagramFullscreenBody">
                    <!-- El diagrama se insertará aquí -->
                </div>
            </div>
        `;
        
        document.body.appendChild(fullscreenDiv);
    }

    addEventListeners() {
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });

        // F11 key to toggle (prevent default browser fullscreen)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F11' && this.isOpen()) {
                e.preventDefault();
            }
        });
    }

    addFullscreenIcons() {
        const mermaidElements = document.querySelectorAll('.mermaid');
        
        mermaidElements.forEach((element, index) => {
            // Avoid adding multiple icons
            if (element.querySelector('.mermaid-fullscreen-icon')) return;
            
            // Create fullscreen icon
            const fullscreenIcon = document.createElement('button');
            fullscreenIcon.className = 'mermaid-fullscreen-icon';
            fullscreenIcon.innerHTML = '<i class="fas fa-expand"></i>';
            fullscreenIcon.title = 'Ver en pantalla completa (Click o F)';
            
            // Get diagram title from context
            let diagramTitle = 'Diagrama';
            const parentSection = element.closest('section');
            if (parentSection) {
                const heading = parentSection.querySelector('h3');
                if (heading) {
                    diagramTitle = heading.textContent.trim();
                }
            }
            
            // Add click event to icon
            fullscreenIcon.onclick = (e) => {
                e.stopPropagation();
                this.open(element, diagramTitle);
            };
            
            // Add icon to diagram
            element.appendChild(fullscreenIcon);
            
            // Make entire diagram clickable
            element.onclick = () => {
                this.open(element, diagramTitle);
            };

            // Add keyboard shortcut (F key when hovering)
            element.addEventListener('keydown', (e) => {
                if (e.key === 'f' || e.key === 'F') {
                    this.open(element, diagramTitle);
                }
            });
        });
    }

    open(diagramElement, title) {
        const fullscreen = document.getElementById('diagramFullscreen');
        const titleElement = document.getElementById('diagramFullscreenTitle');
        const bodyElement = document.getElementById('diagramFullscreenBody');
        
        if (!fullscreen || !titleElement || !bodyElement || !diagramElement) return;

        // Set title
        titleElement.textContent = title || 'Diagrama - Vista Completa';
        
        // Clone diagram
        const diagramClone = diagramElement.cloneNode(true);
        diagramClone.style.cursor = 'default';
        diagramClone.classList.add('diagram-zoom-100');
        
        // Remove fullscreen icon from clone
        const iconInClone = diagramClone.querySelector('.mermaid-fullscreen-icon');
        if (iconInClone) {
            iconInClone.remove();
        }
        
        // Clear body and add cloned diagram
        bodyElement.innerHTML = '';
        bodyElement.appendChild(diagramClone);
        
        // Store current diagram reference
        this.currentDiagram = diagramClone;
        this.currentZoom = 100;
        this.updateZoomDisplay();
        
        // Show fullscreen
        fullscreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Enter browser fullscreen mode
        this.enterBrowserFullscreen();
        
        // Re-render mermaid if needed
        setTimeout(() => {
            if (typeof mermaid !== 'undefined' && diagramClone.classList.contains('mermaid')) {
                try {
                    // Check if diagram already has SVG content
                    if (diagramClone.querySelector('svg')) {
                        console.log('Diagram already has SVG content, skipping re-render');
                        return;
                    }
                    
                    // Get the diagram content
                    const content = diagramClone.textContent?.trim();
                    if (!content) {
                        console.warn('No diagram content found');
                        return;
                    }
                    
                    // Use modern mermaid.render API
                    if (mermaid.render) {
                        const diagramId = `fullscreen-diagram-${Date.now()}`;
                        mermaid.render(diagramId, content)
                            .then(({svg}) => {
                                diagramClone.innerHTML = svg;
                                console.log('Diagram rendered successfully in fullscreen');
                            })
                            .catch(error => {
                                console.error('Error rendering diagram in fullscreen:', error);
                                // Fallback: show content as text
                                diagramClone.innerHTML = `<pre style="background: #f5f5f5; padding: 1rem; border-radius: 8px; overflow: auto; max-height: 400px;">${content}</pre>`;
                            });
                    } else {
                        // Fallback for older Mermaid versions
                        mermaid.init(undefined, diagramClone);
                    }
                } catch (error) {
                    console.error('Error processing diagram in fullscreen:', error);
                }
            }
        }, 200);
    }

    close() {
        const fullscreen = document.getElementById('diagramFullscreen');
        if (fullscreen) {
            fullscreen.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.currentDiagram = null;
            
            // Exit browser fullscreen
            this.exitBrowserFullscreen();
        }
    }

    isOpen() {
        const fullscreen = document.getElementById('diagramFullscreen');
        return fullscreen && fullscreen.style.display === 'block';
    }

    zoomIn() {
        const currentIndex = this.zoomLevels.indexOf(this.currentZoom);
        if (currentIndex < this.zoomLevels.length - 1) {
            this.currentZoom = this.zoomLevels[currentIndex + 1];
            this.applyZoom();
        }
    }

    zoomOut() {
        const currentIndex = this.zoomLevels.indexOf(this.currentZoom);
        if (currentIndex > 0) {
            this.currentZoom = this.zoomLevels[currentIndex - 1];
            this.applyZoom();
        }
    }

    resetZoom() {
        this.currentZoom = 100;
        this.applyZoom();
    }

    applyZoom() {
        if (this.currentDiagram) {
            // Remove all zoom classes
            this.zoomLevels.forEach(level => {
                this.currentDiagram.classList.remove(`diagram-zoom-${level}`);
            });
            
            // Add current zoom class
            this.currentDiagram.classList.add(`diagram-zoom-${this.currentZoom}`);
            this.updateZoomDisplay();
        }
    }

    updateZoomDisplay() {
        const zoomDisplay = document.getElementById('zoomLevel');
        if (zoomDisplay) {
            zoomDisplay.textContent = `${this.currentZoom}%`;
        }
    }

    enterBrowserFullscreen() {
        const element = document.documentElement;
        
        if (element.requestFullscreen) {
            element.requestFullscreen().catch(err => {
                console.log('Fullscreen not supported or denied');
            });
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
    }

    exitBrowserFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(err => {
                console.log('Exit fullscreen failed');
            });
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
    }
}

// Initialize diagram fullscreen functionality
let diagramFS;
document.addEventListener('DOMContentLoaded', () => {
    diagramFS = new DiagramFullscreen();
});

// Also initialize after Reveal.js is ready
if (typeof Reveal !== 'undefined') {
    Reveal.addEventListener('ready', () => {
        if (!diagramFS) {
            diagramFS = new DiagramFullscreen();
        }
    });
}