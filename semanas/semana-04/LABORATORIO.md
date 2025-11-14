# Laboratorio Semana 4: TLS, Criptografía y JWT en MySQL

## Objetivos del Laboratorio
1. Configurar TLS/SSL en MySQL
2. Implementar cifrado de datos sensibles en base de datos
3. Crear y verificar JWT firmados con RS256
4. Aplicar HMAC para integridad de datos
5. Documentar modelo de amenaza (STRIDE)

## Duración: 60-70 minutos

---

## Parte 1: Configuración de TLS en MySQL (15 min)

### Paso 1.1: Generar Certificados SSL con OpenSSL

Abre PowerShell o CMD como administrador y ejecuta:

```powershell
# Crear directorio para certificados
mkdir C:\mysql-certs
cd C:\mysql-certs

# Generar clave privada de CA
openssl genrsa 2048 > ca-key.pem

# Generar certificado de CA
openssl req -new -x509 -nodes -days 365 -key ca-key.pem -out ca-cert.pem -subj "/C=EC/ST=Pichincha/L=Quito/O=UIDE/CN=MySQL-CA"

# Generar clave privada del servidor
openssl req -newkey rsa:2048 -days 365 -nodes -keyout server-key.pem -out server-req.pem -subj "/C=EC/ST=Pichincha/L=Quito/O=UIDE/CN=MySQL-Server"

# Firmar certificado del servidor
openssl x509 -req -in server-req.pem -days 365 -CA ca-cert.pem -CAkey ca-key.pem -set_serial 01 -out server-cert.pem

# Generar clave privada del cliente
openssl req -newkey rsa:2048 -days 365 -nodes -keyout client-key.pem -out client-req.pem -subj "/C=EC/ST=Pichincha/L=Quito/O=UIDE/CN=MySQL-Client"

# Firmar certificado del cliente
openssl x509 -req -in client-req.pem -days 365 -CA ca-cert.pem -CAkey ca-key.pem -set_serial 02 -out client-cert.pem

# Verificar certificados
openssl verify -CAfile ca-cert.pem server-cert.pem client-cert.pem
```

### Paso 1.2: Configurar MySQL para usar TLS

1. Localiza tu archivo `my.ini` (usualmente en `C:\ProgramData\MySQL\MySQL Server 8.0\`)

2. Agrega estas líneas en la sección `[mysqld]`:

```ini
[mysqld]
# SSL Configuration
ssl-ca=C:/mysql-certs/ca-cert.pem
ssl-cert=C:/mysql-certs/server-cert.pem
ssl-key=C:/mysql-certs/server-key.pem
require_secure_transport=ON
```

3. Reinicia el servicio MySQL:

```powershell
net stop MySQL80
net start MySQL80
```

### Paso 1.3: Verificar TLS en MySQL Workbench

```sql
-- Verificar que TLS está habilitado
SHOW VARIABLES LIKE '%ssl%';

-- Ver estado de la conexión actual
SHOW STATUS LIKE 'Ssl_cipher';

-- Verificar versión de TLS
SHOW STATUS LIKE 'Ssl_version';
```

**Resultado esperado:**
- `have_ssl` = YES
- `Ssl_cipher` = TLS_AES_256_GCM_SHA384 (o similar)
- `Ssl_version` = TLSv1.2 o TLSv1.3

---

## Parte 2: Cifrado de Datos Sensibles (15 min)

### Paso 2.1: Crear Base de Datos de Ejemplo

```sql
-- Crear base de datos
CREATE DATABASE IF NOT EXISTS api_security_lab;
USE api_security_lab;

-- Tabla de usuarios con datos sensibles
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    tarjeta_credito VARBINARY(256),  -- Cifrado
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP NULL,
    INDEX idx_username (username)
);

-- Tabla de logs de auditoría
CREATE TABLE audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    accion VARCHAR(50),
    tabla_afectada VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    hmac_signature VARCHAR(64),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
```

### Paso 2.2: Implementar Cifrado AES

```sql
-- Establecer clave de cifrado (en producción, usar variable de entorno)
SET @encryption_key = 'MiClaveSecreta2024!UIDE';

-- Insertar usuario con tarjeta cifrada
INSERT INTO usuarios (username, email, password_hash, tarjeta_credito)
VALUES (
    'jperez',
    'jperez@uide.edu.ec',
    SHA2('password123', 256),  -- Hash de contraseña
    AES_ENCRYPT('4532-1234-5678-9012', @encryption_key)  -- Tarjeta cifrada
);

