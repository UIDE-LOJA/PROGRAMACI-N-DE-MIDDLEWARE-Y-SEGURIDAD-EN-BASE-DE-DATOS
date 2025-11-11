// ===== GRPC LIMITACIONES SIMULACIONES =====
if (typeof currentGrpcLimitDemo === 'undefined') {
    var currentGrpcLimitDemo = 'dependencies';
}

document.addEventListener('DOMContentLoaded', function () {
    // Tabs de demos gRPC Limitaciones
    const grpcLimitTabs = document.querySelectorAll('.grpc-limit-tab');
    grpcLimitTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const demoType = this.getAttribute('data-demo');
            switchGrpcLimitDemo(demoType);
        });
    });

    // Botón iniciar demo gRPC Limitaciones
    const startGrpcLimitDemo = document.getElementById('startGrpcLimitDemo');
    if (startGrpcLimitDemo) {
        startGrpcLimitDemo.addEventListener('click', function () {
            if (currentGrpcLimitDemo === 'dependencies') {
                runDependenciesDemo();
            } else if (currentGrpcLimitDemo === 'updates') {
                runUpdatesDemo();
            }
        });
    }
});

function switchGrpcLimitDemo(demoType) {
    currentGrpcLimitDemo = demoType;

    // Actualizar tabs
    document.querySelectorAll('.grpc-limit-tab').forEach(tab => {
        if (tab.getAttribute('data-demo') === demoType) {
            tab.style.background = 'var(--uide-accent)';
            tab.style.color = '#0f1419';
        } else {
            tab.style.background = 'rgba(255,255,255,0.1)';
            tab.style.color = '#e2e8f0';
        }
    });

    // Mostrar/ocultar contenido
    document.querySelectorAll('.grpc-limit-demo-content').forEach(content => {
        content.style.display = 'none';
    });

    const activeDemo = document.getElementById(`demo${demoType.charAt(0).toUpperCase() + demoType.slice(1)}`);
    if (activeDemo) {
        activeDemo.style.display = 'flex';
    }
}

