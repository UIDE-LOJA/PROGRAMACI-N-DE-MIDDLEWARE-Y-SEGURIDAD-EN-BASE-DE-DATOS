// ===== CONFIGURACIÓN Y UTILIDADES DE MERMAID =====

// Inicializar Mermaid con configuración personalizada
mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    themeVariables: {
        darkMode: true,
        primaryColor: '#E9AB21',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#ffffff',
        lineColor: '#ffffff',
        secondaryColor: '#23356E',
        tertiaryColor: '#910048',
        background: '#0f1419',
        mainBkg: '#0f1419',
        secondBkg: '#1a1f2e'
    },
    flowchart: {
        useMaxWidth: true,
        htmlLabels: false,
        curve: 'basis'
    }
});

/**
 * Renderiza diagramas Mermaid en un contenedor específico
 * @param {HTMLElement} container - Contenedor que contiene elementos .mermaid
 */
function renderMermaidInContainer(container) {
    const mermaidElements = container.querySelectorAll('.mermaid');

    if (mermaidElements.length > 0) {
        console.log(`🎨 Renderizando ${mermaidElements.length} diagramas Mermaid`);
        
        mermaidElements.forEach((element, index) => {
            // Solo renderizar si no ha sido procesado
            if (!element.getAttribute('data-processed')) {
                console.log(`📊 Renderizando diagrama ${index + 1}`);
                
                try {
                    mermaid.run({
                        nodes: [element],
                        suppressErrors: false
                    }).then(() => {
                        console.log(`✅ Diagrama ${index + 1} renderizado exitosamente`);
                    }).catch(err => {
                        console.error(`❌ Error renderizando diagrama ${index + 1}:`, err);
                    });
                } catch (err) {
                    console.error(`❌ Error al intentar renderizar:`, err);
                }
            }
        });
    }
}

/**
 * Renderiza todos los diagramas Mermaid en la página
 */
function renderAllMermaidDiagrams() {
    console.log('🎨 Renderizando todos los diagramas Mermaid en la página');
    renderMermaidInContainer(document.body);
}

// Exportar funciones para uso global
window.renderMermaidInContainer = renderMermaidInContainer;
window.renderAllMermaidDiagrams = renderAllMermaidDiagrams;

console.log('✅ Mermaid configurado y listo');
