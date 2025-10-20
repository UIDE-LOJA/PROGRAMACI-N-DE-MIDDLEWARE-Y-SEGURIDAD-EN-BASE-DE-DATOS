Un Compendio Exhaustivo sobre Tecnologías Clave de DevOps
A continuación, se presenta un compendio detallado sobre los temas solicitados, cubriendo CI/CD (GitHub Actions/GitLab), Contenedorización y Orquestación (Docker/K8s), Estrategias Blue/Green y Canary, IaC (Terraform) y PM2/Node Clustering.

--------------------------------------------------------------------------------
Integración y Despliegue Continuos (CI/CD)
La Integración Continua (CI) y el Despliegue Continuo (CD) son prácticas fundamentales en las metodologías modernas de desarrollo de software, especialmente en arquitecturas de microsservicios.
Conceptos de CI/CD
La CI es una práctica de desarrollo que se basa en la comprobación consistente y continua del código en un repositorio compartido, lo que puede ocurrir desde unas pocas veces al día hasta un proceso muy frecuente de check-ins y compilaciones automatizadas. El objetivo principal de la CI es asegurar que el nuevo código se integre adecuadamente con el código existente, proporcionando retroalimentación rápida sobre la calidad del mismo.
Por su parte, el Despliegue Continuo (CD) automatiza el build, la prueba y el despliegue de los servicios, garantizando una entrega rápida y fiable. Una parte esencial de la CD es que cada check-in exitoso se trata como un candidato a lanzamiento (release candidate). El CD se confunde a menudo con la Entrega Continua (Continuous Delivery); sin embargo, en la Entrega Continua, la decisión de cuándo lanzar el código —una vez que ha pasado todas las pruebas de calidad— recae en los stakeholders del negocio, mientras que en el Despliegue Continuo, "cada compilación exitosa se despliega en producción" automáticamente.
La adopción de CI y CD es un requisito previo para la implementación exitosa de microsservicios. Las pipelines de CI/CD son un flujo de trabajo de pasos que inician con el código comprometido en el repositorio fuente y terminan con la producción de artefactos listos para el lanzamiento.
Herramientas de CI/CD: GitHub Actions y GitLab
Para gestionar la automatización del proceso de CI/CD, se utilizan herramientas especializadas. Entre las herramientas de CI utilizadas para automatizar compilaciones y pruebas, se encuentran Jenkins, GitHub Actions y GitLab CI/CD.
GitHub Actions es reconocido como una tecnología clave dentro de IT/Ops. Además, las prácticas modernas de DevOps exploran la aplicación de principios GitOps utilizando GitHub Actions y Terraform, junto con herramientas como Flux CD, para la automatización del despliegue y la gestión de la configuración.
Contenedorización y Orquestación (Docker/K8s)
La contenedorización y la orquestación son pilares de las arquitecturas de microsservicios, proporcionando aislamiento y capacidad de gestión a escala.
Contenedorización con Docker
La contenedorización permite empaquetar microsservicios con sus dependencias, asegurando la consistencia a través de diferentes entornos. Un contenedor se describe como una pieza de software en un sistema de archivos completo que contiene todo lo necesario para ejecutar el código, el runtime, las herramientas y las bibliotecas del sistema.
Docker es la herramienta clave para la contenedorización, descrita como una plataforma abierta para desarrollar, distribuir y ejecutar aplicaciones, proporcionando la capacidad de empaquetar y ejecutar una aplicación en un entorno aislado y ligero. Se recomienda utilizar Docker para empaquetar microsservicios como contenedores ligeros y portátiles.
Las imágenes de Docker son "plantillas de solo lectura con instrucciones para crear un contenedor Docker". Para la construcción de estas imágenes, se utiliza un Dockerfile, que es un archivo de scripting que contiene las instrucciones para el build.
Para simplificar la configuración de múltiples contenedores, se utiliza Docker Compose, que permite definir los componentes de una aplicación, sus contenedores, configuración, enlaces y volúmenes en un único archivo, generalmente en formato YAML. Esto resulta útil en entornos de desarrollo, prueba e integración.
La tecnología de contenedores ofrece importantes ventajas sobre las máquinas virtuales (VMs), ya que los contenedores "comparten el kernel del sistema operativo anfitrión con otros contenedores en el mismo host," lo que resulta en una huella más pequeña y una mayor densidad de despliegues por servidor.
Orquestación con Kubernetes (K8s)
La orquestación de contenedores es esencial cuando se manejan "decenas o cientos de microsservicios" con múltiples instancias, donde la complejidad de la gestión y la observación es alta.
Kubernetes (K8s) se ha convertido en la herramienta principal para orquestar microsservicios. K8s automatiza el despliegue, el escalado y la gestión de aplicaciones en contenedores.
Algunas de las capacidades clave de Kubernetes incluyen:
• Descubrimiento de Servicios y Balanceo de Carga: K8s puede exponer contenedores a través de un nombre DNS o dirección IP y distribuir el tráfico de red entre instancias de servicio si la carga es alta.
• Despliegues y Reversiones Automatizadas (Automated rollouts and rollbacks): Permite a los desarrolladores describir el estado deseado de los contenedores, realizando cambios de manera progresiva y revirtiendo automáticamente a un estado estable anterior si ocurre un problema.
• Auto-reparación (Self-healing): Reinicia los contenedores que han fallado y, basándose en la comprobación de salud definida por el usuario, reemplaza o elimina contenedores que no responden.
• Configuración y Gestión de Secretos: Almacena y gestiona información sensible, como contraseñas, sin necesidad de reconstruir las imágenes de los contenedores.
Estrategias de Despliegue Progresivo: Blue/Green y Canary
Para reducir el riesgo durante el despliegue, las arquitecturas modernas adoptan estrategias de despliegue progresivo, permitiendo que las nuevas versiones se introduzcan gradualmente.
Despliegues Blue/Green
El despliegue Blue/Green es una técnica que separa el despliegue del lanzamiento. Consiste en tener dos copias idénticas del software desplegadas al mismo tiempo, donde solo una versión está recibiendo peticiones reales.
Newman (2017) describe el proceso:
"Consideremos un ejemplo simple... En producción, tenemos la v123 del servicio de cliente en vivo. Queremos desplegar una nueva versión, v456. Desplegamos esta junto a la v123, pero no dirigimos ningún tráfico hacia ella. En su lugar, realizamos algunas pruebas in situ contra la versión recién desplegada. Una vez que las pruebas han funcionado, dirigimos la carga de producción a la nueva versión v456 del servicio de cliente".
Esta estrategia permite la "conmutación instantánea entre versiones", lo que reduce significativamente el riesgo y proporciona la capacidad de retroceder rápidamente si se detectan errores, logrando despliegues con cero tiempo de inactividad.
Lanzamientos Canary (Canary Releases)
A diferencia de Blue/Green, el lanzamiento Canary verifica el software recién desplegado dirigiendo cantidades de tráfico de producción contra el sistema para ver si se comporta como se espera. Si la nueva versión funciona bien, se aumenta progresivamente la cantidad de tráfico que pasa por ella.
Las versiones Canary y Blue/Green pueden utilizar implementaciones técnicas similares. Sin embargo, el lanzamiento Canary se diferencia en que "se puede esperar que las versiones coexistan por más tiempo," y a menudo se varía la cantidad de tráfico dirigido a la nueva versión, lo que requiere un enrutamiento de tráfico más sofisticado. Compañías como Netflix utilizan este enfoque extensivamente, ejecutando una parte de la carga de producción contra la nueva versión y una línea base, comparando los resultados antes de proceder a un despliegue completo.
Infraestructura como Código (IaC) con Terraform
La Infraestructura como Código (IaC) es el proceso de automatizar el aprovisionamiento, la gestión y la desaprovisionamiento de servicios de infraestructura a través de código scripted en lugar de la intervención humana.
La IaC es una tecnología clave que habilita el movimiento DevOps y es una ventaja crucial de la integración de servicios de cloud computing. Al representar la infraestructura (hardware, componentes de red) como código, es posible asegurar que los entornos de despliegue, como integración, prueba y producción, sean exactamente idénticos. Esto permite a los desarrolladores y probadores reproducir fácilmente los defectos de producción en entornos inferiores.
Terraform
Terraform es una herramienta de Hashicorp relativamente nueva que opera en este espacio. Aunque es una herramienta incipiente, está "intentando crear una herramienta de código abierto en esta línea". Terraform se está adoptando ampliamente y es compatible con las capacidades de automatización en este ámbito. Su objetivo es permitir la creación de infraestructura para diferentes plataformas desde la misma configuración, lo que puede simplificar enormemente la complejidad del despliegue en entornos grandes.
Terraform es una tecnología listada en las prácticas de IT/Ops junto con Kubernetes, Docker y GitHub. Se utiliza en pilas tecnológicas junto con Docker, AWS y Kubernetes para la gestión de la infraestructura.
PM2/Node Clustering
Node.js es una plataforma de ejecución basada en el motor V8 de Google, popular para construir el backend de aplicaciones web debido a su modelo asíncrono y orientado a eventos, que permite un manejo de datos sincronizado a alta velocidad.
PM2 (Process Manager 2)
Para publicar una aplicación desarrollada con Node.js en un ambiente productivo, se recomienda el uso de PM2. PM2 es un gestor de procesos que facilita la gestión de procesos en segundo plano para aplicaciones Node.js.
El gestor de procesos PM2 permite varias operaciones, incluyendo:
• Agregar un programa al gestor de procesos.
• Obtener la lista de procesos en segundo plano.
• Gestionar el estado y ver los detalles de un proceso.
PM2 también utiliza un Archivo de Configuración (Ecosystem File) para la configuración básica, incluyendo el establecimiento del puerto de escucha.
Escalabilidad de Node.js (Clustering Implícito)
El concepto de clustering en Node.js está íntimamente ligado a la necesidad de escalabilidad horizontal en aplicaciones modernas. Node.js es una plataforma diseñada para crear "aplicaciones del lado del servidor escalables".
El escalado es fundamental ya que las arquitecturas modernas, como los microsservicios, permiten escalar componentes específicos según sea necesario, a diferencia de los monolitos que escalan verticalmente toda la aplicación. Para Node.js, este enfoque es clave, ya que la plataforma permite la construcción de "aplicaciones capaces de soportar miles de conexiones simultáneas con bajo consumo de memoria".
Aunque las fuentes no mencionan directamente el módulo cluster de Node.js, el uso de PM2 en entornos de producción para gestionar múltiples procesos de la aplicación insinúa la necesidad de manejar la concurrencia y la alta disponibilidad, aprovechando la capacidad de escalado de la infraestructura subyacente (como contenedores y Kubernetes). En general, la capacidad de clustering describe grupos de computadoras conectadas para realizar la misma tarea, lo que hace que múltiples sistemas parezcan uno solo y proporciona redundancia a través de la escala.

