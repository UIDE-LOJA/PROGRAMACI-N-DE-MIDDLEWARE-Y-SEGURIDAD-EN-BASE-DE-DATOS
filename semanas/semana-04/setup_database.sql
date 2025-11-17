-- ============================================================================
-- SETUP BASE DE DATOS - MARKETPLACE AGRÍCOLA
-- Semana 4: Seguridad en APIs y MySQL
-- Materia: Programación de Middleware y Seguridad en Base de Datos
--
-- NOTA: Las claves de cifrado incluyen el año actual.
--       Si ejecutas este script en un año diferente a 2024, actualiza:
--       - 'MarketplaceAgricola2024!UIDE' → 'MarketplaceAgricolaYYYY!UIDE'
--       - 'TrazabilidadAgricola2024' → 'TrazabilidadAgricolaYYYY'
-- ============================================================================

-- Eliminar base de datos si existe (para empezar limpio)
DROP DATABASE IF EXISTS marketplace_agricola;

-- Crear base de datos del Marketplace Agrícola
CREATE DATABASE marketplace_agricola CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE marketplace_agricola;

-- ============================================================================
-- TABLA 1: PRODUCTORES (Para PRÁCTICA 2: Cifrado AES)
-- ============================================================================
CREATE TABLE productores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    hectareas DECIMAL(10,2),
    cuenta_bancaria VARBINARY(256),  -- Almacenará datos cifrados con AES
    ubicacion_gps VARCHAR(100),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo de productores ecuatorianos (sin cifrar aún - se cifrarán en la práctica)
INSERT INTO productores (nombre, email, telefono, hectareas, ubicacion_gps) VALUES
-- Región Sierra
('María Fernández - Finca Los Andes (Pichincha)', 'maria.fernandez@agricola.ec', '0991234567', 5.5, '-0.1807,78.4678'),
('Juan Pérez - Hacienda El Vergel (Cotopaxi)', 'juan.perez@agricola.ec', '0992345678', 12.3, '-0.9350,78.6156'),
('Rosa Gutiérrez - Granja Orgánica (Imbabura)', 'rosa.gutierrez@agricola.ec', '0993456789', 3.8, '0.3556,78.1236'),
('Carlos Morales - Finca La Esperanza (Tungurahua)', 'carlos.morales@agricola.ec', '0994567890', 8.2, '-1.2636,78.6301'),
('Ana Torres - Cultivos del Valle (Chimborazo)', 'ana.torres@agricola.ec', '0995678901', 15.7, '-1.6640,78.6542'),
-- Región Costa
('Pedro Santana - Hacienda Bananera (Los Ríos)', 'pedro.santana@agricola.ec', '0996789012', 22.4, '-1.0543,79.4611'),
('Carmen Vélez - Camaronera del Pacífico (Guayas)', 'carmen.velez@agricola.ec', '0997890123', 18.9, '-2.1702,79.9224'),
('Luis Cabrera - Plantación de Cacao (El Oro)', 'luis.cabrera@agricola.ec', '0998901234', 9.6, '-3.2581,79.9553'),
('Sofía Zambrano - Finca Cafetalera (Manabí)', 'sofia.zambrano@agricola.ec', '0999012345', 7.3, '-1.0543,80.4545'),
('Roberto Mendoza - Cultivos Tropicales (Esmeraldas)', 'roberto.mendoza@agricola.ec', '0990123456', 14.2, '0.9681,79.6513'),
-- Región Amazónica
('Luisa Vargas - Agroforestería (Sucumbíos)', 'luisa.vargas@agricola.ec', '0991345679', 11.5, '0.0863,76.8882'),
('Diego Salazar - Naranjilla Orgánica (Napo)', 'diego.salazar@agricola.ec', '0992456780', 6.8, '-0.9953,77.8143'),
('Patricia Rojas - Palma Africana (Orellana)', 'patricia.rojas@agricola.ec', '0993567891', 19.3, '-0.4617,76.9877'),
('Fernando Castro - Finca de Yuca (Pastaza)', 'fernando.castro@agricola.ec', '0994678902', 5.2, '-1.4887,78.0031'),
('Gabriela Mora - Ganadería Sostenible (Morona Santiago)', 'gabriela.mora@agricola.ec', '0995789013', 25.7, '-2.3045,78.1137'),
-- Pequeños productores
('José Tipán - Asociación Campesina (Cotopaxi)', 'jose.tipan@agricola.ec', '0996890124', 2.1, '-0.6833,78.6061'),
('María Quispe - Cooperativa de Quinua (Chimborazo)', 'maria.quispe@agricola.ec', '0997901235', 1.8, '-1.6691,78.6478'),
('Miguel Poma - Productor Familiar (Tungurahua)', 'miguel.poma@agricola.ec', '0998012346', 3.2, '-1.2497,78.6172'),
('Sandra Yupanqui - Hortalizas Andinas (Imbabura)', 'sandra.yupanqui@agricola.ec', '0999123457', 2.5, '0.3342,78.1265'),
('Antonio Sisa - Papas Nativas (Bolívar)', 'antonio.sisa@agricola.ec', '0990234568', 4.1, '-1.5940,79.0058');