-- Insertar más usuarios
INSERT INTO usuarios (username, email, password_hash, tarjeta_credito)
VALUES 
    ('mgarcia', 'mgarcia@uide.edu.ec', SHA2('secure456', 256), 
     AES_ENCRYPT('5412-9876-5432-1098', @encryption_key)),
    ('alopez', 'alopez@uide.edu.ec', SHA2('mypass789', 256), 
     AES_ENCRYPT('3782-8224-6310-0054', @encryption_key));

-- Consultar datos cifrados (se ven como binario)
SELECT id, username, email, tarjeta_credito FROM usuarios;

-- Descifrar datos (solo con la clave correcta)
SELECT 
    id,
    username,
    email,
    CAST(AES_DECRYPT(tarjeta_credito, @encryption_key) AS CHAR) AS tarjeta_descifrada
FROM usuarios;
```

### Paso 2.3: Implementar HMAC para Integridad

```sql
-- Función para generar HMAC
DELIMITER $$

CREATE FUNCTION generate_hmac(
    p_data TEXT,
    p_secret VARCHAR(255)
)
RETURNS VARCHAR(64)
DETERMINISTIC
BEGIN
    RETURN SHA2(CONCAT(p_secret, p_data, p_secret), 256);
END$$

DELIMITER ;

-- Insertar log con HMAC
SET @secret_key = 'SecretKeyForHMAC2024';

INSERT INTO audit_log (usuario_id, accion, tabla_afectada, ip_address, hmac_signature)
VALUES (
    1,
    'LOGIN',
    'usuarios',
    '192.168.1.100',
    generate_hmac(CONCAT('1', 'LOGIN', 'usuarios', '192.168.1.100'), @secret_key)
);

-- Verificar integridad del log
SELECT 
    id,
    usuario_id,
    accion,
    tabla_afectada,
    ip_address,
    hmac_signature,
    generate_hmac(CONCAT(usuario_id, accion, tabla_afectada, ip_address), @secret_key) AS hmac_calculado,
    CASE 
        WHEN hmac_signature = generate_hmac(CONCAT(usuario_id, accion, tabla_afectada, ip_address), @secret_key)
        THEN 'VÁLIDO ✓'
        ELSE 'INVÁLIDO ✗'
    END AS integridad
FROM audit_log;
```

---

## Parte 3: JWT con RS256 (Firmas Digitales) (20 min)

### Paso 3.1: Generar Par de Claves RSA

```powershell
# Generar clave privada RSA
openssl genrsa -out private_key.pem 2048

# Extraer clave pública
openssl rsa -in private_key.pem -pubout -out public_key.pem

# Ver las claves generadas
type private_key.pem
type public_key.pem
```

### Paso 3.2: Crear Script Node.js para JWT

Crea un archivo `jwt-demo.js`:

```javascript
const crypto = require('crypto');
const fs = require('fs');

// Leer claves
const privateKey = fs.readFileSync('private_key.pem', 'utf8');
const publicKey = fs.readFileSync('public_key.pem', 'utf8');

// Función para codificar en Base64URL
function base64url(source) {
    let encodedSource = Buffer.from(source).toString('base64');
    encodedSource = encodedSource.replace(/=+$/, '');
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
    return encodedSource;
}

// Crear JWT
function createJWT(payload) {
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
function verifyJWT(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        return { valid: false, error: 'Token inválido' };
    }
    
    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    
    // Verificar firma
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update(encodedHeader + '.' + encodedPayload);
    verify.end();
    
    // Decodificar signature de base64url a buffer
    let signature = encodedSignature.replace(/-/g, '+').replace(/_/g, '/');
    while (signature.length % 4) signature += '=';
    
    const isValid = verify.verify(publicKey, signature, 'base64');
    
    if (isValid) {
        const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString());
        return { valid: true, payload };
    }
    
    return { valid: false, error: 'Firma inválida' };
}

// Ejemplo de uso
const payload = {
    sub: '1',
    username: 'jperez',
    email: 'jperez@uide.edu.ec',
    role: 'user',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hora
};

console.log('=== GENERACIÓN DE JWT ===\n');
const token = createJWT(payload);
console.log('JWT Generado:');
console.log(token);
console.log('\n=== VERIFICACIÓN DE JWT ===\n');

const result = verifyJWT(token);
console.log('Resultado de verificación:', result);

// Probar con token manipulado
console.log('\n=== PRUEBA DE INTEGRIDAD ===\n');
const tamperedToken = token.slice(0, -10) + 'XXXXXXXXXX';
const tamperedResult = verifyJWT(tamperedToken);
console.log('Token manipulado:', tamperedResult);
```

### Paso 3.3: Ejecutar el Script

```powershell
# Instalar Node.js si no lo tienes
# Descargar de: https://nodejs.org/

