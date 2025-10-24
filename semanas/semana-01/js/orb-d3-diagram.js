// ORB D3.js Interactive Network Diagram - Enterprise Object Broker
document.addEventListener('DOMContentLoaded', function() {
    createORBNetworkDiagram();
});

function createORBNetworkDiagram() {
    const container = d3.select('#orb-d3-diagram');
    if (container.empty()) return;

    // Clear any existing content
    container.selectAll('*').remove();

    const width = 700;
    const height = 500;
    let isAnimating = false;
    let selectedObject = null;
    let simulationInterval = null;
    let isPaused = false;
    let invocationCounter = 1;
    
    // Enterprise object invocation scenarios
    const orbScenarios = [
        {
            type: 'Consulta de Cliente',
            description: 'CRM solicita datos de cliente al ERP',
            from: 'crm-system',
            to: 'erp-system',
            method: 'getCustomerData(customerId)',
            steps: [
                'CRM invoca getCustomerData() via ORB',
                'ORB localiza objeto ERP en red',
                'Marshalling de parámetros (customerId)',
                'Invocación remota al objeto ERP',
                'ERP consulta base de datos',
                'Unmarshalling de resultado',
                'ORB retorna datos al CRM',
                'CRM actualiza interfaz de usuario'
            ]
        },
        {
            type: 'Actualización de Inventario',
            description: 'ERP notifica cambios al sistema de inventario',
            from: 'erp-system',
            to: 'inventory-service',
            method: 'updateStock(productId, quantity)',
            steps: [
                'ERP detecta cambio en inventario',
                'Invoca updateStock() via ORB',
                'ORB resuelve ubicación del servicio',
                'Serialización de parámetros',
                'Invocación remota segura',
                'Inventario actualiza stock',
                'Confirmación de actualización',
                'ORB propaga resultado al ERP'
            ]
        },
        {
            type: 'Procesamiento de Orden',
            description: 'Flujo completo de procesamiento de orden',
            from: 'crm-system',
            to: 'billing-service',
            method: 'processOrder(orderDetails)',
            steps: [
                'CRM crea nueva orden',
                'Invoca processOrder() via ORB',
                'ORB autentica la invocación',
                'Routing a servicio de facturación',
                'Validación de datos de orden',
                'Cálculo de precios y descuentos',
                'Generación de factura',
                'Retorno de confirmación al CRM'
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
        .text('🏢 Nueva Invocación')
        .style('margin-right', '5px')
        .style('padding', '4px 8px')
        .style('border', 'none')
        .style('border-radius', '3px')
        .style('background', '#4CAF50')
        .style('color', 'white')
        .style('cursor', 'pointer')
        .on('click', startORBSimulation);

    controlPanel.append('button')
        .text('⏸️ Pausar')
        .attr('id', 'orb-pause-btn')
        .style('margin-right', '5px')
        .style('padding', '4px 8px')
        .style('border', 'none')
        .style('border-radius', '3px')
        .style('background', '#ff9800')
        .style('color', 'white')
        .style('cursor', 'pointer')
        .on('click', toggleORBSimulation);

    controlPanel.append('button')
        .text('🎯 Reset')
        .style('padding', '4px 8px')
        .style('border', 'none')
        .style('border-radius', '3px')
        .style('background', '#f44336')
        .style('color', 'white')
        .style('cursor', 'pointer')
        .on('click', resetORBDiagram);

    const svg = mainContainer
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('max-width', '100%')
        .style('height', 'auto')
        .style('border', '1px solid #ddd')
        .style('border-radius', '8px');

    // Define ORB network nodes in circular layout
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 150;

    // Central ORB
    const orbCenter = {
        id: 'orb-broker',
        x: centerX,
        y: centerY,
        radius: 60,
        label: 'ORB Broker',
        color: '#FF5722',
        description: 'Agente central de solicitud de objetos',
        type: 'broker'
    };

    // Distributed objects around the ORB
    const distributedObjects = [
        {
            id: 'crm-system',
            angle: 0,
            label: 'CRM System',
            color: '#2196F3',
            description: 'Sistema de gestión de relaciones con clientes',
            platform: 'Java EE',
            details: {
                'Plataforma': 'Java EE + Spring',
                'Objetos': '150+ interfaces CORBA',
                'Usuarios': '500 concurrentes',
                'IDL': 'CustomerService.idl'
            }
        },
        {
            id: 'erp-system',
            angle: Math.PI / 3,
            label: 'ERP System',
            color: '#4CAF50',
            description: 'Sistema de planificación de recursos empresariales',
            platform: '.NET',
            details: {
                'Plataforma': '.NET Framework + COM+',
                'Objetos': '200+ componentes COM',
                'Módulos': 'Finanzas, RRHH, Inventario',
                'IDL': 'ERPServices.idl'
            }
        },
        {
            id: 'inventory-service',
            angle: (2 * Math.PI) / 3,
            label: 'Inventory Service',
            color: '#9C27B0',
            description: 'Servicio de gestión de inventario',
            platform: 'C++',
            details: {
                'Plataforma': 'C++ CORBA',
                'Objetos': '50+ interfaces distribuidas',
                'Productos': '10K+ items',
                'IDL': 'InventoryManager.idl'
            }
        },
        {
            id: 'billing-service',
            angle: Math.PI,
            label: 'Billing Service',
            color: '#FF9800',
            description: 'Servicio de facturación y pagos',
            platform: 'Python',
            details: {
                'Plataforma': 'Python + omniORB',
                'Objetos': '30+ servicios CORBA',
                'Facturas': '1K+ diarias',
                'IDL': 'BillingService.idl'
            }
        },
        {
            id: 'reporting-service',
            angle: (4 * Math.PI) / 3,
            label: 'Reporting Service',
            color: '#607D8B',
            description: 'Servicio de reportes y análisis',
            platform: 'Java',
            details: {
                'Plataforma': 'Java + JacORB',
                'Objetos': '25+ generadores de reportes',
                'Reportes': '100+ plantillas',
                'IDL': 'ReportGenerator.idl'
            }
        },
        {
            id: 'security-service',
            angle: (5 * Math.PI) / 3,
            label: 'Security Service',
            color: '#795548',
            description: 'Servicio de seguridad y autenticación',
            platform: 'C#',
            details: {
                'Plataforma': 'C# + .NET Remoting',
                'Objetos': '15+ servicios de seguridad',
                'Usuarios': '2K+ autenticados',
                'IDL': 'SecurityManager.idl'
            }
        }
    ];

    // Calculate positions for distributed objects
    distributedObjects.forEach(obj => {
        obj.x = centerX + radius * Math.cos(obj.angle);
        obj.y = centerY + radius * Math.sin(obj.angle);
        obj.radius = 35;
        obj.type = 'object';
    });

    const allNodes = [orbCenter, ...distributedObjects];

    // Create enhanced tooltip
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'orb-tooltip')
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
        .attr('id', 'orb-info-panel')
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
        .text('ORB - Red de Objetos Distribuidos');

    // Add legend
    const legend = svg.append('g')
        .attr('class', 'orb-legend')
        .attr('transform', 'translate(10, 30)');

    legend.append('rect')
        .attr('x', -5)
        .attr('y', -5)
        .attr('width', 200)
        .attr('height', 85)
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
        .text('💡 Red ORB Empresarial');

    const legendItems = [
        '🔄 Invocaciones automáticas',
        '🌐 Objetos distribuidos',
        '🖱️ Clic: Ver detalles del objeto',
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
        .attr('class', 'orb-status-indicator')
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
        .text('🟢 ORB Broker Activo');

    // Update status indicator functions
    function updateORBStatusIndicator(text, color = '#4CAF50') {
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

    // Create connections group
    const connectionsGroup = svg.append('g').attr('class', 'orb-connections');

    // Draw connections from ORB to all objects
    distributedObjects.forEach(obj => {
        connectionsGroup.append('line')
            .attr('class', `connection-${obj.id}`)
            .attr('x1', orbCenter.x)
            .attr('y1', orbCenter.y)
            .attr('x2', obj.x)
            .attr('y2', obj.y)
            .attr('stroke', '#ccc')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '5,5')
            .style('opacity', 0.5);
    });

    // Create node groups
    const nodeGroups = svg.selectAll('.orb-node-group')
        .data(allNodes)
        .enter()
        .append('g')
        .attr('class', 'orb-node-group')
        .style('cursor', 'pointer');

    // Add circles for nodes
    nodeGroups
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.radius)
        .attr('fill', d => d.color)
        .attr('stroke', '#333')
        .attr('stroke-width', d => d.type === 'broker' ? 4 : 2)
        .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))')
        .on('mouseover', function(event, d) {
            if (isAnimating) return;
            
            d3.select(this)
                .transition()
                .duration(200)
                .attr('stroke-width', d.type === 'broker' ? 6 : 4)
                .style('filter', 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))');
            
            let tooltipContent = `
                <div style="border-bottom: 1px solid rgba(255,255,255,0.3); margin-bottom: 8px; padding-bottom: 5px;">
                    <strong style="font-size: 14px;">${d.label}</strong>
                </div>
                <div style="margin-bottom: 8px;">${d.description}</div>
            `;
            
            if (d.platform) {
                tooltipContent += `<div style="font-size: 10px; color: #ccc;">Plataforma: ${d.platform}</div>`;
            }
            
            tooltipContent += `<div style="font-size: 10px; color: #ccc;">💡 Haz clic para ver detalles</div>`;
            
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
                .attr('stroke-width', d.type === 'broker' ? 4 : (selectedObject === d.id ? 4 : 2))
                .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))');
            
            tooltip.style('visibility', 'hidden');
        })
        .on('click', function(event, d) {
            if (isAnimating) return;
            
            selectedObject = d.id;
            highlightORBObject(d.id);
            showORBObjectDetails(d);
        });

    // Add text labels
    nodeGroups
        .append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y + 5)
        .attr('text-anchor', 'middle')
        .attr('font-size', d => d.type === 'broker' ? '12px' : '10px')
        .attr('font-weight', 'bold')
        .attr('fill', 'white')
        .text(d => d.label)
        .style('pointer-events', 'none');

    // Add icons
    const iconMap = {
        'orb-broker': '\uf0e8', // sitemap
        'crm-system': '\uf0c0', // users
        'erp-system': '\uf1ad', // building
        'inventory-service': '\uf187', // archive
        'billing-service': '\uf09d', // credit-card
        'reporting-service': '\uf080', // chart-bar
        'security-service': '\uf023'  // lock
    };

    nodeGroups
        .append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y - 15)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'Font Awesome 6 Free')
        .attr('font-size', d => d.type === 'broker' ? '20px' : '16px')
        .attr('fill', 'rgba(255,255,255,0.8)')
        .text(d => iconMap[d.id] || '')
        .style('pointer-events', 'none');

    // Enhanced functions
    function showORBObjectDetails(node) {
        let detailsHtml = `
            <div style="border-bottom: 2px solid #4CAF50; margin-bottom: 10px; padding-bottom: 5px;">
                <strong style="color: #4CAF50; font-size: 14px;">${node.label}</strong>
            </div>
            <div style="margin-bottom: 8px; font-style: italic; color: #666;">
                ${node.description}
            </div>
        `;
        
        if (node.details) {
            for (const [key, value] of Object.entries(node.details)) {
                detailsHtml += `
                    <div style="margin-bottom: 5px;">
                        <strong style="color: #333;">${key}:</strong> 
                        <span style="color: #666;">${value}</span>
                    </div>
                `;
            }
        } else if (node.type === 'broker') {
            detailsHtml += `
                <div style="margin-bottom: 5px;">
                    <strong style="color: #333;">Función:</strong> 
                    <span style="color: #666;">Intermediario de objetos distribuidos</span>
                </div>
                <div style="margin-bottom: 5px;">
                    <strong style="color: #333;">Servicios:</strong> 
                    <span style="color: #666;">Naming, Trading, Security</span>
                </div>
                <div style="margin-bottom: 5px;">
                    <strong style="color: #333;">Protocolos:</strong> 
                    <span style="color: #666;">CORBA IIOP, COM/DCOM</span>
                </div>
            `;
        }
        
        detailsHtml += `
            <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee; font-size: 10px; color: #999;">
                💡 Parte de la red de objetos distribuidos
            </div>
        `;
        
        infoPanel
            .html(detailsHtml)
            .style('display', 'block');
    }

    function highlightORBObject(objectId) {
        // Reset all styles
        connectionsGroup.selectAll('line')
            .transition()
            .duration(300)
            .attr('stroke', '#ccc')
            .attr('stroke-width', 2)
            .style('opacity', 0.5);

        nodeGroups.selectAll('circle')
            .transition()
            .duration(300)
            .attr('stroke-width', d => d.type === 'broker' ? 4 : 2)
            .style('opacity', 1);

        // Highlight selected object
        nodeGroups
            .filter(d => d.id === objectId)
            .selectAll('circle')
            .transition()
            .duration(300)
            .attr('stroke-width', 6)
            .attr('stroke', '#ff5722');

        // Highlight connections to/from ORB
        if (objectId !== 'orb-broker') {
            connectionsGroup.selectAll(`.connection-${objectId}`)
                .transition()
                .duration(300)
                .attr('stroke', '#ff5722')
                .attr('stroke-width', 4)
                .style('opacity', 1);
        } else {
            // Highlight all connections if ORB is selected
            connectionsGroup.selectAll('line')
                .transition()
                .duration(300)
                .attr('stroke', '#ff9800')
                .attr('stroke-width', 3)
                .style('opacity', 0.8);
        }
    }

    function startORBSimulation() {
        if (simulationInterval) {
            clearInterval(simulationInterval);
        }
        
        invocationCounter = 1;
        isPaused = false;
        d3.select('#orb-pause-btn').text('⏸️ Pausar');
        
        // Iniciar inmediatamente la primera invocación
        executeORBInvocation();
        
        // Programar invocaciones automáticas cada 7 segundos
        simulationInterval = setInterval(() => {
            if (!isPaused && !isAnimating) {
                executeORBInvocation();
            }
        }, 7000);
    }

    function executeORBInvocation() {
        if (isAnimating || isPaused) return;
        
        isAnimating = true;
        const scenario = orbScenarios[(invocationCounter - 1) % orbScenarios.length];
        
        updateORBStatusIndicator(`🔄 ${scenario.type} #${invocationCounter}`, '#2196F3');
        
        // Animate the invocation flow
        animateORBFlow(scenario);
    }

    function animateORBFlow(scenario) {
        const fromNode = allNodes.find(n => n.id === scenario.from);
        const toNode = allNodes.find(n => n.id === scenario.to);
        const orbNode = allNodes.find(n => n.id === 'orb-broker');
        
        // Step 1: Highlight source object
        nodeGroups
            .filter(d => d.id === scenario.from)
            .select('circle')
            .transition()
            .duration(500)
            .attr('fill', '#ff6b35')
            .attr('stroke-width', 6);
        
        // Step 2: Show connection to ORB
        setTimeout(() => {
            connectionsGroup.select(`.connection-${scenario.from}`)
                .transition()
                .duration(500)
                .attr('stroke', '#2196F3')
                .attr('stroke-width', 4)
                .style('opacity', 1);
            
            // Highlight ORB
            nodeGroups
                .filter(d => d.id === 'orb-broker')
                .select('circle')
                .transition()
                .duration(500)
                .attr('fill', '#ff9800')
                .attr('stroke-width', 8);
        }, 600);
        
        // Step 3: ORB routes to target
        setTimeout(() => {
            connectionsGroup.select(`.connection-${scenario.to}`)
                .transition()
                .duration(500)
                .attr('stroke', '#4CAF50')
                .attr('stroke-width', 4)
                .style('opacity', 1);
            
            // Highlight target object
            nodeGroups
                .filter(d => d.id === scenario.to)
                .select('circle')
                .transition()
                .duration(500)
                .attr('fill', '#2e7d32')
                .attr('stroke-width', 6);
        }, 1200);
        
        // Step 4: Response back through ORB
        setTimeout(() => {
            // Reset and complete
            nodeGroups.selectAll('circle')
                .transition()
                .duration(800)
                .attr('fill', d => d.color)
                .attr('stroke-width', d => d.type === 'broker' ? 4 : 2);
            
            connectionsGroup.selectAll('line')
                .transition()
                .duration(800)
                .attr('stroke', '#ccc')
                .attr('stroke-width', 2)
                .style('opacity', 0.5);
            
            // Update info and complete
            updateORBInvocationInfo(scenario);
            
            setTimeout(() => {
                isAnimating = false;
                updateORBStatusIndicator(`✅ ${scenario.type} #${invocationCounter} Completada`, '#4CAF50');
                
                invocationCounter++;
                
                setTimeout(() => {
                    if (!isPaused) {
                        updateORBStatusIndicator('🟢 ORB Listo - Próxima invocación automática', '#4CAF50');
                    }
                }, 2000);
            }, 1000);
        }, 1800);
    }

    function updateORBInvocationInfo(scenario) {
        infoPanel
            .html(`
                <div style="border-bottom: 2px solid #1976d2; margin-bottom: 10px; padding-bottom: 5px;">
                    <strong style="color: #1976d2; font-size: 14px;">🏢 ${scenario.type}</strong>
                </div>
                <div style="margin-bottom: 8px; font-style: italic; color: #666;">
                    ${scenario.description}
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Método:</strong><br/>
                    <code style="background: #f5f5f5; padding: 2px 4px; border-radius: 3px; font-size: 10px;">${scenario.method}</code>
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Flujo:</strong> ${scenario.from} → ORB → ${scenario.to}
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Pasos ejecutados:</strong>
                    <ul style="margin: 5px 0; padding-left: 15px; font-size: 10px;">
                        ${scenario.steps.slice(0, 4).map(step => `<li>${step}</li>`).join('')}
                    </ul>
                </div>
                <div style="font-size: 10px; color: #666; margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee;">
                    💡 Invocación ORB #${invocationCounter} - Transparencia de ubicación
                </div>
            `)
            .style('display', 'block');
    }

    function toggleORBSimulation() {
        isPaused = !isPaused;
        const pauseBtn = d3.select('#orb-pause-btn');
        
        if (isPaused) {
            pauseBtn.text('▶️ Reanudar');
            updateORBStatusIndicator('⏸️ Simulación Pausada', '#FF9800');
        } else {
            pauseBtn.text('⏸️ Pausar');
            updateORBStatusIndicator('🟢 ORB Broker Activo', '#4CAF50');
        }
    }

    function resetORBDiagram() {
        // Detener simulación automática
        if (simulationInterval) {
            clearInterval(simulationInterval);
            simulationInterval = null;
        }
        
        isAnimating = false;
        isPaused = false;
        selectedObject = null;
        invocationCounter = 1;
        
        // Reset UI controls
        d3.select('#orb-pause-btn').text('⏸️ Pausar');
        
        // Reset all node styles
        nodeGroups.selectAll('circle')
            .transition()
            .duration(300)
            .attr('fill', d => d.color)
            .attr('stroke-width', d => d.type === 'broker' ? 4 : 2)
            .attr('stroke', '#333');
        
        // Reset all connections
        connectionsGroup.selectAll('line')
            .transition()
            .duration(300)
            .attr('stroke', '#ccc')
            .attr('stroke-width', 2)
            .style('opacity', 0.5);
        
        // Hide info panel
        infoPanel.style('display', 'none');
        
        // Reset status
        updateORBStatusIndicator('🟢 ORB Broker Listo', '#4CAF50');
    }

    // Add keyboard shortcuts
    d3.select('body').on('keydown', function(event) {
        if (event.key === 'r' || event.key === 'R') {
            resetORBDiagram();
        } else if (event.key === 't' || event.key === 'T') {
            startORBSimulation();
        } else if (event.key === ' ') { // Spacebar
            event.preventDefault();
            toggleORBSimulation();
        }
    });

    // Iniciar simulación automática después de 3 segundos
    setTimeout(() => {
        // Mostrar mensaje de bienvenida
        infoPanel
            .html(`
                <div style="border-bottom: 2px solid #4caf50; margin-bottom: 10px; padding-bottom: 5px;">
                    <strong style="color: #4caf50; font-size: 14px;">🏢 Red ORB Empresarial</strong>
                </div>
                <div style="margin-bottom: 8px;">
                    Simulación de invocaciones entre objetos distribuidos via ORB
                </div>
                <div style="margin-bottom: 8px;">
                    <strong>Sistemas conectados:</strong>
                    <ul style="margin: 5px 0; padding-left: 15px; font-size: 11px;">
                        <li>CRM, ERP, Inventario, Facturación</li>
                        <li>Reportes y Servicios de Seguridad</li>
                        <li>Múltiples plataformas (Java, .NET, C++, Python)</li>
                    </ul>
                </div>
                <div style="font-size: 10px; color: #666; margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee;">
                    💡 La simulación iniciará automáticamente mostrando invocaciones reales
                </div>
            `)
            .style('display', 'block');
        
        // Iniciar simulación automática
        setTimeout(() => {
            startORBSimulation();
        }, 2000);
    }, 1000);
}