function createVentajasDesafiosD3() {
    const container = d3.select("#ventajas-desafios-d3");
    if (container.empty()) return;

    // Limpiar contenedor
    container.selectAll("*").remove();

    // Dimensiones
    const width = 800;
    const height = 500;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    // Crear SVG
    const svg = container.append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("xmlns:xhtml", "http://www.w3.org/1999/xhtml")
        .style("background", "transparent");

    // Datos de ventajas y desafíos
    const ventajas = [
        {
            id: "v1",
            name: "Compartición de Recursos",
            icon: "fas fa-share-alt",
            x: 150,
            y: 100,
            description: "Permite compartir recursos como bases de datos, servicios y capacidad de procesamiento entre múltiples usuarios y aplicaciones.",
            examples: ["Bases de datos centralizadas", "Servicios de autenticación", "Sistemas de archivos distribuidos"]
        },
        {
            id: "v2",
            name: "Escalabilidad Horizontal",
            icon: "fas fa-chart-line",
            x: 150,
            y: 200,
            description: "Capacidad de añadir más servidores para manejar mayor carga, superando las limitaciones de sistemas monolíticos.",
            examples: ["Load balancing", "Particionamiento de datos", "Replicación de servicios"]
        },
        {
            id: "v3",
            name: "Tolerancia a Fallos",
            icon: "fas fa-shield-alt",
            x: 150,
            y: 300,
            description: "Replicación de componentes críticos para asegurar disponibilidad ante fallos de hardware o software.",
            examples: ["Redundancia de servidores", "Failover automático", "Backup distribuido"]
        },
        {
            id: "v4",
            name: "Distribución Geográfica",
            icon: "fas fa-globe",
            x: 150,
            y: 400,
            description: "Capacidad de desplegar servicios en múltiples ubicaciones geográficas para mejor rendimiento y disponibilidad.",
            examples: ["CDN global", "Edge computing", "Centros de datos distribuidos"]
        }
    ];

    const desafios = [
        {
            id: "d1",
            name: "Sincronización de Tiempo",
            icon: "fas fa-clock",
            x: 650,
            y: 100,
            description: "Dificultad para mantener un tiempo consistente entre múltiples nodos distribuidos geográficamente.",
            solutions: ["NTP (Network Time Protocol)", "Relojes lógicos", "Algoritmos de consenso"]
        },
        {
            id: "d2",
            name: "Consistencia de Datos",
            icon: "fas fa-database",
            x: 650,
            y: 200,
            description: "Asegurar que todos los nodos tengan la misma vista de los datos en un momento dado.",
            solutions: ["ACID transactions", "Eventual consistency", "Consensus algorithms"]
        },
        {
            id: "d3",
            name: "Manejo de Fallos",
            icon: "fas fa-exclamation-triangle",
            x: 650,
            y: 300,
            description: "Detectar, aislar y recuperarse de fallos de componentes individuales sin afectar el sistema completo.",
            solutions: ["Circuit breakers", "Health checks", "Graceful degradation"]
        },
        {
            id: "d4",
            name: "Latencia de Red",
            icon: "fas fa-network-wired",
            x: 650,
            y: 400,
            description: "Gestionar los retrasos inherentes en la comunicación a través de la red entre componentes distribuidos.",
            solutions: ["Caching strategies", "Async communication", "Data locality"]
        }
    ];

    // Conexiones entre ventajas y desafíos
    const conexiones = [
        { source: "v1", target: "d2", strength: 0.8 },
        { source: "v2", target: "d4", strength: 0.9 },
        { source: "v3", target: "d3", strength: 0.7 },
        { source: "v4", target: "d1", strength: 0.8 }
    ];

    // Estado de la aplicación
    let selectedNode = null;
    let activeConnections = [];

    // Crear grupos para ventajas y desafíos
    const ventajasGroup = svg.append("g").attr("class", "ventajas-group");
    const desafiosGroup = svg.append("g").attr("class", "desafios-group");
    const conexionesGroup = svg.append("g").attr("class", "conexiones-group");

    // Títulos de secciones
    svg.append("text")
        .attr("x", 150)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .style("fill", "var(--uide-primary)")
        .text("VENTAJAS");

    svg.append("text")
        .attr("x", 650)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .style("fill", "var(--uide-accent)")
        .text("DESAFÍOS");

    // Función para crear tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "d3-tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background", "#23356e")
        .style("color", "white")
        .style("padding", "12px")
        .style("border-radius", "8px")
        .style("font-size", "14px")
        .style("max-width", "300px")
        .style("z-index", "1000")
        .style("box-shadow", "0 4px 12px rgba(35, 53, 110, 0.3)");

    // Función para dibujar conexiones
    function drawConnections(connections = conexiones) {
        const lines = conexionesGroup.selectAll(".connection-line")
            .data(connections, d => `${d.source}-${d.target}`);

        lines.exit().remove();

        const linesEnter = lines.enter()
            .append("line")
            .attr("class", "connection-line")
            .style("stroke", "#23356e")
            .style("stroke-width", 2)
            .style("stroke-dasharray", "5,5")
            .style("opacity", 0);

        lines.merge(linesEnter)
            .attr("x1", d => {
                const source = [...ventajas, ...desafios].find(n => n.id === d.source);
                return source.x + 60;
            })
            .attr("y1", d => {
                const source = [...ventajas, ...desafios].find(n => n.id === d.source);
                return source.y;
            })
            .attr("x2", d => {
                const target = [...ventajas, ...desafios].find(n => n.id === d.target);
                return target.x - 60;
            })
            .attr("y2", d => {
                const target = [...ventajas, ...desafios].find(n => n.id === d.target);
                return target.y;
            })
            .transition()
            .duration(500)
            .style("opacity", d => selectedNode ?
                (d.source === selectedNode || d.target === selectedNode ? 0.8 : 0.2) : 0.4);
    }

    // Función para crear nodos
    function createNodes(data, group, color) {
        const nodes = group.selectAll(".node")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .style("cursor", "pointer");

        // Rectángulo redondeado del nodo
        nodes.append("rect")
            .attr("width", 140)
            .attr("height", 80)
            .attr("x", -70)
            .attr("y", -40)
            .attr("rx", 12)
            .attr("ry", 12)
            .style("fill", color)
            .style("stroke", "#fff")
            .style("stroke-width", 3)
            .style("filter", "drop-shadow(0 2px 6px rgba(35, 53, 110, 0.15))")
            .style("transition", "all 0.3s ease");

        // Icono Font Awesome usando foreignObject
        nodes.append("foreignObject")
            .attr("x", -12)
            .attr("y", -30)
            .attr("width", 24)
            .attr("height", 24)
            .append("xhtml:div")
            .style("width", "24px")
            .style("height", "24px")
            .style("display", "flex")
            .style("align-items", "center")
            .style("justify-content", "center")
            .style("color", "#fff")
            .style("font-size", "18px")
            .html(d => `<i class="${d.icon}"></i>`);

        // Texto del nodo
        nodes.append("text")
            .attr("class", "node-text")
            .attr("text-anchor", "middle")
            .attr("dy", "5")
            .style("font-size", "12px")
            .style("fill", "#fff")
            .style("font-weight", "600")
            .each(function (d) {
                const words = d.name.split(" ");
                const text = d3.select(this);

                // Para nombres largos, dividir en máximo 2 líneas
                if (words.length <= 2) {
                    words.forEach((word, i) => {
                        text.append("tspan")
                            .attr("x", 0)
                            .attr("dy", i === 0 ? 0 : "14")
                            .text(word);
                    });
                } else {
                    // Agrupar palabras para mejor distribución
                    const line1 = words.slice(0, Math.ceil(words.length / 2)).join(" ");
                    const line2 = words.slice(Math.ceil(words.length / 2)).join(" ");

                    text.append("tspan")
                        .attr("x", 0)
                        .attr("dy", 0)
                        .text(line1);

                    text.append("tspan")
                        .attr("x", 0)
                        .attr("dy", "14")
                        .text(line2);
                }
            });

        // Event handlers
        nodes
            .on("click", function (event, d) {
                event.stopPropagation();

                if (selectedNode === d.id) {
                    // Deseleccionar
                    selectedNode = null;
                    activeConnections = [];
                } else {
                    // Seleccionar nuevo nodo
                    selectedNode = d.id;
                    activeConnections = conexiones.filter(c =>
                        c.source === d.id || c.target === d.id
                    );
                }

                updateVisualization();
            })
            .on("mouseover", function (event, d) {
                d3.select(this).select("rect")
                    .transition()
                    .duration(200)
                    .attr("width", 150)
                    .attr("height", 85)
                    .attr("x", -75)
                    .attr("y", -42.5)
                    .style("filter", "drop-shadow(0 4px 10px rgba(35, 53, 110, 0.25))");

                // Mostrar tooltip
                let tooltipContent = `<strong>${d.name}</strong><br/>${d.description}<br/><br/>`;

                if (d.examples) {
                    tooltipContent += "<strong>Ejemplos:</strong><br/>";
                    d.examples.forEach(example => {
                        tooltipContent += `• ${example}<br/>`;
                    });
                }

                if (d.solutions) {
                    tooltipContent += "<strong>Soluciones:</strong><br/>";
                    d.solutions.forEach(solution => {
                        tooltipContent += `• ${solution}<br/>`;
                    });
                }

                tooltip.html(tooltipContent)
                    .style("visibility", "visible");
            })
            .on("mousemove", function (event) {
                tooltip
                    .style("top", (event.pageY - 10) + "px")
                    .style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", function (event, d) {
                d3.select(this).select("rect")
                    .transition()
                    .duration(200)
                    .attr("width", 140)
                    .attr("height", 80)
                    .attr("x", -70)
                    .attr("y", -40)
                    .style("filter", "drop-shadow(0 2px 6px rgba(35, 53, 110, 0.15))");

                tooltip.style("visibility", "hidden");
            });

        return nodes;
    }

    // Función para actualizar la visualización
    function updateVisualization() {
        // Actualizar estilos de nodos
        svg.selectAll(".node circle")
            .transition()
            .duration(300)
            .style("opacity", d => {
                if (!selectedNode) return 1;
                if (d.id === selectedNode) return 1;
                const isConnected = activeConnections.some(c =>
                    c.source === d.id || c.target === d.id
                );
                return isConnected ? 0.8 : 0.3;
            })
            .style("stroke-width", d => d.id === selectedNode ? 5 : 3);

        // Actualizar conexiones
        drawConnections(selectedNode ? activeConnections : conexiones);
    }

    // Crear nodos
    createNodes(ventajas, ventajasGroup, "#23356e");
    createNodes(desafios, desafiosGroup, "#e9ab21");

    // Dibujar conexiones iniciales
    drawConnections();

    // Click en el fondo para deseleccionar
    svg.on("click", function () {
        selectedNode = null;
        activeConnections = [];
        updateVisualization();
    });

    // Animación inicial
    svg.selectAll(".node")
        .style("opacity", 0)
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .style("opacity", 1);
}

// Inicializar cuando el slide sea visible
setTimeout(() => {
    createVentajasDesafiosD3();
}, 500);