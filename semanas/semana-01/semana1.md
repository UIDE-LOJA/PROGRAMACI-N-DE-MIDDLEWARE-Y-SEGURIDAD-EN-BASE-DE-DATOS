Compendio Exhaustivo sobre Arquitectura y Sistemas Distribuidos
1. Conceptos de Sistemas Distribuidos (SD)
Un Sistema Distribuido (SD) se concibe generalmente como "un conjunto de computadores independientes, interconectados a través de una red y con capacidad de colaborar con el fin de realizar una tarea". La Computación Distribuida es, por lo tanto, la computación que se lleva a cabo dentro de dicho sistema.
Académicamente, los SD son una "red de Computadores independientes que aparecen como un sistema coherente a sus usuarios". Para lograr esta coherencia, los sistemas se basan en métodos de sincronización y protocolos de comunicación que garantizan que todos los componentes funcionen de manera fluida. Los SD son esenciales para manejar aplicaciones intensivas en datos y a gran escala que un único sistema informático no podría gestionar.
Ventajas de los Sistemas Distribuidos
La adopción de la computación distribuida ofrece varias ventajas clave:
• Compartición de recursos: La arquitectura de la computación distribuida es un reflejo de la arquitectura de las organizaciones modernas, permitiendo la compartición de recursos a través de la red.
• Escalabilidad: A diferencia de la computación monolítica, que está limitada por la capacidad de un solo Computador, la computación distribuida permite incrementar el número de recursos compartidos según la demanda.
• Tolerancia a fallos: Los SD permiten la replicación de recursos para dotar al sistema de tolerancia a fallos, asegurando la disponibilidad del recurso incluso en presencia de fallos.
Sin embargo, esta complejidad introduce desafíos como la dificultad de mantener un tiempo consistente en todas las máquinas (el "problema del reloj global"), asegurar la consistencia de los datos en diferentes ubicaciones y manejar los fallos cuando partes del sistema dejan de comunicarse.
2. Roles del Middleware
El middleware (Mw), o software intermedio, es un concepto crucial en la computación distribuida, actuando como una capa de abstracción y conectividad.
Definición y Propósito Principal
El middleware es una capa de software que establece la conexión entre el sistema operativo y las aplicaciones, los datos y los usuarios. Su función principal es proporcionar "servicios y funciones comunes, como Single Sign-On (SSO) o la gestión de la interfaz de programación de aplicaciones (API)". Desde la década de los noventa, esta tecnología ha evolucionado, y en la actualidad, el middleware es la base tecnológica de las arquitecturas modernas diseñadas para la nube.
Según Hou, Zhao, Wang y Wang (2025), en sistemas de IA, el Protocolo de Contexto de Modelo (Model Context Protocol o MCP) redefine las interacciones de IA a herramienta, permitiendo flujos de trabajo interoperables, seguros y mantenibles a través de diversos sistemas.
Funciones Clave del Middleware
1. Abstracción y Conectividad: El middleware proporciona un conjunto de interfaces de programación de aplicaciones (APIs) "más funcional que el sistema operativo y los servicios de red". Esto permite a las aplicaciones ser transparentes a la localización a través de la red, ser independientes de los servicios de red, y ser escalables y fiables.
2. Manejo de la Integración y la Heterogeneidad: El middleware es fundamental para "soportar la comunicación entre procesos a través de plataformas heterogéneas". Las herramientas de integración del middleware conectan sistemas internos y externos esenciales mediante funciones como la transformación, la mensajería empresarial y la autenticación SSO.
3. Desacoplamiento en Sistemas Distribuidos: En el contexto de los sistemas Publish/Subscribe (pub/sub), el middleware opera como un "espacio de memoria compartida" que permite el desacoplamiento temporal y referencial entre los componentes que se comunican.
Tipos Históricos y Modernos de Middleware
El middleware puede tomar diversas formas:
• Monitores de Procesamiento de Transacciones (TP Monitors): Proporcionan un entorno para el desarrollo y explotación eficiente de aplicaciones distribuidas basadas en transacciones.
• Llamadas a Procedimientos Remotos (RPC): Permiten que la lógica de una aplicación se distribuya a través de una red, de manera que la invocación remota se realiza tan simplemente como una rutina local.
• Middleware Orientado a Mensajes (MOM): Proporciona intercambio de datos aplicación a aplicación, como los sistemas de colas (ej. RabbitMQ, Kafka).
• Agentes de Solicitud de Objetos (ORBs): Gestionan la comunicación e intercambio de datos entre objetos, promoviendo la interoperabilidad en sistemas de objetos distribuidos (ej. CORBA, COM/DCOM).
Capas de Middleware en Arquitecturas Modernas (Red Hat)
En el desarrollo de aplicaciones modernas, el middleware se estructura en cuatro capas principales que proporcionan funciones básicas unificadas:
1. Capa de Contenedores: Gestiona la distribución de los ciclos de vida de las aplicaciones de forma uniforme, ofreciendo funciones de DevOps como CI/CD, gestión de contenedores y malla de servicios.
2. Capa de Tiempos de Ejecución: Incluye entornos de ejecución ligeros para microservicios, caché en memoria y servicio de mensajería para acelerar las transferencias de datos.
3. Capa de Integración: Conecta aplicaciones compradas y personalizadas, y recursos SaaS, a través de mensajería, integración y APIs.
4. Capa de Automatización de Procesos y Gestión de Decisiones: Agrega inteligencia esencial, optimización, automatización y gestión de decisiones.
3. Panorama de Tecnologías
El ecosistema de sistemas distribuidos y arquitecturas modernas se sustenta en una variedad de tecnologías y protocolos especializados, especialmente en el contexto de la Inteligencia Artificial (IA) y los microservicios.
Tecnologías de Comunicación y Mensajería
• gRPC: Es un marco de comunicación completo que utiliza un "esquema de solicitud/respuesta binario que utiliza HTTP2". Es más eficiente que REST sobre HTTP 1.1 y JSON, ya que sus datos se serializan con Protocol Buffers (Protobuf). Protobuf es útil porque la API está estrictamente definida y puede compilarse en varios lenguajes (Go, Java, Python, etc.).
• WebSockets: Constituye un "esquema dúplex completo que utiliza una conexión TCP de larga duración". Permite una conexión ininterrumpida que facilita un flujo de datos constante. Es un protocolo de transporte.
• Sistemas de Mensajería (Kafka y RabbitMQ): Estos sistemas son clave para arquitecturas de microservicios.
    ◦ Kafka: Ideal para sistemas orientados a eventos (event driven), pipelines de streaming de datos, analítica y monitorización en tiempo real, Event Sourcing y CQRS, y sistemas pub sub a gran escala. Un topic es un registro particionado (append only) de eventos.
    ◦ RabbitMQ: Se utiliza para flujos impulsados por comandos (ej., procesar pagos), tareas de latencia crítica, comunicación con dispositivos IoT, y workflows event driven de menor escala. Se organiza mediante Exchange, Queue y Binding.
