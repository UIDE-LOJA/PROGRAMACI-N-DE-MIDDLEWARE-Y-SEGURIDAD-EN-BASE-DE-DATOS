// ===== PROTOC SIMULACIONES =====
let currentProtocDemo = 'compiler';

document.addEventListener('DOMContentLoaded', function () {
    // Tabs de demos Protoc
    const protocTabs = document.querySelectorAll('.protoc-tab');
    protocTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const demoType = this.getAttribute('data-demo');
            switchProtocDemo(demoType);
        });
    });

    // Botón iniciar demo
    const startProtocDemo = document.getElementById('startProtocDemo');
    if (startProtocDemo) {
        startProtocDemo.addEventListener('click', function () {
            if (currentProtocDemo === 'compiler') {
                runCompilerFlowDemo();
            } else if (currentProtocDemo === 'fieldmask') {
                runFieldMaskDemo();
            }
        });
    }

    // Checkboxes de FieldMask - actualizar automáticamente
    const checkboxes = document.querySelectorAll('.field-checkbox');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', function () {
            if (currentProtocDemo === 'fieldmask') {
                runFieldMaskDemo();
            }
        });
    });
});

// ===== DEMO 1: FLUJO DEL COMPILADOR ANIMADO =====
function runCompilerFlowDemo() {
    const canvas = document.getElementById('compilerFlowCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const steps = [
        {
            name: '▭ user.proto',
            desc: 'Definición del esquema',
            color: '#a78bfa',
            x: width / 2,
            y: 60
        },
        {
            name: '⚙ protoc',
            desc: 'Compilador Protocol Buffers',
            color: '#fbbf24',
            x: width / 2,
            y: 180
        },
        {
            name: '◈ user_pb2.py',
            desc: 'Código Python',
            color: '#60a5fa',
            x: width / 2 - 150,
            y: 320
        },
        {
            name: '◉ User.java',
            desc: 'Código Java',
            color: '#f472b6',
            x: width / 2,
            y: 320
        },
        {
            name: '🔷 user.pb.go',
            desc: 'Código Go',
            color: '#22c55e',
            x: width / 2 + 150,
            y: 320
        }
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
        if (currentStep >= steps.length) {
            clearInterval(interval);

            // Dibujar flechas finales
            ctx.strokeStyle = '#4ade80';
            ctx.lineWidth = 3;
            ctx.setLineDash([]);

            // user.proto → protoc
            drawArrowForProtoc(ctx, steps[0].x, steps[0].y + 40, steps[1].x, steps[1].y - 40, '#4ade80');

            // protoc → outputs
            drawArrowForProtoc(ctx, steps[1].x, steps[1].y + 40, steps[2].x, steps[2].y - 40, '#60a5fa');
            drawArrowForProtoc(ctx, steps[1].x, steps[1].y + 40, steps[3].x, steps[3].y - 40, '#f472b6');
            drawArrowForProtoc(ctx, steps[1].x, steps[1].y + 40, steps[4].x, steps[4].y - 40, '#22c55e');

            document.getElementById('compilerFlowInfo').textContent =
                `✅ Compilación completa | 3 lenguajes generados`;
            document.getElementById('compilerFlowResult').innerHTML =
                `<i class="fas fa-magic"></i> protoc genera <strong>código type-safe</strong> automáticamente para múltiples lenguajes`;
            return;
        }

        const step = steps[currentStep];

        // Dibujar nodo
        ctx.fillStyle = step.color;
        ctx.beginPath();
        ctx.roundRect(step.x - 80, step.y - 30, 160, 60, 10);
        ctx.fill();

        // Borde
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Nombre
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(step.name, step.x, step.y - 5);

        // Descripción
        ctx.font = '10px Arial';
        ctx.fillText(step.desc, step.x, step.y + 12);

        // Dibujar flecha desde el paso anterior
        if (currentStep > 0) {
            const prevStep = steps[currentStep - 1];
            if (currentStep === 1) {
                // user.proto → protoc
                drawArrowForProtoc(ctx, prevStep.x, prevStep.y + 40, step.x, step.y - 40, '#4ade80');
            } else if (currentStep >= 2) {
                // protoc → outputs
                drawArrowForProtoc(ctx, steps[1].x, steps[1].y + 40, step.x, step.y - 40, step.color);
            }
        }

        currentStep++;

        document.getElementById('compilerFlowInfo').textContent =
            `⚙️ Paso ${currentStep}/${steps.length} | Generando código...`;
    }, 600);
}

