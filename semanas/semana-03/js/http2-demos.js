// ===== HTTP/2 SIMULACIONES VISUALES CON CASOS DE USO REALES =====
let currentHttp2Demo = 'multiplex';

document.addEventListener('DOMContentLoaded', function () {
    // Tabs de demos
    const tabs = document.querySelectorAll('.http2-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const demoType = this.getAttribute('data-demo');
            switchHttp2Demo(demoType);
        });
    });

    // Botón iniciar demo
    const startHttp2Demo = document.getElementById('startHttp2Demo');
    if (startHttp2Demo) {
        startHttp2Demo.addEventListener('click', function () {
            const requests = parseInt(document.getElementById('http2Requests').value) || 6;

            if (currentHttp2Demo === 'multiplex') {
                runHttp2Comparison(requests);
            } else if (currentHttp2Demo === 'hpack') {
                runHpackDemo(requests);
            } else if (currentHttp2Demo === 'push') {
                runServerPushDemo();
            }
        });
    }
});

function switchHttp2Demo(demoType) {
    currentHttp2Demo = demoType;

    // Actualizar tabs
    document.querySelectorAll('.http2-tab').forEach(tab => {
        if (tab.getAttribute('data-demo') === demoType) {
            tab.style.background = 'var(--uide-accent)';
            tab.style.color = '#0f1419';
        } else {
            tab.style.background = 'rgba(255,255,255,0.1)';
            tab.style.color = '#e2e8f0';
        }
    });

    // Mostrar/ocultar contenido
    document.querySelectorAll('.http2-demo-content').forEach(content => {
        content.style.display = 'none';
    });

    const activeDemo = document.getElementById(`demo${demoType.charAt(0).toUpperCase() + demoType.slice(1)}`);
    if (activeDemo) {
        activeDemo.style.display = 'flex';
        
        // Renderizar Mermaid si es el diagrama
        if (demoType === 'diagrama') {
            setTimeout(() => {
                const mermaidElements = activeDemo.querySelectorAll('.mermaid');
                mermaidElements.forEach(element => {
                    if (!element.getAttribute('data-processed')) {
                        mermaid.run({ nodes: [element] });
                    }
                });
            }, 100);
        }
    }

    // Mostrar/ocultar controles según demo
    const controlsDiv = document.getElementById('http2Controls');
    if (demoType === 'push') {
        controlsDiv.style.display = 'none';
    } else {
        controlsDiv.style.display = 'block';
    }
}

// ===== DEMO 1: MULTIPLEXACIÓN - Dashboard Banco de Loja =====
function runHttp2Comparison(numRequests) {
    const resources = [
        { name: 'Saldo cuenta', icon: '$', size: '15KB', color: '#60a5fa' },
        { name: 'Transacciones', icon: '▊', size: '25KB', color: '#f472b6' },
        { name: 'Tarjetas', icon: '▭', size: '12KB', color: '#fbbf24' },
        { name: 'Notificaciones', icon: '◉', size: '8KB', color: '#4ade80' },
        { name: 'Inversiones', icon: '▲', size: '18KB', color: '#a78bfa' },
        { name: 'Sucursales', icon: '■', size: '22KB', color: '#fb923c' },
        { name: 'Créditos', icon: '≡', size: '16KB', color: '#ec4899' },
        { name: 'Promociones', icon: '◎', size: '14KB', color: '#14b8a6' },
        { name: 'Perfil usuario', icon: '▯', size: '10KB', color: '#f59e0b' },
        { name: 'Seguridad', icon: '⊠', size: '9KB', color: '#8b5cf6' }
    ];

    const selectedResources = resources.slice(0, numRequests);
    simulateHttp1Visual(selectedResources);
    setTimeout(() => simulateHttp2Visual(selectedResources), 100);
}

