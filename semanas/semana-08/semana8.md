Compendio Exhaustivo: Seguridad de APIs (AuthN/AuthZ, Tokens y Mitigación de Riesgos)
I. Autenticación y Autorización: Conceptos Fundamentales
La seguridad en los sistemas distribuidos, como las arquitecturas de microservicios, se basa en una estrategia consistente de autenticación y autorización. Estos son conceptos fundamentales cuando se trata de la interacción entre personas o sistemas.
A. Definición de Autenticación (Authentication)
La autenticación es el proceso mediante el cual "confirmamos que una parte es quien dice ser". Este mecanismo verifica la identidad declarada de un usuario, cliente o servidor.
B. Definición de Autorización (Authorization)
La autorización es el mecanismo que "gestiona lo que un usuario puede o no puede acceder, también conocido como permisos". Este proceso determina "qué nivel de acceso deberían tener" los usuarios. La autorización es crucial para proteger los recursos, asegurando que solo los procesos con los derechos de acceso adecuados puedan acceder a ellos.
Formalmente, la verificación de los derechos de acceso se conoce como control de acceso, mientras que la autorización se trata de "otorgar derechos de acceso". Ambos términos están estrechamente relacionados y a menudo se usan indistintamente.
C. Estrategias de Control de Acceso
Para la autorización, se recomienda emplear control de acceso basado en roles (RBAC) o control de acceso basado en atributos (ABAC).
• RBAC: Asigna permisos basados en roles definidos, donde un "rol activo del sujeto debe estar autorizado para el sujeto".
• ABAC: Combina decisiones basadas en atributos para determinar el acceso.
II. OAuth 2.0 y OpenID Connect (OIDC)
En arquitecturas distribuidas y de microservicios, las soluciones de autenticación tradicionales de aplicaciones monolíticas no son suficientes. La solución moderna a la autenticación en microservicios viene en forma de OpenID Connect y OAuth 2.0.
A. OAuth 2.0 (Framework de Autorización Delegada)
OAuth 2.0 es un estándar industrial para la autorización. Es mejor descrito como un "marco de autorización convertido en especificación" (RFC 6749). Su propósito es permitir que "una aplicación de terceros obtenga acceso limitado a un servicio HTTP, ya sea en nombre de un propietario del recurso... o permitiendo que la aplicación de terceros obtenga acceso por cuenta propia".
Dado que OAuth 2.0 es fundamentalmente un marco de autorización delegada, este "se basa en un mecanismo de autenticación" para completar el flujo.
Roles en OAuth 2.0:
1. Recurso (Resource): La entidad que está siendo protegida (un microservicio en este contexto).
2. Propietario del Recurso (Resource Owner): La persona o entidad que posee el recurso (el usuario final).
3. Cliente (Client): Cualquier aplicación que intenta acceder al recurso protegido (aplicaciones web, móviles o incluso otro microservicio que accede a un servicio downstream).
4. Servidor de Autorización (Authorization Server): El servidor que aloja el servicio de token seguro (Secure Token Service, STS) y emite tokens al cliente después de autenticar al propietario del recurso y obtener permisos.
B. OpenID Connect (OIDC)
OpenID Connect 1.0 es una "capa de identidad simple sobre el protocolo OAuth 2.0". Mientras que OAuth 2.0 trata de la autorización delegada, OpenID Connect trata de la autenticación.
OIDC permite a los clientes "verificar a los usuarios finales basándose en la autenticación realizada por un servidor de autorización". Define un "token de identidad estandarizado (ID token)" que se envía a la aplicación para que esta pueda validar quién es el usuario.
Ambos protocolos son esenciales para la autenticación a través de servicios. Azure Active Directory (Azure AD) es un proveedor que soporta OAuth 2.0 y OpenID Connect 1.0.
III. Tokens de Seguridad (JWT)
Los tokens son fundamentales para lograr una autenticación sin estado (stateless).
A. JSON Web Tokens (JWT)
JSON Web Tokens (JWT), pronunciado JOT, es un "esquema o formato JSON bien definido para describir los tokens involucrados en un proceso de intercambio de datos". Los JWT no están necesariamente ligados a OAuth 2.0 o OpenID Connect, aunque OIDC los exige.
• Estructura y Componentes: El token codificado tiene tres partes separadas por un punto (.): Header, Payload y Signature.
• Contenido: Los tokens contienen información sobre el emisor y el destinatario, junto con una descripción de la identidad del remitente. El payload puede contener claims relevantes para la aplicación, como el email y los scopes disponibles.
• Seguridad: Los tokens deben estar "protegidos durante el tránsito para que no puedan ser manipulados". Para esto, son firmados criptográficamente con claves simétricas o asimétricas. El receptor puede confiar en la información dentro del token si confía en el emisor.
• Uso en APIs: Se utilizan a menudo como "Bearer token" para autenticación y autorización en endpoints.
B. Mecanismos de Uso
Para verificar un JWT, el sistema necesita "el algoritmo de cifrado y la clave secreta" utilizada para firmar el token y verificar su autenticidad. En APIs, se pueden usar mappers y scopes para la verificación. Por ejemplo, la extensión x-auth de OpenAPI puede definir mappers que correlacionan un claim del token (ej., email) con un parámetro de la ruta (ej., user_email) para asegurar que el usuario es el propietario del recurso.
IV. Protección de APIs ante Ataques de Inyección y Falsificación
La seguridad de las APIs requiere técnicas de codificación segura para "resistir ataques y usos indebidos".
A. Cross-Site Scripting (XSS)
Los ataques XSS ocurren cuando las aplicaciones web "permiten a un atacante realizar inyección de HTML, insertando su propio código HTML en una página web". El atacante intenta que un visitante desprevenido ejecute código malicioso.
• Reflejado (Reflected XSS): El código script se encuentra en la URL y se devuelve al usuario en la página mostrada.
• Almacenado (Stored/Persistent XSS): El código XSS se almacena en el servidor web (por ejemplo, en un foro) y permanece ahí hasta que es accedido por las víctimas.
Contramedidas de XSS: La solución principal es realizar la validación de entrada. La validación debe ocurrir "en el lado del servidor" y nunca debe confiarse en la validación del lado del cliente como control de seguridad. La aplicación debe validar la entrada para garantizar que coincida con el patrón esperado (por ejemplo, solo aceptar dígitos donde se espera una edad). Además, el filtrado de entrada a través de la validación de listas blancas (white list validation) se utiliza para filtrar datos maliciosos, y se aplica la codificación de salida (output encoding).
B. Cross-Site Request Forgery (CSRF/XSRF)
Los ataques CSRF (o XSRF) "explotan la confianza que los sitios remotos tienen en el sistema de un usuario para ejecutar comandos en nombre del usuario". Son similares a XSS, pero explotan una relación de confianza diferente.
Contramedidas de CSRF: Los desarrolladores deben proteger sus aplicaciones web con "tokens seguros que el atacante no sabría incrustar en los enlaces". Otra medida es que los sitios comprueben la "URL de referencia en las solicitudes recibidas de los usuarios finales y solo acepten solicitudes que se hayan originado en su propio sitio".
C. Server-Side Request Forgery (SSRF)
Los ataques SSRF "engañan a un servidor para que visite una URL basándose en la entrada proporcionada por el usuario". Ocurren cuando una aplicación web acepta URLs como entrada y luego recupera información de esa URL. Si el servidor tiene acceso a URLs no públicas, un ataque SSRF puede divulgar accidentalmente esa información a un atacante.
V. Controles de Tráfico y Dominio (Rate Limiting y CORS)
A. Rate Limiting y Cuotas
El Rate Limit es un mecanismo de seguridad y una característica clave proporcionada por las puertas de enlace de API (API Gateways). Su propósito es prevenir el uso excesivo de la API por parte de los clientes.
• Propósito: La limitación de la tasa de llamadas (Rate Limit) aborda el problema del uso excesivo de la API al "limitar el número de solicitudes por período de tiempo permitido". Esto es una excelente manera de proteger los microservicios de solicitudes no deseadas y de "ataques de denegación de servicio (DoS)".
• Enforcement: El límite de llamadas se puede aplicar por suscripción, por ejemplo, "limitando las solicitudes entrantes (inbound) de un solo usuario" a un número de llamadas dentro de un período de tiempo definido. Si un cliente excede este límite, las solicitudes subsiguientes pueden ser "rechazadas" o "ralentizadas" (throttling).
• Respuesta Estándar: Cuando se excede el límite de velocidad, las solicitudes posteriores reciben típicamente el código de estado HTTP 429 Too Many Requests.
B. CORS (Cross-Origin Resource Sharing)
CORS es una política que permite llamadas de dominio cruzado (cross-domain calls). Es fundamental para "permitir solicitudes de dominio cruzado desde aplicaciones web basadas en navegador". Un API Gateway (como Azure APIM) puede aplicar una política de CORS para habilitar estas solicitudes.

