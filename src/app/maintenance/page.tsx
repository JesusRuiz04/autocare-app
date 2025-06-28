'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function MaintenancePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showModal, setShowModal] = useState(false);
  const [editingMaintenance, setEditingMaintenance] = useState<any>(null);
  const [formData, setFormData] = useState({
    vehicle: '',
    type: '',
    dueDate: '',
    mileage: '',
    priority: 'medium',
    description: '',
    cost: '',
    shop: ''
  });

  const router = useRouter();

  const [upcomingMaintenance, setUpcomingMaintenance] = useState([
    {
      id: 1,
      vehicle: 'Toyota Corolla 2020',
      type: 'Cambio de Aceite',
      dueDate: '2024-02-15',
      mileage: 15000,
      priority: 'high',
      description: 'Cambio de aceite y filtro cada 10,000 km'
    },
    {
      id: 2,
      vehicle: 'Honda Civic 2019',
      type: 'Revisión ITV',
      dueDate: '2024-03-01',
      mileage: 22000,
      priority: 'medium',
      description: 'Inspección técnica vehicular obligatoria'
    },
    {
      id: 3,
      vehicle: 'Toyota Corolla 2020',
      type: 'Cambio de Neumáticos',
      dueDate: '2024-04-20',
      mileage: 18000,
      priority: 'low',
      description: 'Revisión del estado de los neumáticos'
    }
  ]);

  const [maintenanceHistory, setMaintenanceHistory] = useState([
    {
      id: 1,
      vehicle: 'Toyota Corolla 2020',
      type: 'Cambio de Aceite',
      date: '2024-01-15',
      cost: 45.50,
      mileage: 14500,
      shop: 'Taller AutoService'
    },
    {
      id: 2,
      vehicle: 'Honda Civic 2019',
      type: 'Cambio de Pastillas de Freno',
      date: '2024-01-10',
      cost: 85.20,
      mileage: 21500,
      shop: 'Frenos Rápidos'
    },
    {
      id: 3,
      vehicle: 'Toyota Corolla 2020',
      type: 'Alineación y Balanceo',
      date: '2023-12-20',
      cost: 35.00,
      mileage: 14000,
      shop: 'Neumáticos García'
    }
  ]);

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
    
    const maintenanceData = {
      id: editingMaintenance ? editingMaintenance.id : Date.now(),
      vehicle: formData.vehicle,
      type: formData.type,
      dueDate: formData.dueDate,
      mileage: parseInt(formData.mileage),
      priority: formData.priority,
      description: formData.description,
      cost: formData.cost ? parseFloat(formData.cost) : 0,
      shop: formData.shop
    };

    if (editingMaintenance) {
      if (activeTab === 'upcoming') {
        setUpcomingMaintenance(upcomingMaintenance.map(m => 
          m.id === editingMaintenance.id ? maintenanceData : m
        ));
      } else {
        setMaintenanceHistory(maintenanceHistory.map(m => 
          m.id === editingMaintenance.id ? { 
            ...maintenanceData, 
            date: maintenanceData.dueDate,
            cost: maintenanceData.cost
          } : m
        ));
      }
    } else {
      if (activeTab === 'upcoming') {
        setUpcomingMaintenance([...upcomingMaintenance, maintenanceData]);
      } else {
        setMaintenanceHistory([...maintenanceHistory, { 
          id: maintenanceData.id,
          vehicle: maintenanceData.vehicle,
          type: maintenanceData.type,
          date: maintenanceData.dueDate,
          cost: maintenanceData.cost,
          mileage: maintenanceData.mileage,
          shop: maintenanceData.shop
        }]);
      }
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      vehicle: '',
      type: '',
      dueDate: '',
      mileage: '',
      priority: 'medium',
      description: '',
      cost: '',
      shop: ''
    });
    setEditingMaintenance(null);
    setShowModal(false);
  };

  const editMaintenance = (maintenance: any) => {
    setEditingMaintenance(maintenance);
    setFormData({
      vehicle: maintenance.vehicle,
      type: maintenance.type,
      dueDate: maintenance.dueDate || maintenance.date,
      mileage: maintenance.mileage?.toString() || '',
      priority: maintenance.priority || 'medium',
      description: maintenance.description || '',
      cost: maintenance.cost?.toString() || '',
      shop: maintenance.shop || ''
    });
    setShowModal(true);
  };

  const deleteMaintenance = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este mantenimiento?')) {
      if (activeTab === 'upcoming') {
        setUpcomingMaintenance(upcomingMaintenance.filter(m => m.id !== id));
      } else {
        setMaintenanceHistory(maintenanceHistory.filter(m => m.id !== id));
      }
    }
  };

  const markAsCompleted = (maintenance: any) => {
    // Mover de próximos a historial
    setUpcomingMaintenance(upcomingMaintenance.filter(m => m.id !== maintenance.id));
    setMaintenanceHistory([...maintenanceHistory, {
      id: maintenance.id,
      vehicle: maintenance.vehicle,
      type: maintenance.type,
      date: new Date().toISOString().split('T')[0],
      cost: 0, // Puedes permitir al usuario ingresar el costo real
      mileage: maintenance.mileage,
      shop: 'Taller Local' // Default
    }]);
  };

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

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Urgente';
      case 'medium':
        return 'Moderado';
      case 'low':
        return 'Programado';
      default:
        return 'Normal';
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
                Mantenimientos
              </h1>
              <p className="text-[#5c708a] dark:text-[#90aecb]">
                Gestiona y programa el mantenimiento de tus vehículos
              </p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="btn-primary"
            >
              + Nuevo Mantenimiento
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#d4dae2] dark:border-[#314d68] mb-6">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'upcoming'
                  ? 'border-[#325f99] text-[#325f99] dark:border-[#0b80ee] dark:text-[#0b80ee]'
                  : 'border-transparent text-[#5c708a] hover:text-[#101418] dark:text-[#90aecb] dark:hover:text-white'
              }`}
            >
              Próximos Mantenimientos
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-[#325f99] text-[#325f99] dark:border-[#0b80ee] dark:text-[#0b80ee]'
                  : 'border-transparent text-[#5c708a] hover:text-[#101418] dark:text-[#90aecb] dark:hover:text-white'
              }`}
            >
              Historial
            </button>
          </div>

          {/* Upcoming Maintenance */}
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {upcomingMaintenance.map((item) => (
                <div key={item.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#eaedf1] dark:bg-[#223649] rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#5c708a] dark:text-[#90aecb]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#101418] dark:text-white">
                          {item.type}
                        </h3>
                        <p className="text-sm text-[#5c708a] dark:text-[#90aecb]">
                          {item.vehicle} • {item.mileage.toLocaleString()} km
                        </p>
                        <p className="text-sm text-[#5c708a] dark:text-[#90aecb] mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-[#5c708a] dark:text-[#90aecb]">Vence el</p>
                        <p className="font-medium text-[#101418] dark:text-white">
                          {new Date(item.dueDate).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(item.priority)}`}>
                        {getPriorityText(item.priority)}
                      </span>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => markAsCompleted(item)}
                          className="btn-primary text-sm"
                        >
                          Marcar Completado
                        </button>
                        <button 
                          onClick={() => editMaintenance(item)}
                          className="btn-secondary text-sm"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => deleteMaintenance(item.id)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Maintenance History */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {maintenanceHistory.map((item) => (
                <div key={item.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#101418] dark:text-white">
                          {item.type}
                        </h3>
                        <p className="text-sm text-[#5c708a] dark:text-[#90aecb]">
                          {item.vehicle} • {item.mileage.toLocaleString()} km
                        </p>
                        <p className="text-sm text-[#5c708a] dark:text-[#90aecb] mt-1">
                          {item.shop}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-[#5c708a] dark:text-[#90aecb]">Realizado el</p>
                        <p className="font-medium text-[#101418] dark:text-white">
                          {new Date(item.date).toLocaleDateString('es-ES')}
                        </p>
                        <p className="font-semibold text-green-600 dark:text-green-400">
                          €{item.cost.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => editMaintenance(item)}
                          className="btn-secondary text-sm"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => deleteMaintenance(item.id)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                {editingMaintenance ? 'Editar Mantenimiento' : 'Nuevo Mantenimiento'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Vehículo
                    </label>
                    <select
                      value={formData.vehicle}
                      onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="">Seleccionar vehículo</option>
                      <option value="Toyota Corolla 2020">Toyota Corolla 2020</option>
                      <option value="Honda Civic 2019">Honda Civic 2019</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tipo de Mantenimiento
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="">Seleccionar tipo</option>
                      <option value="Cambio de Aceite">Cambio de Aceite</option>
                      <option value="Revisión ITV">Revisión ITV</option>
                      <option value="Cambio de Neumáticos">Cambio de Neumáticos</option>
                      <option value="Cambio de Frenos">Cambio de Frenos</option>
                      <option value="Revisión General">Revisión General</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fecha Programada
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      required
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
                      Prioridad
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Taller
                    </label>
                    <input
                      type="text"
                      value={formData.shop}
                      onChange={(e) => setFormData({...formData, shop: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Nombre del taller"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Costo Estimado (€)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.cost}
                      onChange={(e) => setFormData({...formData, cost: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Detalles del mantenimiento..."
                  />
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
                    {editingMaintenance ? 'Actualizar' : 'Crear'} Mantenimiento
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
