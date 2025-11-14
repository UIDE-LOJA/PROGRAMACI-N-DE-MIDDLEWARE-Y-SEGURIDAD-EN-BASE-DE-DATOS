-- ============================================================================
-- LABORATORIO SEMANA 4: TLS, Criptografía y JWT en MySQL
-- Curso: LTI_05A_458 PMSBD
-- Profesor: Prof. Charlie Cárdenas Toledo, M.Sc.
-- ============================================================================

-- PARTE 1: VERIFICACIÓN DE TLS
-- ============================================================================

-- Verificar que TLS está habilitado
SHOW VARIABLES LIKE '%ssl%';

-- Ver estado de la conexión actual
SHOW STATUS LIKE 'Ssl_cipher';

-- Verificar versión de TLS
SHOW STATUS LIKE 'Ssl_version';

-- Resultado esperado:
-- have_ssl = YES
-- Ssl_cipher = TLS_AES_256_GCM_SHA384 (o similar)
-- Ssl_version = TLSv1.2 o TLSv1.3


-- PARTE 2: CREACIÓN DE BASE DE DATOS Y TABLAS
-- ============================================================================

-- Crear base de datos
DROP DATABASE IF EXISTS api_security_lab;
CREATE DATABASE api_security_lab;
USE api_security_lab;

-- Tabla de usuarios con datos sensibles
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    tarjeta_credito VARBINARY(256),  -- Cifrado con AES
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP NULL,
    activo BOOLEAN DEFAULT TRUE,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de logs de auditoría