# Ejecutar el script
node jwt-demo.js
```

### Paso 3.4: Almacenar JWT en MySQL

```sql
-- Tabla para tokens JWT
CREATE TABLE jwt_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    token TEXT NOT NULL,
    fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion TIMESTAMP NOT NULL,
    revocado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Insertar token (copiar del output de Node.js)
INSERT INTO jwt_tokens (usuario_id, token, fecha_expiracion)
VALUES (
    1,
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJqcGVyZXoiLCJlbWFpbCI6ImpwZXJlekB1aWRlLmVkdS5lYyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzMxNTI4MDAwLCJleHAiOjE3MzE1MzE2MDB9.signature',
    DATE_ADD(NOW(), INTERVAL 1 HOUR)
);

-- Consultar tokens activos
SELECT 
    t.id,
    u.username,
    t.fecha_emision,
    t.fecha_expiracion,
    CASE 
        WHEN t.revocado THEN 'REVOCADO'
        WHEN t.fecha_expiracion < NOW() THEN 'EXPIRADO'
        ELSE 'ACTIVO'
    END AS estado
FROM jwt_tokens t
JOIN usuarios u ON t.usuario_id = u.id;

-- Revocar token
UPDATE jwt_tokens SET revocado = TRUE WHERE id = 1;
```

---

## Parte 4: Modelo de Amenaza STRIDE (15 min)

### Paso 4.1: Análisis STRIDE para la API

Crea una tabla para documentar amenazas:

```sql
-- Tabla de modelo de amenaza
CREATE TABLE threat_model (
    id INT AUTO_INCREMENT PRIMARY KEY,
    componente VARCHAR(100),
    amenaza_stride ENUM('Spoofing', 'Tampering', 'Repudiation', 'Information Disclosure', 'Denial of Service', 'Elevation of Privilege'),
    descripcion TEXT,
    impacto ENUM('Bajo', 'Medio', 'Alto', 'Crítico'),
    probabilidad ENUM('Baja', 'Media', 'Alta'),
    mitigacion TEXT,
    control_implementado VARCHAR(255)
);

-- Insertar análisis de amenazas
INSERT INTO threat_model (componente, amenaza_stride, descripcion, impacto, probabilidad, mitigacion, control_implementado) VALUES
('Conexión MySQL', 'Information Disclosure', 'Datos transmitidos sin cifrar pueden ser interceptados', 'Crítico', 'Alta', 'Implementar TLS 1.2+', 'TLS habilitado con certificados'),
('Tabla usuarios', 'Information Disclosure', 'Tarjetas de crédito almacenadas en texto plano', 'Crítico', 'Media', 'Cifrar datos sensibles con AES-256', 'AES_ENCRYPT implementado'),
('Autenticación API', 'Spoofing', 'Atacante puede suplantar identidad de usuario', 'Alto', 'Media', 'Usar JWT con RS256', 'JWT con firma RSA implementado'),
('Logs de auditoría', 'Tampering', 'Logs pueden ser modificados sin detección', 'Alto', 'Media', 'Implementar HMAC para integridad', 'HMAC SHA-256 implementado'),
('Endpoint API', 'Denial of Service', 'Sobrecarga de peticiones puede tumbar el servicio', 'Alto', 'Alta', 'Implementar rate limiting', 'Pendiente'),
('Tokens JWT', 'Repudiation', 'Usuario niega haber realizado acción', 'Medio', 'Baja', 'Firmas digitales y logs inmutables', 'Firma RS256 + audit_log'),
('Base de datos', 'Elevation of Privilege', 'Usuario normal accede a funciones de admin', 'Crítico', 'Media', 'RBAC estricto y validación de permisos', 'Pendiente');

-- Consultar amenazas por impacto
SELECT 
    componente,
    amenaza_stride,
    descripcion,
    impacto,
    probabilidad,
    control_implementado
FROM threat_model
ORDER BY 
    FIELD(impacto, 'Crítico', 'Alto', 'Medio', 'Bajo'),
    FIELD(probabilidad, 'Alta', 'Media', 'Baja');
