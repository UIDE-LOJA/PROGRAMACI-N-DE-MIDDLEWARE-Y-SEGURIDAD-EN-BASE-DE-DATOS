# Presentación Semana 4: Seguridad en APIs
## CIA, Modelos de Amenaza y Criptografía Aplicada

---

## 🎯 Objetivos de la Presentación

- Comprender la **Triada CIA** como objetivos fundamentales de ciberseguridad
- Analizar **Modelos de Amenaza** y la triada DAD
- Dominar conceptos de **Criptografía Aplicada** (Hash, Simétrica, Asimétrica)
- Implementar **TLS y PKI** en el contexto de APIs

---

## 📊 Agenda

1. **La Triada CIA: Fundamentos de Ciberseguridad**
2. **Modelos de Amenaza y Agentes de Riesgo**
3. **Criptografía Aplicada: Hash, Simétrica y Asimétrica**
4. **TLS y PKI: Seguridad en APIs**
5. **Síntesis e Implicaciones Prácticas**

---

## 🔒 La Triada CIA: Objetivos Fundamentales

### Definición Central
> *"La Triada CIA define los tres objetivos complementarios de cualquier programa de ciberseguridad"*

### Los Tres Pilares
- **Confidencialidad (Confidentiality)**: Protección contra acceso no autorizado
- **Integridad (Integrity)**: Garantía contra modificaciones no autorizadas
- **Disponibilidad (Availability)**: Acceso oportuno para usuarios legítimos

---

## 🔐 Confidencialidad (Confidentiality)

### Objetivo Principal
Garantizar que individuos no autorizados no puedan acceder a información sensible

### Estados de los Datos
1. **Datos en reposo** (data at rest) → Almacenados en discos, cloud
2. **Datos en tránsito** (data in transit) → Enviados a través de redes
3. **Datos en uso** (data in use) → Procesados activamente por sistemas

---

## ✅ Integridad (Integrity)

### Definición
> *"Garantiza que las alteraciones a los activos de un sistema se pueden realizar solo de una manera autorizada"*

### Características
- **Protege contra**: Modificaciones intencionales y no intencionales
- **Controles de integridad**: Imponen requisitos de autorización
- **Aplicación en APIs**: Validación de datos y verificación de mensajes

---

## ⚡ Disponibilidad (Availability)

### Concepto Clave
Asegura que información y sistemas estén listos para usuarios legítimos cuando los necesiten

### Sistema Altamente Disponible
> *"Aquel que tiene la mayor probabilidad de estar funcionando en un instante dado"*

### Aplicación en APIs
- **Alta disponibilidad**: Redundancia y balanceo de carga
- **Mitigación de interrupciones**: Planes de contingencia

---

## 📝 No Repudio (Nonrepudiation)

### Definición
> *"Alguien que realizó alguna acción no puede negar más tarde haber realizado esa acción"*

### Implementación
- **Firmas digitales**: Control criptográfico principal
- **Logs de auditoría**: Registros inmutables
- **Certificados digitales**: Vinculación de identidad

### Importancia en APIs
Trazabilidad completa de todas las transacciones

---

## ⚠️ La Triada DAD: Amenazas a la Seguridad

### Definición de Modelo de Amenaza
> *"Proceso estratégico destinado a considerar posibles escenarios de ataque y vulnerabilidades"*

### Las Tres Amenazas Principales
1. **Divulgación (Disclosure)** → Ataca Confidencialidad
2. **Alteración (Alteration)** → Ataca Integridad
3. **Denegación (Denial)** → Ataca Disponibilidad

---

## 🔓 Divulgación (Disclosure)

### Concepto
Exposición de información sensible a individuos no autorizados

### Características
- **Conocido como**: Pérdida de datos (data breach)
- **Viola**: Principio de confidencialidad
- **Consecuencias**: Robo de credenciales, información financiera

### Ejemplos en APIs
- Tokens expuestos en logs
- Claves API filtradas
- Datos sensibles sin cifrar

---

## 🔧 Alteración (Alteration)

### Definición
Modificación no autorizada de la información

### Características
- **Viola**: Objetivo de integridad
- **Ejemplos**: Desfiguración de sitios web, manipulación de datos

### En el Contexto de APIs
- **Ataques de Man-in-the-Middle**: Interceptación y modificación
- **Inyección de código**: SQL injection, XSS
- **Manipulación de peticiones**: Parámetros alterados

---

## 🚫 Denegación (Denial)

