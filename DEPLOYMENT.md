# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar TaskFlow en Vercel paso a paso.

## 📋 Prerrequisitos

- [ ] Cuenta de GitHub
- [ ] Cuenta de Vercel
- [ ] Proyecto de Supabase configurado
- [ ] Repositorio de GitHub con el código

## 🔧 Preparación del Proyecto

### 1. Subir a GitHub

```bash
# Inicializar repositorio Git (si no lo has hecho)
git init

# Añadir todos los archivos
git add .

# Hacer commit inicial
git commit -m "Initial commit: TaskFlow app"

# Conectar con repositorio remoto
git remote add origin https://github.com/tu-usuario/taskflow-app.git

# Subir código
git push -u origin main
```

### 2. Configurar Variables de Entorno

Antes del despliegue, asegúrate de tener:
- ✅ Proyecto de Supabase creado
- ✅ Migraciones ejecutadas
- ✅ Variables de entorno locales funcionando

## 🌐 Despliegue en Vercel

### Opción 1: Desde el Dashboard de Vercel

1. **Ir a Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub

2. **Importar Proyecto:**
   - Haz clic en "New Project"
   - Selecciona tu repositorio `taskflow-app`
   - Haz clic en "Import"

3. **Configurar el Proyecto:**
   - **Framework Preset:** Vite (se detecta automáticamente)
   - **Root Directory:** `./` (raíz del proyecto)
   - **Build Command:** `npm run build` (automático)
   - **Output Directory:** `dist` (automático)
   - **Install Command:** `npm install` (automático)

4. **Variables de Entorno:**
   En la sección "Environment Variables", añade:
   
   | Name | Value |
   |------|-------|
   | `VITE_SUPABASE_URL` | `https://tu-proyecto-id.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | `tu-clave-publica-anonima` |

5. **Desplegar:**
   - Haz clic en "Deploy"
   - Espera 2-3 minutos
   - ¡Tu app estará lista!

### Opción 2: Desde la Terminal (Vercel CLI)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Hacer login
vercel login

# Desplegar desde la raíz del proyecto
vercel

# Seguir las instrucciones:
# - Set up and deploy? [Y/n] Y
# - Which scope? (selecciona tu cuenta)
# - Link to existing project? [y/N] N
# - What's your project's name? taskflow-app
# - In which directory is your code located? ./
```

Después del primer despliegue, configura las variables de entorno:

```bash
# Añadir variables de entorno
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Redesplegar con las nuevas variables
vercel --prod
```

## 🔧 Configuración Post-Despliegue

### 1. Configurar Dominio Personalizado (Opcional)

1. En el dashboard de Vercel, ve a tu proyecto
2. Ve a "Settings" → "Domains"
3. Añade tu dominio personalizado
4. Configura los DNS según las instrucciones

### 2. Configurar Supabase para Producción

1. **Actualizar URL permitidas:**
   - Ve a tu proyecto en Supabase
   - Settings → Authentication → URL Configuration
   - Añade tu URL de Vercel a "Site URL"
   - Añade tu URL de Vercel a "Redirect URLs"

2. **Ejemplo de URLs:**
   ```
   Site URL: https://taskflow-app.vercel.app
   Redirect URLs: https://taskflow-app.vercel.app/**
   ```

## 🚀 Despliegues Automáticos

Una vez configurado, Vercel desplegará automáticamente:
- ✅ **Cada push a `main`** → Despliegue a producción
- ✅ **Cada pull request** → Preview deployment
- ✅ **Cada branch** → Branch deployment

## 🔍 Verificación del Despliegue

### Checklist Post-Despliegue

- [ ] La aplicación carga sin errores
- [ ] El registro de usuarios funciona
- [ ] El login funciona correctamente
- [ ] Las tareas se crean y guardan
- [ ] Los filtros funcionan
- [ ] La aplicación es responsiva
- [ ] No hay errores en la consola del navegador

### URLs Importantes

- **Aplicación:** `https://tu-proyecto.vercel.app`
- **Dashboard Vercel:** `https://vercel.com/dashboard`
- **Dashboard Supabase:** `https://app.supabase.com`

## 🐛 Solución de Problemas

### Error: "Failed to load environment variables"
```bash
# Verificar variables de entorno
vercel env ls

# Añadir variables faltantes
vercel env add VARIABLE_NAME
```

### Error: "Supabase connection failed"
1. Verifica que las URLs sean correctas
2. Confirma que las migraciones se ejecutaron
3. Revisa que RLS esté habilitado

### Error de Build
```bash
# Verificar build local
npm run build

# Si funciona local pero falla en Vercel:
# - Revisar versión de Node.js
# - Verificar dependencias en package.json
```

## 📊 Monitoreo y Analytics

### Vercel Analytics (Opcional)
1. Ve a tu proyecto en Vercel
2. Settings → Analytics
3. Habilita "Web Analytics"

### Supabase Analytics
1. Dashboard de Supabase → Reports
2. Monitorea uso de base de datos
3. Revisa logs de autenticación

## 🔄 Actualizaciones

Para actualizar la aplicación:

```bash
# Hacer cambios en el código
git add .
git commit -m "Descripción de cambios"
git push origin main

# Vercel desplegará automáticamente
```

## 🎯 Optimizaciones de Producción

### Performance
- ✅ Code splitting automático (Vite)
- ✅ Compresión de assets
- ✅ CDN global de Vercel
- ✅ Caché optimizado

### SEO
- ✅ Meta tags configurados
- ✅ Títulos descriptivos
- ✅ Estructura semántica

### Seguridad
- ✅ HTTPS automático
- ✅ Headers de seguridad
- ✅ RLS en Supabase
- ✅ Variables de entorno seguras

---

¡Tu aplicación TaskFlow estará lista para usar en producción! 🎉