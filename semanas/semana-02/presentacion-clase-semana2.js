// Custom JavaScript for Semana 2 - Capas, MVC y Middleware de Integración

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Presentación Semana 2 - Middleware y Arquitecturas cargada');
    
    // Initialize Mermaid diagrams
    initializeMermaid();
    
    // Add interactive behaviors
    initializeInteractiveElements();
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
    
    // Initialize timers for activities
    initializeTimers();
    
    // Add architecture comparison features
    initializeArchitectureComparison();
});

// Initialize Mermaid diagrams
function initializeMermaid() {
    mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis'
        },
        sequence: {
            diagramMarginX: 50,
            diagramMarginY: 10,
            actorMargin: 50,
            width: 150,
            height: 65,
            boxMargin: 10,
            boxTextMargin: 5,
            noteMargin: 10,
            messageMargin: 35
        }
    });
}

// Initialize interactive elements
function initializeInteractiveElements() {
    // Add hover effects to concept boxes
    const conceptBoxes = document.querySelectorAll('.concept-box');
    conceptBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add click effects to interactive boxes
    const interactiveBoxes = document.querySelectorAll('.interactive-box');
    interactiveBoxes.forEach(box => {
        box.addEventListener('click', function() {
            this.style.background = 'rgba(233, 171, 33, 0.3)';
            setTimeout(() => {
                this.style.background = 'rgba(233, 171, 33, 0.2)';
            }, 200);
        });
    });
    
    // Add special effects for MVC components
    const mvcComponents = document.querySelectorAll('.mvc-model, .mvc-view, .mvc-controller');
    mvcComponents.forEach(component => {
        component.addEventListener('click', function() {
            highlightMVCFlow(this);
        });
    });
}

// Highlight MVC flow
function highlightMVCFlow(clickedComponent) {
    const allComponents = document.querySelectorAll('.mvc-model, .mvc-view, .mvc-controller');
    
    // Reset all components
    allComponents.forEach(comp => {
        comp.style.opacity = '0.5';
        comp.style.transform = 'scale(1)';
    });
    
    // Highlight clicked component
    clickedComponent.style.opacity = '1';
    clickedComponent.style.transform = 'scale(1.05)';
    clickedComponent.style.transition = 'all 0.3s ease';
    
    // Reset after 2 seconds
    setTimeout(() => {
        allComponents.forEach(comp => {
            comp.style.opacity = '1';
            comp.style.transform = 'scale(1)';
        });
    }, 2000);
}

// Add keyboard shortcuts
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Press 'h' to show help
        if (event.key === 'h' || event.key === 'H') {
            showHelp();
        }
        
        // Press 't' to toggle timer
        if (event.key === 't' || event.key === 'T') {
            toggleTimer();
        }
        
        // Press 'a' to show architecture comparison
        if (event.key === 'a' || event.key === 'A') {
            showArchitectureComparison();
        }
        
        // Press 'm' to show MVC cheat sheet
        if (event.key === 'm' || event.key === 'M') {
            showMVCCheatSheet();
        }
    });
}

// Show help overlay
function showHelp() {
    const helpContent = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: rgba(0,0,0,0.8); z-index: 9999; display: flex; 
                    align-items: center; justify-content: center;" id="helpOverlay">
            <div style="background: white; padding: 2rem; border-radius: 10px; max-width: 600px;">
                <h3>Atajos de Teclado - Middleware</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: left;">
                    <div>
                        <h4>Navegación</h4>
                        <ul>
                            <li><strong>H:</strong> Mostrar esta ayuda</li>
                            <li><strong>T:</strong> Activar/desactivar temporizador</li>
                            <li><strong>ESC:</strong> Cerrar overlays</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Contenido</h4>
                        <ul>
                            <li><strong>A:</strong> Comparación arquitectónica</li>
                            <li><strong>M:</strong> Guía rápida MVC</li>
                            <li><strong>Espacio:</strong> Siguiente slide</li>
                        </ul>
                    </div>
                </div>
                <button onclick="closeOverlay('helpOverlay')" 
                        style="margin-top: 1rem; padding: 0.5rem 1rem; 
                               background: #28a745; color: white; border: none; 
                               border-radius: 5px; cursor: pointer;">
                    Cerrar
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', helpContent);
    
    // Close on ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeOverlay('helpOverlay');
        }
    });
}

