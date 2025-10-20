Compendio Exhaustivo: Modelos de Seguridad, Control de Acceso y Defensas Criptográficas
I. Modelos y Propiedades Fundamentales de Seguridad
La seguridad de la información se cimienta en principios básicos que definen los objetivos y las amenazas.
A. La Triada CIA
Los objetivos de la ciberseguridad se resumen tradicionalmente en la Triada CIA (Confidencialidad, Integridad y Disponibilidad).
1. Confidencialidad (Confidentiality): Es la propiedad que garantiza que el acceso o la divulgación de la información sensible solo sea posible para individuos autorizados. La confidencialidad es uno de los objetivos de la seguridad y es directamente apoyada por la criptografía.
2. Integridad (Integrity): Se refiere a la propiedad de que "no existan modificaciones no autorizadas a la información o a los sistemas". Esto significa que las alteraciones a los activos solo se pueden realizar de una manera autorizada. La Integridad se logra, en parte, mediante el uso de firmas digitales.
3. Disponibilidad (Availability): Asegura que los sistemas y la información estén "listos para satisfacer las necesidades de los usuarios legítimos" cuando estos los solicitan. Un alto nivel de disponibilidad es un objetivo de seguridad.
B. La Triada DAD (Amenazas)
En contraste con la Triada CIA, las amenazas se categorizan a menudo según la Triada DAD (Divulgación, Alteración y Denegación).
• Una amenaza de Alteración es una violación directa del objetivo de la integridad.
II. Modelos de Control de Acceso (RBAC y ABAC)
El Control de Acceso es el mecanismo que implementa la Autorización, que se centra en "otorgar derechos de acceso".
A. Modelos Tradicionales
Existen varios esquemas de control de acceso:
1. Control de Acceso Discrecional (DAC): Un modelo tradicional donde el propietario de un objeto puede determinar quién puede acceder a él.
2. Control de Acceso Obligatorio (MAC): Un modelo donde los derechos de acceso son impuestos por una autoridad central, generalmente basado en etiquetas de seguridad. El modelo de Bell y LaPadula es un ejemplo de control de acceso por mandato.
B. Control de Acceso Basado en Roles (RBAC)
RBAC (Role-Based Access Control) es un modelo ampliamente adoptado que gestiona los permisos a través de roles definidos.
• En RBAC, el principio fundamental es que "un rol activo del sujeto debe estar autorizado para el sujeto".
• El modelo RBAC ha sido propuesto como un estándar por NIST.
• La implementación del RBAC incluye características como la jerarquía de perfiles y la separación de funciones, lo que lo hace flexible para la empresa.
C. Control de Acceso Basado en Atributos (ABAC)
ABAC (Attribute-Based Access Control) es un enfoque de control de acceso basado en la evaluación de atributos.
• ABAC es un modelo donde las decisiones de acceso se basan en la combinación de atributos. Los atributos pueden pertenecer al sujeto (usuario), al objeto (recurso), al entorno o a la acción que se intenta realizar.
• El NIST ha publicado una guía para la definición y consideraciones de Attribute Based Access Control (ABAC).
• El ABAC es una evolución que busca "Adding attributes to role-based access control" (añadir atributos al control de acceso basado en roles).
III. Cifrado Aplicado al Estado de los Datos (Reposo y Tránsito)
La criptografía es el mecanismo primario para asegurar la confidencialidad. El cifrado se aplica dependiendo del estado en que se encuentren los datos.
A. Cifrado de Datos en Reposo (Data at Rest)
El cifrado en reposo protege la información mientras está almacenada en dispositivos. Esto es esencial para los datos en reposo, definidos como los datos que están inactivos, por ejemplo, en un disco duro.
• Técnicas de Almacenamiento Cifrado: Esto incluye el cifrado de disco completo (FDE) y el cifrado a nivel de base de datos, como el Cifrado de Datos Transparente (TDE) o el Cifrado a Nivel de Columna (CLE).
• Gestión de Claves: El almacenamiento seguro de las claves (key storage) es un componente crítico de la seguridad.
B. Cifrado de Datos en Tránsito (Data in Transit)
El cifrado en tránsito protege los datos mientras se mueven a través de una red. Para ello, se requiere "configurar el cifrado y usar autenticación cuando se envían o reciben datos".
• Canales Seguros (TLS): Este objetivo se logra a través de la implementación de canales seguros, utilizando protocolos como TLS (Transport Layer Security). TLS garantiza la confidencialidad, integridad y autenticación de mensajes en el canal.
• Criptografía Asimétrica/Simétrica: Los protocolos de comunicación segura utilizan típicamente un enfoque híbrido, combinando la criptografía simétrica para la velocidad, y la criptografía asimétrica para el intercambio seguro de claves y las firmas digitales.
IV. Auditoría y Detección de Intrusiones
La auditoría y la detección de intrusiones son mecanismos de seguridad reactivos y preventivos que se apoyan en el registro exhaustivo de eventos.
A. Auditoría (Auditing)
La auditoría es una función de seguridad a nivel de aplicación.
• Rol de la Auditoría: La auditoría implica realizar revisiones formales e informales. Los sistemas de gestión de seguridad deben incluir la capacidad de realizar auditorías.
• Registros de Auditoría (Audit Logs): El proceso de auditoría requiere el uso de registros de auditoría (audit log) y herramientas de reducción de datos de auditoría. Los registros (logs) son un componente fundamental, y deben ser protegidos para garantizar su integridad y privacidad.
B. Detección de Intrusiones y Análisis de Logs
La detección de intrusiones (intrusion detection) es esencial para la seguridad.
• Sistemas de Detección de Intrusiones (IDS): Un Sistema de Detección de Intrusiones (IDS) es un componente crucial en el diseño de redes. Estos sistemas buscan identificar la "detección, correlación, identificación y caracterización de la actividad intencional no autorizada".
• Tipos de Detección: Los sistemas de detección pueden operar mediante "pattern matching" (coincidencia de patrones) o basarse en agentes (agent-based).
• Análisis Centralizado (SIEM): La gestión de eventos de seguridad a menudo se centraliza en un SIEM (Security Information and Event Management). El SIEM recopila y analiza los logs de múltiples fuentes, como logs de servidor y de aplicaciones, para correlacionar eventos y detectar amenazas. El accountability (rendición de cuentas) incluye la detección de intrusiones.

