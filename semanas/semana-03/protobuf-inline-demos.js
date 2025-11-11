// ===== PROTOBUF SIMULACIONES =====
let currentProtobufDemo = 'code';

document.addEventListener('DOMContentLoaded', function () {
    // Tabs de demos Protobuf
    const protobufTabs = document.querySelectorAll('.protobuf-tab');
    protobufTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const demoType = this.getAttribute('data-demo');
            switchProtobufDemo(demoType);
        });
    });

    // Botón iniciar demo Protobuf
    const startProtobufDemo = document.getElementById('startProtobufDemo');
    if (startProtobufDemo) {
        startProtobufDemo.addEventListener('click', function () {
            if (currentProtobufDemo === 'code') {
                const lang = document.getElementById('protobufLang').value;
                runProtobufCodeDemo(lang);
            } else if (currentProtobufDemo === 'evolution') {
                runProtobufEvolutionDemo();
            }
        });
    }
});

function switchProtobufDemo(demoType) {
    currentProtobufDemo = demoType;

    // Actualizar tabs
    document.querySelectorAll('.protobuf-tab').forEach(tab => {
        if (tab.getAttribute('data-demo') === demoType) {
            tab.style.background = 'var(--uide-accent)';
            tab.style.color = '#0f1419';
        } else {
            tab.style.background = 'rgba(255,255,255,0.1)';
            tab.style.color = '#e2e8f0';
        }
    });

    // Mostrar/ocultar contenido
    document.querySelectorAll('.protobuf-demo-content').forEach(content => {
        content.style.display = 'none';
    });

    const activeDemo = document.getElementById(`demo${demoType.charAt(0).toUpperCase() + demoType.slice(1)}`);
    if (activeDemo) {
        activeDemo.style.display = 'flex';
    }

    // Mostrar/ocultar controles
    const controlsDiv = document.getElementById('protobufControls');
    if (demoType === 'evolution') {
        controlsDiv.style.display = 'none';
    } else {
        controlsDiv.style.display = 'block';
    }
}

// ===== DEMO 1: CÓDIGO .PROTO → CÓDIGO GENERADO =====
function runProtobufCodeDemo(lang) {
    animateProtoDefinition();
    setTimeout(() => animateGeneratedCode(lang), 1000);
}

function animateProtoDefinition() {
    const canvas = document.getElementById('protoDefCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const protoCode = [
        'syntax = "proto3";',
        '',
        'message User {',
        '  int32 id = 1;',
        '  string name = 2;',
        '  string email = 3;',
        '  repeated string roles = 4;',
        '}'
    ];

    // Fondo
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, width, height);

    let currentLine = 0;
    const lineHeight = 20;

    const interval = setInterval(() => {
        if (currentLine >= protoCode.length) {
            clearInterval(interval);
            document.getElementById('protoDefInfo').textContent =
                `▭ user.proto | ${protoCode.length} líneas`;
            return;
        }

        const line = protoCode[currentLine];
        const y = 20 + currentLine * lineHeight;

        // Syntax highlighting
        ctx.font = '11px monospace';
        ctx.textAlign = 'left';

        if (line.includes('syntax') || line.includes('message')) {
            ctx.fillStyle = '#c586c0'; // keyword
            const parts = line.split(' ');
            let x = 10;
            parts.forEach((part, i) => {
                if (i === 0) {
                    ctx.fillStyle = '#c586c0';
                } else if (part.includes('"')) {
                    ctx.fillStyle = '#ce9178';
                } else {
                    ctx.fillStyle = '#4ec9b0';
                }
                ctx.fillText(part + ' ', x, y);
                x += ctx.measureText(part + ' ').width;
            });
        } else if (line.includes('int32') || line.includes('string') || line.includes('repeated')) {
            const parts = line.trim().split(' ');
            let x = 20;
            parts.forEach((part, i) => {
                if (i === 0) {
                    ctx.fillStyle = '#4ec9b0'; // type
                } else if (part.includes('=')) {
                    ctx.fillStyle = '#ffffff';
                } else if (!isNaN(part.replace(';', ''))) {
                    ctx.fillStyle = '#b5cea8'; // number
                } else {
                    ctx.fillStyle = '#9cdcfe'; // field name
                }
                ctx.fillText(part + ' ', x, y);
                x += ctx.measureText(part + ' ').width;
            });

            // Resaltar field number
            if (line.includes('=')) {
                const fieldNum = line.match(/= (\d+)/)[1];
                ctx.fillStyle = '#fbbf24';
                ctx.font = 'bold 9px Arial';
                ctx.fillText(`← Field #${fieldNum}`, width - 80, y);
            }
        } else {
            ctx.fillStyle = '#ffd700';
            ctx.fillText(line, 10, y);
        }

        currentLine++;
        document.getElementById('protoDefInfo').textContent =
            `📝 Definiendo línea ${currentLine}/${protoCode.length}...`;
    }, 200);
}

