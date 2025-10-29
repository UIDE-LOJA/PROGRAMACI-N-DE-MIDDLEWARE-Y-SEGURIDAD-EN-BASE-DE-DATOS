// Diagram Fullscreen Functionality
class DiagramFullscreen {
    constructor() {
        console.log('DiagramFullscreen constructor called');
        this.currentZoom = 100;
        this.zoomLevels = [50, 75, 100, 125, 150, 200];
        this.currentDiagram = null;
        this.init();
        console.log('DiagramFullscreen constructor completed');
    }

    init() {
        console.log('DiagramFullscreen init() called');
        this.createFullscreenContainer();
        this.addEventListeners();
        console.log('DiagramFullscreen init() completed');
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

function initializeDiagramFS() {
    if (!diagramFS) {
        console.log('Initializing DiagramFullscreen...');
        diagramFS = new DiagramFullscreen();
        console.log('DiagramFullscreen initialized:', diagramFS);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - initializing DiagramFS');
    initializeDiagramFS();
});

// Also initialize after Reveal.js is ready
if (typeof Reveal !== 'undefined') {
    Reveal.addEventListener('ready', () => {
        console.log('Reveal.js ready - checking DiagramFS');
        initializeDiagramFS();
    });
} else {
    // Fallback if Reveal is not available yet
    setTimeout(() => {
        if (typeof Reveal !== 'undefined') {
            Reveal.addEventListener('ready', () => {
                console.log('Reveal.js ready (delayed) - checking DiagramFS');
                initializeDiagramFS();
            });
        }
    }, 1000);
}

// Function to open integration diagram in fullscreen
function openIntegrationDiagram() {
    console.log('openIntegrationDiagram called');
    console.log('diagramFS available:', typeof diagramFS !== 'undefined');
    console.log('diagramFS object:', diagramFS);
    
    // First, let's try a simple test
    const fullscreenTest = document.getElementById('diagramFullscreen');
    console.log('Fullscreen container exists:', !!fullscreenTest);
    
    if (typeof diagramFS !== 'undefined' && diagramFS) {
        console.log('DiagramFullscreen available, creating detailed diagram');
        
        // Create a simpler diagram first for testing
        const detailedDiagramContent = `graph TB
A["🎯 Objetos Distribuidos<br/>• .NET Remoting<br/>• COM+, CORBA<br/>⚠️ Fuertemente acoplado"]
B["📨 Message-Oriented<br/>• Colas asíncronas<br/>• Send and forget<br/>✅ Desacoplado"]
C["🌐 Servicios Web<br/>• XML Web Services<br/>• SOAP y WSDL<br/>✅ Estándares abiertos"]

A --> B
B --> C

style A fill:#ffcdd2,stroke:#d32f2f,stroke-width:2px
style B fill:#c8e6c9,stroke:#388e3c,stroke-width:2px
style C fill:#e1f5fe,stroke:#0288d1,stroke-width:2px`;

        // Create temporary element with detailed diagram
        const tempDiv = document.createElement('div');
        tempDiv.className = 'mermaid';
        tempDiv.textContent = detailedDiagramContent;
        tempDiv.style.display = 'block';
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.position = 'absolute';
        tempDiv.style.top = '-9999px';
        document.body.appendChild(tempDiv);

        console.log('Temporary diagram element created and added to DOM');
        console.log('Temp div:', tempDiv);

        // Wait a bit for the element to be ready, then open in fullscreen
        setTimeout(() => {
            console.log('Attempting to open diagram in fullscreen');
            try {
                diagramFS.open(tempDiv, 'Middleware de Integración Funcional - Vista Detallada');
                console.log('diagramFS.open() called successfully');
            } catch (error) {
                console.error('Error calling diagramFS.open():', error);
            }
            
            // Clean up after a longer delay
            setTimeout(() => {
                if (tempDiv.parentNode) {
                    console.log('Cleaning up temporary diagram element');
                    tempDiv.parentNode.removeChild(tempDiv);
                }
            }, 5000);
        }, 500);
    } else {
        console.error('DiagramFullscreen not available');
        console.error('diagramFS type:', typeof diagramFS);
        console.error('diagramFS value:', diagramFS);
        alert('La funcionalidad de pantalla completa no está disponible. Verifica que los scripts se hayan cargado correctamente.');
    }
}

// Test function to verify everything is working
function testFullscreen() {
    console.log('=== FULLSCREEN TEST ===');
    console.log('diagramFS:', diagramFS);
    console.log('DiagramFullscreen class available:', typeof DiagramFullscreen !== 'undefined');
    console.log('Fullscreen container:', document.getElementById('diagramFullscreen'));
    
    if (diagramFS) {
        console.log('diagramFS methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(diagramFS)));
    }
}
/
/ Auto-test after page load
setTimeout(() => {
    console.log('=== AUTO TEST AFTER PAGE LOAD ===');
    testFullscreen();
}, 2000);

// Make test function globally available
window.testFullscreen = testFullscreen;
window.openIntegrationDiagram = openIntegrationDiagram;