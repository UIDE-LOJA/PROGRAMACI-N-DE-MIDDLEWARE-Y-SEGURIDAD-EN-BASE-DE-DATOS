# Instrucciones Rapidas - PE-1.3

## Pasos para completar la practica

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar el servidor
```bash
npm start
```

Deberias ver:
```
==================================================
Servicio de Eco - JSON vs Protobuf
Servidor en http://localhost:3000
==================================================
```

### 3. Probar endpoint JSON

Abre otra terminal y ejecuta:

```bash
curl -X POST http://localhost:3000/echo/json -H "Content-Type: application/json" -d "{\"message\": \"Hola mundo\"}"
```

O usa Postman:
- URL: `http://localhost:3000/echo/json`
- Metodo: POST
- Body (raw, JSON): `{"message": "Hola mundo"}`

### 4. Ejecutar comparacion automatica

En otra terminal:

```bash
npm test
```

Veras algo como:
```
==================================================
COMPARACION JSON vs PROTOBUF
==================================================

Probando JSON...
  Request 1: 65 bytes
  Request 2: 65 bytes
  ...

Probando Protobuf...
  Request 1: 28 bytes
  Request 2: 28 bytes
  ...

==================================================
RESULTADOS
==================================================
JSON:     65.00 bytes (promedio)
Protobuf: 28.00 bytes (promedio)

Protobuf es 56.92% mas compacto
==================================================
```

### 5. Tomar capturas

Guarda capturas de:
1. Servidor iniciado
2. Peticion JSON (Postman o curl)
3. Resultado de `npm test`

Guardalas en la carpeta `capturas/`

### 6. Completar analisis en README.md

Abre `README.md` y completa:
- La tabla con los resultados
- Las 4 preguntas de analisis

### 7. Subir a Git

Crea un repositorio en GitHub o GitLab:

```bash
git init
git add .
git commit -m "Practica PE-1.3: Servicio Eco JSON vs Protobuf"
git branch -M main
git remote add origin [URL-de-tu-repositorio]
git push -u origin main
```

Comparte la URL del repositorio con el docente.

**Nombre del repositorio:** `PE-1.3-ApellidoNombre-EcoService`

## Problemas comunes

**Error: Cannot find module 'express'**
- Solucion: Ejecuta `npm install`

**Error: EADDRINUSE (puerto ocupado)**
- Solucion: Cierra otros servidores en puerto 3000

**Error al ejecutar npm test**
- Solucion: Asegurate de que el servidor este corriendo primero

## Ayuda

Si tienes dudas, consulta al docente durante la practica.
