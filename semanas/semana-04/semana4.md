Compendio Exhaustivo: CIA, Modelos de Amenaza y Criptografía Aplicada a APIs
I. La Triada CIA: Objetivos Fundamentales de la Ciberseguridad
La Triada CIA (Confidencialidad, Integridad y Disponibilidad) define los tres objetivos complementarios de cualquier programa de ciberseguridad. Los profesionales de la seguridad utilizan estos objetivos para caracterizar riesgos, ataques y controles.
A. Confidencialidad (Confidentiality)
La confidencialidad es la propiedad que garantiza que los individuos no autorizados no puedan acceder a información sensible. El objetivo es proteger la información del acceso o divulgación no autorizada.
La confidencialidad se aplica en tres estados de los datos:
1. Datos en reposo (data at rest): Información almacenada en discos duros, tapes o en la nube.
2. Datos en tránsito (data in transit): Datos que se envían a través de una red.
3. Datos en uso (data in use): Datos que están siendo procesados activamente por un sistema informático.
B. Integridad (Integrity)
La integridad garantiza que no existan modificaciones no autorizadas a la información o a los sistemas, ya sean intencionales o no intencionales. También se describe como la característica de que "las alteraciones a los activos de un sistema se pueden realizar solo de una manera autorizada". Los controles de integridad buscan imponer este requisito.
C. Disponibilidad (Availability)
La disponibilidad asegura que la información y los sistemas estén listos para satisfacer las necesidades de los usuarios legítimos en el momento en que estos los soliciten. Un sistema altamente disponible es aquel que tiene la mayor probabilidad de estar funcionando en un instante dado.
D. Non-repudio (Nonrepudiation)
Aunque no forma parte de la triada CIA, el no repudio es un objetivo de seguridad importante. Significa que "alguien que realizó alguna acción, como enviar un mensaje, no puede negar más tarde haber realizado esa acción". Las firmas digitales son un ejemplo común de control que proporciona no repudio.
II. Modelos de Amenaza y Agentes de Riesgo
Un Modelo de Amenaza es "un proceso estratégico destinado a considerar posibles escenarios de ataque y vulnerabilidades dentro de un entorno de aplicación propuesto o existente con el propósito de identificar claramente los niveles de riesgo e impacto".
A. La Triada DAD (Amenazas)
Así como la CIA define los objetivos, la triada DAD (Divulgación, Alteración y Denegación) describe las tres amenazas clave a los esfuerzos de ciberseguridad:
1. Divulgación (Disclosure): Es la exposición de información sensible a individuos no autorizados, lo que se conoce como pérdida de datos. La divulgación es una violación del principio de confidencialidad.
2. Alteración (Alteration): Se refiere a la modificación no autorizada de la información. Un ejemplo es cuando un atacante desfigura páginas en un sitio web, lo que viola el objetivo de la integridad.
3. Denegación (Denial): Es la interrupción del acceso legítimo de un usuario autorizado a la información. Los eventos de denegación violan el principio de disponibilidad.
B. Agentes de Amenaza y Vulnerabilidades
Los actores de amenaza están motivados por diversos factores para atacar activos de alto valor, incluyendo el "interés en la información de negocio". Los motivos pueden ser el lucro monetario (ciberdelincuentes que buscan robar información financiera o credenciales), la venganza o la obtención de ventajas estratégicas (espías corporativos o de estados).
Vulnerabilidades en APIs: Las APIs son objetivos lucrativos porque, al ser puertas de enlace, una vulnerabilidad puede "poner en peligro su integridad" y "provocar lapsos de seguridad en cascada a través de todos los sistemas vinculados a ella". Las API desprotegidas pueden conducir al "uso no autorizado de funciones". Para las APIs internas o de microsservicios, el modelado de amenazas incluye el análisis de debilidades como "canales de comunicación no cifrados" o "almacenamiento de datos no cifrados".
III. Criptografía Aplicada (Hash, Simétrica, Asimétrica, TLS, PKI)
La Criptografía es la ciencia de proteger la información para que dos o más personas puedan comunicarse sin que sus mensajes sean leídos o manipulados por nadie más. Su uso ayuda a cumplir los objetivos de confidencialidad, integridad, autenticación y no repudio.
A. Funciones de Hashing
Una función hash es una función criptográfica unidireccional que toma una entrada (input) y genera una salida única y repetible de longitud fija.
• Propiedad Unidireccional y No Reversible (One-way): Es computacionalmente inviable encontrar la entrada $m$ que corresponde a una salida hash $h$ conocida.
• Integridad: Las organizaciones utilizan el hashing para garantizar que los datos no sean alterados maliciosamente o de forma involuntaria. El hash de un mensaje sirve como una comprobación de integridad (integrity check).
• Aplicación en APIs (HMAC): Para proteger la integridad de las peticiones en APIs, se puede usar un Código de Autenticación de Mensajes basado en Hash (HMAC). Con HMAC, el cuerpo de la solicitud se hashea junto con una clave privada, y el hash resultante se envía con la solicitud. Esto asegura que "ningún tercero haya manipulado la solicitud".
B. Criptografía Simétrica y Asimétrica
Existe una distinción fundamental en la criptografía basada en si las claves de cifrado y descifrado son las mismas.
Criterio
Criptografía Simétrica (Llave Secreta/Compartida)
Criptografía Asimétrica (Llave Pública)
Claves
Una sola clave secreta compartida para cifrar y descifrar.
Un par de claves: una clave pública (compartida) y una clave privada (secreta).
Velocidad
Muy rápida (1,000 a 10,000 veces más rápida que la asimétrica). Ideal para cifrado masivo (bulk encryption).
Lenta.
No Repudio
No implementa no repudio, ya que ambas partes tienen la clave secreta y pueden crear el mismo mensaje cifrado.
Proporciona no repudio a través de firmas digitales.
Escalabilidad
No escalable; requiere una clave para cada par de comunicadores.
Extremadamente escalable; la adición de nuevos usuarios solo requiere un par de claves.
Uso Típico
Confidencialidad y protección de datos en reposo/tránsito.
Intercambio seguro de claves y firmas digitales.
Criptografía Híbrida: Debido a la lentitud de los algoritmos asimétricos (como RSA), la práctica estándar para la transmisión segura de grandes volúmenes de datos es usar la criptografía asimétrica para establecer una conexión y asegurar el intercambio de una clave secreta simétrica, y luego usar la clave simétrica (rápida) para el resto de la sesión.
C. Firmas Digitales (Integridad y No Repudio)
Las firmas digitales son un control criptográfico que proporciona integridad y no repudio. El proceso funciona con criptografía asimétrica:
1. Firma: El remitente cifra un message digest (resumen hash del mensaje) utilizando su clave privada.
2. Verificación: El destinatario verifica la firma utilizando la clave pública del remitente. Si la firma descifrada coincide con el hash generado a partir del mensaje recibido, se confirma que el mensaje provino del remitente (no repudio) y que no fue alterado en tránsito (integridad).
IV. Criptografía Orientada a APIs: TLS y PKI
En el ecosistema de las API, la criptografía se utiliza fundamentalmente para asegurar el canal de comunicación y verificar la identidad de los extremos (servidor y cliente).
A. TLS y HTTPS (Confidencialidad y Autenticación en Tránsito)
HTTPS es el nombre de HTTP ejecutándose sobre una conexión segura. HTTPS utiliza el protocolo Transport Layer Security (TLS), que es "el protocolo que se activa cuando se ve el candado en la barra de herramientas del navegador". TLS (anteriormente conocido como SSL) es crucial para proteger los datos en tránsito.
• Seguridad del Canal: El TLS implementa un canal seguro (secure channel) que garantiza la confidencialidad, integridad y autenticación de mensajes.
• Mitigación de Ataques: El uso de TLS evita el espionaje de los mensajes (eavesdropping). Es fundamental que los tokens y claves de API, al ser secretos compartidos, se transporten "solo a través de una conexión segura como HTTPS".
• Terminación SSL/TLS: Es común que un load balancer o reverse proxy realice la "terminación SSL" (SSL termination), manejando la conexión TLS del cliente antes de que la solicitud llegue al servidor API de destino, para liberar al servidor de la costosa operación de cifrado.
B. PKI y Certificados Digitales (Infraestructura de Confianza)
La Infraestructura de Clave Pública (PKI) es la base tecnológica y administrativa que hace posible la comunicación segura a escala, especialmente en contextos asimétricos.
"La PKI se refiere a la tecnología, infraestructura y prácticas que apoyan la implementación y operación de certificados digitales y autoridades de certificación que verifican y autentican la validez de las partes involucradas en las transacciones de Internet".
Componentes Clave de PKI:
1. Certificado Digital (Public-key certificate): Es una declaración firmada digitalmente por una Autoridad de Certificación (CA) que vincula un valor de clave pública a la identidad del sujeto (persona, dispositivo o servicio) que posee la clave privada correspondiente.
2. Autoridad de Certificación (CA): Entidad de confianza que crea y firma certificados digitales, atestiguando que la clave privada asociada está en posesión del sujeto nombrado.
3. Revocación: Los certificados pueden ser revocados (cancelados) si la clave privada se ve comprometida.
Autenticación Mutua (mTLS) en APIs: En la comunicación de microsservicios, la autenticación Mutua TLS (mTLS) es un mecanismo clave para asegurar la comunicación servicio-a-servicio. En mTLS (o Two-Way SSL), tanto el servidor como el cliente deben presentar un certificado y autenticarse mutuamente. Esto verifica la identidad del cliente (que puede ser otro servicio, no un usuario final) en la capa de transporte.