Tecnologías de Arquitectura y Seguridad
• Protocolo de Contexto de Modelo (MCP): Es un nuevo estándar abierto desarrollado por Anthropic que busca "simplificar y estandarizar" la manera en que los Grandes Modelos de Lenguaje (LLMs) interactúan con herramientas externas y obtienen datos.
    ◦ Componentes del Servidor MCP: El servidor MCP gestiona herramientas, fuentes de datos y flujos de trabajo. Sus tres capacidades principales son: Tools (permiten al servidor invocar APIs o servicios externos para ejecutar operaciones en nombre de los modelos de IA), Resources (proporcionan acceso a conjuntos de datos estructurados o no estructurados, actuando como memoria externa para el LLM) y Prompts (plantillas reutilizables para optimizar flujos de trabajo).
• OpenAPI y JSON Schema: OpenAPI se utiliza para el diseño y la documentación de API, permitiendo la creación de una especificación detallada que incluye endpoints, métodos HTTP y formatos de solicitud/respuesta. JSON Schema, por su parte, se enfoca en la validación de datos JSON, con amplio soporte para definir estructuras de datos complejas.
• JWT (JSON Web Tokens): Es un formato de token estándar que se utiliza como mecanismo de autenticación y autorización en arquitecturas de microservicios. Un JWT permite gestionar la identidad de los usuarios y sus permisos.
• OAuth2 y OpenID Connect (OIDC): OAuth2 es un protocolo de delegación diseñado para ayudar a acceder a las APIs de terceros. OpenID Connect es la base de OAuth2 que se utiliza para el inicio de sesión (login). Estos estándares son cruciales para la autenticación delegada y la autorización.
4. Estilos y Capas de Arquitectura a Alto Nivel
En ingeniería de software, las soluciones comprobadas a problemas comunes se conocen como patrones de software. Entre estos, los patrones de arquitectura definen la estructura general del sistema.
Arquitecturas Multicapa (Multilayer)
La arquitectura de una aplicación puede referirse a sus capas lógicas (layers), que son "capas de software que nosotros, los desarrolladores/as, creamos". El principio es dividir una aplicación en capas que colaboran entre sí por medio de interfaces bien definidos.
• Capas Lógicas Comunes: El diseño más utilizado actualmente es el diseño en tres capas, a saber:
    1. Capa de presentación (o de usuario): Presenta el sistema al usuario, comunica información y captura datos del usuario.
    2. Capa de negocio (o lógica del negocio): Reside la lógica que procesa las peticiones del usuario y donde se establecen todas las reglas que deben cumplirse.
    3. Capa de datos: Se encarga de acceder a los datos, formada por uno o más gestores de bases de datos.
