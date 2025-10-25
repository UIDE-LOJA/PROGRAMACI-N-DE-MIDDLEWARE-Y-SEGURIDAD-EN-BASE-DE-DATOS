// MVC Architecture D3.js Interactive Diagram - 3-Layer Architecture with MVC Pattern
document.addEventListener('DOMContentLoaded', function() {
    createMVCArchitectureDiagram();
});

function createMVCArchitectureDiagram() {
    const container = d3.select('#mvc-architecture-d3-diagram');
    if (container.empty()) return;

    // Clear any existing content
    container.selectAll('*').remove();

    const width = 700;
    const height = 700;
    let selectedComponent = null;
    let isAnimating = false;

    const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('max-width', '100%')
        .style('height', 'auto');

    // Define the MVC components integrated with 3-layer architecture
    const layers = [
        {
            id: 'presentation',
            title: 'CAPA DE PRESENTACIÓN (Vista)',
            subtitle: 'Vista en MVC',
            color: '#e3f2fd',
            borderColor: '#1976d2',
            y: 80,
            height: 150,
            components: [
                { 
                    id: 'web-ui', 
                    icon: '\uf108', 
                    label: 'Interfaz Web', 
                    x: 120, 
                    y: 120,
                    description: 'HTML, CSS, JavaScript - Presentación de datos al usuario',
                    technologies: ['React', 'Vue.js', 'Angular', 'HTML5/CSS3'],
                    responsibilities: ['Mostrar información', 'Capturar entrada', 'Validación básica', 'UX/UI']
                },
                { 
                    id: 'mobile-app', 
                    icon: '\uf3cd', 
                    label: 'App Móvil', 
                    x: 280, 
                    y: 120,
                    description: 'Aplicaciones nativas e híbridas para dispositivos móviles',
                    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
                    responsibilities: ['UI nativa', 'Gestos táctiles', 'Notificaciones push', 'Offline support']
                },
                { 
                    id: 'desktop-app', 
                    icon: '\uf2d0', 
                    label: 'App Escritorio', 
                    x: 440, 
                    y: 120,
                    description: 'Aplicaciones de escritorio multiplataforma',
                    technologies: ['Electron', 'WPF', 'JavaFX', 'Qt'],
                    responsibilities: ['UI nativa OS', 'Integración sistema', 'Rendimiento local', 'Acceso archivos']
                }
            ]
        },
        {
            id: 'business',
            title: 'CAPA DE NEGOCIO (Controlador)',
            subtitle: 'Controlador en MVC',
            color: '#f3e5f5',
            borderColor: '#7b1fa2',
            y: 280,
            height: 150,
            components: [
                { 
                    id: 'api-rest', 
                    icon: '\uf233', 
                    label: 'API REST', 
                    x: 120, 
                    y: 320,
                    description: 'Endpoints RESTful para operaciones CRUD',
                    technologies: ['Express.js', 'Spring Boot', 'ASP.NET Core', 'FastAPI'],
                    responsibilities: ['Routing HTTP', 'Validación entrada', 'Serialización JSON', 'Status codes']
                },
                { 
                    id: 'business-logic', 
                    icon: '\uf085', 
                    label: 'Lógica Negocio', 
                    x: 280, 
                    y: 320,
                    description: 'Reglas de negocio y procesamiento de datos',
                    technologies: ['Services', 'Use Cases', 'Domain Logic', 'Business Rules'],
                    responsibilities: ['Reglas negocio', 'Validación compleja', 'Coordinación capas', 'Transacciones']
                },
                { 
                    id: 'auth-service', 
                    icon: '\uf132', 
                    label: 'Autenticación', 
                    x: 440, 
                    y: 320,
                    description: 'Gestión de identidad y autorización',
                    technologies: ['JWT', 'OAuth2', 'SAML', 'Auth0'],
                    responsibilities: ['Login/Logout', 'Tokens JWT', 'Roles/Permisos', 'Session management']
                }
            ]
        },
        {
            id: 'data',
            title: 'CAPA DE DATOS (Modelo)',
            subtitle: 'Modelo en MVC',
            color: '#e8f5e8',
            borderColor: '#388e3c',
            y: 480,
            height: 150,
            components: [
                { 
                    id: 'database', 
                    icon: '\uf1c0', 
                    label: 'Base de Datos', 
                    x: 120, 
                    y: 520,
                    description: 'Almacenamiento persistente relacional y NoSQL',
                    technologies: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
                    responsibilities: ['Persistencia datos', 'Integridad referencial', 'Consultas optimizadas', 'ACID']
                },
                { 
                    id: 'cache-layer', 
                    icon: '\uf538', 
                    label: 'Cache Redis', 
                    x: 280, 
                    y: 520,
                    description: 'Cache en memoria para optimización de rendimiento',
                    technologies: ['Redis', 'Memcached', 'Hazelcast', 'In-Memory DB'],
                    responsibilities: ['Cache consultas', 'Sesiones usuario', 'Rate limiting', 'Pub/Sub']
                },
                { 
                    id: 'file-system', 
                    icon: '\uf07b', 
                    label: 'Archivos', 
                    x: 440, 
                    y: 520,
                    description: 'Sistema de archivos y almacenamiento de objetos',
                    technologies: ['AWS S3', 'MinIO', 'File System', 'CDN'],
                    responsibilities: ['Archivos estáticos', 'Uploads usuario', 'Backups', 'Media storage']
                }
            ]
        }
    ];

    // MVC flow connections
    const mvcFlows = [
        { from: 'web-ui', to: 'api-rest', label: 'HTTP Request', type: 'user-action' },
        { from: 'mobile-app', to: 'api-rest', label: 'API Call', type: 'user-action' },
        { from: 'api-rest', to: 'business-logic', label: 'Process', type: 'controller-model' },
        { from: 'business-logic', to: 'database', label: 'Query/Update', type: 'controller-model' },
        { from: 'database', to: 'business-logic', label: 'Data', type: 'model-controller' },
        { from: 'business-logic', to: 'api-rest', label: 'Result', type: 'model-controller' },
        { from: 'api-rest', to: 'web-ui', label: 'JSON Response', type: 'view-update' },
        { from: 'cache-layer', to: 'business-logic', label: 'Cached Data', type: 'optimization' }
    ];

    // Create tooltip
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'mvc-tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background', 'rgba(0, 0, 0, 0.95)')
        .style('color', 'white')
        .style('padding', '15px')
        .style('border-radius', '8px')
        .style('font-size', '12px')
        .style('max-width', '350px')
        .style('z-index', '1000')
        .style('box-shadow', '0 4px 15px rgba(0,0,0,0.3)');

    // Create info panel
    const infoPanel = container
        .append('div')
        .attr('id', 'mvc-info-panel')
        .style('position', 'absolute')
        .style('top', '10px')
        .style('right', '10px')
        .style('background', 'rgba(255,255,255,0.95)')
        .style('padding', '15px')
        .style('border-radius', '8px')
        .style('box-shadow', '0 4px 15px rgba(0,0,0,0.2)')
        .style('max-width', '300px')
        .style('font-size', '11px')
        .style('display', 'none')
        .style('z-index', '5');

    // Add title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text('Arquitectura 3 Capas + Patrón MVC');

    // Add MVC pattern indicator
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 45)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', '#666')
        .text('Modelo-Vista-Controlador integrado con capas arquitectónicas');

    // Draw layers
    const layerGroups = svg.selectAll('.layer-group')
        .data(layers)
        .enter()
        .append('g')
        .attr('class', 'layer-group');

    // Layer backgrounds
    layerGroups
        .append('rect')
        .attr('x', 50)
        .attr('y', d => d.y)
        .attr('width', width - 100)
        .attr('height', d => d.height)
        .attr('fill', d => d.color)
        .attr('stroke', d => d.borderColor)
        .attr('stroke-width', 2)
        .attr('rx', 12)
        .style('filter', 'drop-shadow(2px 2px 6px rgba(0,0,0,0.1))');

    // Layer titles
    layerGroups
        .append('text')
        .attr('x', 70)
        .attr('y', d => d.y + 25)
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('fill', d => d.borderColor)
        .text(d => d.title);

    // Layer subtitles (MVC mapping)
    layerGroups
        .append('text')
        .attr('x', 70)
        .attr('y', d => d.y + 42)
        .attr('font-size', '11px')
        .attr('font-style', 'italic')
        .attr('fill', '#666')
        .text(d => d.subtitle);

    // Draw components
    const allComponents = layers.flatMap(layer => 
        layer.components.map(comp => ({...comp, layerColor: layer.borderColor}))
    );

    const componentGroups = svg.selectAll('.component-group')
        .data(allComponents)
        .enter()
        .append('g')
        .attr('class', 'component-group')
        .style('cursor', 'pointer');

    // Component circles
    componentGroups
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 35)
        .attr('fill', 'white')
        .attr('stroke', d => d.layerColor)
        .attr('stroke-width', 3)
        .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))')
        .on('mouseover', function(event, d) {
            if (isAnimating) return;
            
            d3.select(this)
                .transition()
                .duration(200)
                .attr('r', 40)
                .attr('stroke-width', 4)
                .style('filter', 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))');
            
            showTooltip(event, d);
        })
        .on('mousemove', function(event) {
            tooltip
                .style('top', (event.pageY - 10) + 'px')
                .style('left', (event.pageX + 10) + 'px');
        })
        .on('mouseout', function(event, d) {
            if (isAnimating) return;
            
            d3.select(this)
                .transition()
                .duration(200)
                .attr('r', selectedComponent === d.id ? 40 : 35)
                .attr('stroke-width', selectedComponent === d.id ? 4 : 3)
                .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))');
            
            tooltip.style('visibility', 'hidden');
        })
        .on('click', function(event, d) {
            selectedComponent = d.id;
            highlightMVCFlow(d.id);
            showComponentDetails(d);
        });

    // Component icons
    componentGroups
        .append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y - 5)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'Font Awesome 6 Free')
        .attr('font-size', '20px')
        .attr('fill', d => d.layerColor)
        .text(d => d.icon)
        .style('pointer-events', 'none');

    // Component labels
    componentGroups
        .append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y + 15)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text(d => d.label)
        .style('pointer-events', 'none');

    // Draw MVC flow connections
    const flowGroup = svg.append('g').attr('class', 'mvc-flows');

    // Define arrow markers for different flow types
    const defs = svg.append('defs');
    
    const flowTypes = [
        { type: 'user-action', color: '#2196F3' },
        { type: 'controller-model', color: '#9C27B0' },
        { type: 'model-controller', color: '#4CAF50' },
        { type: 'view-update', color: '#FF5722' },
        { type: 'optimization', color: '#FF9800' }
    ];

    flowTypes.forEach(flowType => {
        defs.append('marker')
            .attr('id', `arrowhead-${flowType.type}`)
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 8)
            .attr('refY', 0)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', flowType.color);
    });

    mvcFlows.forEach(flow => {
        const fromComp = allComponents.find(c => c.id === flow.from);
        const toComp = allComponents.find(c => c.id === flow.to);
        
        if (fromComp && toComp) {
            const flowColor = flowTypes.find(ft => ft.type === flow.type)?.color || '#666';
            
            flowGroup
                .append('line')
                .attr('class', `flow-${flow.from}-${flow.to}`)
                .attr('x1', fromComp.x)
                .attr('y1', fromComp.y)
                .attr('x2', toComp.x)
                .attr('y2', toComp.y)
                .attr('stroke', flowColor)
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', flow.type === 'optimization' ? '5,5' : 'none')
                .attr('marker-end', `url(#arrowhead-${flow.type})`)
                .style('opacity', 0.3);

            // Add flow labels
            const midX = (fromComp.x + toComp.x) / 2;
            const midY = (fromComp.y + toComp.y) / 2;
            
            flowGroup
                .append('text')
                .attr('class', `flow-label-${flow.from}-${flow.to}`)
                .attr('x', midX)
                .attr('y', midY - 5)
                .attr('text-anchor', 'middle')
                .attr('font-size', '8px')
                .attr('fill', flowColor)
                .attr('font-weight', 'bold')
                .text(flow.label)
                .style('opacity', 0);
        }
    });

    // Add legend
    const legend = svg.append('g')
        .attr('class', 'mvc-legend')
        .attr('transform', 'translate(50, 650)');

    legend.append('rect')
        .attr('x', -5)
        .attr('y', -5)
        .attr('width', 600)
        .attr('height', 40)
        .attr('fill', 'rgba(255, 255, 255, 0.95)')
        .attr('stroke', '#ddd')
        .attr('stroke-width', 1)
        .attr('rx', 5)
        .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))');

    legend.append('text')
        .attr('x', 5)
        .attr('y', 12)
        .attr('font-size', '11px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text('💡 Flujos MVC:');

    const legendFlows = [
        { color: '#2196F3', text: 'Usuario → Controlador', x: 100 },
        { color: '#9C27B0', text: 'Controlador → Modelo', x: 220 },
        { color: '#4CAF50', text: 'Modelo → Controlador', x: 340 },
        { color: '#FF5722', text: 'Controlador → Vista', x: 460 }
    ];

    legendFlows.forEach(item => {
        legend.append('circle')
            .attr('cx', item.x)
            .attr('cy', 8)
            .attr('r', 4)
            .attr('fill', item.color);

        legend.append('text')
            .attr('x', item.x + 8)
            .attr('y', 12)
            .attr('font-size', '9px')
            .attr('fill', '#666')
            .text(item.text);
    });

    legend.append('text')
        .attr('x', 5)
        .attr('y', 28)
        .attr('font-size', '9px')
        .attr('fill', '#999')
        .text('🖱️ Haz clic en los componentes para ver flujos y detalles técnicos');

    // Functions
    function showTooltip(event, component) {
        const tooltipContent = `
            <div style="border-bottom: 1px solid rgba(255,255,255,0.3); margin-bottom: 8px; padding-bottom: 5px;">
                <strong style="font-size: 14px;">${component.label}</strong>
            </div>
            <div style="margin-bottom: 8px;">${component.description}</div>
            <div style="font-size: 10px; color: #ccc;">
                💡 Haz clic para ver detalles técnicos y flujos
            </div>
        `;
        
        tooltip
            .style('visibility', 'visible')
            .html(tooltipContent);
    }

    function showComponentDetails(component) {
        let detailsHtml = `
            <div style="border-bottom: 2px solid #4CAF50; margin-bottom: 10px; padding-bottom: 5px;">
                <strong style="color: #4CAF50; font-size: 14px;">${component.label}</strong>
            </div>
            <div style="margin-bottom: 8px; font-style: italic; color: #666;">
                ${component.description}
            </div>
            <div style="margin-bottom: 8px;">
                <strong style="color: #333;">Tecnologías:</strong><br/>
                <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px;">
        `;
        
        component.technologies.forEach(tech => {
            detailsHtml += `<span style="background: #e3f2fd; color: #1976d2; padding: 2px 6px; border-radius: 10px; font-size: 9px;">${tech}</span>`;
        });
        
        detailsHtml += `
                </div>
            </div>
            <div style="margin-bottom: 8px;">
                <strong style="color: #333;">Responsabilidades:</strong>
                <ul style="margin: 4px 0; padding-left: 15px; font-size: 10px;">
        `;
        
        component.responsibilities.forEach(resp => {
            detailsHtml += `<li>${resp}</li>`;
        });
        
        detailsHtml += `
                </ul>
            </div>
            <div style="font-size: 10px; color: #999; margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee;">
                💡 Componente en patrón MVC integrado
            </div>
        `;
        
        infoPanel
            .html(detailsHtml)
            .style('display', 'block');
    }

    function highlightMVCFlow(componentId) {
        // Reset all flows
        flowGroup.selectAll('line')
            .transition()
            .duration(300)
            .style('opacity', 0.3);
        
        flowGroup.selectAll('text')
            .transition()
            .duration(300)
            .style('opacity', 0);

        // Highlight flows related to selected component
        mvcFlows.forEach(flow => {
            if (flow.from === componentId || flow.to === componentId) {
                flowGroup.selectAll(`.flow-${flow.from}-${flow.to}`)
                    .transition()
                    .duration(300)
                    .style('opacity', 1)
                    .attr('stroke-width', 3);
                
                flowGroup.selectAll(`.flow-label-${flow.from}-${flow.to}`)
                    .transition()
                    .duration(300)
                    .style('opacity', 1);
            }
        });

        // Highlight selected component
        componentGroups
            .filter(d => d.id === componentId)
            .select('circle')
            .transition()
            .duration(300)
            .attr('r', 40)
            .attr('stroke-width', 4);
    }

    // Auto-show welcome message
    setTimeout(() => {
        infoPanel
            .html(`
                <div style="border-bottom: 2px solid #4caf50; margin-bottom: 10px; padding-bottom: 5px;">
                    <strong style="color: #4caf50; font-size: 14px;">🏗️ Arquitectura MVC + 3 Capas</strong>
                </div>
                <div style="margin-bottom: 8px;">
                    Integración del patrón Modelo-Vista-Controlador con arquitectura de capas
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Mapeo MVC:</strong>
                    <ul style="margin: 5px 0; padding-left: 15px; font-size: 11px;">
                        <li><strong>Vista:</strong> Capa de Presentación</li>
                        <li><strong>Controlador:</strong> Capa de Negocio</li>
                        <li><strong>Modelo:</strong> Capa de Datos</li>
                    </ul>
                </div>
                <div style="font-size: 10px; color: #666; margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee;">
                    💡 Haz clic en cualquier componente para explorar flujos y tecnologías
                </div>
            `)
            .style('display', 'block');
    }, 1000);
}