--------------------------------------------------------------------------------
Referencias Bibliográficas (Formato APA)
A continuación, se listan las fuentes utilizadas en formato APA, basándose en los extractos proporcionados:
Fuentes de Texto y Literatura Académica:
American National Standards Institute (ANSI). (2004). ANSI INCITS 359-2004 Role Based Access Control Information Technology Industry Council. (Citado a través de).
Bishop, M. (2003). Computer Security: Art and Science. Addison-Wesley. (Citado a través de).
Cheswick, W., & Bellovin, S. (2000). Firewalls and Internet Security. Addison-Wesley. (Citado a través de).
Diffie, W., & Hellman, M. (1976). New Directions in Cryptography. IEEE Transactions on Information Theory, IT-22(6), 644–654. (Citado a través de).
Gollmann, D. (2006). Computer Security. John Wiley. (Citado a través de).
Hu, V. C., Ferraiolo, D., Kuhn, R., Schnitzer, A., Sandlin, K., Miller, R., & Scarfone, K. (2014). Guide to attribute based access control (ABAC) definition and considerations (NIST Tech. Rep. SP 800-162). (Citado a través de).
Karp, A., Haury, H., & Davis, M. (2010). From ABAC to ZBAC: The Evolution of Access Control Models. Information Systems Security Association Journal, 8(4), 22–30. (Citado a través de).
Kaufman, C., Perlman, R., & Speciner, M. (2003). Network Security: Private Communication in a Public World. Prentice Hall. (Citado a través de).
Kurose, J. F., & Ross, K. W. (2017). Computer Networking - a Top-Down Approach (7th ed.). Pearson. (Citado a través de).
Kuhn, R., Coyne, E. J., & Weil, T. R. (2010). Adding attributes to Role-Based access control. Computer, 43(6), 79–81. (Citado a través de).
Madden, N. (n.d.). API Security in Action (1st ed.). (Citado a través de).
Menezes, A. J., Van Oorschot, P. C., & Vanstone, S. A. (1996). Handbook of Applied Cryptography (3rd ed.). CRC Press. (Citado a través de).
Newman, S. (2015). Building Microservices: Designing Fine-Grained Systems. O’Reilly Media Inc. (Citado a través de).
NIST. (n.d.). NIST BIG DATA INTEROPERABILITY FRAMEWORK: VOLUME 4, SECURITY AND PRIVACY. (Citado a través de y múltiples fragmentos).
Pfleeger, C. (2003). Security in Computing. Prentice Hall. (Citado a través de).
Raymond, R., et al. (2023). CompTIA Security+ Study Guide with over 500 Practice Test Questions. Technet24. (Citado a través de y múltiples fragmentos como).
Schumacher, M., Fernandez-Buglioni, E., Hybertson, D., Buschmann, F., & Sommerlad, P. (2006). Security Patterns: Integrating Security and Systems Engineering. Wiley. (Citado a través de).
Zuquete, A. (2021). Segurança em Redes Informáticas (6ª ed.). FCA – Editora de Informática. (Citado a través de).
Zwicky, E., Cooper, S., Chapman, D., & Russell, D. (2000). Building Internet Firewalls. O’Reilly & Associates. (Citado a través de).
Fuentes de Sistemas Distribuidos y Arquitectura:
Tanenbaum, A. S., & van Steen, M. (2005/2007). Distributed Systems: Principles and Paradigms. (Citado a través de).
Fuentes Adicionales (Metodología y Frameworks):
UcedaVélez, T., & Morana, M. M. (2015). Risk Centric Threat Modeling: Process for Attack Simulation and Threat Analysis. John Wiley & Sons, Inc. (Citado a través de y múltiples fragmentos como).
Voelter, M., Kircher, M., & Zdun, U. (2004). Remoting Patterns: Foundations of Enterprise, Internet, and Realtime Distributed Object Middleware. Wiley. (Citado a través de).