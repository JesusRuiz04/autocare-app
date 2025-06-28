// Configuración general de la aplicación
export const APP_CONFIG = {
  name: 'AutoCare Manager',
  version: '1.0.0',
  description: 'Gestión integral de vehículos y mantenimiento',
  defaultCurrency: 'EUR',
  defaultDistanceUnit: 'km' as const,
  defaultLanguage: 'es',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  supportedImageFormats: ['jpg', 'jpeg', 'png', 'webp'],
  supportedDocumentFormats: ['pdf', 'doc', 'docx'],
};

// Tipos de combustible
export const FUEL_TYPES = [
  { value: 'gasoline', label: 'Gasolina' },
  { value: 'diesel', label: 'Diésel' },
  { value: 'electric', label: 'Eléctrico' },
  { value: 'hybrid', label: 'Híbrido' },
] as const;

// Categorías de gastos
export const EXPENSE_CATEGORIES = [
  { value: 'fuel', label: 'Combustible', icon: '⛽' },
  { value: 'maintenance', label: 'Mantenimiento', icon: '🔧' },
  { value: 'insurance', label: 'Seguro', icon: '🛡️' },
  { value: 'tolls', label: 'Peajes', icon: '🛣️' },
  { value: 'parking', label: 'Aparcamiento', icon: '🅿️' },
  { value: 'other', label: 'Otros', icon: '📋' },
] as const;

// Tipos de mantenimiento
export const MAINTENANCE_TYPES = [
  { value: 'oil_change', label: 'Cambio de aceite', interval: 15000 },
  { value: 'brake_pads', label: 'Pastillas de freno', interval: 40000 },
  { value: 'tire_rotation', label: 'Rotación de neumáticos', interval: 10000 },
  { value: 'air_filter', label: 'Filtro de aire', interval: 20000 },
  { value: 'spark_plugs', label: 'Bujías', interval: 30000 },
  { value: 'timing_belt', label: 'Correa de distribución', interval: 100000 },
  { value: 'coolant', label: 'Refrigerante', interval: 60000 },
  { value: 'transmission', label: 'Transmisión', interval: 80000 },
  { value: 'inspection', label: 'ITV', interval: 0 }, // Anual
  { value: 'other', label: 'Otro', interval: 0 },
] as const;

// Estados de vehículos
export const VEHICLE_STATUS = [
  { value: 'active', label: 'Activo', color: 'green' },
  { value: 'inactive', label: 'Inactivo', color: 'gray' },
  { value: 'maintenance', label: 'En mantenimiento', color: 'yellow' },
] as const;

// Estados de mantenimiento
export const MAINTENANCE_STATUS = [
  { value: 'completed', label: 'Completado', color: 'green' },
  { value: 'pending', label: 'Pendiente', color: 'yellow' },
  { value: 'overdue', label: 'Atrasado', color: 'red' },
] as const;

// Estados de seguro
export const INSURANCE_STATUS = [
  { value: 'active', label: 'Activa', color: 'green' },
  { value: 'expired', label: 'Vencida', color: 'red' },
  { value: 'cancelled', label: 'Cancelada', color: 'gray' },
] as const;

// Tipos de seguro
export const INSURANCE_TYPES = [
  { value: 'third_party', label: 'Terceros' },
  { value: 'third_party_extended', label: 'Terceros Ampliado' },
  { value: 'comprehensive', label: 'Todo Riesgo' },
] as const;

// Coberturas de seguro
export const INSURANCE_COVERAGES = [
  { value: 'liability', label: 'Responsabilidad civil' },
  { value: 'collision', label: 'Daños propios' },
  { value: 'theft', label: 'Robo' },
  { value: 'fire', label: 'Incendio' },
  { value: 'glass', label: 'Cristales' },
  { value: 'natural_disasters', label: 'Fenómenos naturales' },
  { value: 'roadside_assistance', label: 'Asistencia en carretera' },
  { value: 'driver_coverage', label: 'Conductor elegido' },
] as const;

// Categorías del foro
export const FORUM_CATEGORIES = [
  { value: 'maintenance', label: 'Mantenimiento', color: 'blue' },
  { value: 'insurance', label: 'Seguros', color: 'green' },
  { value: 'travel', label: 'Viajes', color: 'purple' },
  { value: 'buy_sell', label: 'Compra/Venta', color: 'yellow' },
  { value: 'modifications', label: 'Modificaciones', color: 'red' },
  { value: 'general', label: 'General', color: 'gray' },
] as const;

// Métodos de pago
export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Efectivo', icon: '💵' },
  { value: 'card', label: 'Tarjeta', icon: '💳' },
  { value: 'transfer', label: 'Transferencia', icon: '🏦' },
] as const;