function animateGeneratedCode(lang) {
    const canvas = document.getElementById('generatedCodeCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const codeExamples = {
        python: [
            'class User(message.Message):',
            '    id = proto.Field(',
            '        proto.INT32, number=1',
            '    )',
            '    name = proto.Field(',
            '        proto.STRING, number=2',
            '    )',
            '    email = proto.Field(',
            '        proto.STRING, number=3',
            '    )'
        ],
        java: [
            'public class User {',
            '  private int id;',
            '  private String name;',
            '  private String email;',
            '  ',
            '  public int getId() {',
            '    return id;',
            '  }',
            '  // setters...',
            '}'
        ],
        go: [
            'type User struct {',
            '  Id    int32    `protobuf:"1"`',
            '  Name  string   `protobuf:"2"`',
            '  Email string   `protobuf:"3"`',
            '  Roles []string `protobuf:"4"`',
            '}',
            '',
            'func (u *User) GetId() int32 {',
            '  return u.Id',
            '}'
        ]
    };

    const code = codeExamples[lang];

    // Fondo
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, width, height);

    // Título del lenguaje
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Generated ${lang.toUpperCase()} Code`, width / 2, 15);

    let currentLine = 0;
    const lineHeight = 18;

    const interval = setInterval(() => {
        if (currentLine >= code.length) {
            clearInterval(interval);
            document.getElementById('generatedCodeInfo').textContent =
                `✅ ${lang.toUpperCase()} | ${code.length} líneas generadas`;
            document.getElementById('protoCodeResult').innerHTML =
                `<i class="fas fa-magic"></i> Protoc genera código <strong>type-safe</strong> automáticamente para ${lang}`;
            return;
        }

        const line = code[currentLine];
        const y = 35 + currentLine * lineHeight;

        // Syntax highlighting básico
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';

        if (line.includes('class') || line.includes('public') || line.includes('type') || line.includes('func')) {
            ctx.fillStyle = '#c586c0';
        } else if (line.includes('int') || line.includes('string') || line.includes('String')) {
            ctx.fillStyle = '#4ec9b0';
        } else if (line.includes('return')) {
            ctx.fillStyle = '#c586c0';
        } else {
            ctx.fillStyle = '#d4d4d4';
        }

        ctx.fillText(line, 10, y);

        currentLine++;
        document.getElementById('generatedCodeInfo').textContent =
            `⚙️ Generando ${lang}... ${currentLine}/${code.length}`;
    }, 150);
}

// ===== DEMO 2: EVOLUCIÓN DE ESQUEMA =====
function runProtobufEvolutionDemo() {
    const canvas = document.getElementById('evolutionCanvas');
    if (!canvas) return;

    const { width, height } = getCanvasDimensions(canvas, 24);
    const ctx = setupHighDPICanvas(canvas, width, height);
    ctx.clearRect(0, 0, width, height);

    const versions = [
        {
            version: 'v1.0',
            code: [
                'message User {',
                '  int32 id = 1;',
                '  string name = 2;',
                '}'
            ],
            color: '#60a5fa',
            y: 50
        },
        {
            version: 'v2.0',
            code: [
                'message User {',
                '  int32 id = 1;',
                '  string name = 2;',
                '  string email = 3;  // ← Nuevo campo',
                '}'
            ],
            color: '#fbbf24',
            y: 180
        },
        {
            version: 'v3.0',
            code: [
                'message User {',
                '  int32 id = 1;',
                '  string name = 2;',
                '  string email = 3;',
                '  repeated string roles = 4;  // ← Nuevo',
                '}'
            ],
            color: '#4ade80',
            y: 310
        }
    ];

    let currentVersion = 0;

    const interval = setInterval(() => {
        if (currentVersion >= versions.length) {
            clearInterval(interval);

            // Dibujar flechas de compatibilidad
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 3;
            ctx.setLineDash([5, 5]);

            // v1 → v2
            ctx.beginPath();
            ctx.moveTo(width / 2, 120);
            ctx.lineTo(width / 2, 180);
            ctx.stroke();

            // v2 → v3
            ctx.beginPath();
            ctx.moveTo(width / 2, 250);
            ctx.lineTo(width / 2, 310);
            ctx.stroke();

            ctx.setLineDash([]);

            // Etiquetas de compatibilidad
            ctx.fillStyle = '#22c55e';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('√ Compatible', width / 2 + 60, 150);
            ctx.fillText('√ Compatible', width / 2 + 60, 280);

            document.getElementById('evolutionInfo').textContent =
                `√ 3 versiones | Compatibilidad retroactiva`;
            document.getElementById('evolutionResult').innerHTML =
                `<i class="fas fa-code-branch"></i> Field numbers permiten <strong>evolución sin ruptura</strong> - clientes antiguos siguen funcionando`;
            return;
        }

        const ver = versions[currentVersion];

        // Caja de versión
        ctx.fillStyle = ver.color + '30';
        ctx.fillRect(20, ver.y, width - 40, 100);
        ctx.strokeStyle = ver.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(20, ver.y, width - 40, 100);

        // Etiqueta de versión
        ctx.fillStyle = ver.color;
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(ver.version, 30, ver.y + 20);

        // Código
        ctx.font = '10px monospace';
        ctx.fillStyle = '#ffffff';
        ver.code.forEach((line, i) => {
            const y = ver.y + 40 + i * 15;

            if (line.includes('// ←')) {
                const parts = line.split('// ←');
                ctx.fillStyle = '#d4d4d4';
                ctx.fillText(parts[0], 35, y);
                ctx.fillStyle = '#22c55e';
                ctx.font = 'bold 10px Arial';
                ctx.fillText('// ← ' + parts[1], 35 + ctx.measureText(parts[0]).width, y);
                ctx.font = '10px monospace';
            } else {
                ctx.fillStyle = '#d4d4d4';
                ctx.fillText(line, 35, y);
            }

            // Resaltar field numbers
            if (line.includes('=')) {
                const match = line.match(/= (\d+)/);
                if (match) {
                    ctx.fillStyle = '#fbbf24';
                    ctx.fillRect(canvas.width - 60, y - 10, 20, 12);
                    ctx.fillStyle = '#0f1419';
                    ctx.font = 'bold 9px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(match[1], canvas.width - 50, y);
                    ctx.textAlign = 'left';
                    ctx.font = '10px monospace';
                }
            }
        });

        currentVersion++;
        document.getElementById('evolutionInfo').textContent =
            `📦 Versión ${ver.version} | ${currentVersion}/3`;
    }, 1200);
}
