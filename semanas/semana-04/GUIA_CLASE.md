# Guía de Clase - Semana 4: CIA, Modelos de Amenaza y Criptografía Aplicada

## Duración Total: 2 horas (120 minutos)

---

## ⚠️ Nota Importante sobre la Presentación

La presentación actual tiene **27 slides** con contenido completo. Para una clase de 2 horas con laboratorio, se recomienda:

### Opción A: Presentación Selectiva (Recomendado)
Usar solo los slides esenciales (50 min de teoría):
- Slides 1-6: Introducción, CIA y DAD
- Slides 7-8: Criptografía aplicada
- Slides 23-27: TLS y PKI (saltar detalles)
- Slides 31-33: Modelo de amenaza y síntesis

### Opción B: Presentación Completa
Si tienes 3 horas o quieres más profundidad teórica:
- Usar todos los 27 slides (90 min)
- Laboratorio reducido (60 min)

**Esta guía asume Opción A** para cumplir con el tiempo de 2 horas.

---

## Estructura de la Clase (Opción A - Recomendada)

### Parte 1: Teoría Esencial (50 minutos)
**Slides selectivos de la presentación**

#### Bloque 1: Introducción y CIA (15 min)
- **Slide 1:** Título y contexto de la semana
- **Slide 2:** Objetivos de aprendizaje
- **Slide 3:** Agenda
- **Slide 4:** Triada CIA - Fundamentos
- **Slide 5:** CIA Detallado (Confidencialidad, Integridad, Disponibilidad, No Repudio)

**Actividad rápida (3 min):** Pedir a estudiantes ejemplos de violaciones a CIA en APIs que conozcan

#### Bloque 2: Amenazas y Criptografía (20 min)
- **Slide 6:** Triada DAD (Divulgación, Alteración, Denegación) + Agentes de Amenaza
- **Slide 7:** Criptografía Aplicada (Hash, HMAC, Firmas, Simétrica, Asimétrica, Híbrida)

**Actividad rápida (3 min):** ¿Qué tipo de criptografía usarías para cada escenario?
  - Almacenar contraseñas → Hash
  - Cifrar archivos grandes → Simétrica
  - Firmar un contrato digital → Asimétrica
  - HTTPS → Híbrida

#### Bloque 3: TLS, PKI y Mejores Prácticas (15 min)
- **Slides 23-25:** TLS, PKI (conceptos clave, saltar detalles técnicos)
- **Slide 27:** mTLS (breve mención)
- **Slides 31-33:** Modelo de Amenaza STRIDE + Síntesis

**Nota:** Saltar slides 8-22 (detalles redundantes) y 28-30, 34-41 (referencias y conclusiones extensas)

---

### Parte 2: Laboratorio Práctico (60 minutos)
**Seguir LABORATORIO.md**

#### Ejercicio 1: TLS en MySQL (15 min)
- Generar certificados SSL con OpenSSL
- Configurar MySQL para usar TLS
- Verificar conexión segura

#### Ejercicio 2: Cifrado de Datos (15 min)
- Crear base de datos con datos sensibles
- Implementar cifrado AES para tarjetas de crédito
- Implementar HMAC para logs de auditoría

#### Ejercicio 3: JWT con RS256 (20 min)
- Generar par de claves RSA
- Crear y verificar JWT con Node.js
- Almacenar tokens en MySQL
- Probar integridad (token manipulado)

#### Ejercicio 4: Modelo de Amenaza (10 min)
- Documentar amenazas STRIDE
- Crear matriz de riesgo
- Verificar controles implementados

---

### Parte 3: Cierre y Entregables (10 minutos)

#### Resumen de Conceptos Clave
1. **CIA** define los objetivos de seguridad
2. **DAD** identifica las amenazas principales
3. **Criptografía** proporciona las herramientas:
   - Hash/HMAC → Integridad
   - Simétrica → Confidencialidad rápida
   - Asimétrica → No repudio y distribución de claves
   - Híbrida (TLS) → Mejor de ambos mundos
4. **Modelo de Amenaza** guía la estrategia de seguridad

#### Entregables de la Semana
- **PE-1.4:** Capturas del laboratorio (TLS + JWT + HMAC) - 2.25 puntos
- **TA-1.4:** Informe de modelo de amenaza (1-2 páginas) - 2.25 puntos

#### Preguntas y Respuestas

---

## Notas para el Docente

### Preparación Previa
✅ Verificar que los estudiantes tengan instalado:
- MySQL 8.0+
- MySQL Workbench
- OpenSSL (incluido en Git for Windows)
- Node.js (para JWT)

