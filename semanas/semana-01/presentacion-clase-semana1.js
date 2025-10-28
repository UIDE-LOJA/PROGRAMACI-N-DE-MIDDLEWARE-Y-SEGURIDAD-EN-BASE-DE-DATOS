// Función para abrir el diagrama detallado de arquitectura multicapa
function openDetailedMultilayerDiagram() {
    console.log('openDetailedMultilayerDiagram called');
    
    // Verificar si DiagramFullscreen está disponible
    if (typeof diagramFS !== 'undefined' && diagramFS) {
        console.log('DiagramFullscreen class available');
        
        // Crear un elemento temporal con el diagrama completo
        const detailedDiagram = document.createElement('div');
        detailedDiagram.className = 'mermaid';
        detailedDiagram.id = 'detailed-multilayer';
        detailedDiagram.innerHTML = `
flowchart TB
    subgraph USER_LAYER["👤 CAPA DE USUARIO"]
        direction TB
        USER["🧑‍💻 Usuario Final<br/>• Navegador Web<br/>• App Móvil<br/>• Cliente Desktop"]
        DEVICE["📱 Dispositivos<br/>• Smartphone<br/>• Tablet<br/>• Laptop/PC"]
    end
    
    subgraph PRESENTATION_LAYER["🖥️ CAPA DE PRESENTACIÓN"]
        direction TB
        UI["🎨 Interfaz de Usuario<br/>• HTML/CSS/JS<br/>• React/Angular/Vue<br/>• Mobile UI"]
        FORMS["📝 Formularios & Vistas<br/>• Login/Register<br/>• Dashboards<br/>• Reports & Charts"]
        ROUTING["🛣️ Enrutamiento<br/>• URL Routing<br/>• Navigation<br/>• State Management"]
        VALIDATION["✅ Validación Cliente<br/>• Form Validation<br/>• Input Sanitization<br/>• UX Feedback"]
    end
    
    subgraph BUSINESS_LAYER["⚙️ CAPA DE NEGOCIO"]
        direction TB
        CONTROLLER["🎮 Controladores<br/>• Request Handlers<br/>• Business Coordinators<br/>• Flow Control"]
        SERVICES["🔧 Servicios de Negocio<br/>• Business Logic<br/>• Domain Services<br/>• Workflows"]
        RULES["📋 Reglas de Negocio<br/>• Validation Rules<br/>• Business Constraints<br/>• Policies"]
        AUTH["🔐 Autenticación<br/>• JWT/OAuth<br/>• Session Management<br/>• Authorization"]
    end
    
    subgraph INTEGRATION_LAYER["🔗 CAPA DE INTEGRACIÓN"]
        direction TB
        API_GATEWAY["🚪 API Gateway<br/>• Request Routing<br/>• Load Balancing<br/>• Rate Limiting"]
        MIDDLEWARE["⚡ Middleware<br/>• Logging<br/>• Caching<br/>• Error Handling"]
        MESSAGE_BROKER["📨 Message Broker<br/>• RabbitMQ<br/>• Apache Kafka<br/>• Event Streaming"]
    end
    
    subgraph DATA_LAYER["🗄️ CAPA DE DATOS"]
        direction TB
        REPOSITORY["📊 Repositorios<br/>• Data Access Layer<br/>• Repository Pattern<br/>• Query Builders"]
        ORM["🔗 ORM/ODM<br/>• Hibernate/JPA<br/>• Entity Framework<br/>• Mongoose"]
        CACHE["⚡ Sistema de Cache<br/>• Redis<br/>• Memcached<br/>• Application Cache"]
    end
    
    subgraph STORAGE_LAYER["💾 CAPA DE ALMACENAMIENTO"]
        direction TB
        DATABASE["🗃️ Base de Datos<br/>• MySQL/PostgreSQL<br/>• MongoDB<br/>• Oracle/SQL Server"]
        FILES["📁 File Storage<br/>• Local Files<br/>• AWS S3<br/>• Azure Blob"]
        EXTERNAL["🌐 APIs Externas<br/>• Third-party APIs<br/>• Microservices<br/>• Cloud Services"]
    end
    
    %% Flujo Principal
    USER --> DEVICE
    DEVICE --> UI
    UI --> FORMS
    FORMS --> ROUTING
    ROUTING --> VALIDATION
    VALIDATION --> CONTROLLER
    CONTROLLER --> SERVICES
    SERVICES --> RULES
    RULES --> AUTH
    AUTH --> API_GATEWAY
    API_GATEWAY --> MIDDLEWARE
    MIDDLEWARE --> MESSAGE_BROKER
    MESSAGE_BROKER --> REPOSITORY
    REPOSITORY --> ORM
    ORM --> CACHE
    CACHE --> DATABASE
    
    %% Conexiones Auxiliares
    SERVICES --> FILES
    REPOSITORY --> FILES
    MIDDLEWARE --> EXTERNAL
    ORM --> EXTERNAL
    
    %% Flujo de Respuesta (líneas punteadas)
    DATABASE -.-> CACHE
    CACHE -.-> ORM
    ORM -.-> REPOSITORY
    REPOSITORY -.-> MESSAGE_BROKER
    MESSAGE_BROKER -.-> MIDDLEWARE
    MIDDLEWARE -.-> API_GATEWAY
    API_GATEWAY -.-> AUTH
    AUTH -.-> SERVICES
    SERVICES -.-> CONTROLLER
    CONTROLLER -.-> UI
    UI -.-> DEVICE
    DEVICE -.-> USER
    
    %% Estilos usando classDef
    classDef userLayer fill:#e3f2fd,stroke:#1976d2,stroke-width:3px,color:#000
    classDef presentationLayer fill:#e8f5e8,stroke:#4caf50,stroke-width:3px,color:#000
    classDef businessLayer fill:#fff3e0,stroke:#ff9800,stroke-width:3px,color:#000
    classDef integrationLayer fill:#f3e5f5,stroke:#9c27b0,stroke-width:3px,color:#000
    classDef dataLayer fill:#fce4ec,stroke:#e91e63,stroke-width:3px,color:#000
    classDef storageLayer fill:#fff8e1,stroke:#ffc107,stroke-width:3px,color:#000
    
    %% Aplicar estilos
    class USER,DEVICE userLayer
    class UI,FORMS,ROUTING,VALIDATION presentationLayer
    class CONTROLLER,SERVICES,RULES,AUTH businessLayer
    class API_GATEWAY,MIDDLEWARE,MESSAGE_BROKER integrationLayer
    class REPOSITORY,ORM,CACHE dataLayer
    class DATABASE,FILES,EXTERNAL storageLayer
        `;
        
        // Abrir el modal
        const fullscreen = document.getElementById('diagramFullscreen');
        const titleElement = document.getElementById('diagramFullscreenTitle');
        const bodyElement = document.getElementById('diagramFullscreenBody');
        
        if (fullscreen && titleElement && bodyElement) {
            // Establecer título
            titleElement.textContent = 'Arquitectura Multicapa - Vista Detallada';
            
            // Limpiar contenido anterior
            bodyElement.innerHTML = '';
            
            // Agregar el diagrama detallado
            bodyElement.appendChild(detailedDiagram);
            
            // Renderizar el diagrama con Mermaid
            if (typeof mermaid !== 'undefined') {
                try {
                    mermaid.init(undefined, detailedDiagram);
                } catch (error) {
                    console.error('Error rendering detailed diagram:', error);
                }
            }
            
            // Actualizar controles de zoom
            if (diagramFS.updateZoomDisplay) {
                diagramFS.updateZoomDisplay();
            }
            
            // Mostrar pantalla completa
            fullscreen.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Entrar en modo pantalla completa del navegador
            if (diagramFS.enterBrowserFullscreen) {
                diagramFS.enterBrowserFullscreen();
            }
            
        } else {
            console.error('Fullscreen elements not found');
            alert('Error: No se pudo abrir la vista de pantalla completa');
        }
        
    } else {
        // Fallback si DiagramFullscreen no está disponible
        console.warn('DiagramFullscreen class not available');
        alert('La funcionalidad de pantalla completa no está disponible. Por favor, recarga la página.');
    }
}

