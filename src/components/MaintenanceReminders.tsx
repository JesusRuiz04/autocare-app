'use client';

import { useRouter } from 'next/navigation';

export default function MaintenanceReminders() {
  const router = useRouter();

  const maintenanceItems = [
    {
      id: 1,
      vehicle: 'Toyota Corolla 2020',
      type: 'Cambio de Aceite',
      dueDate: '2024-02-15',
      priority: 'high',
      mileage: '15,000 km',
      status: 'Vence pronto'
    },
    {
      id: 2,
      vehicle: 'Honda Civic 2019',
      type: 'Revisión General',
      dueDate: '2024-03-01',
      priority: 'medium',
      mileage: '22,000 km',
      status: 'Programado'
    },
    {
      id: 3,
      vehicle: 'Toyota Corolla 2020',
      type: 'Cambio de Neumáticos',
      dueDate: '2024-03-20',
      priority: 'low',
      mileage: '18,000 km',
      status: 'Pendiente'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#101418] dark:text-white">
          Recordatorios de Mantenimiento
        </h3>
        <button 
          onClick={() => router.push('/maintenance')}
          className="btn-primary text-sm"
        >
          Ver Todos
        </button>
      </div>

      <div className="space-y-4">
        {maintenanceItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 border border-[#d4dae2] dark:border-[#314d68] rounded-xl hover:bg-gray-50 dark:hover:bg-[#223649] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-[#325f99] dark:bg-[#0b80ee] rounded-full"></div>
              <div>
                <h4 className="font-medium text-[#101418] dark:text-white">
                  {item.type}
                </h4>
                <p className="text-sm text-[#5c708a] dark:text-[#90aecb]">
                  {item.vehicle} • {item.mileage}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                {item.status}
              </span>
              <span className="text-sm text-[#5c708a] dark:text-[#90aecb]">
                {new Date(item.dueDate).toLocaleDateString('es-ES')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