✅ Tener preparado:
- Certificados SSL de ejemplo (por si hay problemas)
- Script JWT funcional
- Base de datos de ejemplo

### Puntos Críticos a Enfatizar

1. **TLS es obligatorio** para cualquier API en producción
2. **Nunca almacenar datos sensibles sin cifrar**
3. **JWT debe usar RS256** (asimétrica) para no repudio, no HS256
4. **HMAC protege integridad** de logs y peticiones
5. **Modelo de amenaza** debe hacerse ANTES de implementar

### Problemas Comunes y Soluciones

#### Problema 1: OpenSSL no encontrado
**Solución:** Usar Git Bash o instalar OpenSSL desde https://slproweb.com/products/Win32OpenSSL.html

#### Problema 2: MySQL no reinicia con TLS
**Solución:** Verificar rutas de certificados (usar `/` no `\` en Windows)

#### Problema 3: Node.js no instalado
**Solución:** Descargar de https://nodejs.org/ o usar versión online de JWT.io

#### Problema 4: Permisos de certificados
**Solución:** Ejecutar PowerShell como administrador

### Adaptaciones por Tiempo

#### Si te quedas sin tiempo (solo 90 min):
- Reducir teoría a 30 min (slides 1-6 solamente)
- Hacer solo Ejercicios 1, 2 y 4 del laboratorio
- JWT como tarea para casa

#### Si tienes tiempo extra:
- Demostrar Wireshark capturando tráfico TLS
- Mostrar OWASP ZAP escaneando la API
- Discutir casos reales de brechas de seguridad

---

## Recursos Adicionales para Estudiantes

### Videos Recomendados
- [How TLS Works](https://www.youtube.com/watch?v=0TLDTodL7Lc) (5 min)
- [JWT Explained](https://www.youtube.com/watch?v=7Q17ubqLfaM) (10 min)
- [STRIDE Threat Modeling](https://www.youtube.com/watch?v=6fhEdJ9YcU0) (15 min)

### Herramientas Online
- [JWT.io](https://jwt.io/) - Debugger de JWT
- [CyberChef](https://gchq.github.io/CyberChef/) - Herramientas criptográficas
- [SSL Labs](https://www.ssllabs.com/ssltest/) - Test de configuración TLS

### Lecturas Complementarias
- OWASP API Security Top 10
- RFC 7519 (JWT)
- RFC 8446 (TLS 1.3)

---

## Evaluación Rápida (Opcional)

### Preguntas de Verificación

1. **¿Qué pilar de CIA ataca un ataque de DDoS?**
   - Respuesta: Disponibilidad

2. **¿Qué tipo de criptografía usa TLS para el intercambio inicial de claves?**
   - Respuesta: Asimétrica (luego cambia a simétrica)

3. **¿Cuál es la diferencia entre Hash y HMAC?**
   - Respuesta: HMAC incluye una clave secreta, Hash no

4. **¿Por qué JWT con RS256 es mejor que HS256 para APIs públicas?**
   - Respuesta: RS256 usa clave asimétrica, permite verificar sin compartir secreto

5. **¿Qué significa la "T" en STRIDE?**
   - Respuesta: Tampering (Alteración)

---

## Checklist de Clase

### Antes de la Clase
- [ ] Presentación cargada y probada
- [ ] MySQL funcionando
- [ ] OpenSSL accesible
- [ ] Node.js instalado
- [ ] Scripts de laboratorio probados
- [ ] Certificados de ejemplo preparados

### Durante la Clase
- [ ] Tomar asistencia
- [ ] Compartir LABORATORIO.md con estudiantes
- [ ] Monitorear progreso en ejercicios
- [ ] Resolver dudas en tiempo real
- [ ] Tomar capturas de pantalla de ejemplos

### Después de la Clase
- [ ] Subir materiales a plataforma
- [ ] Recordar fechas de entrega (PE-1.4 y TA-1.4)
- [ ] Responder preguntas en foro
- [ ] Preparar rúbrica de evaluación

---

## Contacto y Soporte

**Profesor:** Mgs. Charlie Cárdenas Toledo  
**Email:** chcardenasto@uide.edu.ec  
**Horario de tutorías:** Lunes 10:00-12:00, Viernes 08:00-09:00

**Recursos en línea:**
- Repositorio del curso: [GitHub/GitLab]
- Foro de discusión: [Plataforma LMS]
- Material complementario: [Drive/OneDrive]
