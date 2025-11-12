// ===== XML SIMULACIONES =====
let currentXmlDemo = 'overhead';

document.addEventListener('DOMContentLoaded', function () {
    // Tabs de demos XML
    const xmlTabs = document.querySelectorAll('.xml-tab');
    xmlTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const demoType = this.getAttribute('data-demo');
            switchXmlDemo(demoType);
        });
    });

    // Botón iniciar demo XML
    const startXmlDemo = document.getElementById('startXmlDemo');
    if (startXmlDemo) {
        startXmlDemo.addEventListener('click', function () {
            if (currentXmlDemo === 'overhead') {
                runOverheadDemo();
            } else if (currentXmlDemo === 'dom') {
                runDomTreeDemo();
            }
        });
    }
});

function switchXmlDemo(demoType) {
    currentXmlDemo = demoType;

    // Actualizar tabs
    document.querySelectorAll('.xml-tab').forEach(tab => {
        if (tab.getAttribute('data-demo') === demoType) {
            tab.style.background = 'var(--uide-accent)';
            tab.style.color = '#0f1419';
        } else {
            tab.style.background = 'rgba(255,255,255,0.1)';
            tab.style.color = '#e2e8f0';
        }
    });

    // Mostrar/ocultar contenido
    document.querySelectorAll('.xml-demo-content').forEach(content => {
        content.style.display = 'none';
    });

    const activeDemo = document.getElementById(`demo${demoType.charAt(0).toUpperCase() + demoType.slice(1)}`);
    if (activeDemo) {
        activeDemo.style.display = 'flex';
    }
}

