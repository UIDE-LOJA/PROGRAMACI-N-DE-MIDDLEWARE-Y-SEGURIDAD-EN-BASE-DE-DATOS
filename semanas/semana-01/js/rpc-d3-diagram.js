// RPC D3.js Interactive Sequence Diagram - API Call Flow
document.addEventListener('DOMContentLoaded', function() {
    createRPCSequenceDiagram();
});

function createRPCSequenceDiagram() {
    const container = d3.select('#rpc-d3-diagram');
    if (container.empty()) return;

    // Clear any existing content
    container.selectAll('*').remove();

    const width = 700;
    const height = 500;
    let isAnimating = false;
    let currentStep = 0;
    let simulationInterval = null;
    let isPaused = false;
    let callCounter = 1;
    
    // RPC sequence scenarios with detailed call flow
    const rpcScenarios = [
        {
            type: 'getUserProfile(userId)',
            description: 'Obtener perfil completo de usuario',
            sequence: [
                { actor: 'Cliente', action: 'getUserProfile(123)', target: 'API Gateway', method: 'HTTP POST', time: '0ms' },
                { actor: 'API Gateway', action: 'validateToken()', target: 'Auth Service', method: 'gRPC', time: '5ms' },
                { actor: 'Auth Service', action: 'return: valid', target: 'API Gateway', method: 'gRPC Response', time: '15ms' },
                { actor: 'API Gateway', action: 'getUser(123)', target: 'User Service', method: 'gRPC', time: '20ms' },
                { actor: 'User Service', action: 'SELECT * FROM users', target: 'Database', method: 'SQL', time: '25ms' },
                { actor: 'Database', action: 'return: user_data', target: 'User Service', method: 'SQL Response', time: '35ms' },
                { actor: 'User Service', action: 'return: UserProfile', target: 'API Gateway', method: 'gRPC Response', time: '40ms' },
                { actor: 'API Gateway', action: 'return: JSON', target: 'Cliente', method: 'HTTP Response', time: '45ms' }
            ]
        },
        {
            type: 'processPayment(amount, cardId)',
            description: 'Procesar pago con validaciones',
            sequence: [
                { actor: 'Cliente', action: 'processPayment(100, card_123)', target: 'API Gateway', method: 'HTTP POST', time: '0ms' },
                { actor: 'API Gateway', action: 'validateSession()', target: 'Auth Service', method: 'gRPC', time: '5ms' },
                { actor: 'Auth Service', action: 'return: session_valid', target: 'API Gateway', method: 'gRPC Response', time: '12ms' },
                { actor: 'API Gateway', action: 'validateCard(card_123)', target: 'Payment Service', method: 'gRPC', time: '18ms' },
                { actor: 'Payment Service', action: 'checkFraud(card_123)', target: 'Fraud Service', method: 'gRPC', time: '25ms' },
                { actor: 'Fraud Service', action: 'return: safe', target: 'Payment Service', method: 'gRPC Response', time: '45ms' },
                { actor: 'Payment Service', action: 'chargeCard(100)', target: 'Bank API', method: 'HTTPS', time: '50ms' },
                { actor: 'Bank API', action: 'return: success', target: 'Payment Service', method: 'HTTPS Response', time: '150ms' },
                { actor: 'Payment Service', action: 'return: payment_id', target: 'API Gateway', method: 'gRPC Response', time: '155ms' },
                { actor: 'API Gateway', action: 'return: success', target: 'Cliente', method: 'HTTP Response', time: '160ms' }
            ]
        },
        {
            type: 'searchProducts(query, filters)',
            description: 'Búsqueda de productos con filtros',
            sequence: [
                { actor: 'Cliente', action: 'searchProducts("laptop", filters)', target: 'API Gateway', method: 'HTTP GET', time: '0ms' },
                { actor: 'API Gateway', action: 'rateLimit(clientId)', target: 'Rate Limiter', method: 'Redis', time: '2ms' },
                { actor: 'Rate Limiter', action: 'return: allowed', target: 'API Gateway', method: 'Redis Response', time: '5ms' },
                { actor: 'API Gateway', action: 'search("laptop")', target: 'Search Service', method: 'gRPC', time: '8ms' },
                { actor: 'Search Service', action: 'query(index)', target: 'Elasticsearch', method: 'HTTP', time: '12ms' },
                { actor: 'Elasticsearch', action: 'return: product_ids', target: 'Search Service', method: 'HTTP Response', time: '25ms' },
                { actor: 'Search Service', action: 'getProducts(ids)', target: 'Product Service', method: 'gRPC', time: '30ms' },
                { actor: 'Product Service', action: 'return: products[]', target: 'Search Service', method: 'gRPC Response', time: '45ms' },
                { actor: 'Search Service', action: 'return: results', target: 'API Gateway', method: 'gRPC Response', time: '50ms' },
                { actor: 'API Gateway', action: 'return: JSON', target: 'Cliente', method: 'HTTP Response', time: '55ms' }
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
        .text('🛒 Nueva Llamada RPC')
        .style('margin-right', '5px')
        .style('padding', '4px 8px')
        .style('border', 'none')
        .style('border-radius', '3px')
        .style('background', '#4CAF50')
        .style('color', 'white')
        .style('cursor', 'pointer')
        .on('click', startRPCSimulation);

    controlPanel.append('button')
        .text('⏸️ Pausar')
        .attr('id', 'rpc-pause-btn')
        .style('margin-right', '5px')
        .style('padding', '4px 8px')
        .style('border', 'none')
        .style('border-radius', '3px')
        .style('background', '#ff9800')
        .style('color', 'white')
        .style('cursor', 'pointer')
        .on('click', toggleRPCSimulation);

    controlPanel.append('button')
        .text('🎯 Reset')
        .style('padding', '4px 8px')
        .style('border', 'none')
        .style('border-radius', '3px')
        .style('background', '#f44336')
        .style('color', 'white')
        .style('cursor', 'pointer')
        .on('click', resetRPCDiagram);

    const svg = mainContainer
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('max-width', '100%')
        .style('height', 'auto')
        .style('border', '1px solid #ddd')
        .style('border-radius', '8px');

    // Define actors in the sequence diagram (vertical lanes)
    const actors = [
        { 
            id: 'cliente', 
            x: 80, 
            label: 'Cliente',
            color: '#2196F3',
            description: 'Aplicación cliente que inicia llamadas RPC'
        },
        { 
            id: 'gateway', 
            x: 180, 
            label: 'API Gateway',
            color: '#FF5722',
            description: 'Punto de entrada y enrutamiento'
        },
        { 
            id: 'auth', 
            x: 280, 
            label: 'Auth Service',
            color: '#4CAF50',
            description: 'Autenticación y autorización'
        },
        { 
            id: 'service', 
            x: 380, 
            label: 'Business Service',
            color: '#9C27B0',
            description: 'Lógica de negocio específica'
        },
        { 
            id: 'database', 
            x: 480, 
            label: 'Database',
            color: '#FF9800',
            description: 'Almacenamiento de datos'
        },
        { 
            id: 'external', 
            x: 580, 
            label: 'External API',
            color: '#607D8B',
            description: 'Servicios externos (opcional)'
        }
    ];

    // Timeline configuration
    const timelineStart = 120;
    const timelineHeight = 320;
    const stepHeight = 35;

    // Define RPC connections
    const connections = [
        { from: 'cliente', to: 'auth-service', label: 'authenticate()' },
        { from: 'cliente', to: 'product-service', label: 'searchProducts()' },
        { from: 'cliente', to: 'payment-service', label: 'processPayment()' },
        { from: 'auth-service', to: 'product-service', label: 'validateUser()' },
        { from: 'payment-service', to: 'notification-service', label: 'sendReceipt()' },
        { from: 'product-service', to: 'notification-service', label: 'notifyStock()' }
    ];

    // Create enhanced tooltip
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'rpc-tooltip')
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
        .attr('id', 'rpc-info-panel')
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
        .attr('y', 15)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text('RPC - Diagrama de Secuencia Interactivo');

    // Draw actor columns (vertical lifelines)
    const actorGroup = svg.append('g').attr('class', 'actors');
    
    actors.forEach(actor => {
        // Actor header box
        const actorBox = actorGroup.append('g')
            .attr('class', `actor-${actor.id}`)
            .style('cursor', 'pointer');
        
        actorBox.append('rect')
            .attr('x', actor.x - 40)
            .attr('y', 40)
            .attr('width', 80)
            .attr('height', 50)
            .attr('fill', actor.color)
            .attr('stroke', '#333')
            .attr('stroke-width', 2)
            .attr('rx', 8)
            .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))')
            .on('mouseover', function(event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('stroke-width', 3)
                    .style('filter', 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))');
                
                tooltip
                    .style('visibility', 'visible')
                    .html(`<strong>${actor.label}</strong><br/>${actor.description}`);
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
                    .attr('stroke-width', 2)
                    .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))');
                
                tooltip.style('visibility', 'hidden');
            });
        
        // Actor label
        actorBox.append('text')
            .attr('x', actor.x)
            .attr('y', 70)
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .attr('font-weight', 'bold')
            .attr('fill', 'white')
            .text(actor.label)
            .style('pointer-events', 'none');
        
        // Lifeline (vertical dashed line)
        actorGroup.append('line')
            .attr('class', `lifeline-${actor.id}`)
            .attr('x1', actor.x)
            .attr('y1', 90)
            .attr('x2', actor.x)
            .attr('y2', timelineStart + timelineHeight)
            .attr('stroke', '#ccc')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '5,5')
            .style('opacity', 0.7);
    });

    // Add control legend
    const legend = svg.append('g')
        .attr('class', 'rpc-legend')
        .attr('transform', 'translate(10, 100)');

    legend.append('rect')
        .attr('x', -5)
        .attr('y', -5)
        .attr('width', 180)
        .attr('height', 70)
        .attr('fill', 'rgba(255, 255, 255, 0.95)')
        .attr('stroke', '#ddd')
        .attr('stroke-width', 1)
        .attr('rx', 5)
        .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))');

    legend.append('text')
        .attr('x', 5)
        .attr('y', 10)
        .attr('font-size', '11px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text('💡 Secuencia RPC Automática');

    const legendItems = [
        '🔄 Flujo paso a paso',
        '⏱️ Tiempos de respuesta reales',
        '🖱️ Hover: Ver detalles',
        '⌨️ T=Nueva, Espacio=Pausar'
    ];

    legendItems.forEach((item, i) => {
        legend.append('text')
            .attr('x', 5)
            .attr('y', 25 + i * 12)
            .attr('font-size', '9px')
            .attr('fill', '#666')
            .text(item);
    });

    // Status indicator inside SVG
    const statusIndicator = svg.append('g')
        .attr('class', 'rpc-status-indicator')
        .attr('transform', `translate(${width / 2}, ${height - 20})`);

    // Status background
    const statusBg = statusIndicator.append('rect')
        .attr('x', -90)
        .attr('y', -12)
        .attr('width', 180)
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
        .text('🟢 Microservicios Listos');

    // Update status indicator functions
    function updateRPCStatusIndicator(text, color = '#4CAF50') {
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

    // Create sequence arrows group
    const sequenceGroup = svg.append('g').attr('class', 'sequence-arrows');
    
    // Define arrow marker
    svg.append('defs')
        .append('marker')
        .attr('id', 'rpc-arrowhead')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 8)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#2196F3');

    // Create timeline area
    const timelineGroup = svg.append('g').attr('class', 'timeline');

    // Function to draw sequence step
    function drawSequenceStep(step, stepIndex, totalSteps) {
        const y = timelineStart + (stepIndex * stepHeight);
        const fromActor = actors.find(a => a.id === getActorId(step.actor));
        const toActor = actors.find(a => a.id === getActorId(step.target));
        
        if (!fromActor || !toActor) return;
        
        const isRequest = !step.method.includes('Response');
        const arrowColor = isRequest ? '#2196F3' : '#4CAF50';
        const strokeWidth = isRequest ? 3 : 2;
        
        // Draw arrow
        const arrow = sequenceGroup.append('line')
            .attr('class', `step-${stepIndex}`)
            .attr('x1', fromActor.x)
            .attr('y1', y)
            .attr('x2', toActor.x)
            .attr('y2', y)
            .attr('stroke', arrowColor)
            .attr('stroke-width', strokeWidth)
            .attr('marker-end', 'url(#rpc-arrowhead)')
            .style('opacity', 0);
        
        // Add method label
        const midX = (fromActor.x + toActor.x) / 2;
        const labelOffset = fromActor.x < toActor.x ? -8 : 8;
        
        const label = sequenceGroup.append('text')
            .attr('class', `step-label-${stepIndex}`)
            .attr('x', midX)
            .attr('y', y + labelOffset)
            .attr('text-anchor', 'middle')
            .attr('font-size', '9px')
            .attr('font-weight', 'bold')
            .attr('fill', arrowColor)
            .text(step.action)
            .style('opacity', 0);
        
        // Add method type badge
        const badge = sequenceGroup.append('rect')
            .attr('class', `step-badge-${stepIndex}`)
            .attr('x', midX - 20)
            .attr('y', y + labelOffset + 8)
            .attr('width', 40)
            .attr('height', 12)
            .attr('fill', arrowColor)
            .attr('rx', 6)
            .style('opacity', 0);
        
        const badgeText = sequenceGroup.append('text')
            .attr('class', `step-badge-text-${stepIndex}`)
            .attr('x', midX)
            .attr('y', y + labelOffset + 17)
            .attr('text-anchor', 'middle')
            .attr('font-size', '8px')
            .attr('fill', 'white')
            .text(step.method)
            .style('opacity', 0);
        
        // Add timing info
        const timing = sequenceGroup.append('text')
            .attr('class', `step-timing-${stepIndex}`)
            .attr('x', toActor.x + 15)
            .attr('y', y + 3)
            .attr('font-size', '8px')
            .attr('fill', '#666')
            .text(step.time)
            .style('opacity', 0);
        
        return { arrow, label, badge, badgeText, timing };
    }
    
    function getActorId(actorName) {
        const mapping = {
            'Cliente': 'cliente',
            'API Gateway': 'gateway',
            'Auth Service': 'auth',
            'User Service': 'service',
            'Payment Service': 'service',
            'Search Service': 'service',
            'Product Service': 'service',
            'Fraud Service': 'service',
            'Rate Limiter': 'service',
            'Database': 'database',
            'Bank API': 'external',
            'Elasticsearch': 'database',
            'SQL': 'database'
        };
        return mapping[actorName] || 'service';
    }

    function startRPCSimulation() {
        if (simulationInterval) {
            clearInterval(simulationInterval);
        }
        
        callCounter = 1;
        isPaused = false;
        currentStep = 0;
        d3.select('#rpc-pause-btn').text('⏸️ Pausar');
        
        // Clear previous sequence
        sequenceGroup.selectAll('*').remove();
        
        // Iniciar inmediatamente la primera secuencia RPC
        executeRPCSequence();
        
        // Programar secuencias automáticas cada 8 segundos
        simulationInterval = setInterval(() => {
            if (!isPaused && !isAnimating) {
                executeRPCSequence();
            }
        }, 8000);
    }

    function executeRPCSequence() {
        if (isAnimating || isPaused) return;
        
        isAnimating = true;
        currentStep = 0;
        
        const scenario = rpcScenarios[(callCounter - 1) % rpcScenarios.length];
        
        updateRPCStatusIndicator(`🔄 Ejecutando: ${scenario.type}`, '#2196F3');
        
        // Clear previous sequence
        sequenceGroup.selectAll('*').remove();
        
        // Pre-draw all steps (invisible)
        scenario.sequence.forEach((step, index) => {
            drawSequenceStep(step, index, scenario.sequence.length);
        });
        
        // Animate steps one by one
        function animateNextStep() {
            if (currentStep >= scenario.sequence.length) {
                // Sequence complete
                setTimeout(() => {
                    isAnimating = false;
                    updateRPCStatusIndicator(`✅ ${scenario.type} Completada`, '#4CAF50');
                    
                    callCounter++;
                    
                    setTimeout(() => {
                        if (!isPaused) {
                            updateRPCStatusIndicator('🟢 Sistema Listo - Próxima secuencia automática', '#4CAF50');
                        }
                    }, 2000);
                }, 1000);
                return;
            }
            
            const step = scenario.sequence[currentStep];
            
            // Animate current step elements
            sequenceGroup.selectAll(`.step-${currentStep}`)
                .transition()
                .duration(500)
                .style('opacity', 1);
            
            sequenceGroup.selectAll(`.step-label-${currentStep}`)
                .transition()
                .delay(200)
                .duration(300)
                .style('opacity', 1);
            
            sequenceGroup.selectAll(`.step-badge-${currentStep}`)
                .transition()
                .delay(300)
                .duration(300)
                .style('opacity', 0.8);
            
            sequenceGroup.selectAll(`.step-badge-text-${currentStep}`)
                .transition()
                .delay(300)
                .duration(300)
                .style('opacity', 1);
            
            sequenceGroup.selectAll(`.step-timing-${currentStep}`)
                .transition()
                .delay(400)
                .duration(300)
                .style('opacity', 0.7);
            
            // Highlight actors involved
            const fromActor = actors.find(a => a.id === getActorId(step.actor));
            const toActor = actors.find(a => a.id === getActorId(step.target));
            
            if (fromActor) {
                actorGroup.select(`.actor-${fromActor.id} rect`)
                    .transition()
                    .duration(300)
                    .attr('stroke-width', 4)
                    .attr('stroke', '#ff5722')
                    .transition()
                    .delay(600)
                    .duration(300)
                    .attr('stroke-width', 2)
                    .attr('stroke', '#333');
            }
            
            if (toActor) {
                actorGroup.select(`.actor-${toActor.id} rect`)
                    .transition()
                    .delay(300)
                    .duration(300)
                    .attr('stroke-width', 4)
                    .attr('stroke', '#ff9800')
                    .transition()
                    .delay(600)
                    .duration(300)
                    .attr('stroke-width', 2)
                    .attr('stroke', '#333');
            }
            
            // Update info panel
            updateSequenceInfo(scenario, currentStep, step);
            
            currentStep++;
            setTimeout(animateNextStep, 800);
        }
        
        animateNextStep();
    }

    function updateSequenceInfo(scenario, stepIndex, step) {
        const progress = Math.round(((stepIndex + 1) / scenario.sequence.length) * 100);
        
        infoPanel
            .html(`
                <div style="border-bottom: 2px solid #1976d2; margin-bottom: 10px; padding-bottom: 5px;">
                    <strong style="color: #1976d2; font-size: 14px;">🔄 ${scenario.type}</strong>
                </div>
                <div style="margin-bottom: 8px; font-style: italic; color: #666;">
                    ${scenario.description}
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Progreso:</strong> 
                    <div style="background: #e0e0e0; border-radius: 10px; height: 8px; margin-top: 4px;">
                        <div style="background: #4caf50; height: 8px; border-radius: 10px; width: ${progress}%; transition: width 0.3s;"></div>
                    </div>
                    <small style="color: #666;">Paso ${stepIndex + 1} de ${scenario.sequence.length}</small>
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Llamada actual:</strong><br/>
                    <code style="background: #f5f5f5; padding: 2px 4px; border-radius: 3px; font-size: 10px;">${step.action}</code>
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Protocolo:</strong> <span style="color: #2196F3;">${step.method}</span><br/>
                    <strong>Tiempo:</strong> <span style="color: #ff9800;">${step.time}</span>
                </div>
                <div style="font-size: 10px; color: #666; margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee;">
                    💡 Secuencia RPC #${callCounter} - ${step.actor} → ${step.target}
                </div>
            `)
            .style('display', 'block');
    }

    function toggleRPCSimulation() {
        isPaused = !isPaused;
        const pauseBtn = d3.select('#rpc-pause-btn');
        
        if (isPaused) {
            pauseBtn.text('▶️ Reanudar');
            updateRPCStatusIndicator('⏸️ Simulación Pausada', '#FF9800');
        } else {
            pauseBtn.text('⏸️ Pausar');
            updateRPCStatusIndicator('🟢 Microservicios Activos', '#4CAF50');
        }
    }

    function resetRPCDiagram() {
        // Detener simulación automática
        if (simulationInterval) {
            clearInterval(simulationInterval);
            simulationInterval = null;
        }
        
        isAnimating = false;
        isPaused = false;
        currentStep = 0;
        callCounter = 1;
        
        // Reset UI controls
        d3.select('#rpc-pause-btn').text('⏸️ Pausar');
        
        // Clear sequence arrows
        sequenceGroup.selectAll('*').remove();
        
        // Reset all actor styles
        actorGroup.selectAll('rect')
            .transition()
            .duration(300)
            .attr('stroke-width', 2)
            .attr('stroke', '#333');
        
        // Hide info panel
        infoPanel.style('display', 'none');
        
        // Reset status
        updateRPCStatusIndicator('🟢 Sistema RPC Listo', '#4CAF50');
    }

    // Add keyboard shortcuts
    d3.select('body').on('keydown', function(event) {
        if (event.key === 'r' || event.key === 'R') {
            resetRPCDiagram();
        } else if (event.key === 't' || event.key === 'T') {
            startRPCSimulation();
        } else if (event.key === ' ') { // Spacebar
            event.preventDefault();
            toggleRPCSimulation();
        }
    });

    // Iniciar simulación automática después de 3 segundos
    setTimeout(() => {
        // Mostrar mensaje de bienvenida
        infoPanel
            .html(`
                <div style="border-bottom: 2px solid #4caf50; margin-bottom: 10px; padding-bottom: 5px;">
                    <strong style="color: #4caf50; font-size: 14px;">🔄 Diagrama de Secuencia RPC</strong>
                </div>
                <div style="margin-bottom: 8px;">
                    Visualización paso a paso de llamadas RPC con tiempos reales
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Secuencias disponibles:</strong>
                    <ul style="margin: 5px 0; padding-left: 15px; font-size: 11px;">
                        <li>getUserProfile() - Obtener perfil de usuario</li>
                        <li>processPayment() - Procesar pago seguro</li>
                        <li>searchProducts() - Búsqueda con filtros</li>
                    </ul>
                </div>
                <div style="font-size: 10px; color: #666; margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee;">
                    💡 La simulación iniciará automáticamente mostrando el flujo completo
                </div>
            `)
            .style('display', 'block');
        
        // Iniciar simulación automática
        setTimeout(() => {
            startRPCSimulation();
        }, 2000);
    }, 1000);
}