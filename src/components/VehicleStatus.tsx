'use client';

import { useRouter } from 'next/navigation';

export default function VehicleStatus() {
  const router = useRouter();
  const vehicles = [
    {
      id: 1,
      name: 'Toyota Corolla 2020',
      status: 'Excelente',
      mileage: '15,234 km',
      lastService: '2024-01-15',
      nextService: '2024-02-15',
      statusColor: 'text-green-600 dark:text-green-400',
      image: '/api/placeholder/200/150'
    },
    {
      id: 2,
      name: 'Honda Civic 2019',
      status: 'Bueno',
      mileage: '22,456 km',
      lastService: '2024-01-10',
      nextService: '2024-03-01',
      statusColor: 'text-yellow-600 dark:text-yellow-400',
      image: '/api/placeholder/200/150'
    }
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#101418] dark:text-white">
          Estado de Vehículos
        </h3>
        <button 
          onClick={() => router.push('/vehicles')}
          className="btn-secondary text-sm"
        >
          Gestionar
        </button>
      </div>

      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="border border-[#d4dae2] dark:border-[#314d68] rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-[#223649] transition-colors">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-12 bg-[#eaedf1] dark:bg-[#223649] rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-[#5c708a] dark:text-[#90aecb]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-[#101418] dark:text-white mb-1">
                  {vehicle.name}
                </h4>
                <p className={`text-sm font-medium mb-2 ${vehicle.statusColor}`}>
                  Estado: {vehicle.status}
                </p>
                <div className="space-y-1 text-xs text-[#5c708a] dark:text-[#90aecb]">
                  <p>Kilometraje: {vehicle.mileage}</p>
                  <p>Último servicio: {new Date(vehicle.lastService).toLocaleDateString('es-ES')}</p>
                  <p>Próximo servicio: {new Date(vehicle.nextService).toLocaleDateString('es-ES')}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-[#d4dae2] dark:border-[#314d68]">
        <button className="w-full btn-primary">
          + Añadir Vehículo
        </button>
      </div>
    </div>
  );
}
