// ===== JSON SIMULACIONES =====
if (typeof currentJsonDemo === 'undefined') {
    var currentJsonDemo = 'editor';
}

document.addEventListener('DOMContentLoaded', function () {
    // Tabs de demos JSON
    const jsonTabs = document.querySelectorAll('.json-tab');
    jsonTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const demoType = this.getAttribute('data-demo');
            switchJsonDemo(demoType);
        });
    });

    // Botón iniciar demo JSON
    const startJsonDemo = document.getElementById('startJsonDemo');
    if (startJsonDemo) {
        startJsonDemo.addEventListener('click', function () {
            if (currentJsonDemo === 'editor') {
                runJsonEditorDemo();
            } else if (currentJsonDemo === 'validation') {
                runJsonValidationDemo();
            }
        });
    }

    // Sub-tabs de código JSON
    const jsonCodeSubtabs = document.querySelectorAll('.json-code-subtab');
    jsonCodeSubtabs.forEach(subtab => {
        subtab.addEventListener('click', function () {
            const subtabType = this.getAttribute('data-subtab');
            switchJsonCodeSubtab(subtabType);
        });
    });
});

function switchJsonCodeSubtab(subtabType) {
    // Actualizar botones de sub-tabs
    document.querySelectorAll('.json-code-subtab').forEach(btn => {
        if (btn.getAttribute('data-subtab') === subtabType) {
            btn.style.background = 'var(--uide-accent)';
            btn.style.color = '#0f1419';
        } else {
            btn.style.background = 'rgba(255,255,255,0.1)';
            btn.style.color = '#e2e8f0';
        }
    });

    // Mostrar/ocultar contenido
    document.querySelectorAll('.json-code-content').forEach(content => {
        content.style.display = 'none';
    });

    const activeContent = document.getElementById(`jsonCode${subtabType.charAt(0).toUpperCase() + subtabType.slice(1)}`);
    if (activeContent) {
        activeContent.style.display = 'flex';
    }

    // Resaltar código con Prism
    if (window.Prism) {
        setTimeout(() => {
            Prism.highlightAll();
        }, 10);
    }
}

function switchJsonDemo(demoType) {
    currentJsonDemo = demoType;

    // Actualizar tabs
    document.querySelectorAll('.json-tab').forEach(tab => {
        if (tab.getAttribute('data-demo') === demoType) {
            tab.style.background = 'var(--uide-accent)';
            tab.style.color = '#0f1419';
        } else {
            tab.style.background = 'rgba(255,255,255,0.1)';
            tab.style.color = '#e2e8f0';
        }
    });

    // Mostrar/ocultar contenido
    document.querySelectorAll('.json-demo-content').forEach(content => {
        content.style.display = 'none';
    });

    const activeDemo = document.getElementById(`demo${demoType.charAt(0).toUpperCase() + demoType.slice(1)}`);
    if (activeDemo) {
        activeDemo.style.display = 'flex';
    }
}

// ===== DEMO 1: EDITOR JSON INTERACTIVO =====
function runJsonEditorDemo() {
    const canvas = document.getElementById('jsonEditorCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const jsonData = {
        "transaction": {
            "id": "TRX-2024-001234",
            "accountNumber": "2100456789",
            "customerName": "María Sánchez",
            "amount": 150.00,
            "currency": "USD",
            "type": "transfer",
            "branch": "Loja Centro",
            "timestamp": "2024-11-08T14:30:00-05:00"
        }
    };

    const jsonStr = JSON.stringify(jsonData, null, 2);
    const lines = jsonStr.split('\n');

    // Dibujar fondo del editor
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, width, height);

    // Barra superior
    ctx.fillStyle = '#2d2d2d';
    ctx.fillRect(0, 0, width, 30);
    ctx.fillStyle = '#60a5fa';
    ctx.font = 'bold 11px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('▭ user.json', 10, 20);

    // Números de línea
    ctx.fillStyle = '#3d3d3d';
    ctx.fillRect(0, 30, 40, height - 30);

    let currentLine = 0;
    const lineHeight = 16;
    const startY = 50;

    const interval = setInterval(() => {
        if (currentLine >= lines.length) {
            clearInterval(interval);

            const size = new Blob([jsonStr]).size;
            document.getElementById('jsonEditorInfo').textContent =
                `▊ Tamaño: ${size} bytes | ${lines.length} líneas`;
            document.getElementById('jsonEditorResult').innerHTML =
                `<i class="fas fa-check"></i> JSON parseado correctamente | <strong>Human-readable</strong> y fácil de editar`;
            return;
        }

        const line = lines[currentLine];
        const y = startY + currentLine * lineHeight;

        // Número de línea
        ctx.fillStyle = '#858585';
        ctx.font = '10px monospace';
        ctx.textAlign = 'right';
        ctx.fillText((currentLine + 1).toString(), 35, y);

        // Contenido de la línea con syntax highlighting
        ctx.textAlign = 'left';
        let x = 50;

        // Detectar tipo de contenido
        if (line.includes('{') || line.includes('}') || line.includes('[') || line.includes(']')) {
            ctx.fillStyle = '#ffd700';
            ctx.fillText(line, x, y);
        } else if (line.includes(':')) {
            // Separar key y value
            const parts = line.split(':');

            // Key (propiedad)
            ctx.fillStyle = '#9cdcfe';
            ctx.fillText(parts[0], x, y);
            x += ctx.measureText(parts[0]).width;

            // :
            ctx.fillStyle = '#ffffff';
            ctx.fillText(':', x, y);
            x += ctx.measureText(':').width;

            // Value
            const value = parts[1];
            if (value.includes('"')) {
                ctx.fillStyle = '#ce9178'; // String
            } else if (value.includes('true') || value.includes('false')) {
                ctx.fillStyle = '#569cd6'; // Boolean
            } else if (!isNaN(value.trim().replace(',', ''))) {
                ctx.fillStyle = '#b5cea8'; // Number
            } else {
                ctx.fillStyle = '#ffffff';
            }
            ctx.fillText(value, x, y);
        } else {
            ctx.fillStyle = '#d4d4d4';
            ctx.fillText(line, x, y);
        }

        currentLine++;

        document.getElementById('jsonEditorInfo').textContent =
            `📝 Parseando línea ${currentLine}/${lines.length}...`;
    }, 100);
}

