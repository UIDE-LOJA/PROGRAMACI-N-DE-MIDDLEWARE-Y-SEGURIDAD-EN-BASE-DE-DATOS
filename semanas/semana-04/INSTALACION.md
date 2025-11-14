# Guía de Instalación Rápida - Semana 4

## ⚡ Requisitos Previos

Antes de comenzar el laboratorio, asegúrate de tener instalado:

---

## 1. MySQL 8.0+

### Windows

#### Opción A: MySQL Installer (Recomendado)
1. Descargar de: https://dev.mysql.com/downloads/installer/
2. Ejecutar `mysql-installer-community-8.0.x.x.msi`
3. Seleccionar "Developer Default"
4. Configurar contraseña de root
5. Instalar MySQL Workbench (incluido)

#### Opción B: Verificar instalación existente
```powershell
# Verificar versión
mysql --version

# Verificar servicio
Get-Service MySQL80
```

---

## 2. OpenSSL

### Windows

#### Opción A: Git for Windows (Más fácil)
OpenSSL viene incluido con Git for Windows.

1. Descargar Git: https://git-scm.com/download/win
2. Instalar con opciones por defecto
3. OpenSSL estará en: `C:\Program Files\Git\usr\bin\openssl.exe`

#### Verificar instalación:
```powershell
# En PowerShell
openssl version

# Si no funciona, usar Git Bash
# Buscar "Git Bash" en el menú inicio
openssl version
```

#### Opción B: Instalación directa
1. Descargar de: https://slproweb.com/products/Win32OpenSSL.html
2. Elegir "Win64 OpenSSL v3.x.x" (no Light)
3. Instalar en `C:\OpenSSL-Win64`
4. Agregar a PATH:
   ```powershell
   $env:Path += ";C:\OpenSSL-Win64\bin"
   ```

---

## 3. Node.js

### Windows

1. Descargar de: https://nodejs.org/
2. Elegir versión LTS (Long Term Support)
3. Ejecutar instalador `.msi`
4. Aceptar opciones por defecto

#### Verificar instalación:
```powershell
node --version
npm --version
```

**Versiones recomendadas:**
- Node.js: v18.x o superior
- npm: v9.x o superior

---

## 4. MySQL Workbench

### Windows

Si instalaste MySQL con MySQL Installer, Workbench ya está instalado.

Si no:
1. Descargar de: https://dev.mysql.com/downloads/workbench/
2. Ejecutar instalador
3. Configurar conexión a localhost

---

## ✅ Verificación Completa

Ejecuta estos comandos para verificar que todo está instalado:

```powershell
# MySQL
mysql --version

# OpenSSL (en Git Bash si es necesario)
openssl version

# Node.js
node --version

# npm
npm --version
```

**Output esperado:**
```
mysql  Ver 8.0.35 for Win64 on x86_64 (MySQL Community Server - GPL)
OpenSSL 3.1.4 24 Oct 2023 (Library: OpenSSL 3.1.4 24 Oct 2023)
v18.18.0
9.8.1
```

---

## 🚀 Preparación del Laboratorio

### Paso 1: Crear directorio de trabajo

```powershell
# Crear carpeta para el laboratorio
mkdir C:\laboratorio-semana4
cd C:\laboratorio-semana4
```

### Paso 2: Descargar archivos del laboratorio

Copia estos archivos a `C:\laboratorio-semana4`:
- `laboratorio.sql`
- `jwt-demo.js`
- `LABORATORIO.md`

### Paso 3: Verificar conexión a MySQL

```powershell
# Conectar a MySQL
mysql -u root -p

# Dentro de MySQL, verificar SSL
SHOW VARIABLES LIKE '%ssl%';

# Salir
exit
```

### Paso 4: Generar claves RSA para JWT

```powershell
cd C:\laboratorio-semana4

# Generar clave privada
openssl genrsa -out private_key.pem 2048

# Generar clave pública
openssl rsa -in private_key.pem -pubout -out public_key.pem

# Verificar que se crearon
dir *.pem
```

### Paso 5: Probar script JWT

```powershell
# Ejecutar demo de JWT
node jwt-demo.js
```

Si todo funciona, verás output con JWT generado y verificado.

---

## 🔧 Solución de Problemas Comunes

### Problema 1: "mysql no se reconoce como comando"

**Solución:** Agregar MySQL al PATH