function simulateHttp1Visual(resources) {
    const canvas = document.getElementById('http1Canvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const resourceHeight = 35;
    const gap = 8;
    const clientX = 30;
    const serverX = width - 80;
    const pipeWidth = serverX - clientX - 60;

    let currentResource = 0;
    let totalTime = 0;

    // Dibujar cliente y servidor
    function drawEndpoints() {
        // Cliente
        ctx.fillStyle = '#60a5fa';
        ctx.fillRect(clientX - 15, 10, 30, height - 20);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('CLIENT', clientX, height / 2);

        // Servidor
        ctx.fillStyle = '#f87171';
        ctx.fillRect(serverX - 15, 10, 30, height - 20);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('SERVER', serverX, height / 2);
    }

    drawEndpoints();

    const interval = setInterval(() => {
        if (currentResource >= resources.length) {
            clearInterval(interval);
            document.getElementById('http1Time').innerHTML = `<i class="fas fa-stopwatch"></i> Tiempo Total: ${totalTime}ms | <i class="fas fa-circle" style="color: #f87171;"></i> Bloqueante`;
            return;
        }

        const resource = resources[currentResource];
        const y = 30 + currentResource * (resourceHeight + gap);

        // Animación de request y response
        let progress = 0;
        const animInterval = setInterval(() => {
            progress += 4;
            if (progress > 200) {
                clearInterval(animInterval);
                currentResource++;
                return;
            }

            ctx.clearRect(clientX + 20, y - 5, pipeWidth + 40, resourceHeight + 10);

            // Request (cliente → servidor)
            if (progress <= 100) {
                const reqProgress = (pipeWidth * progress) / 100;
                ctx.fillStyle = resource.color;
                ctx.globalAlpha = 0.7;
                ctx.fillRect(clientX + 20, y + 5, reqProgress, 10);

                // Paquete animado
                ctx.globalAlpha = 1;
                ctx.fillStyle = resource.color;
                ctx.fillRect(clientX + 20 + reqProgress - 15, y, 15, 20);
                ctx.fillStyle = '#ffffff';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(resource.icon, clientX + 20 + reqProgress - 7, y + 14);
            }

            // Response (servidor → cliente)
            if (progress > 100) {
                const respProgress = (pipeWidth * (progress - 100)) / 100;
                ctx.fillStyle = resource.color;
                ctx.globalAlpha = 0.7;
                ctx.fillRect(serverX - 40 - respProgress, y + 20, respProgress, 10);

                // Paquete animado
                ctx.globalAlpha = 1;
                ctx.fillStyle = resource.color;
                ctx.fillRect(serverX - 40 - respProgress, y + 15, 15, 20);
                ctx.fillStyle = '#ffffff';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(resource.icon, serverX - 40 - respProgress + 7, y + 29);
            }

            // Etiqueta del recurso
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#ffffff';
            ctx.font = '9px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(resource.name, clientX + 25, y - 8);
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(resource.size, clientX + 120, y - 8);

            totalTime += 10;
            document.getElementById('http1Time').innerHTML = `<i class="fas fa-stopwatch"></i> Tiempo: ${Math.round(totalTime)}ms | <i class="fas fa-circle" style="color: #f87171;"></i> Bloqueante`;
        }, 25);
    }, 500);
}

function simulateHttp2Visual(resources) {
    const canvas = document.getElementById('http2Canvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const resourceHeight = 35;
    const gap = 8;
    const clientX = 30;
    const serverX = width - 80;
    const pipeWidth = serverX - clientX - 60;

    // Dibujar cliente y servidor
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(clientX - 15, 10, 30, height - 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CLIENT', clientX, height / 2);

    ctx.fillStyle = '#4ade80';
    ctx.fillRect(serverX - 15, 10, 30, height - 20);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('SERVER', serverX, height / 2);

    // Dibujar conexión única
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(clientX + 20, height / 2);
    ctx.lineTo(serverX - 20, height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Todos los recursos en paralelo
    const progresses = resources.map(() => ({ req: 0, resp: 0 }));
    let maxTime = 0;

    const interval = setInterval(() => {
        let allComplete = true;

        resources.forEach((resource, i) => {
            const y = 30 + i * (resourceHeight + gap);

            if (progresses[i].req < 100) {
                allComplete = false;
                progresses[i].req += 4;
            } else if (progresses[i].resp < 100) {
                allComplete = false;
                progresses[i].resp += 4;
            }

            ctx.clearRect(clientX + 20, y - 10, pipeWidth + 40, resourceHeight + 15);

            // Request
            if (progresses[i].req <= 100) {
                const reqProgress = (pipeWidth * progresses[i].req) / 100;
                ctx.fillStyle = resource.color;
                ctx.globalAlpha = 0.5;
                ctx.fillRect(clientX + 20, y + 5, reqProgress, 8);

                if (progresses[i].req < 100) {
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = resource.color;
                    ctx.fillRect(clientX + 20 + reqProgress - 12, y, 12, 18);
                    ctx.fillStyle = '#ffffff';
                    ctx.font = '10px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(resource.icon, clientX + 20 + reqProgress - 6, y + 12);
                }
            }

            // Response
            if (progresses[i].req >= 100 && progresses[i].resp <= 100) {
                const respProgress = (pipeWidth * progresses[i].resp) / 100;
                ctx.fillStyle = resource.color;
                ctx.globalAlpha = 0.5;
                ctx.fillRect(serverX - 40 - respProgress, y + 18, respProgress, 8);

                if (progresses[i].resp < 100) {
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = resource.color;
                    ctx.fillRect(serverX - 40 - respProgress, y + 13, 12, 18);
                    ctx.fillStyle = '#ffffff';
                    ctx.font = '10px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(resource.icon, serverX - 40 - respProgress + 6, y + 25);
                }
            }

            // Etiqueta
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#ffffff';
            ctx.font = '9px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(resource.name, clientX + 25, y - 8);
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(resource.size, clientX + 120, y - 8);

            // Stream ID
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 8px Arial';
            ctx.fillText(`#${i + 1}`, clientX + 180, y - 8);
        });

        maxTime += 25;
        document.getElementById('http2Time').innerHTML = `<i class="fas fa-stopwatch"></i> Tiempo: ${maxTime}ms | <i class="fas fa-circle" style="color: #4ade80;"></i> Paralelo`;

        if (allComplete) {
            clearInterval(interval);
            const http1Total = resources.length * 500;
            const improvement = ((http1Total - maxTime) / http1Total * 100).toFixed(1);
            document.getElementById('http2Improvement').innerHTML =
                `<i class="fas fa-rocket"></i> HTTP/2 carga la página <strong>${improvement}% más rápido</strong> con multiplexación en una sola conexión`;
        }
    }, 25);
}

// ===== DEMO 2: HPACK - Visualización de Paquetes de Red =====
function runHpackDemo(numRequests) {
    const headers = [
        { key: ':method', value: 'GET', size: 10 },
        { key: ':scheme', value: 'https', size: 12 },
        { key: ':path', value: '/api/accounts/balance', size: 28 },
        { key: ':authority', value: 'api.bancodeloja.fin.ec', size: 28 },
        { key: 'user-agent', value: 'BancoLoja-App/2.1.0', size: 25 },
        { key: 'accept', value: 'application/json', size: 22 },
        { key: 'accept-encoding', value: 'gzip, deflate, br', size: 25 },
        { key: 'accept-language', value: 'es-EC,es;q=0.9', size: 22 },
        { key: 'cache-control', value: 'no-cache', size: 18 },
        { key: 'authorization', value: 'Bearer JWT_TOKEN...', size: 45 }
    ];

    animateHttp1Headers(headers, numRequests);
    setTimeout(() => animateHttp2Headers(headers, numRequests), 100);
}

function animateHttp1Headers(headers, numRequests) {
    const canvas = document.getElementById('hpackHttp1Canvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    let totalSize = 0;
    let currentReq = 0;

    const interval = setInterval(() => {
        if (currentReq >= numRequests) {
            clearInterval(interval);
            document.getElementById('hpackHttp1Size').innerHTML =
                `<i class="fas fa-box"></i> Total: ${totalSize} bytes | <i class="fas fa-circle" style="color: #f87171;"></i> Sin compresion`;
            return;
        }

        const y = 15 + currentReq * 55;
        const headerSize = headers.reduce((sum, h) => sum + h.size, 0);
        totalSize += headerSize;

        // Paquete
        const packetWidth = Math.min((width - 100) * (headerSize / 300), width - 100);

        ctx.fillStyle = 'rgba(248, 113, 113, 0.2)';
        ctx.fillRect(80, y, packetWidth, 45);
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 2;
        ctx.strokeRect(80, y, packetWidth, 45);

        // Etiqueta
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Request ${currentReq + 1}`, 10, y + 12);

        // Headers dentro del paquete
        ctx.font = '8px monospace';
        ctx.fillStyle = '#e2e8f0';
        headers.slice(0, 5).forEach((h, i) => {
            ctx.fillText(`${h.key}: ${h.value}`, 85, y + 15 + i * 8);
        });
        if (headers.length > 5) {
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(`... +${headers.length - 5} más`, 85, y + 55);
        }

        // Tamaño
        ctx.fillStyle = '#f87171';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`${headerSize}B`, width - 10, y + 25);

        document.getElementById('hpackHttp1Size').innerHTML =
            `<i class="fas fa-box"></i> Acumulado: ${totalSize} bytes | <i class="fas fa-circle" style="color: #f87171;"></i> Sin compresión`;

        currentReq++;
    }, 400);
}

function animateHttp2Headers(headers, numRequests) {
    const canvas = document.getElementById('hpackHttp2Canvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    // Tabla de índices HPACK
    ctx.fillStyle = 'rgba(74, 222, 128, 0.1)';
    ctx.fillRect(10, 10, width - 20, 50);
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, width - 20, 50);

    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 9px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('▤ HPACK Static Table', 15, 22);

    ctx.font = '7px monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('[1]:method GET  [2]:scheme https  [3]:path /  [4]:authority', 15, 35);
    ctx.fillText('[15]:accept-encoding gzip  [16]:accept-language  [17]:cache-control', 15, 45);
    ctx.fillText('[32]:authorization  [33]:user-agent  ...', 15, 55);

    let totalSize = 0;
    let currentReq = 0;

    const interval = setInterval(() => {
        if (currentReq >= numRequests) {
            clearInterval(interval);
            const http1Total = headers.reduce((sum, h) => sum + h.size, 0) * numRequests;
            const reduction = ((http1Total - totalSize) / http1Total * 100).toFixed(1);
            document.getElementById('hpackHttp2Size').innerHTML =
                `<i class="fas fa-box"></i> Total: ${totalSize} bytes | <i class="fas fa-circle" style="color: #4ade80;"></i> Comprimido`;
            document.getElementById('hpackImprovement').innerHTML =
                `<i class="fas fa-compress-arrows-alt"></i> HPACK ahorra <strong>${http1Total - totalSize} bytes (${reduction}%)</strong> usando tabla de índices`;
            return;
        }

        const y = 75 + currentReq * 55;

        // Primera request: headers completos
        // Siguientes: solo índices
        const isFirst = currentReq === 0;
        const headerSize = isFirst ?
            headers.reduce((sum, h) => sum + h.size, 0) :
            Math.floor(headers.length * 2.5); // ~2.5 bytes por índice

        totalSize += headerSize;

        const packetWidth = Math.min((width - 100) * (headerSize / 300), width - 100);

        // Paquete
        ctx.fillStyle = isFirst ? 'rgba(74, 222, 128, 0.2)' : 'rgba(34, 197, 94, 0.2)';
        ctx.fillRect(80, y, packetWidth, 45);
        ctx.strokeStyle = isFirst ? '#4ade80' : '#22c55e';
        ctx.lineWidth = 2;
        ctx.strokeRect(80, y, packetWidth, 45);

        // Etiqueta
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Request ${currentReq + 1}`, 10, y + 12);

        // Contenido
        ctx.font = '8px monospace';
        if (isFirst) {
            ctx.fillStyle = '#e2e8f0';
            headers.slice(0, 4).forEach((h, i) => {
                ctx.fillText(`${h.key}: ${h.value}`, 85, y + 15 + i * 8);
            });
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(`... +${headers.length - 4} más`, 85, y + 47);
        } else {
            ctx.fillStyle = '#fbbf24';
            ctx.fillText('# Índices: [1][2][3:12345][4]', 85, y + 20);
            ctx.fillText('[33][15][16][17][32:Bearer...]', 85, y + 30);
            ctx.fillStyle = '#22c55e';
            ctx.font = 'bold 8px Arial';
            ctx.fillText('√ Referencia a tabla', 85, y + 42);
        }

        // Tamaño
        ctx.fillStyle = isFirst ? '#4ade80' : '#22c55e';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`${headerSize}B`, width - 10, y + 25);

        if (!isFirst) {
            ctx.fillStyle = '#fbbf24';
            ctx.font = '8px Arial';
            ctx.fillText('↓ 90%', width - 10, y + 38);
        }

        document.getElementById('hpackHttp2Size').innerHTML =
            `<i class="fas fa-box"></i> Acumulado: ${totalSize} bytes | <i class="fas fa-circle" style="color: #4ade80;"></i> Comprimido`;

        currentReq++;
    }, 400);
}

// ===== DEMO 3: SERVER PUSH - E-commerce Product Page =====
function runServerPushDemo() {
    const resources = [
        { name: 'dashboard.html', icon: '▭', desc: 'Dashboard bancario', time: 50 },
        { name: 'banking.css', icon: '◨', desc: 'Estilos', time: 40 },
        { name: 'app.js', icon: '⚡', desc: 'Lógica app', time: 60 },
        { name: 'promociones.json', icon: '◎', desc: 'Ofertas activas', time: 30 },
        { name: 'tasas.json', icon: '▊', desc: 'Tasas de interés', time: 25 }
    ];

    animateHttp1Push(resources);
    setTimeout(() => animateHttp2Push(resources), 100);
}

function animateHttp1Push(resources) {
    const canvas = document.getElementById('pushHttp1Canvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const clientX = 40;
    const serverX = width - 60;
    const centerX = width / 2;

    // Dibujar endpoints
    ctx.fillStyle = '#f87171';
    ctx.fillRect(clientX - 20, 20, 40, 40);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('▯', clientX, 38);
    ctx.fillText('Browser', clientX, 52);

    ctx.fillStyle = '#f87171';
    ctx.fillRect(serverX - 20, 20, 40, 40);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('◉', serverX, 38);
    ctx.fillText('Server', serverX, 52);

    let http1Time = 0;
    let currentResource = 0;

    const http1Interval = setInterval(() => {
        if (currentResource >= resources.length) {
            clearInterval(http1Interval);
            document.getElementById('pushHttp1Time').textContent =
                `⏱️ Total: ${http1Time}ms | 🔴 ${resources.length} round-trips`;
            return;
        }

        const resource = resources[currentResource];
        const y = 80 + currentResource * 70;

        // Request (cliente → servidor)
        let requestProgress = 0;
        const requestInterval = setInterval(() => {
            requestProgress += 8;
            if (requestProgress > 100) {
                clearInterval(requestInterval);

                // Response (servidor → cliente)
                setTimeout(() => {
                    let responseProgress = 0;
                    const responseInterval = setInterval(() => {
                        responseProgress += 8;
                        if (responseProgress > 100) {
                            clearInterval(responseInterval);
                            currentResource++;
                            return;
                        }

                        ctx.clearRect(0, y - 15, width, 70);

                        // Título del recurso
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 11px Arial';
                        ctx.textAlign = 'left';
                        ctx.fillText(`${resource.icon} ${resource.name}`, 10, y - 5);
                        ctx.font = '9px Arial';
                        ctx.fillStyle = '#94a3b8';
                        ctx.fillText(resource.desc, 10, y + 8);

                        // Request arrow (completo)
                        ctx.fillStyle = '#60a5fa';
                        ctx.fillRect(clientX + 25, y + 15, centerX - clientX - 35, 6);
                        ctx.beginPath();
                        ctx.moveTo(centerX - 10, y + 18);
                        ctx.lineTo(centerX, y + 13);
                        ctx.lineTo(centerX, y + 23);
                        ctx.fill();

                        ctx.fillStyle = '#60a5fa';
                        ctx.font = '8px Arial';
                        ctx.textAlign = 'center';
                        ctx.fillText('REQUEST', centerX - 50, y + 12);

                        // Response arrow (animado)
                        const respWidth = ((centerX - clientX - 35) * responseProgress) / 100;
                        ctx.fillStyle = '#4ade80';
                        ctx.fillRect(serverX - 25 - respWidth, y + 30, respWidth, 6);
                        ctx.beginPath();
                        ctx.moveTo(serverX - 25 - respWidth, y + 33);
                        ctx.lineTo(serverX - 25 - respWidth - 10, y + 28);
                        ctx.lineTo(serverX - 25 - respWidth - 10, y + 38);
                        ctx.fill();

                        ctx.fillStyle = '#4ade80';
                        ctx.font = '8px Arial';
                        ctx.textAlign = 'center';
                        ctx.fillText('RESPONSE', centerX + 50, y + 42);

                        // Tiempo
                        ctx.fillStyle = '#fbbf24';
                        ctx.font = 'bold 9px Arial';
                        ctx.textAlign = 'right';
                        ctx.fillText(`+${resource.time}ms`, width - 10, y + 25);

                        http1Time += 5;
                        document.getElementById('pushHttp1Time').textContent =
                            `⏱️ Tiempo: ${http1Time}ms | 🔴 Esperando...`;
                    }, 20);
                }, 50);
                return;
            }

            ctx.clearRect(0, y - 15, width, 70);

            // Título
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 11px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(`${resource.icon} ${resource.name}`, 10, y - 5);
            ctx.font = '9px Arial';
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(resource.desc, 10, y + 8);

            // Request arrow (animado)
            const reqWidth = ((centerX - clientX - 35) * requestProgress) / 100;
            ctx.fillStyle = '#60a5fa';
            ctx.fillRect(clientX + 25, y + 15, reqWidth, 6);
            ctx.beginPath();
            ctx.moveTo(clientX + 25 + reqWidth, y + 18);
            ctx.lineTo(clientX + 25 + reqWidth + 10, y + 13);
            ctx.lineTo(clientX + 25 + reqWidth + 10, y + 23);
            ctx.fill();

            ctx.fillStyle = '#60a5fa';
            ctx.font = '8px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('REQUEST', centerX - 50, y + 12);

            http1Time += 5;
            document.getElementById('pushHttp1Time').textContent =
                `⏱️ Tiempo: ${http1Time}ms | 🔴 Solicitando...`;
        }, 20);
    }, 200);
}

function animateHttp2Push(resources) {
    const canvas = document.getElementById('pushHttp2Canvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const clientX = 40;
    const serverX = width - 60;
    const centerX = width / 2;

    // Dibujar endpoints
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(clientX - 20, 20, 40, 40);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('▯', clientX, 38);
    ctx.fillText('Browser', clientX, 52);

    ctx.fillStyle = '#4ade80';
    ctx.fillRect(serverX - 20, 20, 40, 40);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('◉', serverX, 38);
    ctx.fillText('Server', serverX, 52);

    let http2Time = 0;

    // Request inicial solo para el HTML
    const firstResource = resources[0];
    const y0 = 80;

    let initialProgress = 0;
    const initialInterval = setInterval(() => {
        initialProgress += 8;
        if (initialProgress > 100) {
            clearInterval(initialInterval);

            // Server Push de todos los demás recursos simultáneamente
            const pushResources = resources.slice(1);
            const pushProgresses = pushResources.map(() => 0);

            const pushInterval = setInterval(() => {
                let allComplete = true;

                pushProgresses.forEach((prog, i) => {
                    if (prog < 100) {
                        allComplete = false;
                        pushProgresses[i] += 8;
                    }
                });

                ctx.clearRect(0, 150, width, height - 150);

                pushResources.forEach((resource, i) => {
                    const y = 160 + i * 60;

                    // Título
                    ctx.fillStyle = '#fbbf24';
                    ctx.font = 'bold 10px Arial';
                    ctx.textAlign = 'left';
                    ctx.fillText('▲ PUSH', 10, y - 5);

                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 11px Arial';
                    ctx.fillText(`${resource.icon} ${resource.name}`, 60, y - 5);
                    ctx.font = '9px Arial';
                    ctx.fillStyle = '#94a3b8';
                    ctx.fillText(resource.desc, 60, y + 8);

                    // Push arrow (servidor → cliente, sin request previo)
                    const pushWidth = ((centerX - clientX - 35) * pushProgresses[i]) / 100;
                    ctx.fillStyle = '#22c55e';
                    ctx.fillRect(serverX - 25 - pushWidth, y + 15, pushWidth, 8);
                    ctx.beginPath();
                    ctx.moveTo(serverX - 25 - pushWidth, y + 19);
                    ctx.lineTo(serverX - 25 - pushWidth - 10, y + 13);
                    ctx.lineTo(serverX - 25 - pushWidth - 10, y + 25);
                    ctx.fill();

                    ctx.fillStyle = '#22c55e';
                    ctx.font = 'bold 8px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('PUSH (sin request)', centerX, y + 12);

                    // Checkmark cuando completa
                    if (pushProgresses[i] >= 100) {
                        ctx.fillStyle = '#22c55e';
                        ctx.font = 'bold 14px Arial';
                        ctx.fillText('√', clientX - 30, y + 22);
                    }
                });

                http2Time += 5;
                document.getElementById('pushHttp2Time').innerHTML =
                    `<i class="fas fa-stopwatch"></i> Tiempo: ${http2Time}ms | <i class="fas fa-circle" style="color: #4ade80;"></i> Push proactivo`;

                if (allComplete) {
                    clearInterval(pushInterval);

                    // Calcular mejora
                    const http1Total = resources.reduce((sum, r) => sum + r.time, 0) + (resources.length * 50);
                    const savedTime = http1Total - http2Time;
                    const improvement = ((savedTime / http1Total) * 100).toFixed(1);

                    document.getElementById('pushHttp2Time').textContent =
                        `⏱️ Total: ${http2Time}ms | 🟢 1 round-trip`;
                    document.getElementById('pushImprovement').innerHTML =
                        `<i class="fas fa-rocket"></i> Server Push ahorra <strong>${savedTime}ms (${improvement}%)</strong> enviando recursos proactivamente`;
                }
            }, 20);
            return;
        }

        ctx.clearRect(0, y0 - 15, canvas.width, 70);

        // Título
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`${firstResource.icon} ${firstResource.name}`, 10, y0 - 5);
        ctx.font = '9px Arial';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(firstResource.desc, 10, y0 + 8);

        // Request arrow
        const reqWidth = ((centerX - clientX - 35) * initialProgress) / 100;
        ctx.fillStyle = '#60a5fa';
        ctx.fillRect(clientX + 25, y0 + 15, reqWidth, 6);
        ctx.beginPath();
        ctx.moveTo(clientX + 25 + reqWidth, y0 + 18);
        ctx.lineTo(clientX + 25 + reqWidth + 10, y0 + 13);
        ctx.lineTo(clientX + 25 + reqWidth + 10, y0 + 23);
        ctx.fill();

        // Response arrow
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(serverX - 25 - reqWidth, y0 + 30, reqWidth, 6);
        ctx.beginPath();
        ctx.moveTo(serverX - 25 - reqWidth, y0 + 33);
        ctx.lineTo(serverX - 25 - reqWidth - 10, y0 + 28);
        ctx.lineTo(serverX - 25 - reqWidth - 10, y0 + 38);
        ctx.fill();

        http2Time += 5;
        document.getElementById('pushHttp2Time').textContent =
            `⏱️ Tiempo: ${http2Time}ms | 🟢 Cargando HTML...`;
    }, 20);
}
