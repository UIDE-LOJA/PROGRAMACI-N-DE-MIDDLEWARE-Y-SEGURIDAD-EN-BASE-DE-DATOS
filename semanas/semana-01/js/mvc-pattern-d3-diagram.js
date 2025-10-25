// MVC Pattern D3.js Interactive Diagram - Classic MVC Pattern
document.addEventListener('DOMContentLoaded', function() {
    createMVCPatternDiagram();
});

function createMVCPatternDiagram() {
    const container = d3.select('#mvc-pattern-d3-diagram');
    if (container.empty()) return;

    // Clear any existing content
    container.selectAll('*').remove();

    const width = 700;
    const height = 500;
    let selectedComponent = null;
    let isAnimating = false;

    const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('max-width', '100%')
        .style('height', 'auto');

    // Define MVC components in triangular layout
    const mvcComponents = [
        {
            id: 'modelo',
            x: width / 2,
            y: 120,
            width: 160,
            height: 80,
            label: 'MODELO',
            color: '#4CAF50',
            description: 'Lógica de negocio, acceso a datos, filtros y restricciones del sistema',
            responsibilities: [
                'Gestión de datos y estado',
                'Reglas de negocio',
                'Validación de datos',
                'Notificación de cambios',
                'Acceso a base de datos'
            ],
            examples: ['Entidades', 'Servicios', 'Repositorios', 'DTOs', 'Validadores']
        },
        {
            id: 'vista',
            x: 150,
            y: 350,
            width: 160,
            height: 80,
            label: 'VISTA',
            color: '#2196F3',
            description: 'Interfaz de usuario, obtiene datos del Modelo para generar la interfaz',
            responsibilities: [
                'Presentación de datos',
                'Captura de entrada del usuario',
                'Renderizado de UI',
                'Formateo de información',
                'Experiencia de usuario'
            ],
            examples: ['HTML/CSS', 'Templates', 'Componentes UI', 'Formularios', 'Reportes']
        },
        {
            id: 'controlador',
            x: 550,
            y: 350,
            width: 160,
            height: 80,
            label: 'CONTROLADOR',
            color: '#FF5722',
            description: 'Gestiona eventos, accede al Modelo y delega a la Vista',
            responsibilities: [
                'Manejo de eventos del usuario',
                'Coordinación entre Vista y Modelo',
                'Lógica de control de flujo',
                'Procesamiento de requests',
                'Gestión de navegación'
            ],
            examples: ['Controllers', 'Handlers', 'Actions', 'Routes', 'Middlewares']
        }
    ];

    // Define MVC interactions
    const mvcInteractions = [
        {
            from: 'vista',
            to: 'controlador',
            label: '1. Evento Usuario',
            description: 'El usuario interactúa con la vista (clic, input, etc.)',
            color: '#FF9800',
            type: 'user-input'
        },
        {
            from: 'controlador',
            to: 'modelo',
            label: '2. Actualizar Datos',
            description: 'El controlador procesa el evento y actualiza el modelo',
            color: '#9C27B0',
            type: 'data-update'
        },
        {
            from: 'modelo',
            to: 'vista',
            label: '3. Notificar Cambios',
            description: 'El modelo notifica a la vista sobre cambios en los datos',
            color: '#4CAF50',
            type: 'data-notification'
        },
        {
            from: 'controlador',
            to: 'vista',
            label: '4. Actualizar UI',
            description: 'El controlador puede actualizar directamente la vista',
            color: '#607D8B',
            type: 'ui-update',
            dashed: true
        }
    ];

    // Create tooltip
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'mvc-pattern-tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background', 'rgba(0, 0, 0, 0.95)')
        .style('color', 'white')
        .style('padding', '15px')
        .style('border-radius', '8px')
        .style('font-size', '12px')
        .style('max-width', '300px')
        .style('z-index', '1000')
        .style('box-shadow', '0 4px 15px rgba(0,0,0,0.3)');

    // Create info panel
    const infoPanel = container
        .append('div')
        .attr('id', 'mvc-pattern-info-panel')
        .style('position', 'absolute')
        .style('bottom', '10px')
        .style('left', '10px')
        .style('background', 'rgba(255,255,255,0.95)')
        .style('padding', '15px')
        .style('border-radius', '8px')
        .style('box-shadow', '0 4px 15px rgba(0,0,0,0.2)')
        .style('max-width', '280px')
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
        .text('Patrón Modelo-Vista-Controlador (MVC)');

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 45)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', '#666')
        .text('Arquitectura de 3 capas con responsabilidades estandarizadas');

    // Draw interaction arrows first (behind components)
    const arrowGroup = svg.append('g').attr('class', 'mvc-arrows');

    // Define arrow markers
    const defs = svg.append('defs');
    
    mvcInteractions.forEach(interaction => {
        defs.append('marker')
            .attr('id', `arrowhead-${interaction.type}`)
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 8)
            .attr('refY', 0)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', interaction.color);
    });

    mvcInteractions.forEach(interaction => {
        const fromComp = mvcComponents.find(c => c.id === interaction.from);
        const toComp = mvcComponents.find(c => c.id === interaction.to);
        
        if (fromComp && toComp) {
            // Calculate connection points on component edges
            const fromX = fromComp.x + fromComp.width / 2;
            const fromY = fromComp.y + fromComp.height / 2;
            const toX = toComp.x + toComp.width / 2;
            const toY = toComp.y + toComp.height / 2;
            
            // Create curved path for better visualization
            const midX = (fromX + toX) / 2;
            const midY = (fromY + toY) / 2;
            const curve = interaction.type === 'data-notification' ? -50 : 30;
            
            const path = `M ${fromX} ${fromY} Q ${midX + curve} ${midY - curve} ${toX} ${toY}`;
            
            arrowGroup
                .append('path')
                .attr('class', `interaction-${interaction.from}-${interaction.to}`)
                .attr('d', path)
                .attr('stroke', interaction.color)
                .attr('stroke-width', 3)
                .attr('stroke-dasharray', interaction.dashed ? '8,4' : 'none')
                .attr('fill', 'none')
                .attr('marker-end', `url(#arrowhead-${interaction.type})`)
                .style('opacity', 0.4)
                .style('cursor', 'pointer')
                .on('mouseover', function(event) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style('opacity', 1)
                        .attr('stroke-width', 4);
                    
                    tooltip
                        .style('visibility', 'visible')
                        .html(`
                            <div style="border-bottom: 1px solid rgba(255,255,255,0.3); margin-bottom: 5px; padding-bottom: 3px;">
                                <strong>${interaction.label}</strong>
                            </div>
                            <div style="font-size: 11px;">${interaction.description}</div>
                        `);
                })
                .on('mousemove', function(event) {
                    tooltip
                        .style('top', (event.pageY - 10) + 'px')
                        .style('left', (event.pageX + 10) + 'px');
                })
                .on('mouseout', function() {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style('opacity', 0.4)
                        .attr('stroke-width', 3);
                    
                    tooltip.style('visibility', 'hidden');
                });

            // Add interaction labels
            arrowGroup
                .append('text')
                .attr('class', `interaction-label-${interaction.from}-${interaction.to}`)
                .attr('x', midX + curve / 2)
                .attr('y', midY - curve / 2 - 5)
                .attr('text-anchor', 'middle')
                .attr('font-size', '10px')
                .attr('font-weight', 'bold')
                .attr('fill', interaction.color)
                .text(interaction.label)
                .style('opacity', 0.7);
        }
    });

    // Draw MVC components
    const componentGroups = svg.selectAll('.mvc-component-group')
        .data(mvcComponents)
        .enter()
        .append('g')
        .attr('class', 'mvc-component-group')
        .style('cursor', 'pointer');

    // Component rectangles
    componentGroups
        .append('rect')
        .attr('x', d => d.x - d.width / 2)
        .attr('y', d => d.y - d.height / 2)
        .attr('width', d => d.width)
        .attr('height', d => d.height)
        .attr('fill', d => d.color)
        .attr('stroke', '#333')
        .attr('stroke-width', 3)
        .attr('rx', 15)
        .style('filter', 'drop-shadow(3px 3px 6px rgba(0,0,0,0.2))')
        .on('mouseover', function(event, d) {
            if (isAnimating) return;
            
            d3.select(this)
                .transition()
                .duration(200)
                .attr('stroke-width', 5)
                .style('filter', 'drop-shadow(5px 5px 10px rgba(0,0,0,0.3))');
            
            showComponentTooltip(event, d);
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
                .attr('stroke-width', selectedComponent === d.id ? 5 : 3)
                .style('filter', 'drop-shadow(3px 3px 6px rgba(0,0,0,0.2))');
            
            tooltip.style('visibility', 'hidden');
        })
        .on('click', function(event, d) {
            selectedComponent = d.id;
            highlightMVCComponent(d.id);
            showComponentDetails(d);
        });

    // Component labels
    componentGroups
        .append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', '18px')
        .attr('font-weight', 'bold')
        .attr('fill', 'white')
        .text(d => d.label)
        .style('pointer-events', 'none');

    // Component icons
    const iconMap = {
        'modelo': '\uf1c0', // database
        'vista': '\uf108', // desktop
        'controlador': '\uf085' // cogs
    };

    componentGroups
        .append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y + 15)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'Font Awesome 6 Free')
        .attr('font-size', '24px')
        .attr('fill', 'rgba(255,255,255,0.8)')
        .text(d => iconMap[d.id])
        .style('pointer-events', 'none');

    // Add legend
    const legend = svg.append('g')
        .attr('class', 'mvc-pattern-legend')
        .attr('transform', 'translate(450, 80)');

    legend.append('rect')
        .attr('x', -5)
        .attr('y', -5)
        .attr('width', 200)
        .attr('height', 100)
        .attr('fill', 'rgba(255, 255, 255, 0.95)')
        .attr('stroke', '#ddd')
        .attr('stroke-width', 1)
        .attr('rx', 5)
        .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))');

    // Legend icon
    legend.append('text')
        .attr('x', 5)
        .attr('y', 12)
        .attr('font-family', 'Font Awesome 6 Free')
        .attr('font-size', '12px')
        .attr('fill', '#4CAF50')
        .text('\uf0eb'); // lightbulb icon

    legend.append('text')
        .attr('x', 20)
        .attr('y', 12)
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text('Flujo de Interacción');

    const legendItems = [
        { color: '#FF9800', text: '1. Usuario → Controlador', y: 28 },
        { color: '#9C27B0', text: '2. Controlador → Modelo', y: 42 },
        { color: '#4CAF50', text: '3. Modelo → Vista', y: 56 },
        { color: '#607D8B', text: '4. Controlador → Vista', y: 70 }
    ];

    legendItems.forEach(item => {
        legend.append('circle')
            .attr('cx', 8)
            .attr('cy', item.y - 3)
            .attr('r', 4)
            .attr('fill', item.color);

        legend.append('text')
            .attr('x', 18)
            .attr('y', item.y)
            .attr('font-size', '9px')
            .attr('fill', '#666')
            .text(item.text);
    });

    // Mouse icon
    legend.append('text')
        .attr('x', 5)
        .attr('y', 88)
        .attr('font-family', 'Font Awesome 6 Free')
        .attr('font-size', '8px')
        .attr('fill', '#999')
        .text('\uf245'); // mouse-pointer icon

    legend.append('text')
        .attr('x', 15)
        .attr('y', 88)
        .attr('font-size', '8px')
        .attr('fill', '#999')
        .text('Clic en componentes para detalles');

    // Functions
    function showComponentTooltip(event, component) {
        const tooltipContent = `
            <div style="border-bottom: 1px solid rgba(255,255,255,0.3); margin-bottom: 8px; padding-bottom: 5px;">
                <strong style="font-size: 14px;">${component.label}</strong>
            </div>
            <div style="margin-bottom: 8px;">${component.description}</div>
            <div style="font-size: 10px; color: #ccc;">
                <i class="fas fa-lightbulb"></i> Haz clic para ver responsabilidades y ejemplos
            </div>
        `;
        
        tooltip
            .style('visibility', 'visible')
            .html(tooltipContent);
    }

    function showComponentDetails(component) {
        let detailsHtml = `
            <div style="border-bottom: 2px solid ${component.color}; margin-bottom: 10px; padding-bottom: 5px;">
                <strong style="color: ${component.color}; font-size: 14px;">${component.label}</strong>
            </div>
            <div style="margin-bottom: 8px; font-style: italic; color: #666;">
                ${component.description}
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
            <div style="margin-bottom: 8px;">
                <strong style="color: #333;">Ejemplos:</strong><br/>
                <div style="display: flex; flex-wrap: wrap; gap: 3px; margin-top: 4px;">
        `;
        
        component.examples.forEach(example => {
            detailsHtml += `<span style="background: ${component.color}20; color: ${component.color}; padding: 1px 4px; border-radius: 8px; font-size: 9px;">${example}</span>`;
        });
        
        detailsHtml += `
                </div>
            </div>
            <div style="font-size: 10px; color: #999; margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee;">
                <i class="fas fa-lightbulb"></i> Componente del patrón MVC clásico
            </div>
        `;
        
        infoPanel
            .html(detailsHtml)
            .style('display', 'block');
    }

    function highlightMVCComponent(componentId) {
        // Reset all components
        componentGroups.selectAll('rect')
            .transition()
            .duration(300)
            .attr('stroke-width', 3);

        // Reset all arrows
        arrowGroup.selectAll('path')
            .transition()
            .duration(300)
            .style('opacity', 0.4)
            .attr('stroke-width', 3);

        arrowGroup.selectAll('text')
            .transition()
            .duration(300)
            .style('opacity', 0.7);

        // Highlight selected component
        componentGroups
            .filter(d => d.id === componentId)
            .select('rect')
            .transition()
            .duration(300)
            .attr('stroke-width', 5);

        // Highlight related interactions
        mvcInteractions.forEach(interaction => {
            if (interaction.from === componentId || interaction.to === componentId) {
                arrowGroup.selectAll(`.interaction-${interaction.from}-${interaction.to}`)
                    .transition()
                    .duration(300)
                    .style('opacity', 1)
                    .attr('stroke-width', 4);

                arrowGroup.selectAll(`.interaction-label-${interaction.from}-${interaction.to}`)
                    .transition()
                    .duration(300)
                    .style('opacity', 1);
            }
        });
    }

    // Auto-show welcome message
    setTimeout(() => {
        infoPanel
            .html(`
                <div style="border-bottom: 2px solid #4caf50; margin-bottom: 10px; padding-bottom: 5px;">
                    <i class="fas fa-sitemap" style="color: #4caf50; margin-right: 5px;"></i>
                    <strong style="color: #4caf50; font-size: 14px;">Patrón MVC</strong>
                </div>
                <div style="margin-bottom: 8px;">
                    Arquitectura de separación de responsabilidades en 3 componentes principales
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Flujo típico:</strong>
                    <ol style="margin: 5px 0; padding-left: 15px; font-size: 11px;">
                        <li>Usuario interactúa con la Vista</li>
                        <li>Vista notifica al Controlador</li>
                        <li>Controlador actualiza el Modelo</li>
                        <li>Modelo notifica cambios a la Vista</li>
                    </ol>
                </div>
                <div style="font-size: 10px; color: #666; margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee;">
                    <i class="fas fa-lightbulb"></i> Haz clic en cualquier componente para explorar sus responsabilidades
                </div>
            `)
            .style('display', 'block');
    }, 1000);
}