// Show architecture comparison
function showArchitectureComparison() {
    const comparisonContent = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: rgba(0,0,0,0.8); z-index: 9999; display: flex; 
                    align-items: center; justify-content: center;" id="architectureOverlay">
            <div style="background: white; padding: 2rem; border-radius: 10px; max-width: 800px; max-height: 80vh; overflow-y: auto;">
                <h3>Comparación Rápida: Monolito vs Microservicios</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                    <thead>
                        <tr style="background: #28a745; color: white;">
                            <th style="padding: 0.8rem; border: 1px solid #ddd;">Aspecto</th>
                            <th style="padding: 0.8rem; border: 1px solid #ddd;">Monolítico</th>
                            <th style="padding: 0.8rem; border: 1px solid #ddd;">Microservicios</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 0.8rem; border: 1px solid #ddd; font-weight: bold;">Despliegue</td>
                            <td style="padding: 0.8rem; border: 1px solid #ddd;">Artefacto único</td>
                            <td style="padding: 0.8rem; border: 1px solid #ddd;">Servicios independientes</td>
                        </tr>
                        <tr style="background: #f8f9fa;">
                            <td style="padding: 0.8rem; border: 1px solid #ddd; font-weight: bold;">Escalabilidad</td>
                            <td style="padding: 0.8rem; border: 1px solid #ddd;">Vertical (toda la app)</td>
                            <td style="padding: 0.8rem; border: 1px solid #ddd;">Horizontal (por servicio)</td>
                        </tr>
                        <tr>
                            <td style="padding: 0.8rem; border: 1px solid #ddd; font-weight: bold;">Datos</td>
                            <td style="padding: 0.8rem; border: 1px solid #ddd;">BD centralizada</td>
                            <td style="padding: 0.8rem; border: 1px solid #ddd;">BD descentralizada</td>
                        </tr>
                        <tr style="background: #f8f9fa;">
                            <td style="padding: 0.8rem; border: 1px solid #ddd; font-weight: bold;">Fallas</td>
                            <td style="padding: 0.8rem; border: 1px solid #ddd;">Afecta todo el sistema</td>
                            <td style="padding: 0.8rem; border: 1px solid #ddd;">Fallas aisladas</td>
                        </tr>
                    </tbody>
                </table>
                <button onclick="closeOverlay('architectureOverlay')" 
                        style="margin-top: 1rem; padding: 0.5rem 1rem; 
                               background: #910048; color: white; border: none; 
                               border-radius: 5px; cursor: pointer;">
                    Cerrar
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', comparisonContent);
}

// Show MVC cheat sheet
function showMVCCheatSheet() {
    const mvcContent = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: rgba(0,0,0,0.8); z-index: 9999; display: flex; 
                    align-items: center; justify-content: center;" id="mvcOverlay">
            <div style="background: white; padding: 2rem; border-radius: 10px; max-width: 700px;">
                <h3>Guía Rápida MVC</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; text-align: left;">
                    <div style="background: rgba(232, 245, 232, 0.3); padding: 1rem; border-radius: 8px;">
                        <h4 style="color: #388e3c;">🧠 Modelo</h4>
                        <ul style="font-size: 0.9em;">
                            <li>Funcionalidad central</li>
                            <li>Datos del negocio</li>
                            <li>Lógica de validación</li>
                            <li>Estado de la aplicación</li>
                        </ul>
                    </div>
                    <div style="background: rgba(227, 242, 253, 0.3); padding: 1rem; border-radius: 8px;">
                        <h4 style="color: #1976d2;">👁️ Vista</h4>
                        <ul style="font-size: 0.9em;">
                            <li>Presentación al usuario</li>
                            <li>Templates/HTML</li>
                            <li>Interfaz gráfica</li>
                            <li>Formateo de datos</li>
                        </ul>
                    </div>
                    <div style="background: rgba(255, 236, 179, 0.3); padding: 1rem; border-radius: 8px;">
                        <h4 style="color: #ff8f00;">🎮 Controlador</h4>
                        <ul style="font-size: 0.9em;">
                            <li>Gestiona entrada</li>
                            <li>Coordina M y V</li>
                            <li>Lógica de navegación</li>
                            <li>Manejo de eventos</li>
                        </ul>
                    </div>
                </div>
                <button onclick="closeOverlay('mvcOverlay')" 
                        style="margin-top: 1rem; padding: 0.5rem 1rem; 
                               background: #e9ab21; color: white; border: none; 
                               border-radius: 5px; cursor: pointer;">
                    Cerrar
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', mvcContent);
}

// Close overlay function
function closeOverlay(overlayId) {
    const overlay = document.getElementById(overlayId);
    if (overlay) {
        overlay.remove();
    }
}

// Timer functionality
let timerInterval;
let timerActive = false;
let timeRemaining = 300; // 5 minutes default

