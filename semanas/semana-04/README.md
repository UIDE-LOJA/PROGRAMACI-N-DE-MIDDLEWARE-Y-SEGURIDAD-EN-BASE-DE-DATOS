# Semana 4: CIA, Modelos de Amenaza y Criptografía Aplicada

## 📋 Resumen de la Semana

Esta semana cubre los fundamentos de seguridad en APIs, incluyendo la Triada CIA, modelos de amenaza y criptografía aplicada con implementación práctica en MySQL.

---

## 📁 Archivos de la Semana

### 1. `presentacion.html` 
**Presentación completa (27 slides)**
- ✅ Contenido teórico completo
- ✅ Navegación con teclado (flechas) o botones
- ✅ Barra de progreso

**Contenido:**
- Slides 1-6: Introducción, CIA y DAD
- Slides 7-22: Criptografía aplicada (detallada)
- Slides 23-30: TLS, PKI y mejores prácticas
- Slides 31-35: Modelo de amenaza y casos de estudio
- Slides 36-41: Referencias y conclusiones

**⚠️ Recomendación:** Para clase de 2 horas, usar solo slides selectivos (ver GUIA_CLASE.md)
- Slides esenciales: 1-7, 23-27, 31-33 (aprox. 15 slides = 50 min)

### 2. `LABORATORIO.md`
**Guía práctica completa (60-70 minutos)**

**Ejercicios incluidos:**
1. **Configuración de TLS en MySQL** (15 min)
   - Generación de certificados SSL con OpenSSL
   - Configuración de MySQL para usar TLS
   - Verificación de conexión segura

2. **Cifrado de Datos Sensibles** (15 min)
   - Implementación de AES para cifrado de tarjetas
   - Funciones de hash para contraseñas
   - HMAC para integridad de logs

3. **JWT con RS256** (20 min)
   - Generación de par de claves RSA
   - Creación y verificación de JWT con Node.js
   - Almacenamiento y gestión de tokens en MySQL

4. **Modelo de Amenaza STRIDE** (15 min)
   - Identificación de amenazas
   - Matriz de riesgo
   - Documentación de controles

5. **Pruebas de Seguridad** (10 min)
   - Verificación de controles CIA
   - Simulación de ataques
   - Validación de integridad

### 3. `GUIA_CLASE.md`
**Planificación detallada para el docente**

**Incluye:**
- ⏱️ Distribución de tiempo (teoría 50 min + práctica 60 min)
- 📝 Notas de preparación
- ⚠️ Problemas comunes y soluciones
- 🎯 Puntos críticos a enfatizar
- 📚 Recursos adicionales
- ✅ Checklist de clase

---

## 🎯 Objetivos de Aprendizaje

Al finalizar esta semana, los estudiantes podrán:

1. ✅ **Comprender** la Triada CIA como objetivos fundamentales de ciberseguridad
2. ✅ **Analizar** modelos de amenaza usando STRIDE
3. ✅ **Implementar** criptografía aplicada (Hash, Simétrica, Asimétrica)
4. ✅ **Configurar** TLS/SSL en MySQL
5. ✅ **Crear y verificar** JWT firmados con RS256
6. ✅ **Aplicar** HMAC para integridad de datos
7. ✅ **Documentar** un modelo de amenaza completo

---

## 📊 Actividades Calificadas

### PE-1.4: Laboratorio TLS + JWT/PASETO (2.25 puntos)
**Entregables:**
- Capturas de pantalla de:
  - ✅ Verificación de TLS habilitado en MySQL
  - ✅ Consulta de datos cifrados y descifrados
  - ✅ Output del script JWT con verificación exitosa
  - ✅ Consulta de logs con HMAC válido

### TA-1.4: Informe de Modelo de Amenaza (2.25 puntos)
**Documento de 1-2 páginas:**
- ✅ Tabla de amenazas STRIDE identificadas
- ✅ Matriz de riesgo con porcentaje de mitigación
- ✅ Descripción de controles implementados
- ✅ Recomendaciones para amenazas pendientes

---

## 🛠️ Herramientas Necesarias

### Software Requerido
- ✅ **MySQL 8.0+** - Base de datos
- ✅ **MySQL Workbench** - Cliente gráfico
- ✅ **OpenSSL** - Generación de certificados (incluido en Git for Windows)
- ✅ **Node.js** - Para scripts JWT