```powershell
# Agregar temporalmente
$env:Path += ";C:\Program Files\MySQL\MySQL Server 8.0\bin"

# O agregar permanentemente:
# 1. Buscar "Variables de entorno" en Windows
# 2. Editar "Path" en Variables del sistema
# 3. Agregar: C:\Program Files\MySQL\MySQL Server 8.0\bin
```

### Problema 2: "openssl no se reconoce como comando"

**Solución:** Usar Git Bash

1. Buscar "Git Bash" en el menú inicio
2. Ejecutar comandos de OpenSSL desde ahí

O agregar al PATH:
```powershell
$env:Path += ";C:\Program Files\Git\usr\bin"
```

### Problema 3: "node no se reconoce como comando"

**Solución:** Reiniciar PowerShell después de instalar Node.js

Si persiste:
```powershell
# Verificar instalación
Get-Command node

# Agregar al PATH si es necesario
$env:Path += ";C:\Program Files\nodejs"
```

### Problema 4: Error al conectar a MySQL

**Solución:** Verificar que el servicio está corriendo

```powershell
# Ver estado del servicio
Get-Service MySQL80

# Iniciar servicio si está detenido
Start-Service MySQL80

# O usar Services.msc
services.msc
```

### Problema 5: "Access denied for user 'root'@'localhost'"

**Solución:** Verificar contraseña

```powershell
# Conectar especificando host
mysql -h localhost -u root -p

# Si olvidaste la contraseña, resetearla:
# 1. Detener servicio MySQL
# 2. Iniciar en modo seguro
# 3. Cambiar contraseña
# Ver: https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html
```

### Problema 6: Permisos insuficientes en Windows

**Solución:** Ejecutar PowerShell como Administrador

1. Buscar "PowerShell" en el menú inicio
2. Click derecho → "Ejecutar como administrador"
3. Ejecutar comandos desde ahí

---

## 📋 Checklist Pre-Laboratorio

Antes de comenzar el laboratorio, verifica:

- [ ] MySQL 8.0+ instalado y funcionando
- [ ] MySQL Workbench instalado
- [ ] OpenSSL accesible (Git Bash o instalación directa)
- [ ] Node.js y npm instalados
- [ ] Puedes conectarte a MySQL con root
- [ ] Directorio de trabajo creado
- [ ] Archivos del laboratorio descargados
- [ ] Claves RSA generadas (private_key.pem y public_key.pem)
- [ ] Script JWT probado y funcionando

---

## 🆘 Soporte

Si tienes problemas con la instalación:

1. **Revisar logs de error** - Copiar mensaje de error completo
2. **Buscar en documentación oficial**:
   - MySQL: https://dev.mysql.com/doc/
   - OpenSSL: https://www.openssl.org/docs/
   - Node.js: https://nodejs.org/docs/
3. **Consultar en horario de tutorías**:
   - Lunes: 10:00 - 12:00
   - Viernes: 08:00 - 09:00
4. **Email:** chcardenasto@uide.edu.ec

---

## 🎯 Siguiente Paso

Una vez completada la instalación, continúa con:
- **LABORATORIO.md** - Guía paso a paso del laboratorio
- **laboratorio.sql** - Script SQL completo
- **jwt-demo.js** - Demo de JWT con RS256

---

## 📚 Recursos Adicionales

### Tutoriales de Instalación

**MySQL:**
- [Instalación en Windows](https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html)
- [Video tutorial](https://www.youtube.com/watch?v=2HQC94la6go)

**OpenSSL:**
- [OpenSSL en Windows](https://wiki.openssl.org/index.php/Binaries)
- [Guía completa](https://www.xolphin.com/support/OpenSSL/OpenSSL_-_Installation_under_Windows)

**Node.js:**
- [Guía oficial](https://nodejs.org/en/download/package-manager/)
- [Video tutorial](https://www.youtube.com/watch?v=06X51c6WHsQ)

### Comandos Útiles

```powershell
# Ver versiones instaladas
mysql --version
openssl version
node --version
npm --version

# Ver servicios de Windows
Get-Service | Where-Object {$_.Name -like "*mysql*"}

# Ver procesos de Node
Get-Process node

# Limpiar caché de npm (si hay problemas)
npm cache clean --force

# Actualizar npm
npm install -g npm@latest
```

---

**Última actualización:** Noviembre 2025  
**Versión:** 1.0
