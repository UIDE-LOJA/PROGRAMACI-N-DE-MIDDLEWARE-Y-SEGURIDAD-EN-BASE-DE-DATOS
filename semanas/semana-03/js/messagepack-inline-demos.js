// ===== MESSAGEPACK SIMULACIONES =====
let currentMsgPackDemo = 'radar';

document.addEventListener('DOMContentLoaded', function () {
    // Tabs de demos MessagePack
    const msgpackTabs = document.querySelectorAll('.msgpack-tab');
    msgpackTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const demoType = this.getAttribute('data-demo');
            switchMsgPackDemo(demoType);
        });
    });

    // Botón iniciar demo MessagePack
    const startMsgPackDemo = document.getElementById('startMsgPackDemo');
    if (startMsgPackDemo) {
        startMsgPackDemo.addEventListener('click', function () {
            if (currentMsgPackDemo === 'radar') {
                runRadarDemo();
            } else if (currentMsgPackDemo === 'usecases') {
                runUseCasesDemo();
            }
        });
    }
});

function switchMsgPackDemo(demoType) {
    currentMsgPackDemo = demoType;

    // Actualizar tabs
    document.querySelectorAll('.msgpack-tab').forEach(tab => {
        if (tab.getAttribute('data-demo') === demoType) {
            tab.style.background = 'var(--uide-accent)';
            tab.style.color = '#0f1419';
        } else {
            tab.style.background = 'rgba(255,255,255,0.1)';
            tab.style.color = '#e2e8f0';
        }
    });

    // Mostrar/ocultar contenido
    document.querySelectorAll('.msgpack-demo-content').forEach(content => {
        content.style.display = 'none';
    });

    const activeDemo = document.getElementById(`demo${demoType.charAt(0).toUpperCase() + demoType.slice(1)}`);
    if (activeDemo) {
        activeDemo.style.display = 'flex';
    }
}

// ===== DEMO 1: GRÁFICO DE RADAR COMPARATIVO =====
function runRadarDemo() {
    const canvas = document.getElementById('radarCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 60;

    const axes = [
        { name: 'Velocidad', angle: -Math.PI / 2 },
        { name: 'Tamaño', angle: -Math.PI / 2 + (2 * Math.PI / 5) },
        { name: 'Complejidad', angle: -Math.PI / 2 + (4 * Math.PI / 5) },
        { name: 'Interop', angle: -Math.PI / 2 + (6 * Math.PI / 5) },
        { name: 'Madurez', angle: -Math.PI / 2 + (8 * Math.PI / 5) }
    ];

    const technologies = [
        {
            name: 'JSON',
            color: '#60a5fa',
            values: [0.6, 0.6, 1.0, 1.0, 1.0] // Velocidad, Tamaño, Complejidad, Interop, Madurez
        },
        {
            name: 'Protobuf',
            color: '#22c55e',
            values: [1.0, 1.0, 0.4, 0.6, 0.8]
        },
        {
            name: 'MessagePack',
            color: '#fbbf24',
            values: [0.8, 0.8, 0.8, 0.7, 0.7]
        }
    ];

    // Dibujar ejes y círculos concéntricos
    for (let i = 1; i <= 5; i++) {
        const r = (radius * i) / 5;
        ctx.strokeStyle = '#94a3b8' + (i === 5 ? 'ff' : '33');
        ctx.lineWidth = i === 5 ? 2 : 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Dibujar ejes
    axes.forEach((axis, i) => {
        const x = centerX + radius * Math.cos(axis.angle);
        const y = centerY + radius * Math.sin(axis.angle);

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Etiquetas
        const labelX = centerX + (radius + 30) * Math.cos(axis.angle);
        const labelY = centerY + (radius + 30) * Math.sin(axis.angle);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(axis.name, labelX, labelY);
    });

    // Animar tecnologías
    let currentTech = 0;
    let progress = 0;

    const interval = setInterval(() => {
        if (currentTech >= technologies.length) {
            clearInterval(interval);
            document.getElementById('radarInfo').textContent =
                `▊ 3 tecnologías comparadas en 5 dimensiones`;
            document.getElementById('radarResult').innerHTML =
                `<i class="fas fa-balance-scale"></i> MessagePack es el <strong>punto medio ideal</strong> entre velocidad y simplicidad`;
            return;
        }

        progress += 0.05;
        if (progress > 1) {
            progress = 1;
        }

        const tech = technologies[currentTech];

        // Dibujar polígono
        ctx.fillStyle = tech.color + '40';
        ctx.strokeStyle = tech.color;
        ctx.lineWidth = 3;
        ctx.beginPath();

        axes.forEach((axis, i) => {
            const value = tech.values[i] * progress;
            const r = radius * value;
            const x = centerX + r * Math.cos(axis.angle);
            const y = centerY + r * Math.sin(axis.angle);

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            // Puntos
            ctx.fillStyle = tech.color;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Leyenda
        const legendY = 20 + currentTech * 20;
        ctx.fillStyle = tech.color;
        ctx.fillRect(20, legendY, 15, 15);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(tech.name, 40, legendY + 11);

        if (progress >= 1) {
            currentTech++;
            progress = 0;
        }

        document.getElementById('radarInfo').textContent =
            `▊ Dibujando ${tech.name}... (${currentTech + 1}/3)`;
    }, 30);
}

// ===== DEMO 2: CASOS DE USO =====
function runUseCasesDemo() {
    const canvas = document.getElementById('usecasesCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const useCases = [
        {
            tech: 'JSON',
            color: '#60a5fa',
            cases: [
                '◉ API REST para partners',
                '▯ App móvil Banco de Loja',
                '🔧 Configuración de servicios',
                '📝 Logs y auditoría'
            ],
            y: 30
        },
        {
            tech: 'Protobuf',
            color: '#22c55e',
            cases: [
                '⚡ Microsservicios internos',
                '▲ Procesamiento transacciones',
                '◉ Eventos entre servicios',
                '⊠ Datos sensibles encriptados'
            ],
            y: 180
        },
        {
            tech: 'MessagePack',
            color: '#fbbf24',
            cases: [
                '▣ Cache de sesiones (Redis)',
                '◈ Cola de transacciones',
                '≈ Balance velocidad/simplicidad',
                '↻ Sincronizacion de datos'
            ],
            y: 330
        }
    ];

    let currentCase = 0;

    const interval = setInterval(() => {
        if (currentCase >= useCases.length) {
            clearInterval(interval);
            document.getElementById('usecasesInfo').textContent =
                `✅ 3 tecnologías | 12 casos de uso`;
            document.getElementById('usecasesResult').innerHTML =
                `<i class="fas fa-lightbulb"></i> Cada tecnología tiene su <strong>caso de uso ideal</strong> según requisitos`;
            return;
        }

        const useCase = useCases[currentCase];

        // Título de la tecnología
        ctx.fillStyle = useCase.color;
        ctx.fillRect(10, useCase.y, width - 20, 40);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(useCase.tech, width / 2, useCase.y + 25);

        // Casos de uso
        useCase.cases.forEach((caseText, i) => {
            const y = useCase.y + 55 + i * 22;

            // Bullet point
            ctx.fillStyle = useCase.color;
            ctx.beginPath();
            ctx.arc(25, y - 5, 4, 0, Math.PI * 2);
            ctx.fill();

            // Texto
            ctx.fillStyle = '#ffffff';
            ctx.font = '11px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(caseText, 40, y);
        });

        currentCase++;

        document.getElementById('usecasesInfo').textContent =
            `📋 Mostrando casos de uso (${currentCase}/3)`;
    }, 800);
}