function initializeTimers() {
    // Look for timer boxes and add functionality
    const timerBoxes = document.querySelectorAll('.timer-box');
    timerBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const timeText = this.textContent;
            const minutes = parseInt(timeText.match(/(\d+)\s*minutos?/)?.[1] || '45');
            startTimer(minutes * 60);
        });
    });
}

function toggleTimer() {
    if (timerActive) {
        stopTimer();
    } else {
        startTimer(2700); // 45 minutes default for PE activities
    }
}

function startTimer(seconds) {
    timeRemaining = seconds;
    timerActive = true;
    
    // Create timer display
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'timerDisplay';
    timerDisplay.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #910048;
        color: white;
        padding: 10px 15px;
        border-radius: 20px;
        font-weight: bold;
        z-index: 1000;
        font-size: 1.2em;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(timerDisplay);
    
    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Change color when time is running out
        if (timeRemaining <= 300) { // 5 minutes
            timerDisplay.style.background = '#d32f2f';
        }
        
        if (timeRemaining <= 0) {
            stopTimer();
            alert('¡Tiempo terminado para la actividad!');
        }
        
        timeRemaining--;
    }, 1000);
}

function stopTimer() {
    timerActive = false;
    clearInterval(timerInterval);
    const timerDisplay = document.getElementById('timerDisplay');
    if (timerDisplay) {
        timerDisplay.remove();
    }
}

// Initialize architecture comparison features
function initializeArchitectureComparison() {
    // Add click handlers for architecture cards
    const architectureCards = document.querySelectorAll('.architecture-card');
    architectureCards.forEach(card => {
        card.addEventListener('click', function() {
            highlightArchitectureFeatures(this);
        });
    });
    
    // Add hover effects for integration patterns
    const integrationPatterns = document.querySelectorAll('.integration-pattern');
    integrationPatterns.forEach(pattern => {
        pattern.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        pattern.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Highlight architecture features
function highlightArchitectureFeatures(clickedCard) {
    const allCards = document.querySelectorAll('.architecture-card');
    
    // Reset all cards
    allCards.forEach(card => {
        card.style.opacity = '0.6';
        card.style.transform = 'scale(1)';
    });
    
    // Highlight clicked card
    clickedCard.style.opacity = '1';
    clickedCard.style.transform = 'scale(1.05)';
    clickedCard.style.transition = 'all 0.3s ease';
    
    // Reset after 3 seconds
    setTimeout(() => {
        allCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        });
    }, 3000);
}

// Add slide-specific behaviors
Reveal.addEventListener('slidechanged', function(event) {
    const currentSlide = event.currentSlide;
    
    // Auto-start timers on activity slides
    if (currentSlide.querySelector('.timer-box')) {
        console.log('Slide con actividad detectado');
    }
    
    // Add special effects for MVC slides
    if (currentSlide.querySelector('.mvc-model, .mvc-view, .mvc-controller')) {
        animateMVCComponents();
    }
    
    // Add effects for architecture comparison slides
    if (currentSlide.querySelector('.architecture-card')) {
        animateArchitectureCards();
    }
});

// Animate MVC components
function animateMVCComponents() {
    const mvcComponents = document.querySelectorAll('.mvc-model, .mvc-view, .mvc-controller');
    mvcComponents.forEach((component, index) => {
        setTimeout(() => {
            component.style.transform = 'scale(1.1)';
            component.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                component.style.transform = 'scale(1)';
            }, 300);
        }, index * 200);
    });
}

// Animate architecture cards
function animateArchitectureCards() {
    const cards = document.querySelectorAll('.architecture-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
            }, 300);
        }, index * 150);
    });
}

// Middleware integration examples
const middlewareExamples = {
    mom: {
        name: "Message-Oriented Middleware",
        technologies: ["Apache Kafka", "RabbitMQ", "Amazon SQS", "Apache ActiveMQ"],
        benefits: ["Asíncrono", "Duradero", "Desacoplado", "Confiable"]
    },
    soi: {
        name: "Service-Oriented Integration",
        technologies: ["SOAP", "REST", "GraphQL", "gRPC"],
        benefits: ["Estándares abiertos", "Interoperabilidad", "Reutilización", "Escalabilidad"]
    },
    broker: {
        name: "Integration Broker",
        technologies: ["Apache Camel", "MuleSoft", "IBM Integration Bus", "Spring Integration"],
        benefits: ["Transformación", "Orquestación", "Mediación", "Gestión centralizada"]
    }
};

console.log('Ejemplos de middleware cargados:', middlewareExamples);