--------------------------------------------------------------------------------
Referencias Bibliográficas
A continuación, se presenta la lista de referencias utilizadas, siguiendo el formato APA.
Fuentes Primarias Citadas en el Compendio:
Kurose, J. F., & Ross, K. W. (2017). Computer Networking - a Top-Down Approach (7th Edition). Pearson..
Madden, N. (n.d.). API Security in Action 1st Edition [PDF - Slideshare]. (Referencias a la estructura del libro en slides).
Newman, S. (2015). Building Microservices: Designing Fine-Grained Systems. O’Reilly Media Inc. (Citado a través de los extractos del libro).
Papazoglou, M. P. (2003). WEB SERVICES: PRINCIPLES AND TECHNOLOGY [Air University Central Library catalog]. (Citado a través de los extractos del libro).
Raymond, R., et al. (2023). CompTIA Security+ Study Guide with over 500 Practice Test Questions. Technet24. (Citado a través de los extractos del libro).
Schneier, B. (1996). Security Engineering: A Guide to Building Dependable Distributed Systems (3rd ed.). Department of Computer Science and Technology. (Citado a través de los extractos del libro).
UcedaVélez, T., & Morana, M. M. (2015). Risk Centric Threat Modeling: Process for Attack Simulation and Threat Analysis. John Wiley & Sons, Inc. (Citado a través de los extractos del libro).
Voelter, M., Kircher, M., & Zdun, U. (2022). Patterns for API Design: Simplifying Integration with Loosely Coupled Message Exchanges [DOKUMEN.PUB]. (Citado a través de los extractos del libro).
Zuquete, A. (2021). Segurança em Redes Informáticas (6ª edição). FCA – Editora de Informática..
Fuentes Secundarias de Conceptos y Protocolos:
Bass, L., Clements, P., & Kazman, R. (2003). Software Architecture in Practice (2nd ed.). Addison-Wesley..
Menezes, A. J., Oorschot, P. C. van, & Vanstone, S. A. (1996). Handbook of Applied Cryptography (3rd ed.). CRC Press..
Schuster, F., et al. (2015). VC3: Trustworthy Data Analytics in the Cloud..
Tanenbaum, A. S., & van Steen, M. (2005/2007). Distributed Systems: Principles and Paradigms [VoWi & GitHub Pages]. (Citado a través de los extractos del libro).
