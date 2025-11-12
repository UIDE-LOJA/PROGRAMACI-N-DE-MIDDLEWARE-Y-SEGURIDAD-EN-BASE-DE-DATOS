// ===== WEBSOCKET DEMOS INLINE =====
// Variable global para el demo actual
let currentWsDemo = 'handshake';

document.addEventListener('DOMContentLoaded', function () {
    // Tabs de demos WebSocket
    const wsTabs = document.querySelectorAll('.ws-tab');
    wsTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const demoType = this.getAttribute('data-demo');
            switchWsDemo(demoType);
        });
    });

    // Botón iniciar demo WebSocket
    const startWsDemo = document.getElementById('startWsDemo');
    if (startWsDemo) {
        startWsDemo.addEventListener('click', function () {
            const messages = parseInt(document.getElementById('wsMessages').value) || 5;

            if (currentWsDemo === 'handshake') {
                runHandshakeDemo(messages);
            } else if (currentWsDemo === 'chat') {
                runChatDemo(messages);
            } else if (currentWsDemo === 'latency') {
                runLatencyDemo(messages);
            }
        });
    }
});

function switchWsDemo(demoType) {
    currentWsDemo = demoType;

    // Actualizar tabs
    document.querySelectorAll('.ws-tab').forEach(tab => {
        if (tab.getAttribute('data-demo') === demoType) {
            tab.style.background = 'var(--uide-accent)';
            tab.style.color = '#0f1419';
        } else {
            tab.style.background = 'rgba(255,255,255,0.1)';
            tab.style.color = '#e2e8f0';
        }
    });

    // Mostrar/ocultar contenido
    document.querySelectorAll('.ws-demo-content').forEach(content => {
        content.style.display = 'none';
    });

    const activeDemo = document.getElementById(`demo${demoType.charAt(0).toUpperCase() + demoType.slice(1)}`);
    if (activeDemo) {
        activeDemo.style.display = 'flex';
    }

    // Mostrar/ocultar controles
    const controlsDiv = document.getElementById('wsControls');
    if (demoType === 'latency') {
        controlsDiv.style.display = 'none';
    } else {
        controlsDiv.style.display = 'block';
    }
}

// ===== DEMO 1: HANDSHAKE - HTTP Polling vs WebSocket =====
function runHandshakeDemo(numMessages) {
    animatePolling(numMessages);
    setTimeout(() => animateWebSocket(numMessages), 100);
}

