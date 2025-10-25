// Middleware Layers D3.js Static Diagram - 4 Layer Architecture
document.addEventListener('DOMContentLoaded', function() {
    createMiddlewareLayersDiagram();
});

function createMiddlewareLayersDiagram() {
    const container = d3.select('#middleware-layers-d3-diagram');
    if (container.empty()) return;

    // Clear any existing content
    container.selectAll('*').remove();

    const width = 700;
    const height = 600;
    const layerHeight = 120;
    const layerSpacing = 20;
    const startY = 50;

    const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('max-width', '100%')
        .style('height', 'auto');

    // Define the 4 layers with their components
    const layers = [
        {
            id: 'automation',
            title: 'CAPA 4: AUTOMATIZACIÓN Y GESTIÓN',
            color: '#e8eaf6',
            borderColor: '#3f51b5',
            y: startY,
            components: [
                { id: 'ai', icon: '\uf5dc', label: 'Inteligencia Artificial', description: 'ML/AI para decisiones automáticas' },
                { id: 'process', icon: '\uf544', label: 'Automatización de Procesos', description: 'RPA y workflows automáticos' },
                { id: 'analytics', icon: '\uf080', label: 'Análisis Predictivo', description: 'Predicciones basadas en datos' },
                { id: 'decisions', icon: '\uf085', label: 'Gestión de Decisiones', description: 'Motores de reglas de negocio' }
            ]
        },
        {
            id: 'integration',
            title: 'CAPA 3: INTEGRACIÓN',
            color: '#f3e5f5',
            borderColor: '#9c27b0',
            y: startY + layerHeight + layerSpacing,
            components: [
                { id: 'apis', icon: '\uf0c1', label: 'APIs de Integración', description: 'REST, GraphQL, gRPC' },
                { id: 'transform', icon: '\uf362', label: 'Transformación de Datos', description: 'ETL y mapeo de datos' },
                { id: 'saas', icon: '\uf0c2', label: 'Recursos SaaS', description: 'Conectores cloud nativos' },
                { id: 'messaging', icon: '\uf0e0', label: 'Mensajería Empresarial', description: 'ESB y message brokers' }
            ]
        },
        {
            id: 'runtime',
            title: 'CAPA 2: TIEMPOS DE EJECUCIÓN',
            color: '#e0f2f1',
            borderColor: '#4caf50',
            y: startY + 2 * (layerHeight + layerSpacing),
            components: [
                { id: 'microservices', icon: '\uf0e7', label: 'Microservicios Ligeros', description: 'Contenedores y orquestación' },
                { id: 'cache', icon: '\uf538', label: 'Caché en Memoria', description: 'Redis, Hazelcast, Memcached' },
                { id: 'acceleration', icon: '\uf3fd', label: 'Aceleración de Datos', description: 'Streaming y procesamiento' },
                { id: 'resources', icon: '\uf233', label: 'Gestión de Recursos', description: 'CPU, memoria, almacenamiento' }
            ]
        },
        {
            id: 'containers',
            title: 'CAPA 1: CONTENEDORES',
            color: '#fff3e0',
            borderColor: '#ff9800',
            y: startY + 3 * (layerHeight + layerSpacing),
            components: [
                { id: 'docker', icon: '\uf395', label: 'Gestión de Contenedores', description: 'Docker, Podman, containerd' },
                { id: 'cicd', icon: '\uf201', label: 'CI/CD Pipeline', description: 'Jenkins, GitLab CI, GitHub Actions' },
                { id: 'mesh', icon: '\uf542', label: 'Service Mesh', description: 'Istio, Linkerd, Consul Connect' },
                { id: 'security', icon: '\uf132', label: 'Políticas de Seguridad', description: 'RBAC, network policies, secrets' }
            ]
        }
    ];

    // Create tooltip
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'middleware-layers-tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background', 'rgba(0, 0, 0, 0.9)')
        .style('color', 'white')
        .style('padding', '10px')
        .style('border-radius', '5px')
        .style('font-size', '12px')
        .style('max-width', '250px')
        .style('z-index', '1000')
        .style('box-shadow', '0 4px 15px rgba(0,0,0,0.3)');

    // Add title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text('Arquitectura de 4 Capas de Middleware Moderno');

    // Create layer groups
    const layerGroups = svg.selectAll('.layer-group')
        .data(layers)
        .enter()
        .append('g')
        .attr('class', 'layer-group');

    // Draw layer backgrounds
    layerGroups
        .append('rect')
        .attr('x', 50)
        .attr('y', d => d.y)
        .attr('width', width - 100)
        .attr('height', layerHeight)
        .attr('fill', d => d.color)
        .attr('stroke', d => d.borderColor)
        .attr('stroke-width', 2)
        .attr('rx', 10)
        .attr('ry', 10)
        .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))');

    // Add layer titles
    layerGroups
        .append('text')
        .attr('x', 70)
        .attr('y', d => d.y + 20)
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('fill', d => d.borderColor)
        .text(d => d.title);

    // Add components within each layer
    layerGroups.each(function(layerData) {
        const layerGroup = d3.select(this);
        const componentWidth = 140;
        const componentHeight = 70;
        const componentsPerRow = 4;
        const componentSpacing = 10;
        const startX = 70;
        const startY = layerData.y + 35;

        const componentGroups = layerGroup.selectAll('.component-group')
            .data(layerData.components)
            .enter()
            .append('g')
            .attr('class', 'component-group')
            .style('cursor', 'pointer');

        // Component backgrounds
        componentGroups
            .append('rect')
            .attr('x', (d, i) => startX + (i % componentsPerRow) * (componentWidth + componentSpacing))
            .attr('y', startY)
            .attr('width', componentWidth)
            .attr('height', componentHeight)
            .attr('fill', 'white')
            .attr('stroke', layerData.borderColor)
            .attr('stroke-width', 1)
            .attr('rx', 8)
            .attr('ry', 8)
            .style('filter', 'drop-shadow(1px 1px 3px rgba(0,0,0,0.1))')
            .on('mouseover', function(event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('stroke-width', 2)
                    .style('filter', 'drop-shadow(2px 2px 6px rgba(0,0,0,0.2))');
                
                tooltip
                    .style('visibility', 'visible')
                    .html(`
                        <div style="border-bottom: 1px solid rgba(255,255,255,0.3); margin-bottom: 5px; padding-bottom: 3px;">
                            <strong>${d.label}</strong>
                        </div>
                        <div style="font-size: 11px;">${d.description}</div>
                    `);
            })
            .on('mousemove', function(event) {
                tooltip
                    .style('top', (event.pageY - 10) + 'px')
                    .style('left', (event.pageX + 10) + 'px');
            })
            .on('mouseout', function(event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('stroke-width', 1)
                    .style('filter', 'drop-shadow(1px 1px 3px rgba(0,0,0,0.1))');
                
                tooltip.style('visibility', 'hidden');
            });

        // Component icons
        componentGroups
            .append('text')
            .attr('x', (d, i) => startX + (i % componentsPerRow) * (componentWidth + componentSpacing) + componentWidth/2)
            .attr('y', startY + 25)
            .attr('text-anchor', 'middle')
            .attr('font-family', 'Font Awesome 6 Free')
            .attr('font-size', '20px')
            .attr('fill', layerData.borderColor)
            .text(d => d.icon)
            .style('pointer-events', 'none');

        // Component labels
        componentGroups
            .append('text')
            .attr('x', (d, i) => startX + (i % componentsPerRow) * (componentWidth + componentSpacing) + componentWidth/2)
            .attr('y', startY + 45)
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .attr('font-weight', 'bold')
            .attr('fill', '#333')
            .text(d => d.label)
            .style('pointer-events', 'none')
            .call(wrapText, componentWidth - 10);
    });

    // Draw connections between layers
    const connectionGroup = svg.append('g').attr('class', 'connections');
    
    // Define connections between layers (from top to bottom)
    const connections = [
        { from: 0, to: 1 }, // Automation to Integration
        { from: 1, to: 2 }, // Integration to Runtime
        { from: 2, to: 3 }  // Runtime to Containers
    ];

    connections.forEach(conn => {
        const fromLayer = layers[conn.from];
        const toLayer = layers[conn.to];
        
        // Draw multiple arrows to show the flow
        for (let i = 0; i < 3; i++) {
            const x = 200 + i * 150;
            
            connectionGroup
                .append('line')
                .attr('x1', x)
                .attr('y1', fromLayer.y + layerHeight)
                .attr('x2', x)
                .attr('y2', toLayer.y)
                .attr('stroke', '#666')
                .attr('stroke-width', 2)
                .attr('marker-end', 'url(#arrowhead)')
                .style('opacity', 0.6);
        }
    });

    // Define arrow marker
    svg.append('defs')
        .append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 8)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#666');

    // Add legend
    const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(520, 50)');

    legend.append('rect')
        .attr('x', -5)
        .attr('y', -5)
        .attr('width', 160)
        .attr('height', 120)
        .attr('fill', 'rgba(255, 255, 255, 0.95)')
        .attr('stroke', '#ddd')
        .attr('stroke-width', 1)
        .attr('rx', 5)
        .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))');

    // Legend icon
    legend.append('text')
        .attr('x', 5)
        .attr('y', 10)
        .attr('font-family', 'Font Awesome 6 Free')
        .attr('font-size', '12px')
        .attr('fill', '#4CAF50')
        .text('\uf0eb'); // lightbulb icon

    legend.append('text')
        .attr('x', 20)
        .attr('y', 10)
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text('Capas de Middleware');

    const legendItems = [
        { color: '#3f51b5', text: 'Automatización y Gestión', y: 25 },
        { color: '#9c27b0', text: 'Integración', y: 40 },
        { color: '#4caf50', text: 'Tiempos de Ejecución', y: 55 },
        { color: '#ff9800', text: 'Contenedores', y: 70 }
    ];

    legendItems.forEach(item => {
        // Color square
        legend.append('rect')
            .attr('x', 5)
            .attr('y', item.y - 8)
            .attr('width', 12)
            .attr('height', 8)
            .attr('fill', item.color)
            .attr('stroke', '#666')
            .attr('stroke-width', 0.5)
            .attr('rx', 2);

        // Text
        legend.append('text')
            .attr('x', 22)
            .attr('y', item.y - 1)
            .attr('font-size', '10px')
            .attr('fill', '#666')
            .text(item.text);
    });

    // Mouse icon
    legend.append('text')
        .attr('x', 5)
        .attr('y', 90)
        .attr('font-family', 'Font Awesome 6 Free')
        .attr('font-size', '9px')
        .attr('fill', '#999')
        .text('\uf245'); // mouse-pointer icon

    legend.append('text')
        .attr('x', 15)
        .attr('y', 90)
        .attr('font-size', '9px')
        .attr('fill', '#999')
        .text('Hover para ver detalles');

    // Arrow down icon
    legend.append('text')
        .attr('x', 5)
        .attr('y', 105)
        .attr('font-family', 'Font Awesome 6 Free')
        .attr('font-size', '9px')
        .attr('fill', '#999')
        .text('\uf063'); // arrow-down icon

    legend.append('text')
        .attr('x', 15)
        .attr('y', 105)
        .attr('font-size', '9px')
        .attr('fill', '#999')
        .text('Flujo de dependencias');

    // Function to wrap text
    function wrapText(text, width) {
        text.each(function() {
            const text = d3.select(this);
            const words = text.text().split(/\s+/).reverse();
            let word;
            let line = [];
            let lineNumber = 0;
            const lineHeight = 1.1; // ems
            const y = text.attr('y');
            const dy = 0;
            let tspan = text.text(null).append('tspan').attr('x', text.attr('x')).attr('y', y).attr('dy', dy + 'em');
            
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(' '));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(' '));
                    line = [word];
                    tspan = text.append('tspan').attr('x', text.attr('x')).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
                }
            }
        });
    }
}