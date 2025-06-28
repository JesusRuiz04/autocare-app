// Tipos para vehículos
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  vin: string;
  mileage: number;
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  status: 'active' | 'inactive' | 'maintenance';
  purchaseDate: string;
  purchasePrice: number;
  imageUrl?: string;
}

// Tipos para mantenimientos
export interface Maintenance {
  id: string;
  vehicleId: string;
  vehicleName: string;
  type: string;
  description: string;
  date: string;
  mileage: number;
  cost: number;
  provider: string;
  nextDue?: string;
  nextMileage?: number;
  status: 'completed' | 'pending' | 'overdue';
  notes?: string;
  invoiceUrl?: string;
}

// Tipos para gastos
export interface Expense {
  id: string;
  vehicleId: string;
  vehicleName: string;
  category: 'fuel' | 'maintenance' | 'insurance' | 'tolls' | 'parking' | 'other';
  description: string;
  amount: number;
  date: string;
  mileage?: number;
  location?: string;
  receiptUrl?: string;
  paymentMethod: 'cash' | 'card' | 'transfer';
}

// Tipos para seguros
export interface Insurance {
  id: string;
  vehicleId: string;
  vehicleName: string;
  company: string;
  policyNumber: string;
  type: string;
  premium: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled';
  coverage: string[];
  deductible?: number;
  contactInfo?: {
    phone: string;
    email: string;
    agent?: string;
  };
}

// Tipos para comunidad/foro
export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  date: string;
  category: string;
  likes: number;
  replies: number;
  tags: string[];
  isLiked: boolean;
  isPinned?: boolean;
  isClosed?: boolean;
}

export interface Reply {
  id: string;
  postId: string;
  content: string;
  author: string;
  avatar: string;
  date: string;
  likes: number;
  isLiked: boolean;
  isAnswer?: boolean;
}

// Tipos para usuario
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  vehicles: string[]; // IDs de vehículos
  preferences: {
    theme: 'light' | 'dark';
    notifications: {
      maintenance: boolean;
      insurance: boolean;
      community: boolean;
    };
    privacy: {
      showProfile: boolean;
      showVehicles: boolean;
    };
  };
}

// Tipos para estadísticas del dashboard
export interface DashboardStats {
  totalVehicles: number;
  totalExpenses: number;
  pendingMaintenance: number;
  insuranceAlerts: number;
  monthlyExpenses: number;
  yearlyExpenses: number;
  avgMonthlyExpenses: number;
  lastMaintenanceDate?: string;
}

// Tipos para notificaciones
export interface Notification {
  id: string;
  type: 'maintenance' | 'insurance' | 'expense' | 'community' | 'system';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  vehicleId?: string;
}

// Tipos para filtros y búsquedas
export interface FilterOptions {
  dateRange?: {
    start: string;
    end: string;
  };
  vehicleIds?: string[];
  categories?: string[];
  minAmount?: number;
  maxAmount?: number;
  status?: string[];
}

// Tipos para respuestas de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Tipos para formularios
export interface FormState {
  isLoading: boolean;
  errors: { [key: string]: string };
  isDirty: boolean;
}

// Tipos para configuración de la aplicación
export interface AppConfig {
  currency: string;
  distanceUnit: 'km' | 'miles';
  dateFormat: string;
  language: string;
  features: {
    community: boolean;
    reports: boolean;
    exports: boolean;
    notifications: boolean;
  };
}
