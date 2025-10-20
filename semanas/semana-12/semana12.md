Compendio Exhaustivo sobre Integración de Servicios y Arquitecturas de Migración
1. SOAP/WSDL: Fundamentos y Uso
SOAP (Simple Object Access Protocol) es fundamentalmente un protocolo de mensajería basado en XML que los servicios web utilizan para intercambiar información entre sí. Originalmente, SOAP era un acrónimo de Protocolo Simple de Acceso a Objetos, aunque ahora se designa simplemente por su nombre. SOAP funciona como un protocolo de cable (wire protocol) que especifica cómo se estructuran los mensajes relacionados con los servicios cuando se intercambian a través de Internet. Su uso de estándares abiertos, como XML, lo hace fácilmente extensible e interoperable.
El estándar SOAP está diseñado para superar los sistemas propietarios que operan en infraestructuras heterogéneas, permitiendo el intercambio de mensajes entre computadoras, independientemente de sus sistemas operativos, entornos de programación o marcos de modelos de objetos.
WSDL (Web Services Description Language) es complementario a SOAP y crucial para la definición de servicios. Según los autores, “WSDL es un esquema de especificación basado en XML para describir la interfaz pública de un Servicio Web”. Esta interfaz pública incluye información esencial como las operaciones disponibles, los protocolos de mensajes XML, los tipos de datos y la dirección de red para localizar el servicio.
WSDL es un elemento clave para la interoperabilidad ya que permite la creación de aplicaciones web débilmente acopladas. WSDL establece un “contrato” entre el solicitante del servicio y el proveedor, de forma similar a cómo una interfaz en un lenguaje de programación orientado a objetos representa un contrato.
El documento WSDL se compone de dos partes principales:
1. Definición de la interfaz del servicio: Describe la estructura general de la interfaz, incluyendo las operaciones admitidas, los parámetros de las operaciones y los tipos de datos abstractos.
2. Implementación del servicio: “La parte de implementación del servicio une la interfaz abstracta a una dirección de red concreta, a un protocolo específico y a estructuras de datos concretas”.
La especificación WSDL 1.1 clasifica los mensajes en dos estilos principales: documento y Remote Procedure Call (RPC). El marco SOAP, que utiliza XML para los mensajes, es un ejemplo de un enfoque RPC más antiguo que sigue estando ampliamente implementado.
2. Integración Legacy (Sistemas Heredados)
La integración de sistemas legados (legacy systems) es un desafío común en arquitecturas modernas, ya que las organizaciones a menudo operan en “ecosistemas heterogéneos donde los sistemas heredados locales coexisten con aplicaciones nativas de la nube, servicios de terceros y tecnologías emergentes”. Los sistemas legados suelen contener funcionalidad de negocio de misión crítica y representan activos fundamentales que deben ser reutilizados.
Una estrategia fundamental para la integración de legados, especialmente durante una migración a arquitecturas orientadas a servicios (SOA) o microservicios, es mediante el uso de wrappers y adaptadores.
En un modelo SOA, para integrar sistemas heredados y aplicaciones empaquetadas (incluido el legacy), se utilizan wrappers para encapsular la funcionalidad. Un wrapper se define como “un componente abstracto que proporciona un servicio implementado por software heredado que se puede utilizar para ocultar las dependencias del sistema existente”. Por su parte, un adaptador es un módulo de software que se interpone entre dos sistemas para convertir sus diferentes representaciones y percepciones técnicas y programáticas de sus interfaces.
Cuando se considera la modernización, se requiere una reingeniería del sistema heredado para reutilizar los procesos de negocio incrustados. Este proceso de reingeniería implica varias fases simplificadas (Comella-Dorda et al., 2000), incluyendo:
comprender una aplicación existente, lo que resulta en una o más descripciones lógicas de la aplicación; reestructuración o transformación de esas descripciones lógicas en descripciones lógicas nuevas y mejoradas; desarrollo de la nueva aplicación basado en estas descripciones lógicas mejoradas.
Una etapa crucial es la creación de interfaces de servicio (service interfaces), la cual se logra “rompiendo la conectividad programa-a-programa y reemplazándola con APIs habilitadas para servicios que se pueden usar junto con mecanismos de orquestación de procesos de negocio y dirigidos por eventos”. Además, para evitar cambios mayores en el código fuente de un monolito, una opción es crear un microservicio separado (un adaptador) para “exponer los procedimientos de la aplicación monolítica como servicios REST”.
3. WS-Security
WS-Security es un estándar de seguridad fundamental dentro del conjunto de especificaciones de servicios web (WS-*) desarrollado por OASIS. Propone “un conjunto estándar de extensiones SOAP que se pueden utilizar al crear servicios Web seguros para proporcionar la capacidad de enviar tokens de seguridad como parte de un mensaje e implementar la integridad y confidencialidad del contenido del mensaje”.
WS-Security funciona como el bloque fundamental de una arquitectura de seguridad modular para servicios web basados en XML. Este estándar está diseñado para ser extensible y acomodar una amplia variedad de modelos y tecnologías de seguridad.
Sus características principales se centran en el nivel de mensaje (message-level security), abordando dos preocupaciones críticas (Rosenberg & Remy, 2004):
1. Confidencialidad: Proteger el contenido del mensaje para que no sea revelado a personas no autorizadas.
2. Integridad: Prevenir la modificación ilegal del contenido del mensaje.
WS-Security logra esto al apoyarse en estándares de seguridad XML existentes: XML Signature (para integridad del mensaje) y XML Encryption (para confidencialidad del mensaje). WS-Security define cómo los tokens de seguridad se incorporan en los mensajes SOAP.
Los tokens de seguridad (Security Tokens) son elementos centrales. WS-Security proporciona un mecanismo de propósito general para asociar tokens de seguridad (como certificados digitales o tickets Kerberos) con mensajes SOAP.
Los autores Nadalin et al. (2004) explican que el modelo WS-Security:
Utiliza tres elementos centrales, que componen un encabezado de seguridad SOAP: tokens de seguridad, Cifrado XML y Firma XML. La integridad del mensaje es proporcionada por XML Signature... La confidencialidad del mensaje aprovecha XML Encryption...
Para la autenticación, WS-Security define elementos especiales como <UsernameToken> para pasar el nombre de usuario y la contraseña, y <BinarySecurityToken> para tokens binarios como certificados X.509v3.
Es importante notar que en implementaciones SOAP/WSDL, como las requeridas por CORE Phase II Connectivity, se exige el uso del estándar WS-Security para “incrustar los valores de nombre de usuario y contraseña dentro del Envelope”.
4. Migración: SOAP, REST y GraphQL
La evolución de las arquitecturas de software ha llevado a una transición desde estilos más acoplados como SOAP/RPC hacia enfoques más flexibles como REST y GraphQL.
4.1 De SOAP (RPC) a REST
SOAP, como ejemplo de un enfoque RPC (Remote Procedure Call), tradicionalmente requiere que el cliente instale bibliotecas específicas (stubs) y puede llevar a un acoplamiento más estrecho entre cliente y servidor. El estilo REST (Representational State Transfer), en contraste, fue desarrollado por Roy Fielding para describir los principios que llevaron al éxito de HTTP y la web.
REST es un estilo arquitectónico que se distingue de otros enfoques para sistemas distribuidos por varios aspectos clave (Fielding, 2000; Pautasso et al., 2008), incluyendo:
• Interfaz Uniforme: El conjunto de métodos que se pueden invocar es fijo. En RESTful HTTP, los métodos son los verbos HTTP: GET, PUT, POST, DELETE.
• Recursos: La abstracción clave es el recurso, identificado por un URI.
• Acoplamiento Reducido: Las APIs RESTful enfatizan formatos de mensaje estándar y un número reducido de operaciones genéricas, lo que reduce el acoplamiento entre un cliente y una API específica.
• Hypermedia (HATEOAS): Un principio fundamental es que un servidor RESTful permite a un cliente descubrir una ruta a través de las posibles transiciones de estado de la aplicación por medio de hipermedia. Esto se conoce como Hypermedia as the Engine of Application State (HATEOAS).
En comparación con SOAP, los payloads de REST sobre HTTP pueden ser más compactos, ya que REST soporta formatos alternativos como JSON o incluso binario, aunque aún puede ser menos ligero que un protocolo binario puro como Thrift.
4.2 Integración con GraphQL
GraphQL, un marco de Facebook, es un estilo de API que se centra en la consulta y el filtrado eficientes de grandes conjuntos de datos.
A diferencia de REST, que a menudo devuelve representaciones de recursos predefinidas, GraphQL permite a los clientes tener un control significativo sobre los datos devueltos. Se puede ver a GraphQL como una realización avanzada del patrón Wish Template, que ofrece “un lenguaje de consulta declarativo para describir la representación que se recuperará contra un esquema acordado que se encuentra en la documentación de la API”.
La adopción de GraphQL requiere la implementación de un servidor GraphQL, que actúa como un tipo particular de endpoint de API ubicado sobre los endpoints de API reales (que se convierten en resolvers en términos de GraphQL).
4.3 Estrategias de Migración
La migración de sistemas basados en SOAP/monolitos a arquitecturas modernas (que usan REST o GraphQL, a menudo en microservicios) debe ser un proceso incremental.
Para gestionar los cambios disruptivos (breaking changes) en la interfaz de un servicio durante la migración, la versión de API es crucial. Una práctica recomendada es permitir la coexistencia de diferentes versiones de endpoints. Por ejemplo, un servicio podría exponer un V1 (SOAP) y un V2 (REST) simultáneamente, lo que permite a los consumidores migrar gradualmente. Una vez que todos los consumidores han dejado de usar el endpoint antiguo, este y el código asociado pueden eliminarse.
El uso de Semantic Versioning (Versionado Semántico) se recomienda para el manejo de la evolución de API, ya que ofrece una gran claridad con respecto a expresar el impacto en la compatibilidad de los cambios entre dos versiones de API.

