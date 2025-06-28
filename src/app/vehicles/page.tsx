'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  plate: string;
  mileage: number;
  status: string;
  color: string;
  vin: string;
  fuelType: string;
  purchaseDate: string;
  purchasePrice: number;
  lastService: string;
  nextService: string;
}

export default function VehiclesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    plate: '',
    color: '',
    vin: '',
    mileage: '',
    fuelType: 'gasoline',
    purchaseDate: '',
    purchasePrice: '',
    status: 'Excelente'
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 1,
      make: 'Toyota',
      model: 'Corolla',
      year: 2020,
      plate: 'ABC-123',
      mileage: 15234,
      status: 'Excelente',
      color: 'Blanco',
      vin: 'JT2AAAAA5B0123456',
      fuelType: 'gasoline',
      purchaseDate: '2020-03-15',
      purchasePrice: 18000,
      lastService: '2024-01-15',
      nextService: '2024-02-15'
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      plate: 'XYZ-789',
      mileage: 22456,
      status: 'Bueno',
      color: 'Azul',
      vin: 'JHMFA16208S123456',
      fuelType: 'gasoline',
      purchaseDate: '2019-06-20',
      purchasePrice: 16500,
      lastService: '2024-01-10',
      nextService: '2024-03-01'
    }
  ]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const name = localStorage.getItem('user_name');
    
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      setUserName(name || 'Usuario');
    }
  }, [router]);

  // Funciones para manejar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const vehicleData: Vehicle = {
      id: editingVehicle ? editingVehicle.id : Date.now(),
      make: formData.make,
      model: formData.model,
      year: parseInt(formData.year),
      plate: formData.plate,
      mileage: parseInt(formData.mileage),
      status: formData.status,
      color: formData.color,
      vin: formData.vin,
      fuelType: formData.fuelType,
      purchaseDate: formData.purchaseDate,
      purchasePrice: parseFloat(formData.purchasePrice),
      lastService: new Date().toISOString().split('T')[0],
      nextService: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 días
    };

    if (editingVehicle) {
      setVehicles(vehicles.map(v => v.id === editingVehicle.id ? vehicleData : v));
    } else {
      setVehicles([...vehicles, vehicleData]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      make: '',
      model: '',
      year: '',
      plate: '',
      color: '',
      vin: '',
      mileage: '',
      fuelType: 'gasoline',
      purchaseDate: '',
      purchasePrice: '',
      status: 'Excelente'
    });
    setEditingVehicle(null);
    setShowModal(false);
  };

  const editVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year.toString(),
      plate: vehicle.plate,
      color: vehicle.color,
      vin: vehicle.vin,
      mileage: vehicle.mileage.toString(),
      fuelType: vehicle.fuelType,
      purchaseDate: vehicle.purchaseDate,
      purchasePrice: vehicle.purchasePrice.toString(),
      status: vehicle.status
    });
    setShowModal(true);
  };

  const deleteVehicle = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este vehículo?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#325f99]"></div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excelente':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Bueno':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Regular':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Malo':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#101a23]">
      <Sidebar />
      <div className="ml-64">
        <Header userName={userName} />
        <main className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#101418] dark:text-white mb-2">
                Mis Vehículos
              </h1>
              <p className="text-[#5c708a] dark:text-[#90aecb]">
                Gestiona la información de todos tus vehículos
              </p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="btn-primary"
            >
              + Añadir Vehículo
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-12 bg-[#eaedf1] dark:bg-[#223649] rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#5c708a] dark:text-[#90aecb]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#101418] dark:text-white">
                        {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-[#5c708a] dark:text-[#90aecb]">
                        {vehicle.year} • {vehicle.color}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-[#5c708a] dark:text-[#90aecb] mb-1">Matrícula</p>
                    <p className="font-medium text-[#101418] dark:text-white">{vehicle.plate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#5c708a] dark:text-[#90aecb] mb-1">Kilometraje</p>
                    <p className="font-medium text-[#101418] dark:text-white">{vehicle.mileage.toLocaleString()} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#5c708a] dark:text-[#90aecb] mb-1">Último Servicio</p>
                    <p className="font-medium text-[#101418] dark:text-white">
                      {new Date(vehicle.lastService).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#5c708a] dark:text-[#90aecb] mb-1">Próximo Servicio</p>
                    <p className="font-medium text-[#101418] dark:text-white">
                      {new Date(vehicle.nextService).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => router.push(`/vehicles/${vehicle.id}`)}
                    className="flex-1 btn-primary text-sm"
                  >
                    Ver Detalles
                  </button>
                  <button 
                    onClick={() => editVehicle(vehicle)}
                    className="flex-1 btn-secondary text-sm"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => deleteVehicle(vehicle.id)}
                    className="px-3 py-2 text-[#5c708a] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {vehicles.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-[#eaedf1] dark:bg-[#223649] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-[#5c708a] dark:text-[#90aecb]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#101418] dark:text-white mb-2">
                No tienes vehículos registrados
              </h3>
              <p className="text-[#5c708a] dark:text-[#90aecb] mb-4">
                Añade tu primer vehículo para comenzar a gestionar su mantenimiento
              </p>
              <button 
                onClick={() => setShowModal(true)}
                className="btn-primary"
              >
                Añadir Mi Primer Vehículo
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Modal del formulario */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-[#182734]">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {editingVehicle ? 'Editar Vehículo' : 'Nuevo Vehículo'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Marca
                    </label>
                    <input
                      type="text"
                      value={formData.make}
                      onChange={(e) => setFormData({...formData, make: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Modelo
                    </label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Año
                    </label>
                    <input
                      type="number"
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Matrícula
                    </label>
                    <input
                      type="text"
                      value={formData.plate}
                      onChange={(e) => setFormData({...formData, plate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Color
                    </label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      VIN
                    </label>
                    <input
                      type="text"
                      value={formData.vin}
                      onChange={(e) => setFormData({...formData, vin: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Kilometraje
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.mileage}
                      onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tipo de Combustible
                    </label>
                    <select
                      value={formData.fuelType}
                      onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="gasoline">Gasolina</option>
                      <option value="diesel">Diésel</option>
                      <option value="electric">Eléctrico</option>
                      <option value="hybrid">Híbrido</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fecha de Compra
                    </label>
                    <input
                      type="date"
                      value={formData.purchaseDate}
                      onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Precio de Compra (€)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.purchasePrice}
                      onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    {editingVehicle ? 'Actualizar' : 'Crear'} Vehículo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