-- ============================================================================
-- TABLA 2: TRAZABILIDAD DE PEDIDOS (Para PRÁCTICA 3: HMAC)
-- ============================================================================
CREATE TABLE trazabilidad_pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    productor_id INT NOT NULL,
    estado ENUM('ASIGNADO','RECOLECTADO','EN_TRANSITO','ENTREGADO') NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ubicacion_gps VARCHAR(100),
    hmac_signature VARCHAR(64),  -- Firma HMAC para verificar integridad
    FOREIGN KEY (productor_id) REFERENCES productores(id)
);

-- Insertar eventos de trazabilidad (sin HMAC aún - se generará en la práctica)
INSERT INTO trazabilidad_pedidos (pedido_id, productor_id, estado, ubicacion_gps, timestamp) VALUES
-- Pedidos completados
(1001, 1, 'ENTREGADO', '-0.2298,78.5249', '2025-01-15 14:30:00'),
(1002, 6, 'ENTREGADO', '-2.1702,79.9224', '2025-01-15 15:45:00'),
(1003, 11, 'ENTREGADO', '0.0863,76.8882', '2025-01-16 10:20:00'),
-- Pedidos en tránsito
(1004, 2, 'EN_TRANSITO', '-0.6833,78.6061', '2025-01-16 16:00:00'),
(1005, 7, 'EN_TRANSITO', '-2.0167,79.8833', '2025-01-16 16:30:00'),
(1006, 12, 'EN_TRANSITO', '-0.6789,77.9012', '2025-01-16 17:00:00'),
-- Pedidos recolectados
(1007, 3, 'RECOLECTADO', '0.3556,78.1236', '2025-01-17 08:15:00'),
(1008, 8, 'RECOLECTADO', '-3.2581,79.9553', '2025-01-17 09:30:00'),
(1009, 13, 'RECOLECTADO', '-0.4617,76.9877', '2025-01-17 10:45:00'),
-- Pedidos asignados
(1010, 4, 'ASIGNADO', '-1.2636,78.6301', '2025-01-17 11:00:00'),
(1011, 9, 'ASIGNADO', '-1.0543,80.4545', '2025-01-17 11:30:00'),
(1012, 14, 'ASIGNADO', '-1.4887,78.0031', '2025-01-17 12:00:00'),
(1013, 5, 'ASIGNADO', '-1.6640,78.6542', '2025-01-17 13:00:00'),
(1014, 10, 'ASIGNADO', '0.9681,79.6513', '2025-01-17 13:30:00'),
(1015, 15, 'ASIGNADO', '-2.3045,78.1137', '2025-01-17 14:00:00');

-- ============================================================================
-- TABLA 3: SESIONES DE PRODUCTORES (Para PRÁCTICA 4: JWT)
-- ============================================================================
CREATE TABLE sesiones_productores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productor_id INT NOT NULL,
    token TEXT,  -- Almacenará el JWT generado
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion TIMESTAMP,
    activa BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (productor_id) REFERENCES productores(id)
);

-- Datos de ejemplo se insertarán durante la práctica de JWT