Diferencia entre Capas y Niveles
Es vital distinguir entre "capa" (referencia lógica) y "nivel" (referencia física):
• Capa (Layer): Se refiere a la forma en que una solución es segmentada desde el punto de vista lógico (ej., Presentación, Lógica de Negocio, Datos).
• Nivel (Tier): Corresponde a la forma en que las capas lógicas se encuentran distribuidas de forma física (hardware). Por ejemplo, una solución de tres capas que reside en un solo Computador es de "tres capas y un nivel". Un cliente, un servidor web y un servidor de bases de datos en tres máquinas físicas diferentes constituye una arquitectura de 3 niveles físicos.
El Patrón Modelo-Vista-Controlador (MVC)
El MVC es un patrón arquitectural que es un caso particular de la arquitectura en 3 capas, pero con responsabilidades y relaciones estandarizadas.
1. Modelo (Model): Donde se programa la lógica de negocio. Incluye el acceso a los datos, los filtros, algoritmos y restricciones que imponga el sistema. Los modelos deben empaquetar esos datos y devolverlos al controlador en objetos estándar. En una arquitectura N-Capas, el Modelo corresponde a la Capa Común/de Objetos y la Capa de Acceso a Datos.
2. Vista (View): Despliega la interfaz de usuario. Obtiene sus datos del Modelo para generar la interfaz apropiada.
3. Controlador (Controller): Recibe la notificación de la acción solicitada por el usuario (normalmente a través de un gestor de eventos). El controlador gestiona el evento, accede y actualiza el Modelo, y luego delega a la Vista la tarea de desplegar la interfaz. En una arquitectura N-Capas, la Capa de Lógica de Negocio se encuentra en el Controlador.
Estilos Arquitectónicos Modernos
• Cliente-Servidor (C-S): Es el modelo más popular en aplicaciones web sencillas. El servidor espera peticiones de forma pasiva, y el cliente invoca peticiones y espera respuestas.
• Peer-to-Peer (P2P): Los procesos participantes tienen idénticas capacidades y responsabilidades, con interacciones directas. Las características principales incluyen descentralización, distribución, balance de carga y alta disponibilidad.
• Microservicios: Un patrón arquitectónico de alto nivel para sistemas distribuidos. Busca la separación de componentes en módulos independientes para facilitar el mantenimiento, la escalabilidad y la resiliencia. Un sistema basado en microservicios suele utilizar un API Gateway como punto de entrada para gestionar las solicitudes externas y enrutar el tráfico. La forma en que se despliegan estos servicios es clave para su escalabilidad, disponibilidad y resiliencia.

--------------------------------------------------------------------------------
Referencias Bibliográficas
Ahmad, I., Suwarni, E., Borman, R. I., Asmawati, F., Rossi, F., & Jusman, Y. (2021). Implementation of RESTful API Web Services Architecture in Takeaway Application Development. 2021 1st International Conference on Electronic and Electrical Engineering and Intelligent System, ICE3IS 2021.
Agudelo, O., Riveros-Sanabria Y., & Valbuena, S. (2021). Evaluación de una Arquitectura de Software. Prospectiva, 19(2).
Antanavicius, A., et al. (2025). PulseMCP. https://www.pulsemcp.com.
B. Cameron Gain. (2025, Octubre 2). How Dapr and WebAssembly Team Up for Microservices. The New Stack.
Bertocci, V. (2022). OAuth2 y OpenID Connect: La Guía Profesional - Beta. Auth0.
Curay Vela, A. E. (2025). Core de Servicios Web para Interoperar entre el Ecosistema de la Facultad de Ingeniería en Sistemas y la Plataforma de Sistemas Académicos de la Escuela Politécnica Nacional (Trabajo de Integración Curricular). Escuela Politécnica Nacional.
Dulam, N. (2025, Julio 31). The Only Guide You Will Ever Need For Model Context Protocol (MCP). Analytics Vidhya.
DWES DOCS. (n.d.). 4. Arquitectura MVC. IES Celia Viñas.
Editorial Red Hat. (2022, Diciembre 16). Middleware: qué es, su importancia y tipos. Red Hat.
Gourdel, T. (2025, Octubre 2). MCP: Best Practices for Secure Agent-Database Interoperability. The New Stack.
Hou, X., Zhao, Y., Wang, S., & Wang, H. (2025, Octubre). Model Context Protocol (MCP): Landscape, Security Threats, and Future Research Directions. arXiv.
IES Celia Viñas. (n.d.). 4. Arquitectura MVC - DWES DOCS.
Kurose, J. F., & Ross, K. W. (2010). Capítulo 8 Seguridad de red. Pearson Educación.
Marteen Van Steen, A. S. (2017). Distributed systems Principles and Paradigms.
Mentores Tech. (2025, Febrero 5). Patrones de Despliegue para Microservicios. Mentores Tech.
Paradigmas de Computación Distribuida: cliente-servidor (2). (n.d.). Tema 1: INTRODUCCIÓN A LOS SISTEMAS DISTRIBUIDOS. Departamento de Informática, Universidad de Valladolid.
Paradigma Digital. (2025, Septiembre 3). Patrones de arquitectura en microservicios: seguridad con JWT.
Q2BStudio. (n.d.). RabbitMQ vs Kafka: Elige la base de mensajería para microservicios.
Uhu Colli, A. (n.d.). Modelo vista controlador vas Programacion por n capas. Slideshare.
Wallarm. (2025, Abril 7). gRPC vs WebSocket: ¿Cuándo es mejor usarlo?.
Wonderful-Top-5360. (2024). gRPC vs Websockets?. Reddit.