### Concepto
Interrupción del acceso legítimo de usuarios autorizados

### Características
- **Viola**: Principio de disponibilidad
- **Manifestaciones**: DoS, DDoS

### Protección en APIs
- **Rate limiting**: Control de tasa de peticiones
- **Throttling**: Limitación de recursos
- **Autenticación robusta**: Prevención de abusos

---

## 🎭 Agentes de Amenaza

### Motivaciones de Atacantes
- **Lucro monetario**: Ciberdelincuentes (credenciales, datos financieros)
- **Venganza**: Empleados descontentos
- **Ventajas estratégicas**: Espionaje corporativo o estatal
- **Interés en información de negocio**: Competidores

---

## 🔍 Vulnerabilidades en APIs

### Por Qué las APIs son Objetivos Lucrativos
> *"Las APIs son puertas de enlace, una vulnerabilidad puede poner en peligro su integridad y provocar lapsos de seguridad en cascada"*

### Vulnerabilidades Comunes
- **Canales de comunicación no cifrados**
- **Almacenamiento de datos no cifrados**
- **Uso no autorizado de funciones**
- **Autenticación y autorización débiles**

---

## 🔐 Criptografía Aplicada: Fundamentos

### Definición
> *"La Criptografía es la ciencia de proteger la información para que dos o más personas puedan comunicarse sin que sus mensajes sean leídos o manipulados"*

### Objetivos que Cumple
- ✅ Confidencialidad
- ✅ Integridad
- ✅ Autenticación
- ✅ No repudio

---

## #️⃣ Funciones de Hashing

### Características Fundamentales
- **Función unidireccional**: No reversible
- **Salida única y repetible**: De longitud fija
- **Propiedad one-way**: Inviable encontrar la entrada desde el hash

### Aplicación: Integridad
> *"El hash de un mensaje sirve como una comprobación de integridad (integrity check)"*

---

## 🔑 HMAC: Hash en APIs

### Hash-based Message Authentication Code

### Funcionamiento
1. **Cuerpo de solicitud** se hashea con **clave privada**
2. **Hash resultante** se envía con la solicitud
3. **Receptor verifica** que el hash coincida

### Garantía
> *"Asegura que ningún tercero haya manipulado la solicitud"*

---

## 🔄 Criptografía Simétrica vs Asimétrica

### Comparación Clave

| Criterio | Simétrica | Asimétrica |
|----------|-----------|------------|
| **Claves** | Una sola clave compartida | Par de claves (pública/privada) |
| **Velocidad** | Muy rápida (1,000-10,000x) | Lenta |
| **No Repudio** | ❌ No implementa | ✅ Firmas digitales |
| **Escalabilidad** | ❌ No escalable | ✅ Extremadamente escalable |

---

## 🔒 Criptografía Simétrica

### Características
- **Una sola clave secreta** compartida
- **Cifrado y descifrado** con la misma clave
- **Muy rápida**: Ideal para cifrado masivo (bulk encryption)

### Limitaciones
- **No proporciona no repudio**: Ambas partes tienen la clave
- **Problema de distribución de claves**: Requiere canal seguro
- **No escalable**: N usuarios requieren N(N-1)/2 claves

### Uso Típico
Confidencialidad y protección de datos en reposo/tránsito

---

## 🔑 Criptografía Asimétrica

### Características
- **Par de claves**: Pública (compartida) + Privada (secreta)
- **Escalable**: Solo requiere un par por usuario
- **Proporciona no repudio**: Mediante firmas digitales

### Limitaciones
- **Lenta**: 1,000-10,000 veces más lenta que simétrica

### Uso Típico
- Intercambio seguro de claves
- Firmas digitales
- Autenticación

---

## 🔀 Criptografía Híbrida

### Concepto
> *"La práctica estándar es usar criptografía asimétrica para establecer conexión y asegurar el intercambio de una clave secreta simétrica"*

### Proceso
1. **Fase inicial**: Asimétrica para intercambio de claves
2. **Fase de comunicación**: Simétrica con la clave intercambiada

### Ventaja
Combina **seguridad de asimétrica** con **velocidad de simétrica**

---

## ✍️ Firmas Digitales

### Objetivos
- ✅ **Integridad**: Garantiza que no hubo alteración
- ✅ **No repudio**: Confirma identidad del remitente

### Proceso de Firma
1. **Firma**: Remitente cifra hash con su **clave privada**
2. **Verificación**: Destinatario descifra con **clave pública**
3. **Validación**: Compara hash descifrado con hash generado

