// TP Monitor D3.js Interactive Diagram with Enhanced Features
document.addEventListener('DOMContentLoaded', function() {
    createTPMonitorDiagram();
});

function createTPMonitorDiagram() {
    const container = d3.select('#tp-monitor-d3-diagram');
    if (container.empty()) return;

    // Clear any existing content
    container.selectAll('*').remove();

    const width = 700;
    const height = 500;
    let isAnimating = false;
    let selectedNode = null;
    let simulationInterval = null;
    let isPaused = false;
    let transactionCounter = 1;
    
    // Casos de uso reales para la simulación
    const bankingScenarios = [
        {
            type: 'Transferencia Internacional',
            from: 'Cuenta USD (BD1)',
            to: 'Cuenta EUR (BD2)',
            amount: '$2,500.00',
            steps: [
                'Validando credenciales del cliente',
                'Verificando saldo disponible',
                'Aplicando tipo de cambio',
                'Iniciando protocolo 2PC',
                'Bloqueando fondos en BD1',
                'Preparando crédito en BD2',
                'Confirmando transacción',
                'Actualizando logs de auditoría'
            ]
        },
        {
            type: 'Pago de Nómina Empresarial',
            from: 'Cuenta Corporativa (BD3)',
            to: 'Múltiples Empleados (BD1, BD2)',
            amount: '$45,000.00',
            steps: [
                'Autenticando sistema de nómina',
                'Validando lista de empleados',
                'Calculando deducciones fiscales',
                'Iniciando transacción distribuida',
                'Debitando cuenta corporativa',
                'Distribuyendo pagos individuales',
                'Generando comprobantes',
                'Registrando en sistema contable'
            ]
        },
        {
            type: 'Compra con Tarjeta de Crédito',
            from: 'Comercio Online (Cliente)',
            to: 'Procesamiento Bancario',
            amount: '$89.99',
            steps: [
                'Recibiendo solicitud de pago',
                'Validando datos de tarjeta',
                'Consultando límite de crédito',
                'Aplicando medidas antifraude',
                'Autorizando transacción',
                'Reservando fondos',
                'Notificando al comercio',
                'Programando liquidación'
            ]
        }
    ];

    // Create main container with controls
    const mainContainer = container
        .append('div')
        .style('position', 'relative');

    // Add control panel
    const controlPanel = mainContainer
        .append('div')
        .style('position', 'absolute')
        .style('top', '5px')
        .style('right', '5px')
        .style('z-index', '10')
        .style('background', 'rgba(255,255,255,0.9)')
        .style('padding', '8px')
        .style('border-radius', '5px')
        .style('box-shadow', '0 2px 5px rgba(0,0,0,0.2)')
        .style('font-size', '12px');

    controlPanel.append('button')
        .text('🏦 Nueva Transferencia')
        .style('margin-right', '5px')
        .style('padding', '4px 8px')
        .style('border', 'none')
        .style('border-radius', '3px')
        .style('background', '#4CAF50')
        .style('color', 'white')
        .style('cursor', 'pointer')
        .on('click', startBankTransferSimulation);

    controlPanel.append('button')
        .text('⏸️ Pausar')
        .attr('id', 'pause-btn')
        .style('margin-right', '5px')
        .style('padding', '4px 8px')
        .style('border', 'none')
        .style('border-radius', '3px')
        .style('background', '#ff9800')
        .style('color', 'white')
        .style('cursor', 'pointer')
        .on('click', toggleSimulation);

    controlPanel.append('button')
        .text('🎯 Reset')
        .style('padding', '4px 8px')
        .style('border', 'none')
        .style('border-radius', '3px')
        .style('background', '#f44336')
        .style('color', 'white')
        .style('cursor', 'pointer')
        .on('click', resetDiagram);

    const svg = mainContainer
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('max-width', '100%')
        .style('height', 'auto')
        .style('border', '1px solid #ddd')
        .style('border-radius', '8px');

    // Define nodes data with enhanced properties - optimized for larger canvas with legends
    const nodes = [
        { 
            id: 'cliente', 
            x: 290, 
            y: 170, 
            width: 120, 
            height: 45, 
            label: 'Cliente',
            color: '#2196F3',
            description: 'Aplicación cliente que inicia transacciones',
            status: 'idle',
            details: {
                'Función': 'Iniciar transacciones distribuidas',
                'Protocolo': 'HTTP/HTTPS, gRPC',
                'Estado': 'Esperando respuesta',
                'Timeout': '30 segundos'
            }
        },
        { 
            id: 'tp-monitor', 
            x: 290, 
            y: 240, 
            width: 140, 
            height: 55, 
            label: 'TP Monitor',
            color: '#e1f5fe',
            description: 'Coordina y gestiona transacciones distribuidas',
            status: 'idle',
            details: {
                'Función': 'Coordinación de transacciones',
                'Protocolo': '2PC (Two-Phase Commit)',
                'Concurrencia': 'Hasta 1000 transacciones/seg',
                'Disponibilidad': '99.9%'
            }
        },
        { 
            id: 'gestor-transacciones', 
            x: 260, 
            y: 320, 
            width: 180, 
            height: 45, 
            label: 'Gestor de Transacciones',
            color: '#f3e5f5',
            description: 'Maneja el protocolo 2PC y garantiza ACID',
            status: 'idle',
            details: {
                'ACID': 'Atomicidad, Consistencia, Aislamiento, Durabilidad',
                'Protocolo': 'Two-Phase Commit (2PC)',
                'Rollback': 'Automático en caso de fallo',
                'Log': 'Transaccional persistente'
            }
        },
        { 
            id: 'control-concurrencia', 
            x: 80, 
            y: 280, 
            width: 140, 
            height: 40, 
            label: 'Control de Concurrencia',
            color: '#e8f5e8',
            description: 'Gestiona el acceso concurrente a recursos',
            status: 'idle',
            details: {
                'Algoritmo': 'Two-Phase Locking (2PL)',
                'Deadlock': 'Detección y resolución',
                'Locks': 'Shared y Exclusive',
                'Timeout': 'Configurable por transacción'
            }
        },
        { 
            id: 'recuperacion', 
            x: 480, 
            y: 280, 
            width: 120, 
            height: 40, 
            label: 'Recuperación',
            color: '#fff3e0',
            description: 'Maneja fallos y rollback de transacciones',
            status: 'idle',
            details: {
                'Estrategia': 'Write-Ahead Logging (WAL)',
                'Checkpoint': 'Cada 5 minutos',
                'Recovery Time': '< 30 segundos',
                'Backup': 'Incremental diario'
            }
        },
        { 
            id: 'bd1', 
            x: 120, 
            y: 420, 
            width: 100, 
            height: 40, 
            label: 'BD Cuentas',
            color: '#ffecb3',
            description: 'Base de datos de cuentas corrientes y ahorros',
            status: 'idle',
            details: {
                'Tipo': 'PostgreSQL 14',
                'Función': 'Cuentas personales y empresariales',
                'Registros': '2.5M cuentas activas',
                'Transacciones/día': '150K',
                'Disponibilidad': '99.99%'
            }
        },
        { 
            id: 'bd2', 
            x: 300, 
            y: 420, 
            width: 100, 
            height: 40, 
            label: 'BD Tarjetas',
            color: '#ffecb3',
            description: 'Base de datos de tarjetas de crédito y débito',
            status: 'idle',
            details: {
                'Tipo': 'MySQL 8.0',
                'Función': 'Tarjetas y límites de crédito',
                'Registros': '1.8M tarjetas activas',
                'Transacciones/día': '300K',
                'Disponibilidad': '99.95%'
            }
        },
        { 
            id: 'bd3', 
            x: 480, 
            y: 420, 
            width: 100, 
            height: 40, 
            label: 'BD Auditoría',
            color: '#ffecb3',
            description: 'Base de datos de logs y auditoría regulatoria',
            status: 'idle',
            details: {
                'Tipo': 'Oracle 19c',
                'Función': 'Logs de auditoría y compliance',
                'Registros': '50M transacciones/mes',
                'Retención': '7 años',
                'Disponibilidad': '99.999%'
            }
        }
    ];

    // Define connections
    const connections = [
        { from: 'cliente', to: 'tp-monitor' },
        { from: 'tp-monitor', to: 'gestor-transacciones' },
        { from: 'tp-monitor', to: 'control-concurrencia' },
        { from: 'tp-monitor', to: 'recuperacion' },
        { from: 'gestor-transacciones', to: 'bd1' },
        { from: 'gestor-transacciones', to: 'bd2' },
        { from: 'gestor-transacciones', to: 'bd3' }
    ];

    // Create enhanced tooltip
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'd3-tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background', 'rgba(0, 0, 0, 0.95)')
        .style('color', 'white')
        .style('padding', '15px')
        .style('border-radius', '8px')
        .style('font-size', '12px')
        .style('max-width', '300px')
        .style('box-shadow', '0 4px 15px rgba(0,0,0,0.3)')
        .style('z-index', '1000')
        .style('border', '1px solid rgba(255,255,255,0.2)');

    // Create info panel for detailed view
    const infoPanel = mainContainer
        .append('div')
        .attr('id', 'info-panel')
        .style('position', 'absolute')
        .style('bottom', '10px')
        .style('left', '10px')
        .style('background', 'rgba(255,255,255,0.95)')
        .style('padding', '15px')
        .style('border-radius', '8px')
        .style('box-shadow', '0 4px 15px rgba(0,0,0,0.2)')
        .style('max-width', '250px')
        .style('font-size', '11px')
        .style('display', 'none')
        .style('z-index', '5');

    // Status indicator inside SVG
    const statusIndicator = svg.append('g')
        .attr('class', 'status-indicator')
        .attr('transform', `translate(${width / 2}, ${height - 20})`);

    // Status background
    const statusBg = statusIndicator.append('rect')
        .attr('x', -80)
        .attr('y', -12)
        .attr('width', 160)
        .attr('height', 20)
        .attr('fill', 'rgba(76, 175, 80, 0.9)')
        .attr('stroke', '#4CAF50')
        .attr('stroke-width', 1)
        .attr('rx', 10)
        .attr('ry', 10);

    // Status text
    const statusText = statusIndicator.append('text')
        .attr('x', 0)
        .attr('y', -2)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('font-weight', 'bold')
        .attr('fill', 'white')
        .text('🟢 Sistema Bancario Listo');

    // Update status indicator functions
    function updateStatusIndicator(text, color = '#4CAF50') {
        statusBg.attr('fill', `rgba(${hexToRgb(color)}, 0.9)`)
               .attr('stroke', color);
        statusText.text(text);
    }

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
            '76, 175, 80';
    }

    // Draw connections first (so they appear behind nodes)
    const connectionGroup = svg.append('g').attr('class', 'connections');
    
    connections.forEach(conn => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        
        if (fromNode && toNode) {
            const fromX = fromNode.x + fromNode.width / 2;
            const fromY = fromNode.y + fromNode.height / 2;
            const toX = toNode.x + toNode.width / 2;
            const toY = toNode.y + toNode.height / 2;

            // Create arrow path
            connectionGroup
                .append('line')
                .attr('x1', fromX)
                .attr('y1', fromY)
                .attr('x2', toX)
                .attr('y2', toY)
                .attr('stroke', '#666')
                .attr('stroke-width', 2)
                .attr('marker-end', 'url(#arrowhead)')
                .style('opacity', 0.7);
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

    // Create node groups
    const nodeGroups = svg.selectAll('.node-group')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node-group')
        .style('cursor', 'pointer');

    // Add rectangles for nodes
    nodeGroups
        .append('rect')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('width', d => d.width)
        .attr('height', d => d.height)
        .attr('fill', d => d.color)
        .attr('stroke', '#333')
        .attr('stroke-width', 2)
        .attr('rx', 8)
        .attr('ry', 8)
        .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))')
        .on('mouseover', function(event, d) {
            if (isAnimating) return;
            
            d3.select(this)
                .transition()
                .duration(200)
                .attr('stroke-width', 3)
                .style('filter', 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))');
            
            // Enhanced tooltip with more information
            const tooltipContent = `
                <div style="border-bottom: 1px solid rgba(255,255,255,0.3); margin-bottom: 8px; padding-bottom: 5px;">
                    <strong style="font-size: 14px;">${d.label}</strong>
                </div>
                <div style="margin-bottom: 8px;">${d.description}</div>
                <div style="font-size: 10px; color: #ccc;">
                    💡 Haz clic para ver detalles técnicos
                </div>
            `;
            
            tooltip
                .style('visibility', 'visible')
                .html(tooltipContent);
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
                .attr('stroke-width', selectedNode === d.id ? 4 : 2)
                .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))');
            
            tooltip.style('visibility', 'hidden');
        })
        .on('click', function(event, d) {
            if (isAnimating) return;
            
            selectedNode = d.id;
            highlightNodeConnections(d.id);
            showNodeDetails(d);
        })
        .on('dblclick', function(event, d) {
            if (isAnimating) return;
            simulateNodeActivity(d.id);
        });

    // Add text labels
    nodeGroups
        .append('text')
        .attr('x', d => d.x + d.width / 2)
        .attr('y', d => d.y + d.height / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', '#333')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .text(d => d.label)
        .style('pointer-events', 'none');

    // Add icons for specific nodes
    const iconMap = {
        'cliente': '\uf007', // user
        'tp-monitor': '\uf085', // cogs
        'gestor-transacciones': '\uf0ae', // tasks
        'control-concurrencia': '\uf023', // lock
        'recuperacion': '\uf0e2', // undo
        'bd1': '\uf1c0', // database
        'bd2': '\uf1c0', // database
        'bd3': '\uf1c0'  // database
    };

    nodeGroups
        .append('text')
        .attr('x', d => d.x + 10)
        .attr('y', d => d.y + 15)
        .attr('font-family', 'Font Awesome 6 Free')
        .attr('font-size', '14px')
        .attr('fill', '#666')
        .text(d => iconMap[d.id] || '')
        .style('pointer-events', 'none');

    function highlightNodeConnections(nodeId) {
        // Reset all styles
        connectionGroup.selectAll('line')
            .transition()
            .duration(300)
            .attr('stroke', '#666')
            .attr('stroke-width', 2)
            .style('opacity', 0.7);

        nodeGroups.selectAll('rect')
            .transition()
            .duration(300)
            .attr('stroke-width', 2)
            .style('opacity', 1);

        // Highlight selected node
        nodeGroups
            .filter(d => d.id === nodeId)
            .selectAll('rect')
            .transition()
            .duration(300)
            .attr('stroke-width', 4)
            .attr('stroke', '#ff5722');

        // Highlight connected lines
        connections.forEach(conn => {
            if (conn.from === nodeId || conn.to === nodeId) {
                connectionGroup.selectAll('line')
                    .filter(function() {
                        const fromNode = nodes.find(n => n.id === conn.from);
                        const toNode = nodes.find(n => n.id === conn.to);
                        const line = d3.select(this);
                        return line.attr('x1') == (fromNode.x + fromNode.width / 2) &&
                               line.attr('y1') == (fromNode.y + fromNode.height / 2) &&
                               line.attr('x2') == (toNode.x + toNode.width / 2) &&
                               line.attr('y2') == (toNode.y + toNode.height / 2);
                    })
                    .transition()
                    .duration(300)
                    .attr('stroke', '#ff5722')
                    .attr('stroke-width', 3)
                    .style('opacity', 1);

                // Highlight connected nodes
                const connectedNodeId = conn.from === nodeId ? conn.to : conn.from;
                nodeGroups
                    .filter(d => d.id === connectedNodeId)
                    .selectAll('rect')
                    .transition()
                    .duration(300)
                    .attr('stroke-width', 3)
                    .attr('stroke', '#ff9800');
            }
        });
    }

    // Add title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 15)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text('TP Monitor - Simulación Bancaria Automática');

    // Add legend inside the diagram
    const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(10, 30)');

    // Legend background
    legend.append('rect')
        .attr('x', -5)
        .attr('y', -5)
        .attr('width', 200)
        .attr('height', 85)
        .attr('fill', 'rgba(255, 255, 255, 0.95)')
        .attr('stroke', '#ddd')
        .attr('stroke-width', 1)
        .attr('rx', 5)
        .attr('ry', 5)
        .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))');

    // Legend title
    legend.append('text')
        .attr('x', 5)
        .attr('y', 10)
        .attr('font-size', '11px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text('💡 Controles Interactivos');

    // Legend items
    const legendItems = [
        { icon: '🖱️', text: 'Clic: Ver detalles técnicos', y: 25 },
        { icon: '⚡', text: 'Automático: Simulación continua', y: 40 },
        { icon: '⌨️', text: 'T=Nueva, Espacio=Pausar, R=Reset', y: 55 },
        { icon: '🏦', text: 'Casos reales: Transferencias bancarias', y: 70 }
    ];

    legendItems.forEach(item => {
        legend.append('text')
            .attr('x', 5)
            .attr('y', item.y)
            .attr('font-size', '10px')
            .attr('fill', '#666')
            .text(`${item.icon} ${item.text}`);
    });

    // Add component legend on the right side
    const componentLegend = svg.append('g')
        .attr('class', 'component-legend')
        .attr('transform', `translate(${width - 160}, 30)`);

    // Component legend background
    componentLegend.append('rect')
        .attr('x', -5)
        .attr('y', -5)
        .attr('width', 155)
        .attr('height', 120)
        .attr('fill', 'rgba(255, 255, 255, 0.95)')
        .attr('stroke', '#ddd')
        .attr('stroke-width', 1)
        .attr('rx', 5)
        .attr('ry', 5)
        .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))');

    // Component legend title
    componentLegend.append('text')
        .attr('x', 5)
        .attr('y', 10)
        .attr('font-size', '11px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text('🏗️ Componentes del Sistema');

    // Component legend items
    const componentItems = [
        { color: '#2196F3', text: 'Cliente Bancario', y: 25 },
        { color: '#e1f5fe', text: 'TP Monitor', y: 40 },
        { color: '#f3e5f5', text: 'Gestor Transacciones', y: 55 },
        { color: '#e8f5e8', text: 'Control Concurrencia', y: 70 },
        { color: '#fff3e0', text: 'Sistema Recuperación', y: 85 },
        { color: '#ffecb3', text: 'Bases de Datos', y: 100 }
    ];

    componentItems.forEach(item => {
        // Color square
        componentLegend.append('rect')
            .attr('x', 5)
            .attr('y', item.y - 8)
            .attr('width', 12)
            .attr('height', 8)
            .attr('fill', item.color)
            .attr('stroke', '#666')
            .attr('stroke-width', 0.5)
            .attr('rx', 2);

        // Text
        componentLegend.append('text')
            .attr('x', 22)
            .attr('y', item.y - 1)
            .attr('font-size', '9px')
            .attr('fill', '#666')
            .text(item.text);
    });

    // Enhanced functions
    function showNodeDetails(node) {
        const details = node.details;
        let detailsHtml = `
            <div style="border-bottom: 2px solid #4CAF50; margin-bottom: 10px; padding-bottom: 5px;">
                <strong style="color: #4CAF50; font-size: 14px;">${node.label}</strong>
            </div>
            <div style="margin-bottom: 8px; font-style: italic; color: #666;">
                ${node.description}
            </div>
        `;
        
        for (const [key, value] of Object.entries(details)) {
            detailsHtml += `
                <div style="margin-bottom: 5px;">
                    <strong style="color: #333;">${key}:</strong> 
                    <span style="color: #666;">${value}</span>
                </div>
            `;
        }
        
        detailsHtml += `
            <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee; font-size: 10px; color: #999;">
                💡 Doble clic para simular actividad
            </div>
        `;
        
        infoPanel
            .html(detailsHtml)
            .style('display', 'block');
    }

    function simulateNodeActivity(nodeId) {
        if (isAnimating) return;
        
        isAnimating = true;
        statusIndicator.text('🔄 Procesando...')
            .style('background', 'rgba(255, 152, 0, 0.9)');
        
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return;
        
        // Animate the selected node
        const nodeRect = nodeGroups
            .filter(d => d.id === nodeId)
            .select('rect');
            
        nodeRect
            .transition()
            .duration(300)
            .attr('fill', '#ff5722')
            .transition()
            .duration(300)
            .attr('fill', '#4CAF50')
            .transition()
            .duration(300)
            .attr('fill', node.color)
            .on('end', () => {
                isAnimating = false;
                statusIndicator.text('🟢 Sistema Activo')
                    .style('background', 'rgba(76, 175, 80, 0.9)');
            });
        
        // Show activity message
        tooltip
            .style('visibility', 'visible')
            .style('top', '50px')
            .style('left', '50%')
            .style('transform', 'translateX(-50%)')
            .html(`<strong>⚡ Actividad en ${node.label}</strong><br/>Procesando operación...`)
            .transition()
            .delay(1000)
            .style('visibility', 'hidden');
    }

    function startBankTransferSimulation() {
        if (simulationInterval) {
            clearInterval(simulationInterval);
        }
        
        transactionCounter = 1;
        isPaused = false;
        d3.select('#pause-btn').text('⏸️ Pausar');
        
        // Iniciar inmediatamente la primera transacción
        executeBankTransaction();
        
        // Programar transacciones automáticas cada 8 segundos
        simulationInterval = setInterval(() => {
            if (!isPaused && !isAnimating) {
                executeBankTransaction();
            }
        }, 8000);
    }

    function executeBankTransaction() {
        if (isAnimating || isPaused) return;
        
        isAnimating = true;
        const scenario = bankingScenarios[(transactionCounter - 1) % bankingScenarios.length];
        
        updateStatusIndicator(`🏦 Procesando Transacción #${transactionCounter}`, '#2196F3');
        
        const transactionPath = ['cliente', 'tp-monitor', 'gestor-transacciones', 'control-concurrencia', 'bd1', 'bd2', 'bd3', 'recuperacion'];
        let step = 0;
        let currentStepDescription = '';
        
        function animateStep() {
            if (step >= transactionPath.length) {
                // Transaction complete
                setTimeout(() => {
                    isAnimating = false;
                    updateStatusIndicator(`✅ Transacción #${transactionCounter} Completada`, '#4CAF50');
                    
                    transactionCounter++;
                    
                    setTimeout(() => {
                        if (!isPaused) {
                            updateStatusIndicator('🟢 Sistema Listo - Próxima transacción automática', '#4CAF50');
                        }
                    }, 2000);
                }, 1000);
                return;
            }
            
            const nodeId = transactionPath[step];
            const nodeRect = nodeGroups
                .filter(d => d.id === nodeId)
                .select('rect');
            
            // Actualizar descripción del paso actual
            if (step < scenario.steps.length) {
                currentStepDescription = scenario.steps[step];
            }
            
            // Highlight current node with banking colors
            nodeRect
                .transition()
                .duration(300)
                .attr('fill', '#ff6b35') // Naranja bancario
                .attr('stroke-width', 4)
                .attr('stroke', '#d84315')
                .transition()
                .duration(500)
                .attr('fill', '#2e7d32') // Verde bancario
                .attr('stroke', '#1b5e20')
                .transition()
                .duration(300)
                .attr('fill', d => d.color)
                .attr('stroke-width', 2)
                .attr('stroke', '#333')
                .on('end', () => {
                    step++;
                    setTimeout(animateStep, 600);
                });
            
            // Actualizar panel de información en tiempo real
            updateTransactionInfo(scenario, step, currentStepDescription);
        }
        
        animateStep();
    }

    function updateTransactionInfo(scenario, currentStep, stepDescription) {
        const progress = Math.round((currentStep / scenario.steps.length) * 100);
        
        infoPanel
            .html(`
                <div style="border-bottom: 2px solid #1976d2; margin-bottom: 10px; padding-bottom: 5px;">
                    <strong style="color: #1976d2; font-size: 14px;">🏦 ${scenario.type}</strong>
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Monto:</strong> <span style="color: #2e7d32; font-weight: bold;">${scenario.amount}</span>
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Origen:</strong> ${scenario.from}
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Destino:</strong> ${scenario.to}
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Progreso:</strong> 
                    <div style="background: #e0e0e0; border-radius: 10px; height: 8px; margin-top: 4px;">
                        <div style="background: #4caf50; height: 8px; border-radius: 10px; width: ${progress}%; transition: width 0.3s;"></div>
                    </div>
                    <small style="color: #666;">${progress}% completado</small>
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Paso actual:</strong><br/>
                    <em style="color: #ff6b35;">${stepDescription}</em>
                </div>
                <div style="font-size: 10px; color: #666; margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee;">
                    💡 Transacción #${transactionCounter} - Protocolo 2PC en acción
                </div>
            `)
            .style('display', 'block');
    }

    function toggleSimulation() {
        isPaused = !isPaused;
        const pauseBtn = d3.select('#pause-btn');
        
        if (isPaused) {
            pauseBtn.text('▶️ Reanudar');
            updateStatusIndicator('⏸️ Simulación Pausada', '#FF9800');
        } else {
            pauseBtn.text('⏸️ Pausar');
            updateStatusIndicator('🟢 Sistema Activo', '#4CAF50');
        }
    }

    function resetDiagram() {
        // Detener simulación automática
        if (simulationInterval) {
            clearInterval(simulationInterval);
            simulationInterval = null;
        }
        
        isAnimating = false;
        isPaused = false;
        selectedNode = null;
        transactionCounter = 1;
        
        // Reset UI controls
        d3.select('#pause-btn').text('⏸️ Pausar');
        
        // Reset all node styles
        nodeGroups.selectAll('rect')
            .transition()
            .duration(300)
            .attr('stroke-width', 2)
            .attr('stroke', '#333')
            .style('opacity', 1);
        
        // Reset all connections
        connectionGroup.selectAll('line')
            .transition()
            .duration(300)
            .attr('stroke', '#666')
            .attr('stroke-width', 2)
            .style('opacity', 0.7);
        
        // Hide info panel
        infoPanel.style('display', 'none');
        
        // Reset status
        updateStatusIndicator('🟢 Sistema Bancario Listo', '#4CAF50');
    }

    // Add keyboard shortcuts
    d3.select('body').on('keydown', function(event) {
        if (event.key === 'r' || event.key === 'R') {
            resetDiagram();
        } else if (event.key === 't' || event.key === 'T') {
            startBankTransferSimulation();
        } else if (event.key === ' ') { // Spacebar
            event.preventDefault();
            toggleSimulation();
        }
    });

    // Iniciar simulación automática después de 3 segundos
    setTimeout(() => {
        // Mostrar mensaje de bienvenida
        infoPanel
            .html(`
                <div style="border-bottom: 2px solid #4caf50; margin-bottom: 10px; padding-bottom: 5px;">
                    <strong style="color: #4caf50; font-size: 14px;">🏦 Sistema Bancario TP Monitor</strong>
                </div>
                <div style="margin-bottom: 8px;">
                    Simulación automática de transacciones bancarias en tiempo real
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Casos de uso:</strong>
                    <ul style="margin: 5px 0; padding-left: 15px; font-size: 11px;">
                        <li>Transferencias internacionales</li>
                        <li>Pagos de nómina empresarial</li>
                        <li>Compras con tarjeta de crédito</li>
                    </ul>
                </div>
                <div style="font-size: 10px; color: #666; margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee;">
                    💡 La simulación iniciará automáticamente en unos segundos
                </div>
            `)
            .style('display', 'block');
        
        // Iniciar simulación automática
        setTimeout(() => {
            startBankTransferSimulation();
        }, 2000);
    }, 1000);
}