// Timeline de Sistemas Distribuidos con Timeline.js
function createDistributedSystemsTimeline() {
    // Verificar que el elemento existe
    const container = document.getElementById('timeline-sistemas-distribuidos');
    if (!container) {
        console.warn('Elemento timeline-sistemas-distribuidos no encontrado');
        return;
    }

    // Verificar que Timeline.js está cargado
    if (typeof TL === 'undefined' || typeof TL.Timeline === 'undefined') {
        console.warn('Timeline.js no está cargado');
        setTimeout(createDistributedSystemsTimeline, 500);
        return;
    }

    // Limpiar el contenedor si ya tiene contenido
    container.innerHTML = '';
    const timelineData = {
        "title": {
            "media": {
                "url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
                "caption": "Evolución de los Sistemas Distribuidos",
                "credit": "Unsplash"
            },
            "text": {
                "headline": "Evolución de Sistemas Distribuidos<br/>1970 - 2025",
                "text": "<p>Un recorrido histórico por los hitos más importantes en el desarrollo de sistemas distribuidos y middleware, desde las primeras redes hasta la computación moderna en la nube y edge computing.</p>"
            }
        },
        "events": [
            {
                "media": {
                    "url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
                    "caption": "ARPANET - La primera red de computadoras",
                    "credit": "Unsplash"
                },
                "start_date": {
                    "year": "1969"
                },
                "text": {
                    "headline": "ARPANET - Primeras Redes",
                    "text": "<p>ARPANET fue la primera red de computadoras que implementó el protocolo TCP/IP, sentando las bases para Internet y los sistemas distribuidos modernos. Conectó universidades y centros de investigación en Estados Unidos.</p>"
                },
                "group": "Redes Pioneras"
            },
            {
                "media": {
                    "url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
                    "caption": "RPC - Llamadas a Procedimientos Remotos",
                    "credit": "Unsplash"
                },
                "start_date": {
                    "year": "1984"
                },
                "text": {
                    "headline": "RPC - Cliente-Servidor",
                    "text": "<p>Las Llamadas a Procedimientos Remotos (RPC) revolucionaron la programación distribuida al permitir que las aplicaciones invoquen funciones en sistemas remotos como si fueran locales, estableciendo el paradigma cliente-servidor.</p>"
                },
                "group": "Middleware Básico"
            },
            {
                "media": {
                    "url": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600",
                    "caption": "CORBA - Middleware Orientado a Objetos",
                    "credit": "Unsplash"
                },
                "start_date": {
                    "year": "1991"
                },
                "text": {
                    "headline": "CORBA - Middleware Orientado a Objetos",
                    "text": "<p>CORBA (Common Object Request Broker Architecture) introdujo la programación orientada a objetos en sistemas distribuidos, permitiendo que objetos en diferentes lenguajes y plataformas se comuniquen seamlessly.</p>"
                },
                "group": "Middleware Avanzado"
            },
            {
                "media": {
                    "url": "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=600",
                    "caption": "World Wide Web - La revolución de Internet",
                    "credit": "Unsplash"
                },
                "start_date": {
                    "year": "1991"
                },
                "text": {
                    "headline": "World Wide Web",
                    "text": "<p>Tim Berners-Lee crea la World Wide Web, introduciendo HTTP, HTML y URLs. Esta innovación democratizó el acceso a sistemas distribuidos y sentó las bases para las aplicaciones web modernas.</p>"
                },
                "group": "Web Technologies"
            },
            {
                "media": {
                    "url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
                    "caption": "SOA - Arquitectura Orientada a Servicios",
                    "credit": "Unsplash"
                },
                "start_date": {
                    "year": "2000"
                },
                "text": {
                    "headline": "SOA - Service Oriented Architecture",
                    "text": "<p>La Arquitectura Orientada a Servicios (SOA) introduce el concepto de servicios reutilizables y débilmente acoplados, permitiendo mayor flexibilidad y escalabilidad en sistemas empresariales.</p>"
                },
                "group": "Arquitecturas Empresariales"
            },
            {
                "media": {
                    "url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
                    "caption": "Web Services - XML y SOAP",
                    "credit": "Unsplash"
                },
                "start_date": {
                    "year": "2002"
                },
                "text": {
                    "headline": "Web Services - XML/SOAP",
                    "text": "<p>Los Web Services estandarizan la comunicación entre aplicaciones usando XML, SOAP y WSDL, facilitando la integración entre sistemas heterogéneos en entornos empresariales.</p>"
                },
                "group": "Estándares Web"
            },
            {
                "media": {
                    "url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
                    "caption": "Microservicios - Arquitectura Distribuida Moderna",
                    "credit": "Unsplash"
                },
                "start_date": {
                    "year": "2011"
                },
                "text": {
                    "headline": "Microservicios - Arquitectura Distribuida",
                    "text": "<p>Los microservicios revolucionan el desarrollo de software al descomponer aplicaciones monolíticas en servicios pequeños, independientes y desplegables por separado, mejorando la escalabilidad y mantenibilidad.</p>"
                },
                "group": "Arquitecturas Modernas"
            },
            {
                "media": {
                    "url": "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600",
                    "caption": "Docker y Kubernetes - Revolución de Contenedores",
                    "credit": "Unsplash"
                },
                "start_date": {
                    "year": "2013"
                },
                "text": {
                    "headline": "Docker/Kubernetes - Contenedores",
                    "text": "<p>Docker populariza los contenedores y Kubernetes los orquesta, transformando cómo se despliegan y gestionan aplicaciones distribuidas, proporcionando portabilidad y escalabilidad automática.</p>"
                },
                "group": "Containerización"
            },
            {
                "media": {
                    "url": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600",
                    "caption": "Edge Computing - Computación en el Borde",
                    "credit": "Unsplash"
                },
                "start_date": {
                    "year": "2020"
                },
                "text": {
                    "headline": "Edge Computing - Computación Distribuida",
                    "text": "<p>Edge Computing acerca el procesamiento a los datos y usuarios finales, reduciendo latencia y mejorando la experiencia en aplicaciones IoT, realidad aumentada y sistemas autónomos.</p>"
                },
                "group": "Computación Moderna"
            },
            {
                "media": {
                    "url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
                    "caption": "AI/ML Distribuido - Inteligencia Artificial",
                    "credit": "Unsplash"
                },
                "start_date": {
                    "year": "2023"
                },
                "text": {
                    "headline": "AI/ML Distribuido - Inteligencia Artificial",
                    "text": "<p>La inteligencia artificial y machine learning distribuido permiten entrenar y ejecutar modelos complejos en múltiples nodos, democratizando el acceso a capacidades de IA avanzadas.</p>"
                },
                "group": "IA Distribuida"
            }
        ]
    };

    // Opciones del timeline
    const options = {
        start_at_end: false,
        default_bg_color: { r: 255, g: 255, b: 255 },
        timenav_height: 200,
        timenav_height_percentage: 30,
        hash_bookmark: false,
        zoom_sequence: [0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
        language: 'es',
        slide_padding_lr: 100,
        slide_default_fade: '0%'
    };

    // Crear el timeline con manejo de errores
    try {
        // Verificar una vez más que el elemento existe
        if (document.getElementById('timeline-sistemas-distribuidos')) {
            window.distributedSystemsTimeline = new TL.Timeline('timeline-sistemas-distribuidos', timelineData, options);
            console.log('Timeline creado exitosamente');
        } else {
            throw new Error('Elemento no encontrado al momento de crear el timeline');
        }
    } catch (error) {
        console.error('Error al crear el timeline:', error);
        // Mostrar mensaje de error amigable
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>Error al cargar el timeline. Por favor, recarga la página.</p>
            </div>
        `;
        container.appendChild(errorDiv);
    }
}

// Función para verificar si el elemento existe y está visible
function initTimelineWhenReady() {
    const container = document.getElementById('timeline-sistemas-distribuidos');
    if (container && container.offsetParent !== null) {
        // El elemento existe y es visible
        try {
            createDistributedSystemsTimeline();
        } catch (error) {
            console.warn('Error al crear timeline:', error);
            // Reintentar después de un momento
            setTimeout(initTimelineWhenReady, 500);
        }
    } else {
        // El elemento no existe o no es visible, reintentar
        setTimeout(initTimelineWhenReady, 200);
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initTimelineWhenReady, 500);
    });
} else {
    setTimeout(initTimelineWhenReady, 500);
}