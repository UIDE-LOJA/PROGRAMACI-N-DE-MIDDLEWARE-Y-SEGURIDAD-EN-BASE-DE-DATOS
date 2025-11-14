# 📚 Índice de Materiales - Semana 4

## CIA, Modelos de Amenaza y Criptografía Aplicada

---

## 📖 Archivos Principales

### 1. 📊 **presentacion.html**
**Presentación interactiva completa (27 slides)**

- ✅ Contenido teórico completo y detallado
- ✅ Navegación con teclado (flechas) o botones
- ✅ Barra de progreso
- ✅ Diseño responsive

**Contenido:**
- Triada CIA (Confidencialidad, Integridad, Disponibilidad)
- Triada DAD (Divulgación, Alteración, Denegación)
- Criptografía aplicada (Hash, HMAC, Simétrica, Asimétrica, Híbrida, Firmas)
- TLS, PKI y mTLS (detallado)
- Modelo de amenaza STRIDE
- Mejores prácticas y casos de estudio
- Referencias bibliográficas

**⚠️ Importante:** Para clase de 2 horas, usar presentación selectiva (ver GUIA_CLASE.md)
- **Slides esenciales:** 1-7, 23-27, 31-33 (≈15 slides = 50 min)
- **Presentación completa:** 27 slides (≈90 min) - solo si tienes 3 horas

**Cómo usar:** Abrir en navegador web (Chrome, Firefox, Edge)

---

### 2. 🔬 **LABORATORIO.md**
**Guía práctica paso a paso (60-70 minutos)**

**Ejercicios incluidos:**
1. Configuración de TLS en MySQL (15 min)
2. Cifrado de datos sensibles con AES (15 min)
3. JWT con RS256 (20 min)
4. Modelo de amenaza STRIDE (15 min)
5. Pruebas de seguridad (10 min)

**Entregables:**
- PE-1.4: Capturas del laboratorio (2.25 puntos)
- TA-1.4: Informe de modelo de amenaza (2.25 puntos)

---

### 3. 💾 **laboratorio.sql**
**Script SQL completo y ejecutable**

**Incluye:**
- Creación de base de datos y tablas
- Funciones para HMAC
- Datos de ejemplo con cifrado AES
- Vistas para análisis de riesgo
- Procedimientos almacenados
- Pruebas de seguridad
- Simulación de ataques

**Cómo usar:** Ejecutar en MySQL Workbench o línea de comandos

---

### 4. 💻 **jwt-demo.js**
**Script Node.js para demostración de JWT**

**Funcionalidades:**
- Generación de JWT con RS256
- Verificación de firma digital
- Detección de tokens manipulados
- Validación de expiración
- Output con colores en consola

**Cómo usar:** `node jwt-demo.js`

---

## 📋 Archivos de Soporte

### 5. 👨‍🏫 **GUIA_CLASE.md**
**Para el docente**

- Planificación detallada (teoría 50 min + práctica 60 min)
- Notas de preparación
- Problemas comunes y soluciones
- Puntos críticos a enfatizar
- Recursos adicionales
- Checklist de clase

---

### 6. 🛠️ **INSTALACION.md**
**Guía de instalación rápida**

**Software requerido:**
- MySQL 8.0+
- MySQL Workbench
- OpenSSL
- Node.js

**Incluye:**
- Instrucciones paso a paso para Windows
- Verificación de instalación
- Solución de problemas comunes
- Checklist pre-laboratorio

---

### 7. 📖 **README.md**
**Resumen general de la semana**

- Objetivos de aprendizaje
- Descripción de archivos
- Conceptos clave
- Recursos adicionales
- Información de contacto

---

## 🎯 Flujo de Trabajo Recomendado

### Para Estudiantes:

```
1. INSTALACION.md
   ↓
2. presentacion.html (durante clase)
   ↓
3. LABORATORIO.md (práctica guiada)
   ↓
4. laboratorio.sql (ejecutar scripts)
   ↓
5. jwt-demo.js (probar JWT)
   ↓
6. Completar entregables (PE-1.4 y TA-1.4)
```

### Para Docentes:

```
1. GUIA_CLASE.md (preparación)
   ↓
2. Verificar instalaciones (INSTALACION.md)
   ↓
3. Probar laboratorio completo
   ↓
4. presentacion.html (teoría en clase)
   ↓
5. LABORATORIO.md (guiar práctica)
   ↓
6. Evaluar entregables
```