### Resultado
Confirmación de **autoría** e **integridad** del mensaje

---

## 🌐 TLS: Seguridad en Tránsito

### HTTPS = HTTP + TLS
> *"TLS es el protocolo que se activa cuando se ve el candado en la barra de herramientas del navegador"*

### Garantías del Canal Seguro
- **Confidencialidad**: Cifrado de datos en tránsito
- **Integridad**: Detección de alteraciones
- **Autenticación**: Verificación de identidad del servidor

---

## 🔐 TLS en APIs

### Mitigación de Ataques
- **Evita espionaje** (eavesdropping)
- **Protege tokens y claves API**
- **Garantiza comunicación segura**

### Requisito Crítico
> *"Tokens y claves de API deben transportarse solo a través de una conexión segura como HTTPS"*

### Terminación SSL/TLS
Load balancers/reverse proxies manejan la conexión TLS, liberando al servidor

---

## 🏗️ PKI: Infraestructura de Clave Pública

### Definición
> *"La PKI se refiere a la tecnología, infraestructura y prácticas que apoyan la implementación y operación de certificados digitales"*

### Función Principal
Hacer posible la **comunicación segura a escala**

---

## 📜 Componentes de PKI

### 1. Certificado Digital
Declaración firmada por CA que vincula **clave pública** a **identidad** del sujeto

### 2. Autoridad de Certificación (CA)
Entidad de confianza que **crea y firma** certificados digitales

### 3. Revocación
Los certificados pueden ser **cancelados** si la clave privada se compromete

---

## 🔐 mTLS: Autenticación Mutua

### Mutual TLS en Microsservicios
> *"Tanto el servidor como el cliente deben presentar un certificado y autenticarse mutuamente"*

### Características
- **También conocido como**: Two-Way SSL
- **Verifica**: Identidad del cliente y del servidor
- **Aplicación**: Comunicación servicio-a-servicio

### Ventaja en APIs
Autenticación robusta en la **capa de transporte**

---

## 🔄 Flujo de Autenticación mTLS

### Proceso
1. **Cliente inicia** conexión TLS
2. **Servidor presenta** su certificado
3. **Cliente valida** certificado del servidor
4. **Servidor solicita** certificado del cliente
5. **Cliente presenta** su certificado
6. **Servidor valida** certificado del cliente
7. **Conexión segura** establecida

---

## 🛡️ Protección de APIs: Resumen

### Capa de Transporte (TLS)
- **HTTPS obligatorio**: Todos los endpoints
- **TLS 1.2+**: Versiones actualizadas
- **mTLS**: Para comunicación servicio-a-servicio

### Capa de Aplicación
- **HMAC**: Integridad de peticiones
- **JWT firmados**: Tokens con firma digital
- **Validación estricta**: Entrada y salida

---

## 🎯 Mejores Prácticas en Seguridad de APIs

### Confidencialidad
- ✅ Cifrado en tránsito (TLS)
- ✅ Cifrado en reposo (AES)
- ✅ Gestión segura de claves

### Integridad
- ✅ HMAC para peticiones
- ✅ Firmas digitales
- ✅ Validación de entrada

### Disponibilidad
- ✅ Rate limiting
- ✅ Redundancia
- ✅ Monitoreo continuo

---

## 🔍 Modelo de Amenaza para APIs

### Proceso de Modelado
1. **Identificar activos**: Datos sensibles, funciones críticas
2. **Identificar amenazas**: DAD aplicado a cada activo
3. **Analizar vulnerabilidades**: Puntos débiles en canales y almacenamiento
4. **Evaluar riesgos**: Probabilidad e impacto
5. **Implementar controles**: Mitigación de riesgos

---

## ⚠️ Vulnerabilidades Críticas en APIs

### OWASP API Security Top 10
1. **Broken Object Level Authorization**
2. **Broken Authentication**
3. **Broken Object Property Level Authorization**
4. **Unrestricted Resource Consumption**
5. **Broken Function Level Authorization**

### Mitigación
Aplicar **principios CIA** y **controles criptográficos**

---

## 🧩 Síntesis: Integrando los Conceptos

### CIA como Base
- **Confidencialidad**: TLS, cifrado
- **Integridad**: HMAC, firmas digitales
- **Disponibilidad**: Rate limiting, redundancia

### DAD como Amenazas
- **Divulgación**: Proteger con cifrado
- **Alteración**: Validar con hash/firmas
- **Denegación**: Mitigar con throttling