--------------------------------------------------------------------------------
Referencias
Chacon, S., & Straub, B. (2014). Pro Git (2nd ed.). Apress. https://git-scm.com/book/en/v2
Combe, T., Martin, A., & Pietro, R. D. (2016). To docker or not to docker: A security perspective. IEEE Cloud Computing, 3(5), 54–62. https://doi.org/10.1109/MCC.2016.100
Docker Inc. (2025). Docker Documentation.
Figueredo, L. R. R., & Lucca, G. S. de. (2017). Virtualização e docker. Revista Vincci.
Haverbek, M. (2024). Eloquent Javascript (4th ed.). https://eloquentjavascript.net/
Lewis, J., & Fowler, M. (2014). Microservices: A Definition of This New Architectural Term. martinFowler.com.
Newman, S. (n.d.). Building Microservices (1st ed.). O’Reilly Media. (Nota: Citado como Newman, S. en texto. Asumiendo la primera edición debido a la amplia cobertura en el primer libro proporcionado).
Newman, S. (n.d.). Building Microservices, 2nd Edition. O'Reilly Media.
Node.js Documentation. (2025). About Node.js.
Nolle, T. (2016). Infrastructure as code complicates hybrid, multiple cloud management (Part 2 of 2). Search Cloud Computing.
Nolle, T. (2016). Separating DevOps from the future-driven cloud orchestration. Search Cloud Computing.
O’Reilly Media. (n.d.). 25. Software Is Collaboration - The Software Architect Elevator [Book]
O’Reilly Media. (n.d.). Modern DevOps Practices.
Pargaonkar, S. (2023). A comprehensive review of performance testing methodologies and best practices: Software quality engineering. International Journal of Science and Research (IJSR). https://doi.org/10.21275/SR23822111402
Pasquali, S. (2015). Deploying Node.js. Packt Publishing.
Pinto, G. P. (2025). Nestjs vs spring boot: uma análise comparativa de desempenho entre frameworks web modernos.
Pompido, P. (2020). Angular y Node.js Optimice el desarrollo de sus aplicaciones web con una arquitectura MEAN. Ediciones ENI.
Pucciarelli, L. (n.d.). Node JS Curso práctico. Grupo Editorial RA-MA.
Robbins, J. N. (2018). Learning Web Design: A Beginner's Guide to HTML, CSS, JavaScript, and Web Graphics (5th ed.). O'Reilly Media.
Zimmermann, O. (2021). What Is a Cloud-Native Application Anyway (Part 2)?. Olaf Zimmermann (ZIO).
Vanderpol, J. (2024). CompTIA Security+ Study Guide with over 500 Practice Test Questions. Technet24.
Vários Autores. (n.d.). A Guide to Microservices Best Practices. DevZero.
Vários Autores. (2022). Design Patterns and Anti-Patterns in Microservices Architecture: A Classification Proposal and Study on Open Source Projects. POLITesi - Politecnico di Milano.
Vários Autores. (2024). Mastering OpenTelemetry and Observability: Enhancing Application and Infrastructure Performance and Avoiding Outages. DOKUMEN.PUB.
Vries, C. E. (2018). Building Microservices with .NET Core 2.0.