--------------------------------------------------------------------------------
Referencias Bibliográficas
A continuación, se presenta la lista de referencias utilizadas en formato APA.
Libros, Reportes y Estándares:
DevZero. (n.d.). A Guide to Microservices Best Practices.
Hardt, D. (2012). The OAuth 2.0 Authorization Framework. RFC 6749; RFC Editor.
Jones, M., & Hardt, D. (2012). The OAuth 2.0 Authorization Framework: Bearer Token Usage. RFC 6750.
Jones, M., Bradley, J., & Sakimura, N. (2015). JSON Web Token (JWT). RFC 7519; RFC Editor.
Kumarasamy, S. (2011). Distributed Denial of Service (DDOS) Attacks Detection Mechanism. International Journal of Computer Science, Engineering and Information Technology, 1(5), 39–49.
Kurose, J. F., & Ross, K. W. (2017). Computer Networking - a Top-Down Approach (7th ed.). Pearson.
Madden, N. (n.d.). API Security in Action 1st Edition (E-book excerpts).
Menezes, A. J., Van Oorschot, P. C., & Vanstone, S. A. (1996). Handbook of Applied Cryptography (3rd ed.). CRC Press.
NIST. (n.d.). NIST SP 800-190: Application Container Security Guide.
Newman, S. (2015). Building Microservices: Designing Fine-Grained Systems. O’Reilly Media Inc.
OASIS. (2005). Security Assertion Markup Language (SAML) v2.0.
OASIS. (2021). eXtensible Access Control Markup Language (XACML) version 3.0.
OpenID Initiative. (2021). OpenID Connect Specification.
Papazoglou, M. P. (2003). WEB SERVICES: PRINCIPLES AND TECHNOLOGY.
Raymond, R., et al. (2023). CompTIA Security+ Study Guide with over 500 Practice Test Questions. Technet24.
Schneier, B. (1996). Security Engineering: A Guide to Building Dependable Distributed Systems (3rd ed.).
Schumacher, M., et al. (2006). Security Patterns: Integrating Security and Systems Engineering. Wiley.
Siriwardena, P. (2014). Advanced API Security: Securing APIs with OAuth 2.0, OpenID Connect, JWS, and JWE. Apress.
Tanenbaum, A. S., & van Steen, M. (2005/2007). Distributed Systems: Principles and Paradigms (Fragmentos de texto).
UcedaVélez, T., & Morana, M. M. (2015). Risk Centric Threat Modeling: Process for Attack Simulation and Threat Analysis. John Wiley & Sons, Inc.
Vernon, V. (2013). Implementing Domain-Driven Design. Addison-Wesley.
Zdun, U. (2022). Patterns for API Design: Simplifying Integration with Loosely Coupled Message Exchanges. Pearsoncmg.com.
Fuentes Específicas de Microservicios y Seguridad de APIs:
Microsoft Corporation. (n.d.). Building Microservices with .NET Core 2.0.
NIST. (2020). NIST Big Data Interoperability Framework: Volume 4, Security and Privacy.
Teixeira, G. (2023). Security Testing of Web APIs (Disertación/Tesis).