---

## 📊 Distribución de Tiempo

### Clase de 2 horas (120 minutos)

| Actividad | Tiempo | Archivo |
|-----------|--------|---------|
| Introducción y CIA | 15 min | presentacion.html (Slides 1-5) |
| Amenazas y Criptografía | 20 min | presentacion.html (Slides 6-7) |
| TLS, PKI y Mejores Prácticas | 15 min | presentacion.html (Slides 8-10) |
| **BREAK** | 5 min | - |
| Lab: TLS en MySQL | 15 min | LABORATORIO.md Parte 1 |
| Lab: Cifrado de datos | 15 min | LABORATORIO.md Parte 2 |
| Lab: JWT con RS256 | 20 min | LABORATORIO.md Parte 3 |
| Lab: Modelo de amenaza | 10 min | LABORATORIO.md Parte 4 |
| Cierre y Q&A | 5 min | - |

---

## 🎓 Objetivos de Aprendizaje

Al completar esta semana, los estudiantes podrán:

1. ✅ Explicar la Triada CIA y su aplicación en APIs
2. ✅ Identificar amenazas usando el modelo STRIDE
3. ✅ Configurar TLS/SSL en MySQL
4. ✅ Implementar cifrado AES para datos sensibles
5. ✅ Crear y verificar JWT con RS256
6. ✅ Aplicar HMAC para integridad de datos
7. ✅ Documentar un modelo de amenaza completo

---

## 📦 Entregables

### PE-1.4: Laboratorio TLS + JWT/PASETO (2.25 puntos)

**Formato:** Documento PDF con capturas de pantalla

**Debe incluir:**
1. ✅ Verificación de TLS habilitado en MySQL
   - `SHOW VARIABLES LIKE '%ssl%';`
   - `SHOW STATUS LIKE 'Ssl_cipher';`

2. ✅ Consulta de datos cifrados y descifrados
   - SELECT con tarjetas cifradas (HEX)
   - SELECT con tarjetas descifradas (AES_DECRYPT)

3. ✅ Output del script JWT
   - Ejecución de `node jwt-demo.js`
   - JWT generado y verificado
   - Prueba de token manipulado

4. ✅ Consulta de logs con HMAC válido
   - SELECT con verificación de integridad
   - Todos los logs deben mostrar "VÁLIDO"

**Fecha de entrega:** [Según calendario del curso]

---

### TA-1.4: Informe de Modelo de Amenaza (2.25 puntos)

**Formato:** Documento PDF de 1-2 páginas

**Debe incluir:**

1. ✅ **Tabla de Amenazas STRIDE** (0.75 puntos)
   - Mínimo 5 amenazas identificadas
   - Clasificación STRIDE correcta
   - Descripción clara de cada amenaza

2. ✅ **Matriz de Riesgo** (0.75 puntos)
   - Impacto (Crítico, Alto, Medio, Bajo)
   - Probabilidad (Alta, Media, Baja)
   - Porcentaje de mitigación

3. ✅ **Controles Implementados** (0.50 puntos)
   - TLS configurado
   - AES para cifrado
   - JWT con RS256
   - HMAC para integridad

4. ✅ **Recomendaciones** (0.25 puntos)
   - Controles pendientes
   - Priorización de implementación
   - Mejoras sugeridas

**Fecha de entrega:** [Según calendario del curso]

---

## 🔗 Enlaces Rápidos

