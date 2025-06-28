// Utilidades para formateo de fechas
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  });
};

export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Hace menos de 1 hora';
  if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `Hace ${diffInWeeks} semana${diffInWeeks > 1 ? 's' : ''}`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `Hace ${diffInMonths} mes${diffInMonths > 1 ? 'es' : ''}`;
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `Hace ${diffInYears} año${diffInYears > 1 ? 's' : ''}`;
};

export const getDaysUntil = (dateString: string): number => {
  const targetDate = new Date(dateString);
  const now = new Date();
  const diffTime = targetDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Utilidades para formateo de números y moneda
export const formatCurrency = (amount: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('es-ES').format(number);
};

export const formatMileage = (mileage: number, unit: 'km' | 'miles' = 'km'): string => {
  return `${formatNumber(mileage)} ${unit}`;
};

// Utilidades para validación
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidLicensePlate = (plate: string): boolean => {
  // Formato español: 1234-ABC o 1234 ABC
  const plateRegex = /^\d{4}[-\s]?[A-Z]{3}$/i;
  return plateRegex.test(plate);
};

export const isValidVIN = (vin: string): boolean => {
  // VIN básico: 17 caracteres alfanuméricos
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
  return vinRegex.test(vin);
};

// Utilidades para colores y estilos
export const getStatusColor = (status: string): string => {
  const colors: { [key: string]: string } = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    overdue: 'bg-red-100 text-red-800',
    expired: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getCategoryColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    fuel: 'bg-blue-100 text-blue-800',
    maintenance: 'bg-green-100 text-green-800',
    insurance: 'bg-purple-100 text-purple-800',
    tolls: 'bg-yellow-100 text-yellow-800',
    parking: 'bg-indigo-100 text-indigo-800',
    other: 'bg-gray-100 text-gray-800',
    'Mantenimiento': 'bg-blue-100 text-blue-800',
    'Seguros': 'bg-green-100 text-green-800',
    'Viajes': 'bg-purple-100 text-purple-800',
    'Compra/Venta': 'bg-yellow-100 text-yellow-800',
    'Modificaciones': 'bg-red-100 text-red-800',
    'General': 'bg-gray-100 text-gray-800'
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

// Utilidades para almacenamiento local
export const setLocalStorage = (key: string, value: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const removeLocalStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

// Utilidades para cálculos
export const calculateAge = (year: number): number => {
  return new Date().getFullYear() - year;
};

export const calculateAverageConsumption = (totalFuel: number, totalDistance: number): number => {
  if (totalDistance === 0) return 0;
  return totalFuel / totalDistance * 100; // L/100km
};

export const calculateMaintenanceInterval = (lastMileage: number, currentMileage: number, intervalKm: number): boolean => {
  return (currentMileage - lastMileage) >= intervalKm;
};

// Utilidades para archivos
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

export const isImageFile = (filename: string): boolean => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  return imageExtensions.includes(getFileExtension(filename));
};

export const isPDFFile = (filename: string): boolean => {
  return getFileExtension(filename) === 'pdf';
};

// Utilidades para URLs
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
    .trim()
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-'); // Eliminar guiones múltiples
};

// Utilidades para búsqueda y filtrado
export const filterBySearchTerm = <T>(items: T[], searchTerm: string, searchFields: (keyof T)[]): T[] => {
  if (!searchTerm.trim()) return items;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return items.filter(item =>
    searchFields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerSearchTerm);
      }
      if (typeof value === 'number') {
        return value.toString().includes(lowerSearchTerm);
      }
      return false;
    })
  );
};

export const sortByField = <T>(items: T[], field: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
  return [...items].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

// Utilidades para exportación de datos
export const downloadAsJSON = (data: any, filename: string): void => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadAsCSV = (data: any[], filename: string): void => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Utilidades para notificaciones
export const generateNotificationId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const shouldShowMaintenanceReminder = (lastDate: string, intervalDays: number): boolean => {
  const lastMaintenanceDate = new Date(lastDate);
  const now = new Date();
  const daysSinceLastMaintenance = Math.floor((now.getTime() - lastMaintenanceDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return daysSinceLastMaintenance >= intervalDays;
};

export const shouldShowInsuranceAlert = (expiryDate: string, alertDaysBefore: number = 30): boolean => {
  const expiry = new Date(expiryDate);
  const now = new Date();
  const daysUntilExpiry = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  return daysUntilExpiry <= alertDaysBefore && daysUntilExpiry > 0;
};
