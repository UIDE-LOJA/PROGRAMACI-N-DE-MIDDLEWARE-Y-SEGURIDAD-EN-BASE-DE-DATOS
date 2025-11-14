/**
 * JWT Demo - Semana 4
 * Demostración de creación y verificación de JWT con RS256
 * 
 * Requisitos:
 * - Node.js instalado
 * - Claves RSA generadas (private_key.pem y public_key.pem)
 * 
 * Uso:
 * node jwt-demo.js
 */

const crypto = require('crypto');
const fs = require('fs');

// Colores para consola
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

// Función para imprimir con color
function print(message, color = colors.reset) {
    console.log(color + message + colors.reset);
}

// Función para codificar en Base64URL
function base64url(source) {
    let encodedSource = Buffer.from(source).toString('base64');
    encodedSource = encodedSource.replace(/=+$/, '');
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
    return encodedSource;
}

// Función para decodificar Base64URL
function base64urlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return Buffer.from(str, 'base64').toString();
}

// Crear JWT
function createJWT(payload, privateKey) {
    // Header
    const header = {
        alg: 'RS256',
        typ: 'JWT'
    };
    
    const encodedHeader = base64url(JSON.stringify(header));
    const encodedPayload = base64url(JSON.stringify(payload));
    
    // Firma
    const signature = crypto.createSign('RSA-SHA256');
    signature.update(encodedHeader + '.' + encodedPayload);
    signature.end();
    
    const encodedSignature = base64url(signature.sign(privateKey));
    
    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

// Verificar JWT
function verifyJWT(token, publicKey) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        return { valid: false, error: 'Token inválido: formato incorrecto' };
    }
    
    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    
    try {
        // Decodificar header y payload
        const header = JSON.parse(base64urlDecode(encodedHeader));
        const payload = JSON.parse(base64urlDecode(encodedPayload));
        
        // Verificar expiración
        if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
            return { valid: false, error: 'Token expirado', header, payload };
        }
        
        // Verificar firma
        const verify = crypto.createVerify('RSA-SHA256');
        verify.update(encodedHeader + '.' + encodedPayload);
        verify.end();
        
        // Decodificar signature de base64url a buffer
        let signature = encodedSignature.replace(/-/g, '+').replace(/_/g, '/');
        while (signature.length % 4) signature += '=';
        
        const isValid = verify.verify(publicKey, signature, 'base64');
        
        if (isValid) {
            return { valid: true, header, payload };
        }
        
        return { valid: false, error: 'Firma inválida', header, payload };
    } catch (error) {
        return { valid: false, error: error.message };
    }
}