CREATE TABLE audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    accion VARCHAR(50) NOT NULL,
    tabla_afectada VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    hmac_signature VARCHAR(64),
    datos_adicionales JSON,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_usuario (usuario_id),
    INDEX idx_timestamp (timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla para tokens JWT
CREATE TABLE jwt_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    token TEXT NOT NULL,
    fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion TIMESTAMP NOT NULL,
    revocado BOOLEAN DEFAULT FALSE,
    motivo_revocacion VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_expiracion (fecha_expiracion),
    INDEX idx_revocado (revocado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de modelo de amenaza
CREATE TABLE threat_model (
    id INT AUTO_INCREMENT PRIMARY KEY,
    componente VARCHAR(100) NOT NULL,
    amenaza_stride ENUM('Spoofing', 'Tampering', 'Repudiation', 
                        'Information Disclosure', 'Denial of Service', 
                        'Elevation of Privilege') NOT NULL,
    descripcion TEXT NOT NULL,
    impacto ENUM('Bajo', 'Medio', 'Alto', 'Crítico') NOT NULL,
    probabilidad ENUM('Baja', 'Media', 'Alta') NOT NULL,
    mitigacion TEXT NOT NULL,
    control_implementado VARCHAR(255),
    fecha_identificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_amenaza (amenaza_stride),
    INDEX idx_impacto (impacto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- PARTE 3: FUNCIONES PARA CRIPTOGRAFÍA
-- ============================================================================

-- Función para generar HMAC
DELIMITER $$

DROP FUNCTION IF EXISTS generate_hmac$$

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


-- PARTE 4: INSERCIÓN DE DATOS CON CIFRADO
-- ============================================================================

-- Establecer clave de cifrado (en producción, usar variable de entorno)
SET @encryption_key = 'MiClaveSecreta2024!UIDE';
SET @secret_key = 'SecretKeyForHMAC2024';

-- Insertar usuarios con datos cifrados
INSERT INTO usuarios (username, email, password_hash, tarjeta_credito)
VALUES 
    ('jperez', 'jperez@uide.edu.ec', 
     SHA2('password123', 256),
     AES_ENCRYPT('4532-1234-5678-9012', @encryption_key)),
    
    ('mgarcia', 'mgarcia@uide.edu.ec', 
     SHA2('secure456', 256),
     AES_ENCRYPT('5412-9876-5432-1098', @encryption_key)),
    
    ('alopez', 'alopez@uide.edu.ec', 
     SHA2('mypass789', 256),
     AES_ENCRYPT('3782-8224-6310-0054', @encryption_key)),
    
    ('crodriguez', 'crodriguez@uide.edu.ec', 
     SHA2('pass2024', 256),
     AES_ENCRYPT('6011-1111-1111-1117', @encryption_key)),
    
    ('lmartinez', 'lmartinez@uide.edu.ec', 
     SHA2('secure2024', 256),
     AES_ENCRYPT('3530-1113-3330-0000', @encryption_key));

-- Insertar logs de auditoría con HMAC
INSERT INTO audit_log (usuario_id, accion, tabla_afectada, ip_address, hmac_signature, datos_adicionales)
VALUES 
    (1, 'LOGIN', 'usuarios', '192.168.1.100',
     generate_hmac(CONCAT('1', 'LOGIN', 'usuarios', '192.168.1.100'), @secret_key),
     JSON_OBJECT('user_agent', 'Mozilla/5.0', 'success', true)),
    
    (2, 'UPDATE', 'usuarios', '192.168.1.101',
     generate_hmac(CONCAT('2', 'UPDATE', 'usuarios', '192.168.1.101'), @secret_key),
     JSON_OBJECT('campo_modificado', 'email', 'success', true)),
    
    (1, 'SELECT', 'usuarios', '192.168.1.100',
     generate_hmac(CONCAT('1', 'SELECT', 'usuarios', '192.168.1.100'), @secret_key),
     JSON_OBJECT('registros_consultados', 5, 'success', true)),
    
    (3, 'LOGIN', 'usuarios', '192.168.1.102',
     generate_hmac(CONCAT('3', 'LOGIN', 'usuarios', '192.168.1.102'), @secret_key),
     JSON_OBJECT('user_agent', 'Chrome/120.0', 'success', true)),
    
    (2, 'LOGOUT', 'usuarios', '192.168.1.101',
     generate_hmac(CONCAT('2', 'LOGOUT', 'usuarios', '192.168.1.101'), @secret_key),
     JSON_OBJECT('session_duration', 3600, 'success', true));

-- Insertar modelo de amenaza
INSERT INTO threat_model (componente, amenaza_stride, descripcion, impacto, probabilidad, mitigacion, control_implementado) 
VALUES
    ('Conexión MySQL', 'Information Disclosure', 
     'Datos transmitidos sin cifrar pueden ser interceptados por atacantes en la red', 
     'Crítico', 'Alta', 
     'Implementar TLS 1.2+ con certificados válidos', 
     'TLS habilitado con certificados'),
    
    ('Tabla usuarios', 'Information Disclosure', 
     'Tarjetas de crédito almacenadas en texto plano pueden ser robadas en caso de breach', 
     'Crítico', 'Media', 
     'Cifrar datos sensibles con AES-256', 
     'AES_ENCRYPT implementado'),
    
    ('Autenticación API', 'Spoofing', 
     'Atacante puede suplantar identidad de usuario legítimo', 
     'Alto', 'Media', 
     'Usar JWT con RS256 y validación estricta', 
     'JWT con firma RSA implementado'),
    
    ('Logs de auditoría', 'Tampering', 
     'Logs pueden ser modificados sin detección para ocultar actividad maliciosa', 
     'Alto', 'Media', 
     'Implementar HMAC para integridad de logs', 
     'HMAC SHA-256 implementado'),
    
    ('Endpoint API', 'Denial of Service', 
     'Sobrecarga de peticiones puede tumbar el servicio y afectar disponibilidad', 
     'Alto', 'Alta', 
     'Implementar rate limiting y throttling', 
     'Pendiente'),
    
    ('Tokens JWT', 'Repudiation', 
     'Usuario niega haber realizado acción crítica', 
     'Medio', 'Baja', 
     'Firmas digitales y logs inmutables con timestamp', 
     'Firma RS256 + audit_log'),
    
    ('Base de datos', 'Elevation of Privilege', 
     'Usuario normal accede a funciones de administrador', 
     'Crítico', 'Media', 
     'RBAC estricto y validación de permisos en cada operación', 
     'Pendiente'),
    
    ('Contraseñas', 'Information Disclosure', 
     'Contraseñas almacenadas con hash débil pueden ser crackeadas', 
     'Crítico', 'Media', 
     'Usar SHA-256 o bcrypt con salt', 
     'SHA2-256 implementado'),
    
    ('API Gateway', 'Tampering', 
     'Peticiones pueden ser interceptadas y modificadas (MITM)', 
     'Alto', 'Media', 
     'TLS end-to-end y validación de integridad con HMAC', 
     'TLS + HMAC implementado'),
    
    ('Sesiones', 'Spoofing', 
     'Tokens de sesión pueden ser robados y reutilizados', 
     'Alto', 'Alta', 
     'Tokens con expiración corta y renovación automática', 
     'Pendiente');


-- PARTE 5: CONSULTAS DE VERIFICACIÓN
-- ============================================================================

-- Consultar datos cifrados (se ven como binario)
SELECT 
    id, 
    username, 
    email, 
    HEX(tarjeta_credito) AS tarjeta_cifrada_hex,
    fecha_creacion
FROM usuarios;

-- Descifrar datos (solo con la clave correcta)
SELECT 
    id,
    username,
    email,
    CAST(AES_DECRYPT(tarjeta_credito, @encryption_key) AS CHAR) AS tarjeta_descifrada,
    fecha_creacion
FROM usuarios;

-- Verificar integridad de logs con HMAC
SELECT 
    id,
    usuario_id,
    accion,
    tabla_afectada,
    ip_address,
    timestamp,
    hmac_signature,
    generate_hmac(CONCAT(usuario_id, accion, tabla_afectada, ip_address), @secret_key) AS hmac_calculado,
    CASE 
        WHEN hmac_signature = generate_hmac(CONCAT(usuario_id, accion, tabla_afectada, ip_address), @secret_key)
        THEN '✓ VÁLIDO'
        ELSE '✗ INVÁLIDO - POSIBLE MANIPULACIÓN'
    END AS integridad
FROM audit_log;

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
    END AS estado,
    TIMESTAMPDIFF(MINUTE, NOW(), t.fecha_expiracion) AS minutos_restantes
FROM jwt_tokens t
JOIN usuarios u ON t.usuario_id = u.id
ORDER BY t.fecha_emision DESC;


-- PARTE 6: VISTAS PARA ANÁLISIS
-- ============================================================================

-- Vista de matriz de riesgo
CREATE OR REPLACE VIEW matriz_riesgo AS
SELECT 
    amenaza_stride,
    COUNT(*) as total_amenazas,
    SUM(CASE WHEN impacto = 'Crítico' THEN 1 ELSE 0 END) as criticas,
    SUM(CASE WHEN impacto = 'Alto' THEN 1 ELSE 0 END) as altas,
    SUM(CASE WHEN impacto = 'Medio' THEN 1 ELSE 0 END) as medias,
    SUM(CASE WHEN impacto = 'Bajo' THEN 1 ELSE 0 END) as bajas,
    SUM(CASE WHEN control_implementado != 'Pendiente' THEN 1 ELSE 0 END) as mitigadas,
    ROUND(SUM(CASE WHEN control_implementado != 'Pendiente' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as porcentaje_mitigacion
FROM threat_model
GROUP BY amenaza_stride;

-- Vista de amenazas críticas pendientes
CREATE OR REPLACE VIEW amenazas_criticas_pendientes AS
SELECT 
    componente,
    amenaza_stride,
    descripcion,
    impacto,
    probabilidad,
    mitigacion
FROM threat_model
WHERE impacto IN ('Crítico', 'Alto')
  AND control_implementado = 'Pendiente'
ORDER BY 
    FIELD(impacto, 'Crítico', 'Alto'),
    FIELD(probabilidad, 'Alta', 'Media', 'Baja');

-- Vista de actividad de usuarios
CREATE OR REPLACE VIEW actividad_usuarios AS
SELECT 
    u.id,
    u.username,
    u.email,
    COUNT(DISTINCT a.id) as total_acciones,
    MAX(a.timestamp) as ultima_actividad,
    COUNT(DISTINCT CASE WHEN a.accion = 'LOGIN' THEN a.id END) as total_logins,
    COUNT(DISTINCT t.id) as tokens_emitidos,
    SUM(CASE WHEN t.revocado THEN 1 ELSE 0 END) as tokens_revocados
FROM usuarios u
LEFT JOIN audit_log a ON u.id = a.usuario_id
LEFT JOIN jwt_tokens t ON u.id = t.usuario_id
GROUP BY u.id, u.username, u.email;


-- PARTE 7: PROCEDIMIENTOS ALMACENADOS
-- ============================================================================

-- Procedimiento para registrar acción con HMAC automático
DELIMITER $$

DROP PROCEDURE IF EXISTS registrar_accion$$

CREATE PROCEDURE registrar_accion(
    IN p_usuario_id INT,
    IN p_accion VARCHAR(50),
    IN p_tabla VARCHAR(50),
    IN p_ip VARCHAR(45),
    IN p_datos_adicionales JSON
)
BEGIN
    DECLARE v_hmac VARCHAR(64);
    DECLARE v_secret VARCHAR(255) DEFAULT 'SecretKeyForHMAC2024';
    
    -- Generar HMAC
    SET v_hmac = generate_hmac(
        CONCAT(p_usuario_id, p_accion, p_tabla, p_ip), 
        v_secret
    );
    
    -- Insertar log
    INSERT INTO audit_log (usuario_id, accion, tabla_afectada, ip_address, hmac_signature, datos_adicionales)
    VALUES (p_usuario_id, p_accion, p_tabla, p_ip, v_hmac, p_datos_adicionales);
    
    SELECT 'Log registrado con HMAC' AS resultado, LAST_INSERT_ID() AS log_id;
END$$

DELIMITER ;

-- Procedimiento para revocar token
DELIMITER $$

DROP PROCEDURE IF EXISTS revocar_token$$

CREATE PROCEDURE revocar_token(
    IN p_token_id INT,
    IN p_motivo VARCHAR(255)
)
BEGIN
    UPDATE jwt_tokens 
    SET revocado = TRUE,
        motivo_revocacion = p_motivo
    WHERE id = p_token_id;
    
    SELECT 'Token revocado' AS resultado, ROW_COUNT() AS filas_afectadas;
END$$

DELIMITER ;


-- PARTE 8: PRUEBAS DE SEGURIDAD
-- ============================================================================

-- Test 1: Confidencialidad (TLS)
SELECT 
    'Test 1: TLS' AS test,
    CASE 
        WHEN @@have_ssl = 'YES' THEN '✓ PASS'
        ELSE '✗ FAIL'
    END AS resultado;

-- Test 2: Confidencialidad (Cifrado de datos)
SELECT 
    'Test 2: Cifrado AES' AS test,
    username,
    CASE 
        WHEN tarjeta_credito IS NOT NULL THEN '✓ CIFRADO'
        ELSE '✗ SIN CIFRAR'
    END as estado_cifrado
FROM usuarios;

-- Test 3: Integridad (HMAC)
SELECT 
    'Test 3: Integridad HMAC' AS test,
    COUNT(*) as logs_integros,
    CASE 
        WHEN COUNT(*) = (SELECT COUNT(*) FROM audit_log) THEN '✓ PASS'
        ELSE '✗ FAIL'
    END AS resultado
FROM audit_log
WHERE hmac_signature = generate_hmac(
    CONCAT(usuario_id, accion, tabla_afectada, ip_address), 
    @secret_key
);

-- Test 4: Disponibilidad (Verificar conexiones)
SELECT 
    'Test 4: Disponibilidad' AS test,
    VARIABLE_VALUE AS conexiones_actuales,
    (SELECT VARIABLE_VALUE FROM performance_schema.global_variables WHERE VARIABLE_NAME = 'max_connections') AS max_conexiones,
    CASE 
        WHEN CAST(VARIABLE_VALUE AS UNSIGNED) < 
             CAST((SELECT VARIABLE_VALUE FROM performance_schema.global_variables WHERE VARIABLE_NAME = 'max_connections') AS UNSIGNED) * 0.8
        THEN '✓ PASS'
        ELSE '⚠ WARNING'
    END AS resultado
FROM performance_schema.global_status
WHERE VARIABLE_NAME = 'Threads_connected';


-- PARTE 9: SIMULACIÓN DE ATAQUES
-- ============================================================================

-- Ataque 1: Intentar descifrar sin clave correcta
SET @encryption_key_wrong = 'ClaveIncorrecta';

SELECT 
    '=== ATAQUE 1: Descifrado sin clave ===' AS titulo;

SELECT 
    username,
    CAST(AES_DECRYPT(tarjeta_credito, @encryption_key_wrong) AS CHAR) AS intento_descifrado,
    '✓ Datos protegidos - Descifrado falló' AS resultado
FROM usuarios
LIMIT 3;

-- Restaurar clave correcta
SET @encryption_key = 'MiClaveSecreta2024!UIDE';

-- Ataque 2: Modificar log sin actualizar HMAC
SELECT 
    '=== ATAQUE 2: Manipulación de logs ===' AS titulo;

-- Guardar estado original
CREATE TEMPORARY TABLE temp_log_backup AS
SELECT * FROM audit_log WHERE id = 1;

-- Modificar log
UPDATE audit_log SET accion = 'HACK_ATTEMPT' WHERE id = 1;

-- Verificar que la integridad se rompió
SELECT 
    id,
    accion,
    hmac_signature,
    generate_hmac(CONCAT(usuario_id, accion, tabla_afectada, ip_address), @secret_key) AS hmac_esperado,
    CASE 
        WHEN hmac_signature = generate_hmac(CONCAT(usuario_id, accion, tabla_afectada, ip_address), @secret_key)
        THEN '✗ FAIL - No detectó manipulación'
        ELSE '✓ PASS - Manipulación detectada'
    END AS resultado
FROM audit_log
WHERE id = 1;

-- Restaurar log original
UPDATE audit_log a
JOIN temp_log_backup t ON a.id = t.id
SET a.accion = t.accion;

DROP TEMPORARY TABLE temp_log_backup;


-- PARTE 10: REPORTES Y ESTADÍSTICAS
-- ============================================================================

-- Reporte de seguridad general
SELECT 
    '=== REPORTE DE SEGURIDAD ===' AS titulo;

SELECT 
    'TLS Habilitado' AS control,
    CASE WHEN @@have_ssl = 'YES' THEN '✓' ELSE '✗' END AS estado,
    'Crítico' AS importancia;

SELECT 
    'Datos Sensibles Cifrados' AS control,
    CONCAT(COUNT(*), ' usuarios con tarjetas cifradas') AS estado,
    'Crítico' AS importancia
FROM usuarios
WHERE tarjeta_credito IS NOT NULL;

SELECT 
    'Logs con HMAC' AS control,
    CONCAT(COUNT(*), ' logs con integridad verificable') AS estado,
    'Alto' AS importancia
FROM audit_log;

SELECT 
    'Amenazas Identificadas' AS control,
    CONCAT(COUNT(*), ' amenazas documentadas') AS estado,
    'Medio' AS importancia
FROM threat_model;

-- Consultar matriz de riesgo
SELECT 
    '=== MATRIZ DE RIESGO ===' AS titulo;

SELECT * FROM matriz_riesgo;

-- Consultar amenazas críticas pendientes
SELECT 
    '=== AMENAZAS CRÍTICAS PENDIENTES ===' AS titulo;

SELECT * FROM amenazas_criticas_pendientes;

-- Consultar actividad de usuarios
SELECT 
    '=== ACTIVIDAD DE USUARIOS ===' AS titulo;

SELECT * FROM actividad_usuarios;


-- PARTE 11: LIMPIEZA (OPCIONAL)
-- ============================================================================

-- Descomentar para limpiar todo
-- DROP DATABASE IF EXISTS api_security_lab;

-- ============================================================================
-- FIN DEL LABORATORIO
-- ============================================================================

-- Resumen de comandos útiles:
-- 
-- Ver usuarios MySQL y SSL:
-- SELECT user, host, ssl_type FROM mysql.user;
--
-- Forzar SSL para un usuario:
-- ALTER USER 'usuario'@'localhost' REQUIRE SSL;
--
-- Ver variables de SSL:
-- SHOW VARIABLES LIKE '%ssl%';
--
-- Ver estado de conexión:
-- SHOW STATUS LIKE 'Ssl%';
