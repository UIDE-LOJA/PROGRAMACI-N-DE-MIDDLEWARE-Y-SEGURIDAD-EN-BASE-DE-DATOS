# Instrucciones para Subir a GitHub/GitLab

## Opcion 1: GitHub

### Paso 1: Crear repositorio en GitHub

1. Ve a https://github.com
2. Haz clic en el boton "+" y selecciona "New repository"
3. Nombre del repositorio: `PE-1.3-ApellidoNombre-EcoService`
4. Descripcion: "Practica PE-1.3 - Servicio Eco JSON vs Protobuf"
5. Selecciona "Public"
6. NO marques "Add a README file" (ya tienes uno)
7. Haz clic en "Create repository"

### Paso 2: Subir tu codigo

Abre la terminal en la carpeta PE-1.3 y ejecuta:

```bash
git init
git add .
git commit -m "Practica PE-1.3: Servicio Eco JSON vs Protobuf"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/PE-1.3-ApellidoNombre-EcoService.git
git push -u origin main
```

Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub.

### Paso 3: Verificar

1. Actualiza la pagina de tu repositorio en GitHub
2. Verifica que todos los archivos esten subidos
3. Verifica que las capturas esten en la carpeta `capturas/`
4. Verifica que el README.md se vea correctamente

### Paso 4: Compartir

Copia la URL de tu repositorio (ejemplo: https://github.com/TU-USUARIO/PE-1.3-ApellidoNombre-EcoService) y compartela con el docente.

---

## Opcion 2: GitLab

### Paso 1: Crear repositorio en GitLab

1. Ve a https://gitlab.com
2. Haz clic en "New project"
3. Selecciona "Create blank project"
4. Project name: `PE-1.3-ApellidoNombre-EcoService`
5. Descripcion: "Practica PE-1.3 - Servicio Eco JSON vs Protobuf"
6. Visibility Level: "Public"
7. NO marques "Initialize repository with a README"
8. Haz clic en "Create project"

### Paso 2: Subir tu codigo

Abre la terminal en la carpeta PE-1.3 y ejecuta:

```bash
git init
git add .
git commit -m "Practica PE-1.3: Servicio Eco JSON vs Protobuf"
git branch -M main
git remote add origin https://gitlab.com/TU-USUARIO/PE-1.3-ApellidoNombre-EcoService.git
git push -u origin main
```

Reemplaza `TU-USUARIO` con tu nombre de usuario de GitLab.

### Paso 3: Verificar

1. Actualiza la pagina de tu repositorio en GitLab
2. Verifica que todos los archivos esten subidos
3. Verifica que las capturas esten en la carpeta `capturas/`
4. Verifica que el README.md se vea correctamente

### Paso 4: Compartir

Copia la URL de tu repositorio (ejemplo: https://gitlab.com/TU-USUARIO/PE-1.3-ApellidoNombre-EcoService) y compartela con el docente.

---

## Comandos Git Utiles

### Ver estado de archivos
```bash
git status
```

### Ver historial de commits
```bash
git log --oneline
```

### Agregar mas cambios despues del primer commit
```bash
git add .
git commit -m "Actualizacion: [descripcion del cambio]"
git push
```

### Ver archivos que seran ignorados
```bash
git status --ignored
```

---

## Verificacion Final

Antes de compartir tu repositorio, verifica:

- [ ] El repositorio es publico o has dado acceso al docente
- [ ] Todos los archivos estan subidos (excepto node_modules)
- [ ] Las capturas estan en la carpeta capturas/
- [ ] El README.md tiene el analisis completado
- [ ] El servidor funciona correctamente (npm install && npm start)
- [ ] Las pruebas funcionan (npm test)
- [ ] Tu nombre esta en el README.md

---

## Problemas Comunes

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin [URL-de-tu-repositorio]
```

### Error: "failed to push some refs"
```bash
git pull origin main --rebase
git push origin main
```

### Olvidaste agregar un archivo
```bash
git add [nombre-del-archivo]
git commit --amend --no-edit
git push --force
```

### Subiste node_modules por error
1. Asegurate de tener .gitignore con node_modules/
2. Ejecuta:
```bash
git rm -r --cached node_modules
git commit -m "Eliminar node_modules"
git push
```

---

## Ayuda Adicional

Si tienes problemas con Git:
1. Consulta al docente durante la practica
2. Revisa la documentacion oficial: https://git-scm.com/doc
3. Tutorial interactivo: https://learngitbranching.js.org/