// Función para abrir el diagrama detallado de OAuth2
function openDetailedOAuth2Diagram() {
    console.log('openDetailedOAuth2Diagram called');
    
    // Verificar si DiagramFullscreen está disponible
    if (typeof diagramFS !== 'undefined' && diagramFS) {
        console.log('DiagramFullscreen class available');
        
        // Crear un elemento temporal con el diagrama completo
        const detailedDiagram = document.createElement('div');
        detailedDiagram.className = 'mermaid';
        detailedDiagram.id = 'detailed-oauth2';
        detailedDiagram.innerHTML = `
flowchart TB
    subgraph USER_CONTEXT["👤 CONTEXTO DEL USUARIO"]
        direction TB
        USER["🧑‍💻 Usuario Final<br/>• Quiere acceder a la app<br/>• Tiene cuenta en Google<br/>• Autoriza permisos"]
        BROWSER["🌐 Navegador Web<br/>• Chrome/Firefox/Safari<br/>• Maneja redirects<br/>• Almacena cookies"]
    end
    
    subgraph CLIENT_APP["📱 APLICACIÓN CLIENTE"]
        direction TB
        FRONTEND["🖥️ Frontend App<br/>• React/Angular/Vue<br/>• SPA o Web App<br/>• UI Components"]
        BACKEND["⚙️ Backend API<br/>• Node.js/Java/Python<br/>• Valida tokens<br/>• Protege recursos"]
        CLIENT_CONFIG["⚙️ Client Config<br/>• Client ID<br/>• Redirect URIs<br/>• Scopes"]
    end
    
    subgraph AUTH_PROVIDER["🔐 PROVEEDOR DE AUTENTICACIÓN (Google)"]
        direction TB
        AUTH_SERVER["🛡️ Authorization Server<br/>• accounts.google.com<br/>• Autentica usuarios<br/>• Genera códigos"]
        LOGIN_PAGE["📝 Pantalla de Login<br/>• Formulario Google<br/>• 2FA/MFA<br/>• Consent Screen"]
        TOKEN_ENDPOINT["🎫 Token Endpoint<br/>• /oauth2/token<br/>• Intercambia códigos<br/>• Emite tokens"]
    end
    
    subgraph RESOURCE_SERVER["🌐 SERVIDOR DE RECURSOS"]
        direction TB
        PROTECTED_API["📊 API Protegida<br/>• Valida access tokens<br/>• Retorna datos<br/>• Control de permisos"]
        GOOGLE_APIS["🔍 Google APIs<br/>• Gmail API<br/>• Drive API<br/>• Calendar API"]
        INTROSPECTION["🔍 Token Introspection<br/>• Valida tokens<br/>• Verifica scopes<br/>• Check expiration"]
    end
    
    subgraph TOKEN_TYPES["🔑 TIPOS DE TOKENS"]
        direction TB
        AUTH_CODE["📋 Authorization Code<br/>• Código temporal<br/>• Single use<br/>• Válido 10 minutos"]
        ACCESS_TOKEN["🎫 Access Token<br/>• Bearer token<br/>• Válido 1 hora<br/>• Acceso a recursos"]
        REFRESH_TOKEN["🔄 Refresh Token<br/>• Long-lived<br/>• Válido 6 meses<br/>• Renueva access tokens"]
        ID_TOKEN["🆔 ID Token (OIDC)<br/>• JWT firmado<br/>• User info<br/>• Claims del usuario"]
    end
    
    subgraph SECURITY_LAYER["🛡️ CAPA DE SEGURIDAD"]
        direction TB
        PKCE["🔐 PKCE<br/>• Code Challenge<br/>• Code Verifier<br/>• SHA256 Hash"]
        STATE["🎲 State Parameter<br/>• CSRF Protection<br/>• Random String<br/>• Session Binding"]
        NONCE["🔢 Nonce<br/>• Replay Protection<br/>• ID Token binding<br/>• Unique per request"]
    end
    
    %% Flujo Principal OAuth2 + OIDC (Authorization Code Flow)
    USER -->|"1. Click 'Login with Google'"| FRONTEND
    FRONTEND -->|"2. Generate PKCE + State"| PKCE
    PKCE -->|"3. Authorization Request"| AUTH_SERVER
    AUTH_SERVER -->|"4. Redirect to Login"| LOGIN_PAGE
    LOGIN_PAGE -->|"5. User Authentication"| AUTH_SERVER
    AUTH_SERVER -->|"6. User Consent"| LOGIN_PAGE
    LOGIN_PAGE -->|"7. Authorization Code"| FRONTEND
    FRONTEND -->|"8. Code + PKCE Verifier"| TOKEN_ENDPOINT
    TOKEN_ENDPOINT -->|"9. Validate & Issue Tokens"| ACCESS_TOKEN
    ACCESS_TOKEN -->|"10. Store Tokens"| BACKEND
    BACKEND -->|"11. API Request + Token"| PROTECTED_API
    PROTECTED_API -->|"12. Validate Token"| INTROSPECTION
    INTROSPECTION -->|"13. Token Valid"| PROTECTED_API
    PROTECTED_API -->|"14. Return Data"| BACKEND
    BACKEND -->|"15. Response to User"| FRONTEND
    FRONTEND -->|"16. Display Data"| USER
    
    %% Flujos Auxiliares
    TOKEN_ENDPOINT --> REFRESH_TOKEN
    TOKEN_ENDPOINT --> ID_TOKEN
    FRONTEND --> STATE
    LOGIN_PAGE --> NONCE
    
    %% Token Refresh Flow (líneas punteadas)
    BACKEND -.->|"Token Expired"| REFRESH_TOKEN
    REFRESH_TOKEN -.->|"Refresh Request"| TOKEN_ENDPOINT
    TOKEN_ENDPOINT -.->|"New Access Token"| ACCESS_TOKEN
    
    %% External API Access
    BACKEND -->|"With Access Token"| GOOGLE_APIS
    GOOGLE_APIS -->|"User Data"| BACKEND
    
    %% Estilos usando classDef
    classDef userContext fill:#e3f2fd,stroke:#1976d2,stroke-width:3px,color:#000
    classDef clientApp fill:#fff3e0,stroke:#f57c00,stroke-width:3px,color:#000
    classDef authProvider fill:#e8f5e8,stroke:#388e3c,stroke-width:3px,color:#000
    classDef resourceServer fill:#fce4ec,stroke:#c2185b,stroke-width:3px,color:#000
    classDef tokenTypes fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px,color:#000
    classDef securityLayer fill:#fff8e1,stroke:#ffc107,stroke-width:3px,color:#000
    
    %% Aplicar estilos
    class USER,BROWSER userContext
    class FRONTEND,BACKEND,CLIENT_CONFIG clientApp
    class AUTH_SERVER,LOGIN_PAGE,TOKEN_ENDPOINT authProvider
    class PROTECTED_API,GOOGLE_APIS,INTROSPECTION resourceServer
    class AUTH_CODE,ACCESS_TOKEN,REFRESH_TOKEN,ID_TOKEN tokenTypes
    class PKCE,STATE,NONCE securityLayer
        `;
        
        // Abrir el modal
        const fullscreen = document.getElementById('diagramFullscreen');
        const titleElement = document.getElementById('diagramFullscreenTitle');
        const bodyElement = document.getElementById('diagramFullscreenBody');
        
        if (fullscreen && titleElement && bodyElement) {
            // Establecer título
            titleElement.textContent = 'Flujo OAuth2 & OpenID Connect - Vista Detallada';
            
            // Limpiar contenido anterior
            bodyElement.innerHTML = '';
            
            // Agregar el diagrama detallado
            bodyElement.appendChild(detailedDiagram);
            
            // Renderizar el diagrama con Mermaid
            if (typeof mermaid !== 'undefined') {
                try {
                    mermaid.init(undefined, detailedDiagram);
                } catch (error) {
                    console.error('Error rendering detailed OAuth2 diagram:', error);
                }
            }
            
            // Actualizar controles de zoom
            if (diagramFS.updateZoomDisplay) {
                diagramFS.updateZoomDisplay();
            }
            
            // Mostrar pantalla completa
            fullscreen.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Entrar en modo pantalla completa del navegador
            if (diagramFS.enterBrowserFullscreen) {
                diagramFS.enterBrowserFullscreen();
            }
            
        } else {
            console.error('Fullscreen elements not found');
            alert('Error: No se pudo abrir la vista de pantalla completa');
        }
        
    } else {
        // Fallback si DiagramFullscreen no está disponible
        console.warn('DiagramFullscreen class not available');
        alert('La funcionalidad de pantalla completa no está disponible. Por favor, recarga la página.');
    }
}