### Instalación Rápida

#### Windows
```powershell
# Verificar OpenSSL (viene con Git)
openssl version

# Si no está instalado, descargar de:
# https://slproweb.com/products/Win32OpenSSL.html

# Verificar Node.js
node --version

# Si no está instalado, descargar de:
# https://nodejs.org/
```

---

## 📚 Conceptos Clave

### Triada CIA
- **C**onfidencialidad: Protección contra acceso no autorizado
- **I**ntegridad: Garantía contra modificaciones no autorizadas
- **A**vailability (Disponibilidad): Acceso oportuno para usuarios legítimos

### Triada DAD (Amenazas)
- **D**ivulgación: Ataca Confidencialidad
- **A**lteración: Ataca Integridad
- **D**enegación: Ataca Disponibilidad

### Criptografía Aplicada
- **Hash/HMAC**: Integridad de datos
- **Simétrica (AES)**: Cifrado rápido de datos
- **Asimétrica (RSA)**: Firmas digitales y no repudio
- **Híbrida (TLS)**: Combina ambas para óptimo rendimiento

### STRIDE (Modelo de Amenaza)
- **S**poofing (Suplantación)
- **T**ampering (Alteración)
- **R**epudiation (Repudio)
- **I**nformation Disclosure (Divulgación)
- **D**enial of Service (Denegación de Servicio)
- **E**levation of Privilege (Elevación de Privilegios)

---

## 🔗 Recursos Adicionales

### Documentación Oficial
- [MySQL SSL/TLS](https://dev.mysql.com/doc/refman/8.0/en/using-encrypted-connections.html)
- [JWT RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)
- [TLS 1.3 RFC 8446](https://datatracker.ietf.org/doc/html/rfc8446)

### Herramientas Online
- [JWT.io](https://jwt.io/) - Debugger de JWT
- [CyberChef](https://gchq.github.io/CyberChef/) - Herramientas criptográficas
- [SSL Labs](https://www.ssllabs.com/ssltest/) - Test de configuración TLS

### Videos Recomendados
- [How TLS Works](https://www.youtube.com/watch?v=0TLDTodL7Lc) (5 min)
- [JWT Explained](https://www.youtube.com/watch?v=7Q17ubqLfaM) (10 min)
- [STRIDE Threat Modeling](https://www.youtube.com/watch?v=6fhEdJ9YcU0) (15 min)

### Lecturas Complementarias
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [NIST Cryptographic Standards](https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines)
- [Microsoft STRIDE](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats)

---

## ⚡ Quick Start

### Para Estudiantes

1. **Revisar presentación** (`presentacion.html`)
2. **Seguir laboratorio** (`LABORATORIO.md`) paso a paso
3. **Completar entregables** (PE-1.4 y TA-1.4)
4. **Consultar dudas** en horario de tutorías

### Para Docentes

1. **Revisar guía de clase** (`GUIA_CLASE.md`)
2. **Preparar entorno** (verificar instalaciones)
3. **Probar laboratorio** antes de clase
4. **Tener certificados de ejemplo** listos

---

## 📞 Contacto

**Profesor:** Mgs. Charlie Cárdenas Toledo  
**Email:** chcardenasto@uide.edu.ec  
**Horario de tutorías:** 
- Lunes: 10:00 - 12:00
- Viernes: 08:00 - 09:00

---

## 📝 Notas Importantes

⚠️ **Seguridad:**
- NUNCA almacenar claves de cifrado en el código
- Usar variables de entorno en producción
- Rotar claves periódicamente
- TLS 1.2+ obligatorio

✅ **Mejores Prácticas:**
- Claves RSA de al menos 2048 bits
- Algoritmos de hash SHA-256 o superior
- Tokens JWT con expiración corta (15-60 min)
- Implementar rate limiting en APIs

---

## 🎓 Alineación con el Sílabo

Esta semana corresponde a:
- **Unidad 2:** Protocolos y seguridad en Middleware
- **Contenido:** CIA, modelos de amenaza, criptografía aplicada (hash, sim/asim, TLS, PKI)
- **Herramientas:** OpenSSL, Postman, Wireshark, OWASP ZAP
- **Resultado de aprendizaje:** Describir principios y modelos de seguridad para middleware

---

**Última actualización:** Noviembre 2025  
**Versión:** 2.0 (Condensada y optimizada)