### Criptografía como Herramienta
- **Hash**: Integridad
- **Simétrica**: Confidencialidad rápida
- **Asimétrica**: No repudio y distribución de claves

---

## 🎯 Implementación Práctica

### Checklist de Seguridad para APIs
- [ ] **TLS 1.2+** en todos los endpoints
- [ ] **Autenticación robusta** (OAuth 2.0, JWT)
- [ ] **Autorización granular** (RBAC, ABAC)
- [ ] **Rate limiting** implementado
- [ ] **HMAC** para integridad de peticiones
- [ ] **Logging y auditoría** completos
- [ ] **Gestión de claves** segura
- [ ] **mTLS** para comunicación interna

---

## 🔬 Caso de Estudio: API Gateway Segura

### Componentes
1. **Edge**: TLS termination, rate limiting
2. **Autenticación**: JWT con RS256 (asimétrica)
3. **Autorización**: Validación de claims
4. **Backend**: mTLS entre servicios
5. **Integridad**: HMAC en peticiones sensibles
6. **Logging**: Auditoría completa

### Resultado
Arquitectura que cumple **CIA** y mitiga **DAD**

---

## 📚 Referencias Clave

### Fundamentos de Seguridad
- **Raymond, R., et al. (2023)**. *CompTIA Security+ Study Guide*. Technet24
- **Schneier, B. (1996)**. *Security Engineering: A Guide to Building Dependable Distributed Systems*

### Criptografía
- **Menezes, A. J., Oorschot, P. C. van, & Vanstone, S. A. (1996)**. *Handbook of Applied Cryptography*. CRC Press
- **Zuquete, A. (2021)**. *Segurança em Redes Informáticas* (6ª edição). FCA

---

## 📖 Referencias: APIs y Seguridad

### Seguridad en APIs
- **Madden, N.** *API Security in Action* (1st Edition)
- **Voelter, M., Kircher, M., & Zdun, U. (2022)**. *Patterns for API Design: Simplifying Integration with Loosely Coupled Message Exchanges*

### Arquitectura y Microservicios
- **Newman, S. (2015)**. *Building Microservices: Designing Fine-Grained Systems*. O'Reilly
- **Papazoglou, M. P. (2003)**. *Web Services: Principles and Technology*

---

## 🔐 Referencias: Modelos de Amenaza

### Threat Modeling
- **UcedaVélez, T., & Morana, M. M. (2015)**. *Risk Centric Threat Modeling: Process for Attack Simulation and Threat Analysis*. John Wiley & Sons

### Arquitectura y Redes
- **Kurose, J. F., & Ross, K. W. (2017)**. *Computer Networking - a Top-Down Approach* (7th Edition). Pearson
- **Tanenbaum, A. S., & van Steen, M. (2007)**. *Distributed Systems: Principles and Paradigms*

---

## 💡 Reflexiones Finales

### Preguntas para Considerar
- ¿Cómo equilibrar **seguridad** y **rendimiento** en APIs?
- ¿Qué controles criptográficos son **esenciales** vs. **opcionales**?
- ¿Cómo implementar **defensa en profundidad** efectivamente?

### Desafío Profesional
> *"Una vulnerabilidad en una API puede provocar lapsos de seguridad en cascada a través de todos los sistemas vinculados a ella"*

---

## 🚀 Pasos Siguientes

### Para Profundizar
1. **Estudiar OWASP API Security Top 10**
2. **Implementar TLS y mTLS** en proyectos
3. **Practicar modelado de amenazas**
4. **Explorar PKI** en infraestructura cloud

### Herramientas Recomendadas
- **OpenSSL**: Generación de certificados y claves
- **Postman**: Testing de APIs con autenticación
- **Wireshark**: Análisis de tráfico TLS
- **OWASP ZAP**: Pentesting de APIs

---

## 🎯 Conclusión: CIA + Criptografía = APIs Seguras

### Principios Fundamentales
1. **CIA** define los objetivos de seguridad
2. **DAD** identifica las amenazas principales
3. **Criptografía** proporciona las herramientas
4. **TLS/PKI** implementa la infraestructura
5. **Modelado de amenazas** guía la estrategia

### Mensaje Final
La seguridad de APIs requiere un enfoque **holístico** que integre teoría y práctica

---

*Presentación basada en el compendio de Semana 4 - CIA, Modelos de Amenaza y Criptografía Aplicada a APIs*
