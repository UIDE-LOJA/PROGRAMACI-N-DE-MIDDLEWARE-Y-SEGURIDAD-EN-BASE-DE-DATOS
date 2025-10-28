// Configuración de Reveal.js
Reveal.initialize({
    hash: true,
    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    plugins: [RevealMarkdown, RevealHighlight, RevealNotes],

    // Navigation
    controls: true,
    progress: true,
    center: true,
    touch: true,
    loop: false,

    // Presentation size
    width: 1024,
    height: 768,
    margin: 0.1,
    minScale: 0.2,
    maxScale: 2.0
});

// Simple Flashcard System
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Robust Mermaid initialization
let mermaidInitialized = false;

function initializeMermaid() {
    if (mermaidInitialized || typeof mermaid === 'undefined') {
        return;
    }
    
    try {
        // Clear any existing configuration
        if (mermaid.initialize) {
            mermaid.initialize({
                startOnLoad: false, // We'll manually control rendering
                theme: 'default',
                themeVariables: {
                    primaryColor: '#233570',
                    primaryTextColor: '#233570',
                    primaryBorderColor: '#233570',
                    lineColor: '#666666'
                },
                securityLevel: 'loose',
                flowchart: {
                    useMaxWidth: true,
                    htmlLabels: true
                },
                sequence: {
                    useMaxWidth: true
                },
                gantt: {
                    useMaxWidth: true
                }
            });
        }
        
        mermaidInitialized = true;
        console.log('Mermaid initialized successfully');
        
        // Render diagrams after initialization
        setTimeout(renderAllMermaidDiagrams, 200);
        
    } catch (error) {
        console.error('Error initializing Mermaid:', error);
    }
}