// ===== DEMO 2: VALIDACIÓN JSON =====
function runJsonValidationDemo() {
    animateInvalidJson();
    setTimeout(() => animateValidJson(), 100);
}

function animateInvalidJson() {
    const canvas = document.getElementById('jsonInvalidCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    // JSON con error (falta comilla de cierre)
    const invalidJson = `{
  "name": "Test,
  "value": 123
}`;

    const lines = invalidJson.split('\n');

    // Fondo
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, width, height);

    // Números de línea
    ctx.fillStyle = '#3d3d3d';
    ctx.fillRect(0, 0, 40, height);

    lines.forEach((line, i) => {
        const y = 20 + i * 20;

        // Número de línea
        ctx.fillStyle = '#858585';
        ctx.font = '10px monospace';
        ctx.textAlign = 'right';
        ctx.fillText((i + 1).toString(), 35, y);

        // Línea de código
        ctx.textAlign = 'left';
        ctx.fillStyle = '#d4d4d4';
        ctx.fillText(line, 50, y);

        // Marcar error en línea 2
        if (i === 1) {
            // Subrayado rojo
            ctx.strokeStyle = '#f87171';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(50, y + 3);
            ctx.lineTo(50 + ctx.measureText(line).width, y + 3);
            ctx.stroke();

            // Icono de error
            ctx.fillStyle = '#f87171';
            ctx.font = '12px Arial';
            ctx.fillText('×', width - 30, y);
        }
    });

    // Mensaje de error
    ctx.fillStyle = '#f87171';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('⚠ SyntaxError: Unexpected token', 50, 120);
    ctx.font = '9px Arial';
    ctx.fillText('Línea 2: Falta comilla de cierre en "Test', 50, 135);

    document.getElementById('jsonInvalidInfo').textContent =
        `❌ Error en línea 2 | Sintaxis incorrecta`;
}

function animateValidJson() {
    const canvas = document.getElementById('jsonValidCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    // JSON válido
    const validJson = `{
  "name": "Test",
  "value": 123
}`;

    const lines = validJson.split('\n');

    // Fondo
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, width, height);

    // Números de línea
    ctx.fillStyle = '#3d3d3d';
    ctx.fillRect(0, 0, 40, height);

    lines.forEach((line, i) => {
        const y = 20 + i * 20;

        // Número de línea
        ctx.fillStyle = '#858585';
        ctx.font = '10px monospace';
        ctx.textAlign = 'right';
        ctx.fillText((i + 1).toString(), 35, y);

        // Línea de código con syntax highlighting
        ctx.textAlign = 'left';
        if (line.includes('"name"') || line.includes('"value"')) {
            ctx.fillStyle = '#9cdcfe';
            ctx.fillText(line.substring(0, line.indexOf(':')), 50, y);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(':', 50 + ctx.measureText(line.substring(0, line.indexOf(':'))).width, y);

            const value = line.substring(line.indexOf(':') + 1);
            if (value.includes('"')) {
                ctx.fillStyle = '#ce9178';
            } else {
                ctx.fillStyle = '#b5cea8';
            }
            ctx.fillText(value, 50 + ctx.measureText(line.substring(0, line.indexOf(':') + 1)).width, y);
        } else {
            ctx.fillStyle = '#ffd700';
            ctx.fillText(line, 50, y);
        }

        // Checkmark verde
        ctx.fillStyle = '#4ade80';
        ctx.font = '12px Arial';
        ctx.fillText('√', width - 30, y);
    });

    // Mensaje de éxito
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('√ JSON valido', 50, 120);
    ctx.font = '9px Arial';
    ctx.fillText('Parseado correctamente | Sin errores de sintaxis', 50, 135);

    // Objeto parseado
    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px monospace';
    ctx.fillText('Objeto: { name: "Test", value: 123 }', 50, 155);

    document.getElementById('jsonValidInfo').textContent =
        `✅ JSON válido | Parseado correctamente`;

    document.getElementById('jsonValidationResult').innerHTML =
        `<i class="fas fa-check-circle"></i> Validación en tiempo real detecta errores de sintaxis <strong>inmediatamente</strong>`;
}