function animatePolling(numMessages) {
    const canvas = document.getElementById('pollingCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 16);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const clientX = 40;
    const serverX = width - 60;

    // Dibujar endpoints
    ctx.fillStyle = '#f87171';
    ctx.fillRect(clientX - 20, 10, 40, 40);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('▯', clientX, 28);
    ctx.fillText('Client', clientX, 42);

    ctx.fillStyle = '#f87171';
    ctx.fillRect(serverX - 20, 10, 40, 40);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('◉', serverX, 28);
    ctx.fillText('Server', serverX, 42);

    let connections = 0;
    let currentMsg = 0;

    const interval = setInterval(() => {
        if (currentMsg >= numMessages) {
            clearInterval(interval);
            document.getElementById('pollingInfo').textContent =
                `🔴 Total: ${connections} conexiones | Overhead alto`;
            return;
        }

        const y = 70 + (currentMsg % 3) * 40;

        // Nueva conexión para cada mensaje
        connections++;

        let progress = 0;
        const animInterval = setInterval(() => {
            progress += 10;
            if (progress > 200) {
                clearInterval(animInterval);
                currentMsg++;
                return;
            }

            ctx.clearRect(0, y - 5, canvas.width, 35);

            // Handshake + Request
            if (progress <= 100) {
                const width = ((serverX - clientX - 40) * progress) / 100;

                // Línea de conexión
                ctx.strokeStyle = '#f87171';
                ctx.lineWidth = 2;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(clientX + 20, y + 10);
                ctx.lineTo(clientX + 20 + width, y + 10);
                ctx.stroke();
                ctx.setLineDash([]);

                // Paquete
                ctx.fillStyle = '#f87171';
                ctx.fillRect(clientX + 20 + width - 10, y + 5, 10, 10);
                ctx.fillStyle = '#ffffff';
                ctx.font = '8px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('◈', clientX + 20 + width - 5, y + 13);
            }

            // Response + Close
            if (progress > 100) {
                const respProgress = progress - 100;
                const width = ((serverX - clientX - 40) * respProgress) / 100;

                // Línea de respuesta
                ctx.strokeStyle = '#4ade80';
                ctx.lineWidth = 2;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(serverX - 20, y + 20);
                ctx.lineTo(serverX - 20 - width, y + 20);
                ctx.stroke();
                ctx.setLineDash([]);

                // Paquete
                ctx.fillStyle = '#4ade80';
                ctx.fillRect(serverX - 20 - width - 10, y + 15, 10, 10);
                ctx.fillStyle = '#ffffff';
                ctx.font = '8px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('📬', serverX - 20 - width - 5, y + 23);

                // X de cierre
                if (respProgress > 80) {
                    ctx.fillStyle = '#f87171';
                    ctx.font = 'bold 12px Arial';
                    ctx.fillText('×', width / 2, y + 18);
                }
            }

            // Contador
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 9px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(`Conn #${connections}`, 10, y + 15);

            document.getElementById('pollingInfo').textContent =
                `🔴 Conexiones: ${connections} | Polling cada request`;
        }, 15);
    }, 300);
}

function animateWebSocket(numMessages) {
    const canvas = document.getElementById('wsCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 16);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const clientX = 40;
    const serverX = width - 60;

    // Dibujar endpoints
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(clientX - 20, 10, 40, 40);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('▯', clientX, 28);
    ctx.fillText('Client', clientX, 42);

    ctx.fillStyle = '#4ade80';
    ctx.fillRect(serverX - 20, 10, 40, 40);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('◉', serverX, 28);
    ctx.fillText('Server', serverX, 42);

    // Handshake inicial
    let progress = 0;
    const handshakeInterval = setInterval(() => {
        progress += 10;
        if (progress > 100) {
            clearInterval(handshakeInterval);

            // Dibujar conexión persistente
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(clientX + 20, 30);
            ctx.lineTo(serverX - 20, 30);
            ctx.stroke();

            ctx.fillStyle = '#22c55e';
            ctx.font = 'bold 9px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('⚡ CONEXION PERSISTENTE', width / 2, 25);

            // Enviar mensajes por la conexión persistente
            let currentMsg = 0;
            const msgInterval = setInterval(() => {
                if (currentMsg >= numMessages) {
                    clearInterval(msgInterval);
                    document.getElementById('wsInfo').textContent =
                        `🟢 Total: 1 conexión | ${numMessages} mensajes`;

                    const pollingConns = numMessages;
                    const reduction = ((pollingConns - 1) / pollingConns * 100).toFixed(0);
                    document.getElementById('wsHandshakeResult').innerHTML =
                        `<i class="fas fa-bolt"></i> WebSocket reduce <strong>${reduction}% las conexiones</strong> (${pollingConns} → 1)`;
                    return;
                }

                const y = 60 + (currentMsg % 4) * 30;

                let msgProgress = 0;
                const msgAnimInterval = setInterval(() => {
                    msgProgress += 15;
                    if (msgProgress > 100) {
                        clearInterval(msgAnimInterval);
                        currentMsg++;
                        return;
                    }

                    ctx.clearRect(clientX + 25, y - 5, serverX - clientX - 50, 25);

                    // Mensaje viajando
                    const msgX = clientX + 25 + ((serverX - clientX - 50) * msgProgress) / 100;

                    ctx.fillStyle = currentMsg % 2 === 0 ? '#60a5fa' : '#a78bfa';
                    ctx.fillRect(msgX - 8, y, 16, 16);
                    ctx.fillStyle = '#ffffff';
                    ctx.font = '10px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('💬', msgX, y + 11);

                    // Número de mensaje
                    ctx.fillStyle = '#fbbf24';
                    ctx.font = 'bold 8px Arial';
                    ctx.fillText(`#${currentMsg + 1}`, msgX, y - 2);

                    document.getElementById('wsInfo').textContent =
                        `🟢 Conexión: 1 | Mensaje ${currentMsg + 1}/${numMessages}`;
                }, 20);
            }, 250);
            return;
        }

        ctx.clearRect(0, 55, width, 20);

        // Handshake animation
        const lineWidth = ((serverX - clientX - 40) * progress) / 100;
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(clientX + 20, 65);
        ctx.lineTo(clientX + 20 + lineWidth, 65);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 9px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🤝 HTTP Upgrade', width / 2, 60);

        document.getElementById('wsInfo').textContent =
            `🟡 Estableciendo conexión WebSocket...`;
    }, 30);
}

// ===== DEMO 2: CHAT EN TIEMPO REAL =====
function runChatDemo(numMessages) {
    const canvas = document.getElementById('chatCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const messages = [
        { user: 'Cliente', text: 'Hola, necesito ayuda con una transferencia', color: '#60a5fa' },
        { user: 'Soporte BdL', text: 'Con gusto le ayudo. ¿Qué necesita?', color: '#a78bfa' },
        { user: 'Cliente', text: 'No puedo transferir a cuenta del Pichincha', color: '#60a5fa' },
        { user: 'Soporte BdL', text: 'Verifico su cuenta. Un momento por favor', color: '#a78bfa' },
        { user: 'Soporte BdL', text: 'Ya está solucionado. Puede intentar de nuevo', color: '#a78bfa' },
        { user: 'Cliente', text: 'Perfecto! Ya funcionó. Gracias!', color: '#60a5fa' },
        { user: 'Soporte BdL', text: '¿Necesita algo más?', color: '#a78bfa' },
        { user: 'Cliente', text: 'No, eso es todo. Excelente servicio!', color: '#60a5fa' },
        { user: 'Soporte BdL', text: 'Gracias por confiar en Banco de Loja ■', color: '#a78bfa' },
        { user: 'Cliente', text: 'Hasta luego!', color: '#60a5fa' }
    ];

    const selectedMessages = messages.slice(0, numMessages);
    let currentMsg = 0;
    let yOffset = 20;

    // Título
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('💬 Chat Room - WebSocket Connection', canvas.width / 2, 15);

    const interval = setInterval(() => {
        if (currentMsg >= selectedMessages.length) {
            clearInterval(interval);
            document.getElementById('chatInfo').textContent =
                `💬 ${selectedMessages.length} mensajes enviados | Latencia < 10ms`;
            document.getElementById('chatResult').innerHTML =
                `<i class="fas fa-comments"></i> Chat en tiempo real con <strong>comunicación bidireccional simultánea</strong>`;
            return;
        }

        const msg = selectedMessages[currentMsg];
        const isAlice = msg.user === 'Alice';
        const x = isAlice ? 20 : canvas.width - 20;
        const align = isAlice ? 'left' : 'right';

        // Burbuja de mensaje
        const textWidth = ctx.measureText(msg.text).width + 20;
        const bubbleX = isAlice ? x : x - textWidth;

        ctx.fillStyle = msg.color + '30';
        ctx.fillRect(bubbleX, yOffset, textWidth, 40);
        ctx.strokeStyle = msg.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(bubbleX, yOffset, textWidth, 40);

        // Usuario
        ctx.fillStyle = msg.color;
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = align;
        ctx.fillText(msg.user, isAlice ? x + 10 : x - 10, yOffset + 15);

        // Mensaje
        ctx.fillStyle = '#ffffff';
        ctx.font = '9px Arial';
        ctx.fillText(msg.text, isAlice ? x + 10 : x - 10, yOffset + 30);

        // Timestamp
        ctx.fillStyle = '#94a3b8';
        ctx.font = '7px Arial';
        ctx.fillText(`${currentMsg * 0.5}s`, isAlice ? x + 10 : x - 10, yOffset + 38);

        yOffset += 45;
        currentMsg++;

        document.getElementById('chatInfo').textContent =
            `💬 Mensajes: ${currentMsg}/${selectedMessages.length} | En tiempo real`;
    }, 500);
}

// ===== DEMO 3: COMPARACIÓN DE LATENCIA =====
function runLatencyDemo(numTests = 10) {
    const canvas = document.getElementById('latencyCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    // Título
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Latencia: HTTP Polling vs WebSocket', width / 2, 20);

    // Leyenda
    ctx.fillStyle = '#f87171';
    ctx.fillRect(20, 35, 15, 15);
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('HTTP Polling', 40, 47);

    ctx.fillStyle = '#4ade80';
    ctx.fillRect(width / 2 + 20, 35, 15, 15);
    ctx.fillText('WebSocket', width / 2 + 40, 47);

    // Ejes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 80);
    ctx.lineTo(40, 380);
    ctx.lineTo(width - 40, 380);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Latencia (ms)', 20, 230);
    ctx.fillText('Requests', width / 2, 395);

    // Escala Y
    for (let i = 0; i <= 5; i++) {
        const y = 380 - (i * 60);
        const latency = i * 50;
        ctx.fillStyle = '#94a3b8';
        ctx.font = '8px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`${latency}`, 35, y + 3);

        ctx.strokeStyle = '#94a3b833';
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(width - 40, y);
        ctx.stroke();
    }

    let currentTest = 0;
    const pollingLatencies = [];
    const wsLatencies = [];

    const interval = setInterval(() => {
        if (currentTest >= numTests) {
            clearInterval(interval);

            const avgPolling = pollingLatencies.reduce((a, b) => a + b, 0) / pollingLatencies.length;
            const avgWs = wsLatencies.reduce((a, b) => a + b, 0) / wsLatencies.length;
            const improvement = ((avgPolling - avgWs) / avgPolling * 100).toFixed(0);

            document.getElementById('latencyInfo').textContent =
                `▊ Polling: ${avgPolling.toFixed(0)}ms | WebSocket: ${avgWs.toFixed(0)}ms`;
            document.getElementById('latencyResult').innerHTML =
                `<i class="fas fa-tachometer-alt"></i> WebSocket es <strong>${improvement}% más rápido</strong> (${(avgPolling - avgWs).toFixed(0)}ms menos latencia)`;
            return;
        }

        // Generar latencias simuladas
        const pollingLatency = 150 + Math.random() * 100; // 150-250ms
        const wsLatency = 5 + Math.random() * 15; // 5-20ms

        pollingLatencies.push(pollingLatency);
        wsLatencies.push(wsLatency);

        const x = 50 + (currentTest * ((width - 100) / numTests));

        // Barra HTTP Polling
        const pollingHeight = (pollingLatency / 250) * 300;
        ctx.fillStyle = '#f87171';
        ctx.fillRect(x - 8, 380 - pollingHeight, 8, pollingHeight);

        // Barra WebSocket
        const wsHeight = (wsLatency / 250) * 300;
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(x + 2, 380 - wsHeight, 8, wsHeight);

        // Valores
        ctx.fillStyle = '#f87171';
        ctx.font = '7px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${pollingLatency.toFixed(0)}`, x - 4, 380 - pollingHeight - 3);

        ctx.fillStyle = '#4ade80';
        ctx.fillText(`${wsLatency.toFixed(0)}`, x + 6, 380 - wsHeight - 3);

        currentTest++;

        const avgPolling = pollingLatencies.reduce((a, b) => a + b, 0) / pollingLatencies.length;
        const avgWs = wsLatencies.reduce((a, b) => a + b, 0) / wsLatencies.length;

        document.getElementById('latencyInfo').textContent =
            `▊ Test ${currentTest}/${numTests} | Polling: ${avgPolling.toFixed(0)}ms | WS: ${avgWs.toFixed(0)}ms`;
    }, 400);
}
