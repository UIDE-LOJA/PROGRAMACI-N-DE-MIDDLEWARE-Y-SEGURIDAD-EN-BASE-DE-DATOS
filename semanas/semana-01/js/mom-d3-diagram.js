function createMOMD3Diagram() {
    const container = d3.select("#mom-d3-diagram");
    if (container.empty()) return;

    // Limpiar contenedor
    container.selectAll("*").remove();

    // Dimensiones simplificadas
    const width = 800;
    const height = 400;

    // SVG principal
    const svg = container.append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("background", "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)")
        .style("border-radius", "12px");

    // Definiciones básicas
    const defs = svg.append("defs");

    // Sombra simple pero efectiva
    const dropShadow = defs.append("filter")
        .attr("id", "shadow")
        .attr("x", "-20%").attr("y", "-20%")
        .attr("width", "140%").attr("height", "140%");
    
    dropShadow.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 2);
    
    dropShadow.append("feOffset")
        .attr("dx", 1).attr("dy", 2)
        .attr("result", "offset");
    
    const feMerge = dropShadow.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "offset");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Configuración simple y clara
    const config = {
        producer: { x: 120, y: 200, label: "Productor" },
        queue: { x: 400, y: 200, width: 120, height: 60, label: "Cola MOM" },
        consumer: { x: 680, y: 200, label: "Consumidor" }
    };

    // Colores claros y consistentes
    const colors = {
        producer: "#2196f3",
        queue: "#f8f9fa",
        queueBorder: "#6c757d",
        consumer: "#ff9800",
        message: "#4caf50",
        arrow: "#495057"
    };

    // Grupo principal
    const mainGroup = svg.append("g");

    // 1. PRODUCTOR - Simple y claro
    const producer = mainGroup.append("g")
        .attr("transform", `translate(${config.producer.x}, ${config.producer.y})`);

    producer.append("circle")
        .attr("r", 40)
        .style("fill", colors.producer)
        .style("stroke", "#fff")
        .style("stroke-width", 3)
        .style("filter", "url(#shadow)");

    producer.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "-5")
        .style("font-size", "14px")
        .style("font-weight", "600")
        .style("fill", "#fff")
        .text("📱");

    producer.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "15")
        .style("font-size", "12px")
        .style("font-weight", "600")
        .style("fill", "#fff")
        .text(config.producer.label);

    // 2. COLA MOM - Elemento central
    const queue = mainGroup.append("g")
        .attr("transform", `translate(${config.queue.x}, ${config.queue.y})`);

    queue.append("rect")
        .attr("x", -config.queue.width/2)
        .attr("y", -config.queue.height/2)
        .attr("width", config.queue.width)
        .attr("height", config.queue.height)
        .attr("rx", 8)
        .style("fill", colors.queue)
        .style("stroke", colors.queueBorder)
        .style("stroke-width", 2)
        .style("filter", "url(#shadow)");

    queue.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "-8")
        .style("font-size", "16px")
        .style("fill", colors.queueBorder)
        .text("📋");

    queue.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "12")
        .style("font-size", "12px")
        .style("font-weight", "600")
        .style("fill", colors.queueBorder)
        .text(config.queue.label);

    // 3. CONSUMIDOR - Simple y claro
    const consumer = mainGroup.append("g")
        .attr("transform", `translate(${config.consumer.x}, ${config.consumer.y})`);

    consumer.append("circle")
        .attr("r", 40)
        .style("fill", colors.consumer)
        .style("stroke", "#fff")
        .style("stroke-width", 3)
        .style("filter", "url(#shadow)");

    consumer.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "-5")
        .style("font-size", "14px")
        .style("font-weight", "600")
        .style("fill", "#fff")
        .text("⚙️");

    consumer.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "15")
        .style("font-size", "12px")
        .style("font-weight", "600")
        .style("fill", "#fff")
        .text(config.consumer.label);

    // 4. FLECHAS - Flujo claro
    const arrowGroup = mainGroup.append("g");

    // Flecha productor -> cola
    arrowGroup.append("line")
        .attr("x1", config.producer.x + 40)
        .attr("y1", config.producer.y)
        .attr("x2", config.queue.x - config.queue.width/2 - 10)
        .attr("y2", config.queue.y)
        .style("stroke", colors.arrow)
        .style("stroke-width", 3)
        .style("marker-end", "url(#arrowhead)");

    // Flecha cola -> consumidor
    arrowGroup.append("line")
        .attr("x1", config.queue.x + config.queue.width/2 + 10)
        .attr("y1", config.queue.y)
        .attr("x2", config.consumer.x - 40)
        .attr("y2", config.consumer.y)
        .style("stroke", colors.arrow)
        .style("stroke-width", 3)
        .style("marker-end", "url(#arrowhead)");

    // Definir punta de flecha
    defs.append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 8)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .style("fill", colors.arrow);

    // 5. ETIQUETAS DE PROCESO - Información clave
    const labels = mainGroup.append("g");

    labels.append("text")
        .attr("x", (config.producer.x + config.queue.x - config.queue.width/2) / 2)
        .attr("y", config.producer.y - 30)
        .attr("text-anchor", "middle")
        .style("font-size", "11px")
        .style("font-weight", "500")
        .style("fill", colors.arrow)
        .text("ENVÍO ASÍNCRONO");

    labels.append("text")
        .attr("x", (config.queue.x + config.queue.width/2 + config.consumer.x) / 2)
        .attr("y", config.consumer.y - 30)
        .attr("text-anchor", "middle")
        .style("font-size", "11px")
        .style("font-weight", "500")
        .style("fill", colors.arrow)
        .text("PROCESAMIENTO");

    // 6. VENTAJAS CLAVE - Información esencial
    const benefits = [
        { text: "✓ Desacoplamiento", x: 150, y: 330 },
        { text: "✓ Tolerancia a fallos", x: 350, y: 330 },
        { text: "✓ Escalabilidad", x: 550, y: 330 }
    ];

    benefits.forEach(benefit => {
        labels.append("text")
            .attr("x", benefit.x)
            .attr("y", benefit.y)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "500")
            .style("fill", "#28a745")
            .text(benefit.text);
    });

    // 7. ANIMACIÓN SIMPLE - Solo lo esencial
    let messageCounter = 0;

    function sendMessage() {
        const messageId = messageCounter++;
        
        // Crear mensaje simple
        const message = mainGroup.append("circle")
            .attr("class", "message")
            .attr("cx", config.producer.x + 40)
            .attr("cy", config.producer.y)
            .attr("r", 6)
            .style("fill", colors.message)
            .style("filter", "url(#shadow)")
            .style("opacity", 0);

        // Animación fluida al centro
        message.transition()
            .duration(300)
            .style("opacity", 1)
            .transition()
            .duration(1000)
            .ease(d3.easeQuadInOut)
            .attr("cx", config.queue.x)
            .on("end", () => {
                // Pausa en la cola
                setTimeout(() => {
                    // Continuar al consumidor
                    message.transition()
                        .duration(1000)
                        .ease(d3.easeQuadInOut)
                        .attr("cx", config.consumer.x - 40)
                        .transition()
                        .duration(300)
                        .style("opacity", 0)
                        .remove();
                }, 500);
            });

        // Efecto visual en productor
        producer.select("circle")
            .transition()
            .duration(200)
            .style("fill", "#1976d2")
            .transition()
            .duration(200)
            .style("fill", colors.producer);
    }

    // Envío automático cada 3 segundos
    setInterval(sendMessage, 3000);
    
    // Primer mensaje después de 1 segundo
    setTimeout(sendMessage, 1000);

    // 8. TÍTULO CLARO
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "700")
        .style("fill", "#495057")
        .text("Middleware Orientado a Mensajes (MOM)");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 60)
        .attr("text-anchor", "middle")
        .style("font-size", "13px")
        .style("fill", "#6c757d")
        .text("Comunicación asíncrona entre aplicaciones");
}

// Inicialización optimizada
function initializeWhenVisible() {
    const container = document.getElementById('mom-d3-diagram');
    if (container && container.offsetParent !== null) {
        createMOMD3Diagram();
    } else {
        setTimeout(initializeWhenVisible, 300);
    }
}

setTimeout(initializeWhenVisible, 500);