```

### Paso 4.2: Matriz de Riesgo

```sql
-- Vista de matriz de riesgo
CREATE VIEW matriz_riesgo AS
SELECT 
    amenaza_stride,
    COUNT(*) as total_amenazas,
    SUM(CASE WHEN impacto = 'Crítico' THEN 1 ELSE 0 END) as criticas,
    SUM(CASE WHEN impacto = 'Alto' THEN 1 ELSE 0 END) as altas,
    SUM(CASE WHEN control_implementado != 'Pendiente' THEN 1 ELSE 0 END) as mitigadas,
    ROUND(SUM(CASE WHEN control_implementado != 'Pendiente' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as porcentaje_mitigacion
FROM threat_model
GROUP BY amenaza_stride;

-- Consultar matriz
SELECT * FROM matriz_riesgo;
```

---

## Parte 5: Pruebas de Seguridad (10 min)

### Paso 5.1: Verificar Controles CIA

```sql
-- Test 1: Confidencialidad (TLS)
SHOW STATUS LIKE 'Ssl_cipher';
-- Debe mostrar un cipher activo

-- Test 2: Confidencialidad (Cifrado de datos)
SELECT 
    username,
    CASE 
        WHEN tarjeta_credito IS NOT NULL THEN 'CIFRADO ✓'
        ELSE 'SIN CIFRAR ✗'
    END as estado_cifrado
FROM usuarios;

-- Test 3: Integridad (HMAC)
SELECT 
    COUNT(*) as logs_integros
FROM audit_log
WHERE hmac_signature = generate_hmac(
    CONCAT(usuario_id, accion, tabla_afectada, ip_address), 
    @secret_key
);

-- Test 4: No Repudio (JWT)
SELECT 
    COUNT(*) as tokens_firmados
FROM jwt_tokens
WHERE token LIKE '%.%.%';  -- Formato JWT válido

-- Test 5: Disponibilidad (Verificar conexiones)
SHOW STATUS LIKE 'Threads_connected';
SHOW VARIABLES LIKE 'max_connections';
```

### Paso 5.2: Simular Ataque

```sql
-- Intentar acceder a datos sin clave de cifrado
SET @encryption_key = 'ClaveIncorrecta';

SELECT 
    username,
    CAST(AES_DECRYPT(tarjeta_credito, @encryption_key) AS CHAR) AS intento_descifrado
FROM usuarios;
-- Resultado: NULL o basura, datos protegidos ✓

-- Intentar modificar log sin actualizar HMAC
UPDATE audit_log SET accion = 'HACK' WHERE id = 1;

-- Verificar que la integridad se rompió
SELECT 
    id,
    accion,
    CASE 
        WHEN hmac_signature = generate_hmac(CONCAT(usuario_id, accion, tabla_afectada, ip_address), @secret_key)
        THEN 'VÁLIDO ✓'
        ELSE 'INVÁLIDO ✗ - POSIBLE MANIPULACIÓN'
    END AS integridad
FROM audit_log;
```

---

## Entregables

### PE-1.4: Laboratorio TLS + JWT/PASETO (2.25 puntos)

Captura de pantalla o export de:
1. ✅ Verificación de TLS habilitado en MySQL
2. ✅ Consulta de datos cifrados y descifrados
3. ✅ Output del script JWT con verificación exitosa
4. ✅ Consulta de logs con HMAC válido

### TA-1.4: Informe de Modelo de Amenaza (2.25 puntos)

Documento de 1-2 páginas que incluya:
1. ✅ Tabla de amenazas STRIDE identificadas
2. ✅ Matriz de riesgo con porcentaje de mitigación
3. ✅ Descripción de controles implementados (TLS, AES, JWT, HMAC)
4. ✅ Recomendaciones para amenazas pendientes

---

## Recursos Adicionales

### Comandos Útiles

```sql
-- Limpiar datos de prueba
DROP DATABASE IF EXISTS api_security_lab;

-- Ver usuarios de MySQL y sus privilegios SSL
SELECT user, host, ssl_type FROM mysql.user;

-- Forzar SSL para un usuario específico
ALTER USER 'jperez'@'localhost' REQUIRE SSL;
```

### Referencias
- [MySQL SSL/TLS Documentation](https://dev.mysql.com/doc/refman/8.0/en/using-encrypted-connections.html)
- [JWT.io](https://jwt.io/)
- [OWASP STRIDE Threat Modeling](https://owasp.org/www-community/Threat_Modeling)

---

## Notas Importantes

⚠️ **Seguridad:**
- En producción, NUNCA almacenes claves de cifrado en el código
- Usa variables de entorno o servicios de gestión de secretos (AWS Secrets Manager, Azure Key Vault)
- Rota las claves periódicamente
- Implementa rate limiting en APIs

✅ **Mejores Prácticas:**
- TLS 1.2 o superior
- Claves RSA de al menos 2048 bits
- Algoritmos de hash SHA-256 o superior
- Tokens JWT con expiración corta (15-60 minutos)