-- ============================================================================
-- TABLA 4: MODELO DE AMENAZAS (Para PRÁCTICA 5: STRIDE)
-- ============================================================================
CREATE TABLE threat_model (
    id INT AUTO_INCREMENT PRIMARY KEY,
    componente VARCHAR(100) NOT NULL,
    amenaza_stride ENUM(
        'Spoofing',
        'Tampering',
        'Repudiation',
        'Information Disclosure',
        'Denial of Service',
        'Elevation of Privilege'
    ) NOT NULL,
    descripcion TEXT NOT NULL,
    impacto ENUM('Bajo', 'Medio', 'Alto', 'Crítico') NOT NULL,
    probabilidad ENUM('Baja', 'Media', 'Alta') NOT NULL,
    mitigacion TEXT,
    control_implementado VARCHAR(255),
    fecha_analisis TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar ejemplos de análisis de amenazas
INSERT INTO threat_model (componente, amenaza_stride, descripcion, impacto, probabilidad, mitigacion, control_implementado) VALUES
('API Asignación Pedidos', 'Tampering',
 'Manipulación del algoritmo de rotación equitativa de pedidos entre productores',
 'Crítico', 'Media',
 'Implementar firmas JWT en cada operación + logs con HMAC',
 'JWT RS256 + HMAC SHA-256'),

('Base de Datos Productores', 'Information Disclosure',
 'Exposición de cuentas bancarias de 636,375 productores agrícolas',
 'Crítico', 'Alta',
 'Cifrado AES-256 en reposo + TLS 1.2+ en tránsito',
 'AES_ENCRYPT() + TLS 1.2'),

('Sistema Trazabilidad', 'Repudiation',
 'Productor niega haber recibido o entregado un pedido asignado',
 'Alto', 'Media',
 'Logs inmutables con HMAC + timestamps sincronizados',
 'HMAC SHA-256'),

('Sistema Certificaciones', 'Spoofing',
 'Falsificación de certificados orgánicos para productos no certificados',
 'Alto', 'Alta',
 'Firmas digitales RSA + cadena de verificación PKI',
 'JWT con RS256'),

('API Pública', 'Denial of Service',
 'Ataques DDoS que afectan disponibilidad para 636K productores',
 'Alto', 'Alta',
 'Rate limiting + WAF + CDN',
 'Pendiente implementación'),

('Dashboard Productores', 'Elevation of Privilege',
 'Acceso no autorizado a métricas y datos de otros productores',
 'Medio', 'Media',
 'RBAC estricto + JWT con claims de autorización',
 'JWT con roles'),

('Conexiones MySQL', 'Information Disclosure',
 'Interceptación de credenciales y datos en tránsito sin cifrado',
 'Crítico', 'Media',
 'Forzar TLS 1.2+ con require_secure_transport=ON',
 'TLS 1.2 configurado'),

('Sistema de Pagos', 'Tampering',
 'Modificación de montos en transacciones de pago a productores',
 'Crítico', 'Media',
 'Firma digital de cada transacción + auditoría blockchain',
 'Pendiente implementación');

-- ============================================================================
-- FUNCIÓN AUXILIAR: Generar HMAC (Para PRÁCTICA 3)
-- ============================================================================
DELIMITER $$

CREATE FUNCTION generate_hmac(p_data TEXT, p_secret VARCHAR(255))
RETURNS VARCHAR(64)
DETERMINISTIC
NO SQL
BEGIN
    RETURN SHA2(CONCAT(p_secret, p_data, p_secret), 256);
END$$

DELIMITER ;

-- ============================================================================
-- VERIFICACIÓN FINAL
-- ============================================================================
-- Mostrar todas las tablas creadas
SHOW TABLES;

-- Contar registros en cada tabla
SELECT 'productores' AS tabla, COUNT(*) AS registros FROM productores
UNION ALL
SELECT 'trazabilidad_pedidos', COUNT(*) FROM trazabilidad_pedidos
UNION ALL
SELECT 'sesiones_productores', COUNT(*) FROM sesiones_productores
UNION ALL
SELECT 'threat_model', COUNT(*) FROM threat_model
ORDER BY
    CASE tabla
        WHEN 'productores' THEN 1
        WHEN 'trazabilidad_pedidos' THEN 2
        WHEN 'sesiones_productores' THEN 3
        WHEN 'threat_model' THEN 4
    END;

-- ============================================================================
-- MENSAJE FINAL
-- ============================================================================
SELECT '✓ Base de datos configurada exitosamente!' AS Estado,
       'Ahora puedes continuar con las prácticas' AS Mensaje;