// Agregar listener para tecla F (pantalla completa)
document.addEventListener('keydown', function(event) {
    // Solo activar si estamos en la slide de arquitectura multicapa
    const currentSlide = Reveal.getCurrentSlide();
    if (currentSlide && currentSlide.querySelector('#simple-multilayer')) {
        if (event.key === 'f' || event.key === 'F') {
            event.preventDefault();
            openDetailedMultilayerDiagram();
        }
    }
    
    // Solo activar si estamos en la slide de OAuth2
    if (currentSlide && currentSlide.querySelector('#simple-oauth2')) {
        if (event.key === 'f' || event.key === 'F') {
            event.preventDefault();
            openDetailedOAuth2Diagram();
        }
    }
    
    // Solo activar si estamos en la slide de MVC
    if (currentSlide && currentSlide.querySelector('#simple-mvc')) {
        if (event.key === 'f' || event.key === 'F') {
            event.preventDefault();
            openDetailedMvcDiagram();
        }
    }
});

// Función para abrir el diagrama detallado de MVC
function openDetailedMvcDiagram() {
    console.log('openDetailedMvcDiagram called');
    
    // Verificar si DiagramFullscreen está disponible
    if (typeof diagramFS !== 'undefined' && diagramFS) {
        console.log('DiagramFullscreen class available');
        
        // Crear un elemento temporal con el diagrama completo
        const detailedDiagram = document.createElement('div');
        detailedDiagram.className = 'mermaid';
        detailedDiagram.id = 'detailed-mvc';
        detailedDiagram.innerHTML = `
flowchart TB
    subgraph USER_LAYER["👤 CAPA DE USUARIO"]
        USER["🧑‍💻 Usuario Final<br/>• Navegador Web<br/>• Aplicación Móvil<br/>• Cliente Desktop"]
        BROWSER["🌐 Navegador<br/>• Chrome/Firefox<br/>• Safari/Edge<br/>• JavaScript Engine"]
    end
    
    subgraph VIEW_LAYER["👁️ CAPA DE VISTA (View)"]
        direction TB
        VIEW["🖥️ Vista Principal<br/>• Templates HTML<br/>• Componentes UI<br/>• Formularios"]
        RENDER["🎨 Motor de Renderizado<br/>• JSP/Thymeleaf<br/>• React/Angular/Vue<br/>• Template Engine"]
        VALID_UI["✅ Validación Cliente<br/>• JavaScript<br/>• HTML5 Validation<br/>• UX Feedback"]
        ASSETS["📦 Assets<br/>• CSS/SCSS<br/>• JavaScript<br/>• Imágenes"]
    end
    
    subgraph CONTROLLER_LAYER["🎮 CAPA DE CONTROLADOR (Controller)"]
        direction TB
        DISPATCHER["📡 Front Controller<br/>• DispatcherServlet<br/>• URL Routing<br/>• Request Mapping"]
        CTRL["🎯 Controladores<br/>• @Controller<br/>• Action Methods<br/>• Request Handlers"]
        FILTER["🔍 Filtros & Interceptores<br/>• Security Filters<br/>• CORS Handlers<br/>• Logging"]
        VALID_SERVER["🛡️ Validación Servidor<br/>• @Valid Annotations<br/>• Business Rules<br/>• Security Checks"]
    end
    
    subgraph MODEL_LAYER["💾 CAPA DE MODELO (Model)"]
        direction TB
        DOMAIN["📊 Modelo de Dominio<br/>• Entidades (@Entity)<br/>• Value Objects<br/>• Domain Services"]
        SERVICE["⚙️ Servicios de Negocio<br/>• @Service<br/>• Business Logic<br/>• Transacciones"]
        DTO["📋 DTOs & ViewModels<br/>• Data Transfer Objects<br/>• Request/Response<br/>• Mappers"]
        REPOSITORY["🗃️ Repositorios<br/>• @Repository<br/>• Data Access Layer<br/>• Query Methods"]
    end
    
    subgraph PERSISTENCE_LAYER["🗄️ CAPA DE PERSISTENCIA"]
        direction TB
        ORM["🔗 ORM Framework<br/>• Hibernate/JPA<br/>• Entity Framework<br/>• MyBatis"]
        DB["💽 Base de Datos<br/>• MySQL/PostgreSQL<br/>• MongoDB<br/>• Oracle"]
        CACHE["⚡ Sistema de Cache<br/>• Redis<br/>• Memcached<br/>• EhCache"]
        FILES["📁 File System<br/>• Local Storage<br/>• AWS S3<br/>• Azure Blob"]
    end
    
    subgraph EXTERNAL_LAYER["🌐 SERVICIOS EXTERNOS"]
        direction TB
        REST_API["🔌 REST APIs<br/>• Third-party APIs<br/>• Microservices<br/>• Web Services"]
        MSG_QUEUE["📨 Message Queues<br/>• RabbitMQ<br/>• Apache Kafka<br/>• ActiveMQ"]
        EMAIL["📧 Email Services<br/>• SMTP<br/>• SendGrid<br/>• AWS SES"]
    end
    
    %% Flujo Principal (Request Flow) - Líneas sólidas
    USER -->|"1. HTTP Request"| BROWSER
    BROWSER -->|"2. Submit/Click"| VIEW
    VIEW -->|"3. Form Data"| DISPATCHER
    DISPATCHER -->|"4. Route Request"| FILTER
    FILTER -->|"5. Security Check"| CTRL
    CTRL -->|"6. Validate Input"| VALID_SERVER
    VALID_SERVER -->|"7. Business Call"| SERVICE
    SERVICE -->|"8. Domain Logic"| DOMAIN
    DOMAIN -->|"9. Data Request"| REPOSITORY
    REPOSITORY -->|"10. ORM Query"| ORM
    ORM -->|"11. SQL Execute"| DB
    
    %% Flujo de Respuesta (Response Flow) - Líneas punteadas
    DB -.->|"12. Result Set"| ORM
    ORM -.->|"13. Entity Objects"| REPOSITORY
    REPOSITORY -.->|"14. Domain Objects"| DOMAIN
    DOMAIN -.->|"15. Business Data"| SERVICE
    SERVICE -.->|"16. DTO/ViewModel"| CTRL
    CTRL -.->|"17. Model Data"| RENDER
    RENDER -.->|"18. HTML Response"| VIEW
    VIEW -.->|"19. UI Update"| BROWSER
    BROWSER -.->|"20. Display"| USER
    
    %% Conexiones Auxiliares
    VIEW <--> VALID_UI
    VIEW <--> ASSETS
    CTRL <--> DTO
    SERVICE <--> REST_API
    SERVICE <--> MSG_QUEUE
    SERVICE <--> EMAIL
    REPOSITORY <--> CACHE
    ORM <--> FILES
    
    %% Estilos por Capas usando classDef
    classDef userLayer fill:#e3f2fd,stroke:#1976d2,stroke-width:3px,color:#000
    classDef viewLayer fill:#e8f5e8,stroke:#4caf50,stroke-width:3px,color:#000
    classDef controllerLayer fill:#fff3e0,stroke:#ff9800,stroke-width:3px,color:#000
    classDef modelLayer fill:#fce4ec,stroke:#e91e63,stroke-width:3px,color:#000
    classDef persistenceLayer fill:#f3e5f5,stroke:#9c27b0,stroke-width:3px,color:#000
    classDef externalLayer fill:#fff8e1,stroke:#ffc107,stroke-width:2px,color:#000
    
    %% Aplicar estilos
    class USER,BROWSER userLayer
    class VIEW,RENDER,VALID_UI,ASSETS viewLayer
    class DISPATCHER,CTRL,FILTER,VALID_SERVER controllerLayer
    class DOMAIN,SERVICE,DTO,REPOSITORY modelLayer
    class ORM,DB,CACHE,FILES persistenceLayer
    class REST_API,MSG_QUEUE,EMAIL externalLayer
        `;
        
        // Abrir el modal
        const fullscreen = document.getElementById('diagramFullscreen');
        const titleElement = document.getElementById('diagramFullscreenTitle');
        const bodyElement = document.getElementById('diagramFullscreenBody');
        
        if (fullscreen && titleElement && bodyElement) {
            // Establecer título
            titleElement.textContent = 'Patrón MVC - Arquitectura Completa y Detallada';
            
            // Limpiar contenido anterior
            bodyElement.innerHTML = '';
            
            // Agregar el diagrama detallado
            bodyElement.appendChild(detailedDiagram);
            
            // Renderizar el diagrama con Mermaid
            if (typeof mermaid !== 'undefined') {
                try {
                    mermaid.init(undefined, detailedDiagram);
                } catch (error) {
                    console.error('Error rendering detailed MVC diagram:', error);
                }
            }
            
            // Actualizar controles de zoom
            if (diagramFS.updateZoomDisplay) {
                diagramFS.updateZoomDisplay();
            }
            
            // Mostrar pantalla completa
            fullscreen.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Entrar en modo pantalla completa del navegador
            if (diagramFS.enterBrowserFullscreen) {
                diagramFS.enterBrowserFullscreen();
            }
            
        } else {
            console.error('Fullscreen elements not found');
            alert('Error: No se pudo abrir la vista de pantalla completa');
        }
        
    } else {
        // Fallback si DiagramFullscreen no está disponible
        console.warn('DiagramFullscreen class not available');
        alert('La funcionalidad de pantalla completa no está disponible. Por favor, recarga la página.');
    }
}