// ===== DEMO 1: GRÁFICO DE DEPENDENCIAS =====
function runDependenciesDemo() {
    const canvas = document.getElementById('dependenciesCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    // gRPC en el centro
    ctx.fillStyle = '#f87171';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('gRPC', centerX, centerY - 5);
    ctx.font = '10px Arial';
    ctx.fillText('Core', centerX, centerY + 8);

    // Dependencias
    const dependencies = [
        { name: 'HTTP/2', color: '#60a5fa', angle: 0 },
        { name: 'Protobuf', color: '#a78bfa', angle: Math.PI / 4 },
        { name: 'OpenSSL', color: '#f472b6', angle: Math.PI / 2 },
        { name: 'c-ares', color: '#fbbf24', angle: 3 * Math.PI / 4 },
        { name: 'zlib', color: '#4ade80', angle: Math.PI },
        { name: 'abseil', color: '#fb923c', angle: 5 * Math.PI / 4 },
        { name: 're2', color: '#14b8a6', angle: 3 * Math.PI / 2 },
        { name: 'upb', color: '#8b5cf6', angle: 7 * Math.PI / 4 }
    ];

    const radius = 150;
    let currentDep = 0;

    const interval = setInterval(() => {
        if (currentDep >= dependencies.length) {
            clearInterval(interval);

            // Comparación con HTTP/REST
            ctx.fillStyle = '#4ade80';
            ctx.beginPath();
            ctx.arc(centerX + 200, 80, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 10px Arial';
            ctx.fillText('HTTP', centerX + 200, 78);
            ctx.fillText('REST', centerX + 200, 90);

            // Pocas dependencias
            ctx.fillStyle = '#22c55e';
            ctx.beginPath();
            ctx.arc(centerX + 200, 130, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.font = '8px Arial';
            ctx.fillText('JSON', centerX + 200, 133);

            ctx.fillStyle = '#22c55e';
            ctx.beginPath();
            ctx.arc(centerX + 240, 100, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.fillText('TLS', centerX + 240, 103);

            // Líneas
            ctx.strokeStyle = '#4ade80';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(centerX + 200, 110);
            ctx.lineTo(centerX + 200, 115);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 200, 110);
            ctx.lineTo(centerX + 230, 100);
            ctx.stroke();

            document.getElementById('dependenciesInfo').textContent =
                `📦 gRPC: ${dependencies.length} deps | HTTP/REST: 2-3 deps`;
            document.getElementById('dependenciesResult').innerHTML =
                `<i class="fas fa-exclamation-triangle"></i> gRPC tiene <strong>${dependencies.length - 2}x más dependencias</strong> que HTTP/REST`;
            return;
        }

        const dep = dependencies[currentDep];
        const x = centerX + Math.cos(dep.angle) * radius;
        const y = centerY + Math.sin(dep.angle) * radius;

        // Línea de conexión
        ctx.strokeStyle = dep.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Nodo de dependencia
        ctx.fillStyle = dep.color;
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();

        // Nombre
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(dep.name, x, y + 3);

        // Icono de actualización
        ctx.fillStyle = '#fbbf24';
        ctx.font = '12px Arial';
        ctx.fillText('⚠', x + 20, y - 20);

        currentDep++;

        document.getElementById('dependenciesInfo').textContent =
            `▣ Dependencias: ${currentDep}/${dependencies.length}`;
    }, 300);
}

// ===== DEMO 2: TIMELINE DE ACTUALIZACIONES =====
function runUpdatesDemo() {
    const canvas = document.getElementById('updatesCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    // Timeline
    const startY = 50;
    const endY = height - 50;
    const lineX = 80;

    // Línea principal
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(lineX, startY);
    ctx.lineTo(lineX, endY);
    ctx.stroke();

    // Etiquetas de tiempo
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const monthHeight = (endY - startY) / 12;

    months.forEach((month, i) => {
        const y = startY + i * monthHeight;

        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(month, lineX - 10, y + 3);

        // Marca
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(lineX - 5, y);
        ctx.lineTo(lineX + 5, y);
        ctx.stroke();
    });

    // Actualizaciones de gRPC (frecuentes)
    const grpcUpdates = [
        { month: 0, type: 'security', desc: 'Security patch' },
        { month: 1, type: 'minor', desc: 'Minor update' },
        { month: 2, type: 'security', desc: 'CVE fix' },
        { month: 3, type: 'major', desc: 'Major release' },
        { month: 4, type: 'security', desc: 'Security patch' },
        { month: 5, type: 'minor', desc: 'Bug fixes' },
        { month: 6, type: 'security', desc: 'CVE fix' },
        { month: 7, type: 'minor', desc: 'Minor update' },
        { month: 8, type: 'security', desc: 'Security patch' },
        { month: 9, type: 'minor', desc: 'Bug fixes' },
        { month: 10, type: 'security', desc: 'CVE fix' },
        { month: 11, type: 'major', desc: 'Major release' }
    ];

    let currentUpdate = 0;

    const interval = setInterval(() => {
        if (currentUpdate >= grpcUpdates.length) {
            clearInterval(interval);

            // Comparación con HTTP/REST
            ctx.fillStyle = '#4ade80';
            ctx.font = 'bold 11px Arial';
            ctx.textAlign = 'left';
            ctx.fillText('HTTP/REST: 2-3 actualizaciones/año', lineX + 200, 30);

            // Pocas actualizaciones
            [2, 6, 10].forEach((month, i) => {
                const y = startY + month * monthHeight;
                ctx.fillStyle = '#4ade80';
                ctx.beginPath();
                ctx.arc(lineX + 220, y, 8, 0, Math.PI * 2);
                ctx.fill();
            });

            document.getElementById('updatesInfo').textContent =
                `📅 gRPC: ${grpcUpdates.length} updates/año | HTTP: 2-3 updates/año`;
            document.getElementById('updatesResult').innerHTML =
                `<i class="fas fa-sync-alt"></i> gRPC requiere <strong>4x más actualizaciones</strong> que HTTP/REST`;
            return;
        }

        const update = grpcUpdates[currentUpdate];
        const y = startY + update.month * monthHeight;

        // Color según tipo
        let color;
        if (update.type === 'security') color = '#f87171';
        else if (update.type === 'major') color = '#fbbf24';
        else color = '#60a5fa';

        // Punto en timeline
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(lineX, y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Línea al texto
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(lineX + 10, y);
        ctx.lineTo(lineX + 30, y);
        ctx.stroke();

        // Descripción
        ctx.fillStyle = '#ffffff';
        ctx.font = '9px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(update.desc, lineX + 35, y + 3);

        // Icono según tipo
        ctx.font = '10px Arial';
        if (update.type === 'security') {
            ctx.fillText('⊠', lineX + 120, y + 3);
        } else if (update.type === 'major') {
            ctx.fillText('▲', lineX + 120, y + 3);
        } else {
            ctx.fillText('🔧', lineX + 120, y + 3);
        }

        currentUpdate++;

        document.getElementById('updatesInfo').textContent =
            `📅 Actualizaciones: ${currentUpdate}/${grpcUpdates.length} en el año`;
    }, 250);
}
