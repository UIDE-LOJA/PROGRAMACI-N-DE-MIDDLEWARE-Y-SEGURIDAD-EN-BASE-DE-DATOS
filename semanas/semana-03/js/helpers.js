// ===== FUNCIONES HELPER PARA CANVAS DE ALTA RESOLUCIÓN =====

/**
 * Configura un canvas para renderizado de alta resolución (DPR)
 * @param {HTMLCanvasElement} canvas - Elemento canvas
 * @param {number} width - Ancho lógico en píxeles
 * @param {number} height - Alto lógico en píxeles
 * @returns {CanvasRenderingContext2D} Contexto del canvas escalado
 */
function setupHighDPICanvas(canvas, width, height) {
    const dpr = window.devicePixelRatio || 1;

    // Configurar dimensiones físicas del canvas (con DPR)
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Configurar dimensiones CSS (visuales)
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    // Obtener contexto y escalar
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Agregar propiedades lógicas para compatibilidad con código existente
    canvas.logicalWidth = width;
    canvas.logicalHeight = height;

    return ctx;
}

/**
 * Obtiene las dimensiones del contenedor del canvas
 * @param {HTMLCanvasElement} canvas - Elemento canvas
 * @param {number} padding - Padding a restar (default: 16)
 * @returns {Object} Objeto con propiedades {width, height}
 */
function getCanvasDimensions(canvas, padding = 16) {
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    return {
        width: rect.width - padding,
        height: Math.max(rect.height - padding, 150) // Mínimo 150px
    };
}