// ===== DEMO 1: OVERHEAD VISUAL =====
function runOverheadDemo() {
    const canvas = document.getElementById('overheadCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const formats = [
        {
            name: 'JSON',
            color: '#60a5fa',
            size: 150,
            content: '{"transaction": {"id": "TRX001", "amount": 150}}',
            useful: 35,
            metadata: 115
        },
        {
            name: 'XML',
            color: '#f87171',
            size: 280,
            content: '<?xml version="1.0"?>\n<transaccion>\n  <id>TRX001</id>\n  <monto>150</monto>\n</transaccion>',
            useful: 35,
            metadata: 245
        },
        {
            name: 'Protobuf',
            color: '#22c55e',
            size: 45,
            content: '[binario: 08 01 12 03 96 01]',
            useful: 35,
            metadata: 10
        }
    ];

    let currentFormat = 0;

    const interval = setInterval(() => {
        if (currentFormat >= formats.length) {
            clearInterval(interval);

            // Mostrar comparación final
            const xmlOverhead = ((formats[1].size - formats[0].size) / formats[0].size * 100).toFixed(0);
            const protobufSavings = ((formats[1].size - formats[2].size) / formats[1].size * 100).toFixed(0);

            document.getElementById('overheadInfo').textContent =
                `▊ JSON: 150B | XML: 280B (+${xmlOverhead}%) | Protobuf: 45B`;
            document.getElementById('overheadResult').innerHTML =
                `<i class="fas fa-exclamation-triangle"></i> XML tiene <strong>${xmlOverhead}% más overhead</strong> que JSON y <strong>${protobufSavings}% más</strong> que Protobuf`;
            return;
        }

        const format = formats[currentFormat];
        const y = 30 + currentFormat * 140;

        // Título
        ctx.fillStyle = format.color;
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`${format.name} (${format.size} bytes)`, 20, y);

        // Código
        ctx.fillStyle = '#1e1e1e';
        ctx.fillRect(20, y + 10, width - 40, 60);
        ctx.strokeStyle = format.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(20, y + 10, width - 40, 60);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '9px monospace';
        ctx.textAlign = 'left';
        const lines = format.content.split('\n');
        lines.forEach((line, i) => {
            ctx.fillText(line.substring(0, 60), 25, y + 28 + i * 12);
        });

        // Gráfico de barras (datos útiles vs metadata)
        const barY = y + 80;
        const maxWidth = width - 100;
        const usefulWidth = (maxWidth * format.useful) / format.size;
        const metadataWidth = (maxWidth * format.metadata) / format.size;

        // Datos útiles (verde)
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(50, barY, usefulWidth, 25);

        // Metadata (rojo)
        ctx.fillStyle = '#f87171';
        ctx.fillRect(50 + usefulWidth, barY, metadataWidth, 25);

        // Etiquetas
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Datos: ${format.useful}B`, 50, barY - 5);
        ctx.fillText(`Metadata: ${format.metadata}B`, 50 + usefulWidth + 5, barY - 5);

        // Porcentaje de overhead
        const overheadPct = ((format.metadata / format.size) * 100).toFixed(0);
        ctx.fillStyle = format.color;
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`${overheadPct}% overhead`, width - 20, barY + 17);

        currentFormat++;

        document.getElementById('overheadInfo').textContent =
            `▊ Analizando ${format.name}... (${currentFormat}/3)`;
    }, 1000);
}

// ===== DEMO 2: ÁRBOL DOM =====
function runDomTreeDemo() {
    const canvas = document.getElementById('domCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const tree = {
        name: 'factura',
        color: '#a78bfa',
        x: width / 2,
        y: 50,
        children: [
            {
                name: 'transaccion',
                color: '#60a5fa',
                x: width / 2,
                y: 150,
                children: [
                    {
                        name: 'id',
                        color: '#22c55e',
                        x: width / 2 - 100,
                        y: 250,
                        value: 'TRX001'
                    },
                    {
                        name: 'monto',
                        color: '#22c55e',
                        x: width / 2 + 100,
                        y: 250,
                        value: '$150'
                    }
                ]
            }
        ]
    };

    let currentLevel = 0;
    const maxLevel = 3;

    const interval = setInterval(() => {
        if (currentLevel >= maxLevel) {
            clearInterval(interval);
            document.getElementById('domInfo').textContent =
                `🌳 5 nodos | 3 niveles de profundidad`;
            document.getElementById('domResult').innerHTML =
                `<i class="fas fa-sitemap"></i> XML se parsea en un <strong>árbol DOM</strong> que consume memoria y tiempo de procesamiento`;
            return;
        }

        // Dibujar nodos según el nivel
        if (currentLevel === 0) {
            // Raíz
            drawNodeForXml(ctx, tree.name, tree.x, tree.y, tree.color);
        } else if (currentLevel === 1) {
            // user
            const child = tree.children[0];
            drawArrowForXml(ctx, tree.x, tree.y + 30, child.x, child.y - 30, '#94a3b8');
            drawNodeForXml(ctx, child.name, child.x, child.y, child.color);
        } else if (currentLevel === 2) {
            // id y name
            const parent = tree.children[0];
            parent.children.forEach(child => {
                drawArrowForXml(ctx, parent.x, parent.y + 30, child.x, child.y - 30, '#94a3b8');
                drawNodeForXml(ctx, child.name, child.x, child.y, child.color);

                // Valor
                ctx.fillStyle = '#fbbf24';
                ctx.fillRect(child.x - 40, child.y + 40, 80, 30);
                ctx.strokeStyle = '#fbbf24';
                ctx.lineWidth = 2;
                ctx.strokeRect(child.x - 40, child.y + 40, 80, 30);

                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(child.value, child.x, child.y + 60);

                // Línea al valor
                ctx.strokeStyle = '#94a3b8';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(child.x, child.y + 30);
                ctx.lineTo(child.x, child.y + 40);
                ctx.stroke();
            });
        }

        currentLevel++;

        document.getElementById('domInfo').textContent =
            `🌳 Construyendo árbol... Nivel ${currentLevel}/${maxLevel}`;
    }, 800);
}

function drawNodeForXml(ctx, text, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x - 50, y - 20, 100, 40);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 50, y - 20, 100, 40);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y + 5);
}

function drawArrowForXml(ctx, x1, y1, x2, y2, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.setLineDash([]);

    // Línea
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Punta de flecha
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowSize = 12;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(
        x2 - arrowSize * Math.cos(angle - Math.PI / 6),
        y2 - arrowSize * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
        x2 - arrowSize * Math.cos(angle + Math.PI / 6),
        y2 - arrowSize * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
}
