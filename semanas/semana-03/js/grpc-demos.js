// ===== GRPC SIMULACIONES =====
let currentGrpcDemo = 'rpc';

document.addEventListener('DOMContentLoaded', function () {
    // Tabs de demos gRPC
    const grpcTabs = document.querySelectorAll('.grpc-tab');
    grpcTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const demoType = this.getAttribute('data-demo');
            switchGrpcDemo(demoType);
        });
    });

    // Botón iniciar demo gRPC
    const startGrpcDemo = document.getElementById('startGrpcDemo');
    if (startGrpcDemo) {
        startGrpcDemo.addEventListener('click', function () {
            if (currentGrpcDemo === 'rpc') {
                runRpcFlowDemo();
            } else if (currentGrpcDemo === 'payload') {
                runPayloadComparisonDemo();
            }
        });
    }
});

function switchGrpcDemo(demoType) {
    currentGrpcDemo = demoType;

    // Actualizar tabs
    document.querySelectorAll('.grpc-tab').forEach(tab => {
        if (tab.getAttribute('data-demo') === demoType) {
            tab.style.background = 'var(--uide-accent)';
            tab.style.color = '#0f1419';
        } else {
            tab.style.background = 'rgba(255,255,255,0.1)';
            tab.style.color = '#e2e8f0';
        }
    });

    // Mostrar/ocultar contenido
    document.querySelectorAll('.grpc-demo-content').forEach(content => {
        content.style.display = 'none';
    });

    const activeDemo = document.getElementById(`demo${demoType.charAt(0).toUpperCase() + demoType.slice(1)}`);
    if (activeDemo) {
        activeDemo.style.display = 'flex';
    }
}

// ===== DEMO 1: RPC FLOW - Visualización de llamada remota =====
function runRpcFlowDemo() {
    const canvas = document.getElementById('rpcCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const clientX = 50;
    const serverX = width - 80;
    const centerX = width / 2;

    // Dibujar cliente y servidor
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(clientX - 25, 20, 50, 50);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('▯', clientX, 42);
    ctx.fillText('Client', clientX, 58);

    ctx.fillStyle = '#4ade80';
    ctx.fillRect(serverX - 25, 20, 50, 50);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('◉', serverX, 42);
    ctx.fillText('Server', serverX, 58);

    const steps = [
        { name: '1. Invocación Método', y: 100, desc: 'getUserById(123)', color: '#60a5fa', time: 5 },
        { name: '2. Serialización Protobuf', y: 160, desc: 'Objeto → Binario', color: '#a78bfa', time: 8 },
        { name: '3. HTTP/2 Stream', y: 220, desc: 'Envío por red', color: '#fbbf24', time: 15 },
        { name: '4. Deserialización', y: 280, desc: 'Binario → Objeto', color: '#f472b6', time: 7 },
        { name: '5. Ejecución', y: 340, desc: 'Lógica del servidor', color: '#22c55e', time: 20 },
        { name: '6. Respuesta', y: 400, desc: 'Retorno al cliente', color: '#4ade80', time: 12 }
    ];

    let currentStep = 0;
    let totalTime = 0;

    const interval = setInterval(() => {
        if (currentStep >= steps.length) {
            clearInterval(interval);
            document.getElementById('rpcInfo').textContent =
                `⚡ Tiempo total: ${totalTime}ms | Latencia ultra-baja`;
            document.getElementById('rpcResult').innerHTML =
                `<i class="fas fa-bolt"></i> gRPC completa la llamada RPC en <strong>${totalTime}ms</strong> con serialización binaria`;
            return;
        }

        const step = steps[currentStep];

        // Dibujar paso
        ctx.fillStyle = step.color + '30';
        ctx.fillRect(20, step.y - 20, width - 40, 50);
        ctx.strokeStyle = step.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(20, step.y - 20, width - 40, 50);

        // Título del paso
        ctx.fillStyle = step.color;
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(step.name, 30, step.y - 5);

        // Descripción
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Arial';
        ctx.fillText(step.desc, 30, step.y + 10);

        // Tiempo
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 9px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`${step.time}ms`, width - 30, step.y + 5);

        // Animación de flujo
        if (currentStep === 2) {
            // HTTP/2 Stream - mostrar paquete viajando
            let progress = 0;
            const streamInterval = setInterval(() => {
                progress += 10;
                if (progress > 100) {
                    clearInterval(streamInterval);
                    return;
                }

                const x = clientX + ((serverX - clientX) * progress) / 100;

                ctx.clearRect(clientX + 30, step.y + 15, serverX - clientX - 60, 15);

                // Línea de conexión
                ctx.strokeStyle = step.color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(clientX + 30, step.y + 22);
                ctx.lineTo(x, step.y + 22);
                ctx.stroke();

                // Paquete
                ctx.fillStyle = step.color;
                ctx.fillRect(x - 8, step.y + 18, 16, 8);
                ctx.fillStyle = '#ffffff';
                ctx.font = '8px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('📦', x, step.y + 24);
            }, 20);
        } else if (currentStep === 5) {
            // Respuesta - paquete regresando
            let progress = 0;
            const responseInterval = setInterval(() => {
                progress += 10;
                if (progress > 100) {
                    clearInterval(responseInterval);
                    return;
                }

                const x = serverX - ((serverX - clientX) * progress) / 100;

                ctx.clearRect(clientX + 30, step.y + 15, serverX - clientX - 60, 15);

                // Línea de conexión
                ctx.strokeStyle = step.color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(serverX - 30, step.y + 22);
                ctx.lineTo(x, step.y + 22);
                ctx.stroke();

                // Paquete
                ctx.fillStyle = step.color;
                ctx.fillRect(x - 8, step.y + 18, 16, 8);
                ctx.fillStyle = '#ffffff';
                ctx.font = '8px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('√', x, step.y + 24);
            }, 20);
        }

        totalTime += step.time;
        currentStep++;

        document.getElementById('rpcInfo').textContent =
            `⚡ Paso ${currentStep}/${steps.length} | Tiempo: ${totalTime}ms`;
    }, 600);
}