function drawArrowForProtoc(ctx, x1, y1, x2, y2, color) {
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

function switchProtocDemo(demoType) {
    currentProtocDemo = demoType;

    // Actualizar tabs
    document.querySelectorAll('.protoc-tab').forEach(tab => {
        if (tab.getAttribute('data-demo') === demoType) {
            tab.style.background = 'var(--uide-accent)';
            tab.style.color = '#0f1419';
        } else {
            tab.style.background = 'rgba(255,255,255,0.1)';
            tab.style.color = '#e2e8f0';
        }
    });

    // Mostrar/ocultar contenido
    document.querySelectorAll('.protoc-demo-content').forEach(content => {
        content.style.display = 'none';
    });

    const activeDemo = document.getElementById(`demo${demoType.charAt(0).toUpperCase() + demoType.slice(1)}`);
    if (activeDemo) {
        activeDemo.style.display = 'flex';
    }

    // Mostrar/ocultar botón según demo
    const applyBtn = document.getElementById('applyFieldMask');
    if (applyBtn) {
        applyBtn.style.display = demoType === 'fieldmask' ? 'block' : 'none';
    }

    // Renderizar Mermaid si es la demo del compilador
    if (demoType === 'compiler') {
        setTimeout(() => {
            const mermaidDiv = document.querySelector('#demoCompiler .mermaid');
            if (mermaidDiv && !mermaidDiv.getAttribute('data-processed')) {
                mermaid.init(undefined, mermaidDiv);
            }
        }, 100);
    }
}

// ===== DEMO 2: FIELDMASK INTERACTIVO =====
function runFieldMaskDemo() {
    const canvas = document.getElementById('fieldMaskCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 10);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    // Obtener campos seleccionados
    const checkboxes = document.querySelectorAll('.field-checkbox');
    const selectedFields = [];
    checkboxes.forEach(cb => {
        if (cb.checked) {
            selectedFields.push(cb.value);
        }
    });

    // Objeto completo
    const fullUser = {
        id: 12345,
        name: "Carlos Jiménez",
        email: "carlos.jimenez@example.com",
        age: 35,
        roles: ["customer", "premium"],
        metadata: {
            created: "2024-01-15",
            lastLogin: "2024-11-08"
        }
    };

    // Objeto filtrado
    const filteredUser = {};
    selectedFields.forEach(field => {
        if (field.includes('.')) {
            const parts = field.split('.');
            if (!filteredUser[parts[0]]) filteredUser[parts[0]] = {};
            filteredUser[parts[0]][parts[1]] = fullUser[parts[0]][parts[1]];
        } else {
            filteredUser[field] = fullUser[field];
        }
    });

    // Dibujar request
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, width, 90);
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, width, 90);

    ctx.fillStyle = '#60a5fa';
    ctx.font = 'bold 11px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('📤 Request con FieldMask:', 10, 15);

    ctx.fillStyle = '#ffffff';
    ctx.font = '9px monospace';
    ctx.fillText('{', 10, 30);
    ctx.fillText('  "fieldMask": "' + selectedFields.join(',') + '",', 10, 45);
    ctx.fillText('  "userId": 12345', 10, 60);
    ctx.fillText('}', 10, 75);

    // Dibujar response
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 100, width, 100);
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 100, width, 100);

    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 11px Arial';
    ctx.fillText('📥 Response (solo campos solicitados):', 10, 115);

    ctx.fillStyle = '#ffffff';
    ctx.font = '9px monospace';
    const responseJson = JSON.stringify(filteredUser, null, 2);
    const lines = responseJson.split('\n').slice(0, 5);
    lines.forEach((line, i) => {
        ctx.fillText(line, 10, 130 + i * 12);
    });
    if (responseJson.split('\n').length > 5) {
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('...', 10, 130 + 5 * 12);
    }

    // Calcular ahorro
    const fullSize = JSON.stringify(fullUser).length;
    const filteredSize = JSON.stringify(filteredUser).length;
    const savings = ((fullSize - filteredSize) / fullSize * 100).toFixed(0);

    document.getElementById('fieldMaskInfo').textContent =
        `✅ ${selectedFields.length} campos | Ahorro: ${savings}% (${fullSize - filteredSize} bytes)`;
    document.getElementById('fieldMaskResult').innerHTML =
        `<i class="fas fa-filter"></i> FieldMask reduce payload en <strong>${savings}%</strong> enviando solo campos necesarios`;
}