--------------------------------------------------------------------------------
Referencias Bibliográficas
Las referencias se han generado a partir de la información contextual proporcionada en los documentos fuente.
ACEF/2425/0221767 - IPVC. (n.d.). (Extractos sobre bibliografía).
Allamaraju, S. (2010). RESTful Web Services Cookbook. O’Reilly. (Citado en)
Amundsen, M. (2020). Design and Build Great Web APIs: Robust, Reliable, and Resilient. Pragmatic Bookshelf. (Citado en)
Cauldwell, P. (2001). XML Web Services. Wrox Press. (Citado en)
Cabrera, F., & Kurt, C. (2005). Web Services Architecture and its Specifications. Microsoft Press. (Citado en)
Chacon, S., & Straub, B. (2014). Pro Git (2nd ed.). Apress. (Citado en)
CORE 270 Phase II Connectivity & Security Rule CORE Member Ballot Version 06-20-08 - CAQH. (2008). (Extractos sobre SOAP/WSDL y WS-Security).
Design Patterns and Anti-Patterns in Microservices Architecture: A Classification Proposal and Study on Open Source Projects - POLITesi - Politecnico di Milano. (n.d.). (Extractos sobre CQRS y GraphQL).
Distributed Systems - GitHub Pages. (n.d.). (Extractos sobre REST y RPC).
Distributed Systems: Principles and Paradigms - VoWi. (n.d.). (Extractos sobre SOAP y TLS).
Enterprise Integration Patterns: Designing, Building, and Deploying Messaging Solutions - Pearsoncmg.com. (n.d.). (Extractos sobre Integración de Aplicaciones).
Enterprise-Scale Microservices Architecture: Domain-Driven Design and Cloud-Native Patterns Using the Spring Ecosystem - EA Journals. (2025). (Extractos sobre Integración Legacy).
Excerpts from "API Security in Action 1st Edition Neil Madden | PDF - Slideshare." (n.d.). (Extractos sobre RPC/SOAP/REST/GraphQL).
Excerpts from "AW.Implementing.Domain-Driven.Design.www.EBooksWorld.ir.pdf." (n.d.). (Extractos sobre REST, DDD, HATEOAS, RPC).
Excerpts from "Building Microservices - NorthWind." (n.d.). (Extractos sobre RPC, REST, HATEOAS, Migración).
Excerpts from "Building Microservices with .NET Core 2.0." (n.d.). (Extractos sobre Microservices, Migración Monolito).
Excerpts from "Fundamentals of Software Architecture - MRCE." (n.d.). (Extractos sobre Arquitectura y Patrones).
Excerpts from "Patterns for API Design: Simplifying Integration with Loosely Coupled Message Exchanges - Pearsoncmg.com." (n.d.). (Extractos sobre GraphQL, Versionado).
Excerpts from "Patterns for API Design: Simplifying Integration with Loosely Coupled Message Exchanges [1 ed.] 0137670109, 9780137670109 - DOKUMEN.PUB." (n.d.). (Extractos sobre API Design, GraphQL, Versioning).
Excerpts from "WEB SERVICES: PRINCIPLES AND TECHNOLOGY - Air University Central Library catalog." (n.d.). (Extractos sobre SOAP, WSDL, WS-Security).
Fielding, R. T. (2000). Architectural Styles and the Design of Network-based Software Architectures. PhD thesis. Irvine: University of California. (Citado en,)
Hohpe, G., & Woolf, B. (2003). Enterprise Integration Patterns: Designing, Building, and Deploying Messaging Solutions. Addison-Wesley. (Citado en,)
Lewis, J., & Fowler, M. (n.d.). The microservice architectural style is an approach to developing a single application as a suite of small services... (Citado en).
Lyon, W. (2022). Full Stack GraphQL Applications: With React, Node.js, and Neo4j. Manning Publications. (Citado en)
Nadalin, A. et al. (eds.). (2004). Web Services Security: SOAP Message Security 1.0 (WS-Security). OASIS Standard 200401. (Citado en,,)
NEW SOURCE Excerpts from "A Guide to Microservices Best Practices - DevZero." (n.d.). (Extractos sobre Arquitectura de Microservicios).
NEW SOURCE Excerpts from "Understanding Event-Driven Architecture: A Framework for Scalable and Resilient Systems - IJSAT." (n.d.). (Extractos sobre Integración Legacy y Compatibilidad).
Newman, S. (2015). Building microservices: designing fine-grained systems. O’Reilly Media. (Citado en,)
POMPIDOR, P. (2020). Angular y Node.js Optimice el desarrollo de sus aplicaciones web con una arquitectura MEAN. Ediciones ENI. (Citado en)
Richardson, L., & Ruby, S. (2008). RESTful Web Services. O’Reilly. (Citado en)
Risk Centric Threat Modeling. (n.d.). (Extractos sobre XML-SOAP y Seguridad).
Security Testing of Web APIs - Sigarra. (n.d.). (Extractos sobre REST, OpenAPI, Seguridad).
Zimmermann, O., Tomlinson, M., & Peuser, S. (2003). Perspectives on Web Services: Applying SOAP, WSDL and UDDI to Real-World Projects. Springer. (Citado en,).