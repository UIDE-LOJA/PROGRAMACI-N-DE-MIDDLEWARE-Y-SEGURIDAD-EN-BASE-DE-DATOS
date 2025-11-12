# PE-1.3: Servicio de Eco - JSON vs Protobuf

Práctica de laboratorio Semana 3 - Comparación de formatos de serialización

## Descripción

Servicio simple de eco que responde en JSON y Protocol Buffers para comparar el tamaño de las respuestas.

## Estructura

```
PE-1.3/
├── package.json    (dependencias)
├── server.js       (servidor Express)
├── echo.proto      (esquema Protobuf)
├── test.js         (script de comparación)
└── README.md       (este archivo)
```

## Instalación

```bash
npm install
```

## Uso

### 1. Iniciar el servidor

```bash
npm start
```

### 2. Probar con curl (JSON)

```bash
curl -X POST http://localhost:3000/echo/json \
  -H "Content-Type: application/json" \
  -d '{"message": "Hola mundo"}'
```

### 3. Ejecutar comparación automática

En otra terminal:

```bash
npm test
```

## Esquema Protobuf

```protobuf
syntax = "proto3";

message EchoRequest {
  string message = 1;
}

message EchoResponse {
  string message = 1;
  int64 timestamp = 2;
}
```

## Análisis de Resultados

Completa esta tabla después de ejecutar `npm test`:

| Formato | Tamaño Promedio | Observaciones |
|---------|-----------------|---------------|
| JSON    | ___ bytes       | [Escribe aquí] |
| Protobuf| ___ bytes       | [Escribe aquí] |

### Preguntas

1. **¿Cuál formato es más compacto? ¿Por cuánto?**
   
   [Tu respuesta aquí]

2. **¿Por qué Protobuf es más pequeño que JSON?**
   
   [Tu respuesta aquí]

3. **¿Cuándo usarías JSON?**
   
   [Tu respuesta aquí]

4. **¿Cuándo usarías Protobuf?**
   
   [Tu respuesta aquí]

## Capturas Requeridas

Guarda capturas de pantalla en la carpeta `capturas/`:

1. Servidor iniciado
2. Petición JSON en Postman/curl
3. Resultado de `npm test`

## Entrega

### Subir a GitHub o GitLab

1. Crear repositorio:
```bash
# Nombre: PE-1.3-ApellidoNombre-EcoService
```

2. Inicializar Git y subir:
```bash
git init
git add .
git commit -m "Practica PE-1.3: Servicio Eco JSON vs Protobuf"
git branch -M main
git remote add origin [URL-de-tu-repositorio]
git push -u origin main
```

3. Compartir URL del repositorio con el docente

**Importante:** El repositorio debe ser público o dar acceso al docente

---

**Estudiante:** [Tu Nombre]  
**Curso:** LTI_05A_458 PMSBD  
**Docente:** Mgs. Charlie Cárdenas Toledo  
**UIDE - Noviembre 2025**
