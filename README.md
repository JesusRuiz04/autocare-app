# Auto Manager - Gestión de Mantenimiento de Vehículos

Una aplicación web moderna y completa para gestionar el mantenimiento, gastos, seguros y más aspectos de tus vehículos.

## 🚗 Características

- **Panel de Control Intuitivo**: Resumen completo del estado de tus vehículos
- **Gestión de Mantenimientos**: Programa y rastrea todos los servicios de mantenimiento
- **Control de Gastos**: Registra y analiza todos los gastos relacionados con tus vehículos
- **Gestión de Seguros**: Mantén al día las pólizas y renovaciones
- **Comunidad**: Conecta con otros propietarios de vehículos
- **Recordatorios Automáticos**: Nunca olvides una cita de mantenimiento importante
- **Diseño Responsive**: Funciona perfectamente en dispositivos móviles y desktop
- **Modo Oscuro**: Cambia entre tema claro y oscuro según tus preferencias

## 🛠 Tecnologías Utilizadas

- **Frontend**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Autenticación**: NextAuth.js
- **Base de Datos**: Prisma + PostgreSQL
- **Validación**: Zod
- **Iconos**: Heroicons
- **Fecha/Hora**: date-fns

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- npm, yarn o pnpm
- PostgreSQL (opcional para desarrollo local)

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/auto-manager.git
cd auto-manager
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus configuraciones:
```env
NEXTAUTH_SECRET=tu-secreto-super-seguro
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/automanager
```

4. Ejecuta las migraciones de la base de datos:
```bash
npx prisma migrate dev
```

5. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

6. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🎯 Cuenta Demo

Para probar la aplicación sin registrarte, utiliza estas credenciales:

- **Email**: demo@auto.com
- **Contraseña**: demo123

## 📱 Páginas Principales

- **`/`** - Página de inicio con información de la aplicación
- **`/login`** - Inicio de sesión
- **`/register`** - Registro de nuevos usuarios
- **`/dashboard`** - Panel de control principal
- **`/vehicles`** - Gestión de vehículos
- **`/maintenance`** - Mantenimientos y servicios
- **`/expenses`** - Control de gastos
- **`/insurance`** - Gestión de seguros
- **`/community`** - Foro y comunidad

## 🏗 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── dashboard/         # Panel de control
│   ├── login/             # Página de login
│   ├── register/          # Página de registro
│   ├── vehicles/          # Gestión de vehículos
│   ├── maintenance/       # Mantenimientos
│   ├── expenses/          # Gastos
│   ├── insurance/         # Seguros
│   ├── community/         # Comunidad/Foro
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout raíz
│   └── page.tsx           # Página de inicio
├── components/            # Componentes reutilizables
│   ├── Sidebar.tsx        # Barra lateral de navegación
│   ├── Header.tsx         # Cabecera
│   ├── DashboardStats.tsx # Estadísticas del dashboard
│   └── ...
├── lib/                   # Utilidades y configuraciones
├── types/                 # Definiciones de TypeScript
└── utils/                 # Funciones utilitarias
```

## 🎨 Personalización

### Colores del Tema

Los colores principales están definidos en `tailwind.config.js`:

- **Primario**: `#325f99` (azul principal)
- **Secundario**: `#eaedf1` (gris claro)
- **Fondo**: `#f9fafb` (gris muy claro)
- **Texto**: `#101418` (gris muy oscuro)

### Modo Oscuro

El modo oscuro se implementa usando la estrategia `class` de Tailwind CSS. Los colores para modo oscuro incluyen:

- **Fondo**: `#101a23` (azul muy oscuro)
- **Primario**: `#0b80ee` (azul brillante)
- **Cards**: `#182734` (azul oscuro)

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con coverage
npm run test:coverage
```

## 📦 Build y Deployment

```bash
# Build para producción
npm run build

# Previsualizar build de producción
npm run start
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda:

- 📧 Email: soporte@automanager.com
- 💬 Discord: [Auto Manager Community](https://discord.gg/automanager)
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/auto-manager/issues)

## 🗺 Roadmap

- [ ] Integración con APIs de concesionarios
- [ ] Exportación de reportes en PDF
- [ ] Aplicación móvil nativa
- [ ] Integración con sistemas de seguros
- [ ] Marketplace de repuestos
- [ ] Sistema de notificaciones push
- [ ] Integración con talleres locales

---

Desarrollado con ❤️ para la comunidad de propietarios de vehículos.
