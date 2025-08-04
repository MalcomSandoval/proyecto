# TaskFlow - Aplicación de Gestión de Tareas

Una aplicación moderna y completa para la gestión de tareas construida con React, TypeScript, Tailwind CSS y Supabase.

## 🌐 Demo en Vivo

**🚀 [Ver Demo](https://taskflow-app.vercel.app)**

> **Nota:** Reemplaza la URL anterior con tu URL real de Vercel después del despliegue.

## 🚀 Características

### Funcionalidades Core
- ✅ **Autenticación de usuarios** - Registro e inicio de sesión seguro
- ✅ **Gestión completa de tareas** - Crear, editar, eliminar y marcar como completadas
- ✅ **Sistema de categorías** - Organiza tus tareas con categorías coloridas
- ✅ **Filtros inteligentes** - Visualiza tareas por estado (todas, pendientes, completadas)
- ✅ **Fechas límite** - Establece fechas de vencimiento para tus tareas
- ✅ **Descripciones detalladas** - Añade contexto adicional a tus tareas

### Experiencia de Usuario
- 🎨 **Diseño moderno** - Interfaz limpia inspirada en aplicaciones premium
- 📱 **Completamente responsivo** - Funciona perfectamente en todos los dispositivos
- ⚡ **Actualizaciones en tiempo real** - Los cambios se sincronizan automáticamente
- 🎭 **Animaciones suaves** - Transiciones elegantes y micro-interacciones
- ♿ **Accesible** - Diseñado siguiendo las mejores prácticas de accesibilidad

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mejor desarrollo
- **Tailwind CSS** - Framework de CSS utility-first
- **Lucide React** - Iconos modernos y consistentes
- **React Hook Form** - Gestión eficiente de formularios
- **Date-fns** - Utilidades para manejo de fechas

### Backend & Base de Datos
- **Supabase** - Backend as a Service (BaaS)
- **PostgreSQL** - Base de datos relacional
- **Row Level Security (RLS)** - Seguridad a nivel de fila
- **Autenticación JWT** - Autenticación segura y escalable

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase
- Cuenta de GitHub (para despliegue)
- Cuenta de Vercel (para despliegue)

### 1. Configuración del Proyecto Supabase

1. Ve a [Supabase](https://supabase.com) y crea un nuevo proyecto
2. Ve a la sección "Settings" > "API" en tu dashboard
3. Copia tu `Project URL` y `anon public` key

### 2. Configuración Local

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd taskflow
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
# Edita el archivo .env con tus credenciales de Supabase
VITE_SUPABASE_URL=tu_url_del_proyecto_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_publica_anonima
```

4. Ejecuta las migraciones de base de datos:
   - Ve a tu dashboard de Supabase
   - Navega a "SQL Editor"
   - Ejecuta el contenido del archivo `supabase/migrations/create_tasks_schema.sql`

5. Inicia el servidor de desarrollo:
```bash
npm run dev
```


## 📦 Despliegue en Vercel

Para desplegar la aplicación en Vercel, consulta la **[Guía Completa de Despliegue](./DEPLOYMENT.md)**.

### Resumen Rápido:

1. **Subir a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/tu-usuario/taskflow-app.git
   git push -u origin main
   ```

2. **Desplegar en Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio
   - Configura las variables de entorno:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - ¡Despliega!

3. **Configurar Supabase:**
   - Añade tu URL de Vercel a las URLs permitidas en Supabase
   - Actualiza la configuración de autenticación

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React reutilizables
│   ├── AuthForm.tsx    # Formulario de autenticación
│   ├── Dashboard.tsx   # Panel principal de la aplicación
│   ├── FilterBar.tsx   # Barra de filtros de tareas
│   ├── Header.tsx      # Cabecera de la aplicación
│   ├── TaskForm.tsx    # Formulario para crear/editar tareas
│   ├── TaskItem.tsx    # Componente individual de tarea
│   └── TaskList.tsx    # Lista de tareas
├── hooks/              # Custom hooks de React
│   ├── useAuth.ts      # Hook para autenticación
│   ├── useCategories.ts # Hook para gestión de categorías
│   └── useTasks.ts     # Hook para gestión de tareas
├── lib/                # Utilidades y configuración
│   ├── database.types.ts # Tipos TypeScript para la base de datos
│   └── supabase.ts     # Cliente de Supabase
├── App.tsx             # Componente raíz
├── main.tsx           # Punto de entrada de la aplicación
└── index.css          # Estilos globales con Tailwind

supabase/
└── migrations/         # Migraciones de base de datos
    └── create_tasks_schema.sql # Esquema inicial de la base de datos
```

## 🎯 Funcionalidades Detalladas

### Autenticación
- Registro de usuarios con email y contraseña
- Inicio de sesión seguro
- Gestión automática de sesiones
- Cierre de sesión

### Gestión de Tareas
- **Crear:** Título, descripción, categoría y fecha límite
- **Editar:** Modificación inline del título y edición completa
- **Eliminar:** Con confirmación de seguridad
- **Completar:** Toggle visual del estado

### Sistema de Filtros
- **Todas las tareas:** Vista completa
- **Pendientes:** Solo tareas sin completar
- **Completadas:** Solo tareas terminadas
- Contadores dinámicos en tiempo real

### Categorías
- Creación de categorías personalizadas
- Colores personalizables
- Asignación flexible a tareas

## 💡 Próximas Funcionalidades

- [ ] Modo oscuro/claro
- [ ] PWA (Progressive Web App)
- [ ] Notificaciones push
- [ ] Colaboración en tareas
- [ ] Etiquetas adicionales
- [ ] Búsqueda avanzada
- [ ] Exportación de datos
- [ ] Integración con calendario
- [ ] Aplicación móvil (React Native)

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Linter ESLint
npm run type-check   # Verificación de tipos TypeScript
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

¿Necesitas ayuda? 
- 📖 **Documentación completa:** Ver [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🐛 **Reportar bugs:** Abre un issue en GitHub
- 💡 **Sugerir funcionalidades:** Abre un issue con la etiqueta "enhancement"
- 📧 **Contacto:** Crea un issue para preguntas generales

## 🏗️ Tecnologías y Servicios

### Desarrollo
- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + Lucide Icons
- **Estado:** React Hooks + Custom Hooks
- **Formularios:** React Hook Form + Zod

### Backend & Infraestructura
- **Base de datos:** Supabase (PostgreSQL)
- **Autenticación:** Supabase Auth
- **Hosting:** Vercel
- **CDN:** Vercel Edge Network

### Herramientas
- **Linting:** ESLint + TypeScript ESLint
- **Bundling:** Vite
- **Version Control:** Git + GitHub
- **CI/CD:** Vercel (automático)
---

**Desarrollado con ❤️ usando React, TypeScript y Supabase.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/taskflow-app)