// Función principal
function main() {
    print('\n' + '='.repeat(70), colors.cyan);
    print('  JWT DEMO - Semana 4: Criptografía Aplicada', colors.bright + colors.cyan);
    print('='.repeat(70) + '\n', colors.cyan);
    
    // Verificar que existen las claves
    if (!fs.existsSync('private_key.pem') || !fs.existsSync('public_key.pem')) {
        print('❌ ERROR: No se encontraron las claves RSA', colors.red);
        print('\nGenera las claves con estos comandos:', colors.yellow);
        print('  openssl genrsa -out private_key.pem 2048', colors.cyan);
        print('  openssl rsa -in private_key.pem -pubout -out public_key.pem\n', colors.cyan);
        process.exit(1);
    }
    
    // Leer claves
    const privateKey = fs.readFileSync('private_key.pem', 'utf8');
    const publicKey = fs.readFileSync('public_key.pem', 'utf8');
    
    print('✅ Claves RSA cargadas correctamente\n', colors.green);
    
    // Crear payload
    const now = Math.floor(Date.now() / 1000);
    const payload = {
        sub: '1',
        username: 'jperez',
        email: 'jperez@uide.edu.ec',
        role: 'user',
        iat: now,
        exp: now + (60 * 60) // 1 hora
    };
    
    print('📝 PASO 1: Crear JWT', colors.bright + colors.blue);
    print('-'.repeat(70), colors.blue);
    print('\nPayload:', colors.yellow);
    console.log(JSON.stringify(payload, null, 2));
    
    const token = createJWT(payload, privateKey);
    
    print('\n✅ JWT Generado:', colors.green);
    print(token, colors.cyan);
    
    // Mostrar partes del token
    const parts = token.split('.');
    print('\n📦 Estructura del JWT:', colors.yellow);
    print(`  Header:    ${parts[0]}`, colors.cyan);
    print(`  Payload:   ${parts[1]}`, colors.cyan);
    print(`  Signature: ${parts[2]}`, colors.cyan);
    
    // Decodificar header y payload
    print('\n🔍 Header decodificado:', colors.yellow);
    console.log(JSON.parse(base64urlDecode(parts[0])));
    
    print('\n🔍 Payload decodificado:', colors.yellow);
    console.log(JSON.parse(base64urlDecode(parts[1])));
    
    // Verificar token válido
    print('\n\n📝 PASO 2: Verificar JWT Válido', colors.bright + colors.blue);
    print('-'.repeat(70), colors.blue);
    
    const result = verifyJWT(token, publicKey);
    
    if (result.valid) {
        print('\n✅ TOKEN VÁLIDO', colors.bright + colors.green);
        print('\nDatos verificados:', colors.yellow);
        console.log(JSON.stringify(result.payload, null, 2));
    } else {
        print('\n❌ TOKEN INVÁLIDO', colors.bright + colors.red);
        print(`Razón: ${result.error}`, colors.red);
    }
    
    // Probar con token manipulado
    print('\n\n📝 PASO 3: Probar Integridad (Token Manipulado)', colors.bright + colors.blue);
    print('-'.repeat(70), colors.blue);
    
    const tamperedToken = token.slice(0, -10) + 'XXXXXXXXXX';
    print('\nToken manipulado (últimos 10 caracteres cambiados):', colors.yellow);
    print(tamperedToken, colors.cyan);
    
    const tamperedResult = verifyJWT(tamperedToken, publicKey);
    
    if (tamperedResult.valid) {
        print('\n⚠️  ADVERTENCIA: Token manipulado fue aceptado (esto NO debería pasar)', colors.red);
    } else {
        print('\n✅ CORRECTO: Token manipulado fue rechazado', colors.bright + colors.green);
        print(`Razón: ${tamperedResult.error}`, colors.yellow);
    }
    
    // Probar con token expirado
    print('\n\n📝 PASO 4: Probar Token Expirado', colors.bright + colors.blue);
    print('-'.repeat(70), colors.blue);
    
    const expiredPayload = {
        ...payload,
        iat: now - 7200,  // Emitido hace 2 horas
        exp: now - 3600   // Expiró hace 1 hora
    };
    
    const expiredToken = createJWT(expiredPayload, privateKey);
    print('\nToken con fecha de expiración pasada:', colors.yellow);
    print(expiredToken, colors.cyan);
    
    const expiredResult = verifyJWT(expiredToken, publicKey);
    
    if (expiredResult.valid) {
        print('\n⚠️  ADVERTENCIA: Token expirado fue aceptado (esto NO debería pasar)', colors.red);
    } else {
        print('\n✅ CORRECTO: Token expirado fue rechazado', colors.bright + colors.green);
        print(`Razón: ${expiredResult.error}`, colors.yellow);
    }
    
    // Resumen
    print('\n\n' + '='.repeat(70), colors.cyan);
    print('  RESUMEN DE CONCEPTOS', colors.bright + colors.cyan);
    print('='.repeat(70), colors.cyan);
    
    print('\n✅ Conceptos Demostrados:', colors.green);
    print('  1. Creación de JWT con RS256 (criptografía asimétrica)', colors.cyan);
    print('  2. Verificación de firma digital', colors.cyan);
    print('  3. Integridad: tokens manipulados son detectados', colors.cyan);
    print('  4. No repudio: solo quien tiene la clave privada puede firmar', colors.cyan);
    print('  5. Validación de expiración', colors.cyan);
    
    print('\n🔐 Seguridad:', colors.yellow);
    print('  • La clave privada NUNCA se comparte', colors.cyan);
    print('  • La clave pública puede ser distribuida libremente', colors.cyan);
    print('  • Cualquier modificación al token invalida la firma', colors.cyan);
    print('  • RS256 es más seguro que HS256 para APIs públicas', colors.cyan);
    
    print('\n📚 Para MySQL:', colors.yellow);
    print('  • Almacenar tokens en tabla jwt_tokens', colors.cyan);
    print('  • Verificar expiración antes de usar', colors.cyan);
    print('  • Implementar revocación de tokens', colors.cyan);
    print('  • Registrar uso en audit_log con HMAC\n', colors.cyan);
    
    // SQL de ejemplo
    print('💾 Ejemplo SQL para almacenar:', colors.yellow);
    print(`
INSERT INTO jwt_tokens (usuario_id, token, fecha_expiracion)
VALUES (
    1,
    '${token.substring(0, 50)}...',
    FROM_UNIXTIME(${payload.exp})
);
    `.trim(), colors.cyan);
    
    print('\n' + '='.repeat(70) + '\n', colors.cyan);
}

// Ejecutar
try {
    main();
} catch (error) {
    print('\n❌ ERROR: ' + error.message, colors.red);
    console.error(error);
    process.exit(1);
}