// ===== DEMO 2: PAYLOAD COMPARISON - JSON vs Protobuf =====
function runPayloadComparisonDemo() {
    const userData = {
        id: 12345,
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        age: 28,
        active: true,
        roles: ['user', 'admin'],
        created_at: '2024-01-15T10:30:00Z',
        metadata: {
            last_login: '2024-11-08T14:22:00Z',
            login_count: 156
        }
    };

    animateJsonPayload(userData);
    setTimeout(() => animateProtobufPayload(userData), 100);
}

function animateJsonPayload(data) {
    const canvas = document.getElementById('jsonCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    // JSON string
    const jsonStr = JSON.stringify(data, null, 2);
    const jsonSize = new Blob([jsonStr]).size;

    // Dibujar JSON
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(10, 10, width - 20, height - 20);
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Contenido JSON
    const lines = jsonStr.split('\n').slice(0, 10);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '8px monospace';
    ctx.textAlign = 'left';

    lines.forEach((line, i) => {
        ctx.fillText(line.substring(0, 50), 15, 25 + i * 12);
    });

    if (jsonStr.split('\n').length > 10) {
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('...', 15, 25 + 10 * 12);
    }

    // Visualización de bytes
    const bytesPerRow = 20;
    const totalBytes = jsonSize;
    const rows = Math.ceil(totalBytes / bytesPerRow);

    ctx.fillStyle = '#60a5fa';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${totalBytes} bytes`, width / 2, height - 10);

    document.getElementById('jsonSize').textContent =
        `▭ Tamaño: ${jsonSize} bytes | Texto legible`;
}

function animateProtobufPayload(data) {
    const canvas = document.getElementById('protobufCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    // Calcular tamaño aproximado de Protobuf (60-70% del JSON)
    const jsonSize = new Blob([JSON.stringify(data)]).size;
    const protobufSize = Math.floor(jsonSize * 0.35); // ~65% reducción

    // Dibujar contenedor
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(10, 10, width - 20, height - 20);
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Representación binaria
    ctx.font = '9px monospace';
    ctx.textAlign = 'left';

    // Generar representación binaria visual
    let y = 25;
    for (let i = 0; i < 8; i++) {
        let line = '';
        for (let j = 0; j < 16; j++) {
            const byte = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
            line += byte + ' ';
        }

        ctx.fillStyle = '#4ade80';
        ctx.fillText(line, 15, y);
        y += 12;
    }

    ctx.fillStyle = '#94a3b8';
    ctx.fillText('...', 15, y);

    // Etiquetas de campos
    ctx.fillStyle = '#fbbf24';
    ctx.font = '8px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('Field 1: id', width - 15, 35);
    ctx.fillText('Field 2: name', width - 15, 50);
    ctx.fillText('Field 3: email', width - 15, 65);
    ctx.fillText('Field 4: age', width - 15, 80);
    ctx.fillText('...', width - 15, 95);

    // Tamaño
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${protobufSize} bytes`, width / 2, height - 10);

    document.getElementById('protobufSize').textContent =
        `📦 Tamaño: ${protobufSize} bytes | Binario compacto`;

    // Calcular reducción
    const reduction = ((jsonSize - protobufSize) / jsonSize * 100).toFixed(0);
    const savedBytes = jsonSize - protobufSize;

    document.getElementById('payloadResult').innerHTML =
        `<i class="fas fa-compress-alt"></i> Protobuf reduce <strong>${reduction}%</strong> el tamaño (${savedBytes} bytes ahorrados)`;
}