### Documentación Oficial
- [MySQL SSL/TLS](https://dev.mysql.com/doc/refman/8.0/en/using-encrypted-connections.html)
- [JWT RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)
- [OpenSSL Documentation](https://www.openssl.org/docs/)

### Herramientas Online
- [JWT.io](https://jwt.io/) - Debugger de JWT
- [CyberChef](https://gchq.github.io/CyberChef/) - Herramientas criptográficas
- [SSL Labs](https://www.ssllabs.com/ssltest/) - Test de TLS

### Videos Recomendados
- [How TLS Works](https://www.youtube.com/watch?v=0TLDTodL7Lc) (5 min)
- [JWT Explained](https://www.youtube.com/watch?v=7Q17ubqLfaM) (10 min)
- [STRIDE Threat Modeling](https://www.youtube.com/watch?v=6fhEdJ9YcU0) (15 min)

---

## 💡 Consejos para el Éxito

### Para Estudiantes:

1. **Preparación:**
   - Instalar todo el software ANTES de la clase
   - Leer INSTALACION.md con anticipación
   - Probar conexión a MySQL

2. **Durante la Clase:**
   - Seguir la presentación activamente
   - Tomar notas de conceptos clave
   - Hacer preguntas cuando algo no esté claro

3. **Laboratorio:**
   - Seguir LABORATORIO.md paso a paso
   - No saltarse pasos
   - Tomar capturas de pantalla inmediatamente
   - Guardar todos los scripts ejecutados

4. **Entregables:**
   - Comenzar el informe durante el laboratorio
   - Documentar problemas encontrados y soluciones
   - Revisar rúbrica antes de entregar

### Para Docentes:

1. **Preparación:**
   - Probar todo el laboratorio 1-2 días antes
   - Tener certificados SSL de ejemplo listos
   - Preparar máquina virtual de respaldo

2. **Durante la Clase:**
   - Monitorear progreso de estudiantes
   - Identificar problemas comunes temprano
   - Tener soluciones rápidas preparadas

3. **Evaluación:**
   - Usar rúbrica consistente
   - Dar feedback constructivo
   - Identificar áreas de mejora para próxima iteración

---

## 🆘 Soporte y Contacto

**Profesor:** Mgs. Charlie Cárdenas Toledo  
**Email:** chcardenasto@uide.edu.ec

**Horario de tutorías:**
- Lunes: 10:00 - 12:00
- Viernes: 08:00 - 09:00

**Recursos adicionales:**
- Foro del curso: [Plataforma LMS]
- Material complementario: [Drive/OneDrive]
- Repositorio: [GitHub/GitLab]

---

## 📝 Notas Importantes

⚠️ **Seguridad:**
- NUNCA compartir claves privadas
- NUNCA almacenar claves en código fuente
- Usar variables de entorno en producción
- TLS 1.2+ es obligatorio

✅ **Mejores Prácticas:**
- Claves RSA de al menos 2048 bits
- Algoritmos de hash SHA-256 o superior
- Tokens JWT con expiración corta (15-60 min)
- Rate limiting en APIs de producción

🎯 **Alineación con Sílabo:**
- Unidad 2: Protocolos y seguridad en Middleware
- Semana 4: CIA, modelos de amenaza, criptografía aplicada
- Herramientas: OpenSSL, Postman, Wireshark, OWASP ZAP

---

## 📊 Estructura de Archivos

```
semana-04/
├── 📊 presentacion.html          # Presentación interactiva (10 slides)
├── 🔬 LABORATORIO.md             # Guía práctica paso a paso
├── 💾 laboratorio.sql            # Script SQL completo
├── 💻 jwt-demo.js                # Demo de JWT con RS256
├── 👨‍🏫 GUIA_CLASE.md             # Planificación para docente
├── 🛠️ INSTALACION.md             # Guía de instalación
├── 📖 README.md                  # Resumen general
├── 📚 INDICE.md                  # Este archivo
├── 📄 presentacion-semana4.md    # Contenido markdown
├── 📄 semana4.md                 # Material complementario
├── 🎨 presentacion.js            # Scripts de navegación
└── 📁 css/                       # Estilos de presentación
```

---

**Última actualización:** Noviembre 2025  
**Versión:** 2.0 (Condensada y optimizada)  
**Estado:** ✅ Listo para usar

---

## ✨ Cambios en Versión 2.0

### Mejoras Principales:

1. **Presentación condensada:** 41 → 10 slides
2. **Laboratorio estructurado:** Guía paso a paso con tiempos
3. **Scripts ejecutables:** SQL y JavaScript listos para usar
4. **Documentación completa:** Instalación, guías, soporte
5. **Enfoque práctico:** 50% teoría, 50% práctica

### Feedback Incorporado:

- ✅ Reducción de contenido teórico
- ✅ Más tiempo para práctica
- ✅ Instrucciones más claras
- ✅ Solución de problemas comunes
- ✅ Entregables bien definidos

---

¡Éxito en tu clase! 🚀