// Marcas de vehículos más comunes
export const VEHICLE_BRANDS = [
  'Audi', 'BMW', 'Citroën', 'Fiat', 'Ford', 'Honda', 'Hyundai',
  'Kia', 'Mazda', 'Mercedes-Benz', 'Nissan', 'Opel', 'Peugeot',
  'Renault', 'SEAT', 'Škoda', 'Toyota', 'Volkswagen', 'Volvo'
] as const;

// Colores de vehículos
export const VEHICLE_COLORS = [
  'Blanco', 'Negro', 'Gris', 'Plata', 'Azul', 'Rojo', 'Verde',
  'Amarillo', 'Naranja', 'Morado', 'Marrón', 'Dorado', 'Otro'
] as const;

// Configuración de notificaciones
export const NOTIFICATION_CONFIG = {
  maintenance: {
    defaultIntervalDays: 30,
    urgentThresholdDays: 7,
  },
  insurance: {
    defaultAlertDaysBefore: 30,
    urgentThresholdDays: 7,
  },
  expenses: {
    monthlyBudgetAlert: true,
    unusualExpenseThreshold: 500,
  },
} as const;

// Límites de la aplicación
export const LIMITS = {
  maxVehicles: 10,
  maxMaintenanceRecords: 1000,
  maxExpenseRecords: 5000,
  maxInsurancePolicies: 20,
  maxForumPosts: 100,
  maxFileUploads: 50,
} as const;

// Configuración de charts/gráficos
export const CHART_COLORS = {
  primary: '#325f99',
  secondary: '#0b80ee',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  light: '#f3f4f6',
  dark: '#374151',
} as const;

// Formato de fechas
export const DATE_FORMATS = {
  short: 'dd/MM/yyyy',
  long: 'dd MMMM yyyy',
  dateTime: 'dd/MM/yyyy HH:mm',
  iso: 'yyyy-MM-dd',
} as const;

// URLs y endpoints (para futuro uso con API)
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
  },
  vehicles: {
    list: '/api/vehicles',
    create: '/api/vehicles',
    update: '/api/vehicles/:id',
    delete: '/api/vehicles/:id',
    upload: '/api/vehicles/:id/upload',
  },
  maintenance: {
    list: '/api/maintenance',
    create: '/api/maintenance',
    update: '/api/maintenance/:id',
    delete: '/api/maintenance/:id',
  },
  expenses: {
    list: '/api/expenses',
    create: '/api/expenses',
    update: '/api/expenses/:id',
    delete: '/api/expenses/:id',
    stats: '/api/expenses/stats',
  },
  insurance: {
    list: '/api/insurance',
    create: '/api/insurance',
    update: '/api/insurance/:id',
    delete: '/api/insurance/:id',
  },
  forum: {
    posts: '/api/forum/posts',
    replies: '/api/forum/replies',
    like: '/api/forum/like',
  },
  notifications: {
    list: '/api/notifications',
    markRead: '/api/notifications/:id/read',
    settings: '/api/notifications/settings',
  },
} as const;

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  required: 'Este campo es obligatorio',
  invalidEmail: 'Formato de email inválido',
  invalidLicensePlate: 'Formato de matrícula inválido',
  invalidVIN: 'Formato de VIN inválido',
  invalidDate: 'Fecha inválida',
  invalidNumber: 'Número inválido',
  minLength: 'Mínimo {min} caracteres',
  maxLength: 'Máximo {max} caracteres',
  fileTooBig: 'El archivo es demasiado grande',
  invalidFileType: 'Tipo de archivo no válido',
  networkError: 'Error de conexión',
  serverError: 'Error del servidor',
  unauthorized: 'No autorizado',
  notFound: 'No encontrado',
} as const;

// Textos de la interfaz
export const UI_TEXTS = {
  common: {
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    create: 'Crear',
    update: 'Actualizar',
    search: 'Buscar',
    filter: 'Filtrar',
    sort: 'Ordenar',
    export: 'Exportar',
    import: 'Importar',
    loading: 'Cargando...',
    noData: 'No hay datos disponibles',
    confirmDelete: '¿Estás seguro de que quieres eliminar?',
  },
  navigation: {
    dashboard: 'Panel de Control',
    vehicles: 'Mis Vehículos',
    maintenance: 'Mantenimientos',
    expenses: 'Gastos',
    insurance: 'Seguros',
    community: 'Comunidad',
    profile: 'Perfil',
    settings: 'Configuración',
  },
  forms: {
    addVehicle: 'Añadir Vehículo',
    editVehicle: 'Editar Vehículo',
    addMaintenance: 'Nuevo Mantenimiento',
    addExpense: 'Nuevo Gasto',
    addInsurance: 'Nueva Póliza',
    newPost: 'Nueva Publicación',
  },
} as const;