function renderAllMermaidDiagrams() {
    const mermaidElements = document.querySelectorAll('.mermaid');
    console.log(`Found ${mermaidElements.length} mermaid elements to render`);
    
    mermaidElements.forEach((element, index) => {
        if (!element.querySelector('svg') && element.textContent.trim()) {
            try {
                // Generate unique ID for each diagram
                const diagramId = `mermaid-diagram-${index}-${Date.now()}`;
                element.id = diagramId;
                
                // Get the diagram content
                const content = element.textContent.trim();
                
                // Clear the element
                element.innerHTML = '';
                
                // Use mermaid.render for better error handling
                if (mermaid.render) {
                    mermaid.render(`${diagramId}-svg`, content)
                        .then(({svg}) => {
                            element.innerHTML = svg;
                            console.log(`Diagram ${index} rendered successfully`);
                        })
                        .catch(error => {
                            console.error(`Error rendering diagram ${index}:`, error);
                            element.innerHTML = `<div style="color: red; padding: 10px; border: 1px solid red; border-radius: 4px;">
                                <strong>Error rendering diagram:</strong><br>
                                <pre style="white-space: pre-wrap; font-size: 11px;">${content}</pre>
                            </div>`;
                        });
                } else {
                    // Fallback to mermaid.init
                    mermaid.init(undefined, element);
                }
                
            } catch (error) {
                console.error(`Error processing diagram ${index}:`, error);
                element.innerHTML = `<div style="color: red; padding: 10px;">Error: Could not render diagram</div>`;
            }
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMermaid);
} else {
    initializeMermaid();
}

// Also initialize after Reveal.js is ready (if present)
if (typeof Reveal !== 'undefined') {
    Reveal.on('ready', () => {
        setTimeout(initializeMermaid, 100);
    });
}

// Función genérica para cargar diagramas
function loadDiagram(diagramId) {
    const diagramElement = document.getElementById(diagramId);
    
    if (diagramElement) {
        // Limpiar contenido previo
        const originalContent = diagramElement.getAttribute('data-original-content');
        if (originalContent) {
            diagramElement.innerHTML = originalContent;
        }
        
        // Intentar renderizar con mermaid
        try {
            if (typeof mermaid !== 'undefined') {
                mermaid.init(undefined, diagramElement);
                // Ocultar botón de recarga si se renderiza correctamente
                setTimeout(() => {
                    const reloadBtn = document.getElementById(diagramId.replace('-diagram', '-reload-btn'));
                    if (reloadBtn && diagramElement.querySelector('svg')) {
                        reloadBtn.style.display = 'none';
                    }
                }, 1000);
            }
        } catch (error) {
            console.warn('Error al cargar diagrama:', error);
        }
    }
}

// Función para agregar botones de recarga a todos los diagramas
function addReloadButtons() {
    const mermaidElements = document.querySelectorAll('.mermaid');
    
    mermaidElements.forEach((element, index) => {
        // Asignar ID único si no tiene
        if (!element.id) {
            element.id = `diagram-${index}`;
        }
        
        // Guardar contenido original
        element.setAttribute('data-original-content', element.innerHTML);
        
        // Buscar el contenedor padre
        const container = element.parentElement;
        if (container && container.style.position !== 'relative') {
            container.style.position = 'relative';
        }
        
        // Crear botón de recarga
        const reloadBtn = document.createElement('button');
        reloadBtn.id = element.id.replace('-diagram', '') + '-reload-btn';
        reloadBtn.onclick = () => loadDiagram(element.id);
        reloadBtn.style.cssText = `
            position: absolute; 
            top: 10px; 
            right: 10px; 
            background: rgba(35, 53, 112, 0.1); 
            border: 1px solid #233570; 
            border-radius: 50%; 
            width: 35px; 
            height: 35px; 
            cursor: pointer; 
            display: none;
            z-index: 10;
            transition: all 0.3s ease;
        `;
        reloadBtn.title = 'Recargar diagrama';
        reloadBtn.innerHTML = '<i class="fas fa-sync-alt" style="color: #233570; font-size: 14px;"></i>';
        
        // Efectos hover
        reloadBtn.onmouseover = () => reloadBtn.style.background = 'rgba(35, 53, 112, 0.2)';
        reloadBtn.onmouseout = () => reloadBtn.style.background = 'rgba(35, 53, 112, 0.1)';
        
        // Insertar botón en el contenedor
        container.insertBefore(reloadBtn, element);
    });
}

// Detectar diagramas que no cargan y mostrar botones de recarga
function checkDiagramsAndShowButtons() {
    const mermaidElements = document.querySelectorAll('.mermaid');
    
    mermaidElements.forEach((element) => {
        const hasSvg = element.querySelector('svg');
        const hasError = element.textContent.trim().startsWith('graph') || 
                        element.textContent.trim().startsWith('flowchart');
        
        if (!hasSvg || hasError) {
            // El diagrama no se renderizó, mostrar botón de recarga
            const reloadBtn = document.getElementById(element.id.replace('-diagram', '') + '-reload-btn');
            if (reloadBtn) {
                reloadBtn.style.display = 'block';
            }
        }
    });
}

// Función especial para mostrar diagrama MVC detallado en pantalla completa
function openDetailedMvcDiagram() {
    console.log('openDetailedMvcDiagram called');
    
    // Usar la clase DiagramFullscreen si está disponible
    if (typeof diagramFS !== 'undefined' && diagramFS) {
        console.log('DiagramFullscreen class available');
        // Crear un elemento temporal con el diagrama completo
        const detailedDiagram = document.createElement('div');
        detailedDiagram.className = 'mermaid';
        
        // Definir el contenido del diagrama detallado
        const diagramContent = `
        graph TB
        subgraph BROWSER["🌐 NAVEGADOR WEB (Cliente)"]
        USER["👤 Usuario Final<br/>• Interacciones<br/>• Eventos<br/>• Navegación"]
        UI["🖥️ Interfaz de Usuario<br/>• HTML5/CSS3<br/>• JavaScript/TypeScript<br/>• React/Angular/Vue"]
        end

        subgraph PRESENTATION["📱 CAPA DE PRESENTACIÓN (Frontend/Backend)"]
        VIEW["👁️ VISTA (View)<br/>• Templates (JSP/Razor/Thymeleaf)<br/>• Componentes UI<br/>• Validación Cliente<br/>• Formateo de Datos"]
        ROUTER["🛣️ Router/Dispatcher<br/>• Enrutamiento de URLs<br/>• Navegación SPA<br/>• Gestión de Estados"]
        FILTER["🔍 Filtros Web<br/>• Interceptores<br/>• Middleware HTTP<br/>• CORS/Headers"]
        end

        subgraph BUSINESS["⚙️ CAPA DE NEGOCIO (Backend)"]
        CTRL["🎮 CONTROLADOR (Controller)<br/>• Lógica de Control<br/>• Validación Servidor<br/>• Coordinación de Flujos<br/>• Manejo de Excepciones"]
        MODEL["📊 MODELO (Model)<br/>• Entidades de Negocio<br/>• Lógica de Dominio<br/>• Reglas de Negocio<br/>• DTOs/ViewModels"]
        SERVICE["🔧 Servicios de Negocio<br/>• Business Logic<br/>• Transacciones<br/>• Validaciones Complejas<br/>• Orquestación"]
        FACADE["🏛️ Facade Pattern<br/>• Simplificación<br/>• Unificación APIs<br/>• Abstracción"]
        end

        subgraph DATA["💾 CAPA DE DATOS (Persistencia)"]
        DAO["🗃️ Data Access Object<br/>• CRUD Operations<br/>• Queries Complejas<br/>• Mapeo O/R<br/>• Repository Pattern"]
        ORM["🔗 ORM/ODM<br/>• Hibernate/JPA<br/>• Entity Framework<br/>• Mongoose<br/>• Sequelize"]
        DB["🏛️ BASE DE DATOS<br/>• MySQL/PostgreSQL<br/>• MongoDB/CouchDB<br/>• Persistencia<br/>• Integridad Referencial"]
        CACHE["⚡ Sistema de Cache<br/>• Redis/Memcached<br/>• Cache L1/L2<br/>• Optimización Consultas"]
        end

        subgraph MIDDLEWARE["🔗 MIDDLEWARE TRANSVERSAL"]
        AUTH["🔐 Autenticación/Autorización<br/>• JWT/OAuth 2.0<br/>• SAML/OpenID<br/>• Sesiones<br/>• RBAC/ABAC"]
        LOG["📝 Logging/Auditoría<br/>• Log4j/Winston<br/>• Métricas<br/>• Trazabilidad<br/>• Monitoreo APM"]
        SEC["🛡️ Seguridad<br/>• HTTPS/TLS<br/>• Validación Input<br/>• XSS/CSRF Protection<br/>• Rate Limiting"]
        VALID["✅ Validación<br/>• Bean Validation<br/>• Esquemas JSON<br/>• Sanitización<br/>• Reglas de Negocio"]
        end

        subgraph EXTERNAL["🌍 SERVICIOS EXTERNOS"]
        API["🔌 APIs Externas<br/>• REST/GraphQL<br/>• SOAP<br/>• Microservicios<br/>• Third-party"]
        MSG["📨 Mensajería<br/>• RabbitMQ/Kafka<br/>• Colas<br/>• Pub/Sub<br/>• Event Sourcing"]
        end

        %% Flujo principal (Request)
        USER -->|"1. Interacción<br/>(Click/Submit)"| UI
        UI -->|"2. HTTP Request<br/>(GET/POST/PUT)"| FILTER
        FILTER -->|"3. Filtrado<br/>(Auth/CORS)"| ROUTER
        ROUTER -->|"4. Enrutamiento<br/>(URL → Controller)"| CTRL
        CTRL -->|"5. Delegación<br/>(Business Logic)"| SERVICE
        SERVICE -->|"6. Validación<br/>(Rules/Constraints)"| VALID
        VALID -->|"7. Manipulación<br/>(Domain Objects)"| MODEL
        MODEL -->|"8. Persistencia<br/>(Save/Update)"| DAO
        DAO -->|"9. ORM Mapping<br/>(SQL Generation)"| ORM
        ORM -->|"10. Query Execution<br/>(CRUD)"| DB

        %% Flujo de respuesta (Response)
        DB -.->|"11. Resultados<br/>(Rows/Documents)"| ORM
        ORM -.->|"12. Entidades<br/>(Objects)"| DAO
        DAO -.->|"13. Domain Objects<br/>(Business Entities)"| MODEL
        MODEL -.->|"14. Procesamiento<br/>(Business Logic)"| SERVICE
        SERVICE -.->|"15. Respuesta<br/>(DTOs/ViewModels)"| CTRL
        CTRL -.->|"16. Preparación Vista<br/>(Model Binding)"| VIEW
        VIEW -.->|"17. Renderizado<br/>(HTML/JSON)"| UI
        UI -.->|"18. Presentación<br/>(DOM Update)"| USER

        %% Servicios transversales
        CTRL <--> AUTH
        CTRL <--> LOG
        SERVICE <--> SEC
        MODEL <--> CACHE
        SERVICE <--> API
        SERVICE <--> MSG

        %% Cache optimization
        CACHE <-.-> DB
        
        %% External integrations
        SERVICE <--> API
        MODEL <--> MSG

        %% Estilos mejorados
        classDef browser fill:#f8f9fa,stroke:#6c757d,stroke-width:3px,color:#000
        classDef presentation fill:#e3f2fd,stroke:#1976d2,stroke-width:3px,color:#000
        classDef business fill:#e8f5e8,stroke:#4caf50,stroke-width:3px,color:#000
        classDef data fill:#fff3e0,stroke:#ff9800,stroke-width:3px,color:#000
        classDef middleware fill:#f3e5f5,stroke:#9c27b0,stroke-width:3px,color:#000
        classDef external fill:#fce4ec,stroke:#e91e63,stroke-width:2px,color:#000

        class USER,UI browser
        class VIEW,ROUTER,FILTER presentation
        class CTRL,MODEL,SERVICE,FACADE business
        class DAO,ORM,DB,CACHE data
        class AUTH,LOG,SEC,VALID middleware
        class API,MSG external
        `;
        
        // Asignar el contenido al elemento
        detailedDiagram.textContent = diagramContent;
        console.log('Diagrama creado con contenido de', diagramContent.length, 'caracteres');
        
        // Abrir el modal primero
        const fullscreen = document.getElementById('diagramFullscreen');
        const titleElement = document.getElementById('diagramFullscreenTitle');
        const bodyElement = document.getElementById('diagramFullscreenBody');
        
        if (fullscreen && titleElement && bodyElement) {
            // Set title
            titleElement.textContent = 'Arquitectura 3 Capas con Patrón MVC - Vista Detallada';
            
            // Clear body and add the detailed diagram
            bodyElement.innerHTML = '';
            bodyElement.appendChild(detailedDiagram);
            
            // Configurar el diagrama para que se ajuste a pantalla completa
            detailedDiagram.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: calc(100vh - 120px);
            `;
            
            // Store current diagram reference
            diagramFS.currentDiagram = detailedDiagram;
            diagramFS.currentZoom = 100;
            diagramFS.updateZoomDisplay();
            
            // Show fullscreen
            fullscreen.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Enter browser fullscreen mode
            diagramFS.enterBrowserFullscreen();
            
            // Agregar listener para redimensionar cuando cambie el tamaño de ventana
            const resizeHandler = () => {
                const svg = detailedDiagram.querySelector('svg');
                if (svg) {
                    const containerWidth = bodyElement.clientWidth - 40;
                    const containerHeight = window.innerHeight - 150;
                    
                    const viewBox = svg.getAttribute('viewBox');
                    if (viewBox) {
                        const [x, y, width, height] = viewBox.split(' ').map(Number);
                        const aspectRatio = width / height;
                        
                        let newWidth = containerWidth;
                        let newHeight = newWidth / aspectRatio;
                        
                        if (newHeight > containerHeight) {
                            newHeight = containerHeight;
                            newWidth = newHeight * aspectRatio;
                        }
                        
                        svg.style.width = newWidth + 'px';
                        svg.style.height = newHeight + 'px';
                    }
                }
            };
            
            window.addEventListener('resize', resizeHandler);
            
            // Remover el listener cuando se cierre el modal
            const originalClose = diagramFS.close.bind(diagramFS);
            diagramFS.close = function() {
                window.removeEventListener('resize', resizeHandler);
                originalClose();
            };
            
            // Renderizar el diagrama después de que se abra el modal
            setTimeout(() => {
                console.log('Iniciando renderizado del diagrama detallado');
                console.log('Mermaid disponible:', typeof mermaid !== 'undefined');
                console.log('Mermaid render function:', typeof mermaid?.render);
                
                try {
                    if (typeof mermaid !== 'undefined' && mermaid.render) {
                        // Asignar ID específico para el diagrama detallado
                        detailedDiagram.id = 'detailed-mvc';
                        
                        // Obtener el contenido del diagrama
                        const diagramContent = detailedDiagram.textContent.trim();
                        console.log('Contenido del diagrama:', diagramContent.substring(0, 100) + '...');
                        
                        // Limpiar el contenido y usar render en lugar de init
                        detailedDiagram.innerHTML = '';
                        
                        // Método mejorado: usar mermaid.render
                        mermaid.render('detailed-mvc-svg', diagramContent)
                            .then(({svg}) => {
                                console.log('Diagrama renderizado exitosamente');
                                detailedDiagram.innerHTML = svg;
                        
                                // Ajustar el SVG después del renderizado
                                setTimeout(() => {
                                    const svg = detailedDiagram.querySelector('svg');
                                    if (svg) {
                                        console.log('SVG encontrado, aplicando estilos');
                                        // Configurar el SVG para que se ajuste a la pantalla
                                        svg.style.cssText = `
                                            max-width: 100%;
                                            max-height: calc(100vh - 150px);
                                            width: auto;
                                            height: auto;
                                            display: block;
                                            margin: 0 auto;
                                        `;
                                        
                                        // Obtener dimensiones del contenedor
                                        const containerWidth = bodyElement.clientWidth - 40;
                                        const containerHeight = window.innerHeight - 150;
                                        
                                        // Ajustar viewBox si es necesario
                                        const viewBox = svg.getAttribute('viewBox');
                                        if (viewBox) {
                                            const [x, y, width, height] = viewBox.split(' ').map(Number);
                                            const aspectRatio = width / height;
                                            
                                            let newWidth = containerWidth;
                                            let newHeight = newWidth / aspectRatio;
                                            
                                            if (newHeight > containerHeight) {
                                                newHeight = containerHeight;
                                                newWidth = newHeight * aspectRatio;
                                            }
                                            
                                            svg.style.width = newWidth + 'px';
                                            svg.style.height = newHeight + 'px';
                                        }
                                        
                                        // Centrar el diagrama perfectamente
                                        detailedDiagram.style.display = 'flex';
                                        detailedDiagram.style.justifyContent = 'center';
                                        detailedDiagram.style.alignItems = 'center';
                                        detailedDiagram.style.width = '100%';
                                        detailedDiagram.style.height = '100%';
                                    }
                                }, 200);
                            })
                            .catch(error => {
                                console.error('Error renderizando con mermaid.render:', error);
                                // Fallback: mostrar el código del diagrama
                                detailedDiagram.innerHTML = `<pre style="white-space: pre-wrap; font-family: monospace; font-size: 12px; padding: 20px; background: #f5f5f5; border: 1px solid #ddd; border-radius: 8px; overflow: auto; max-height: calc(100vh - 200px);">${diagramContent}</pre>`;
                            });
                    } else {
                        console.warn('Mermaid no está disponible o no tiene la función render');
                        // Fallback: mostrar mensaje de error
                        detailedDiagram.innerHTML = `
                            <div style="text-align: center; padding: 2rem; color: #666;">
                                <h3>⚠️ Error de Renderizado</h3>
                                <p>No se pudo renderizar el diagrama detallado.</p>
                                <p>Por favor, recarga la página e intenta nuevamente.</p>
                                <button onclick="location.reload()" style="background: #233570; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
                                    🔄 Recargar Página
                                </button>
                            </div>
                        `;
                    }
                } catch (error) {
                    console.error('Error al renderizar diagrama detallado:', error);
                    
                    // Método de respaldo: mostrar el código del diagrama con mejor formato
                    const diagramContent = detailedDiagram.textContent || 'Error: No se pudo obtener el contenido del diagrama';
                    detailedDiagram.innerHTML = `
                        <div style="padding: 1rem;">
                            <h3 style="color: #f44336; margin-bottom: 1rem;">⚠️ Error de Renderizado</h3>
                            <p style="margin-bottom: 1rem;">El diagrama no se pudo renderizar correctamente. Aquí está el código fuente:</p>
                            <pre style="white-space: pre-wrap; font-family: 'Courier New', monospace; font-size: 11px; padding: 1rem; background: #f8f8f8; border: 1px solid #ddd; border-radius: 8px; overflow: auto; max-height: calc(100vh - 300px); line-height: 1.4;">${diagramContent}</pre>
                            <button onclick="location.reload()" style="background: #233570; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-top: 1rem;">
                                🔄 Recargar Página
                            </button>
                        </div>
                    `;
                }
            }, 500);
        }
        
    } else {
        // Fallback si DiagramFullscreen no está disponible
        console.warn('DiagramFullscreen class not available');
        alert('La funcionalidad de pantalla completa no está disponible. Por favor, recarga la página.');
    }
}

// Función para abrir diagrama en pantalla completa (compatible con DiagramFullscreen class)
function openDiagramFullscreen(diagramElement, title) {
    if (!diagramElement) return;
    
    // Usar la clase DiagramFullscreen si está disponible
    if (typeof diagramFS !== 'undefined' && diagramFS) {
        diagramFS.open(diagramElement, title);
    } else {
        // Fallback simple si la clase no está disponible
        console.warn('DiagramFullscreen class not available, using simple fallback');
        
        // Crear modal simple
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.9);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(5px);
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 95vw;
            max-height: 95vh;
            overflow: auto;
            position: relative;
        `;
        
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '× Cerrar';
        closeButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #f44336;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 8px 12px;
            cursor: pointer;
            z-index: 10;
        `;
        closeButton.onclick = () => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        };
        
        const titleElement = document.createElement('h3');
        titleElement.textContent = title || 'Diagrama';
        titleElement.style.cssText = `
            margin: 0 0 1rem 0;
            color: #233570;
            padding-right: 100px;
        `;
        
        const clonedDiagram = diagramElement.cloneNode(true);
        clonedDiagram.style.cursor = 'default';
        
        content.appendChild(closeButton);
        content.appendChild(titleElement);
        content.appendChild(clonedDiagram);
        modal.appendChild(content);
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Cerrar con ESC
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                closeButton.click();
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
        
        // Cerrar al hacer clic fuera
        modal.onclick = (e) => {
            if (e.target === modal) {
                closeButton.click();
            }
        };
    }
}



// Inicializar sistema de botones de recarga - DESHABILITADO para evitar duplicados
// setTimeout(() => {
//     addReloadButtons();
//     setTimeout(checkDiagramsAndShowButtons, 2000);
// }, 1000);