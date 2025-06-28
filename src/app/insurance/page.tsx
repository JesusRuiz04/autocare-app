'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface Insurance {
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
}

export default function InsurancePage() {
  const [insurances, setInsurances] = useState<Insurance[]>([
    {
      id: '1',
      vehicleId: '1',
      vehicleName: 'Honda Civic 2020',
      company: 'Mapfre',
      policyNumber: 'POL-2024-001',
      type: 'Todo Riesgo',
      premium: 1200,
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      status: 'active',
      coverage: ['Daños propios', 'Responsabilidad civil', 'Robo', 'Cristales']
    },
    {
      id: '2',
      vehicleId: '2',
      vehicleName: 'Toyota Corolla 2019',
      company: 'Allianz',
      policyNumber: 'POL-2024-002',
      type: 'Terceros Ampliado',
      premium: 800,
      startDate: '2024-03-01',
      endDate: '2025-03-01',
      status: 'active',
      coverage: ['Responsabilidad civil', 'Robo', 'Incendio']
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState<Insurance | null>(null);
  const [formData, setFormData] = useState({
    vehicleId: '',
    vehicleName: '',
    company: '',
    policyNumber: '',
    type: '',
    premium: '',
    startDate: '',
    endDate: '',
    coverage: [] as string[]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilExpiry = (endDate: string) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newInsurance: Insurance = {
      id: Date.now().toString(),
      vehicleId: formData.vehicleId,
      vehicleName: formData.vehicleName,
      company: formData.company,
      policyNumber: formData.policyNumber,
      type: formData.type,
      premium: parseFloat(formData.premium),
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: 'active',
      coverage: formData.coverage
    };

    if (selectedInsurance) {
      setInsurances(insurances.map(ins => 
        ins.id === selectedInsurance.id ? { ...newInsurance, id: selectedInsurance.id } : ins
      ));
    } else {
      setInsurances([...insurances, newInsurance]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      vehicleId: '',
      vehicleName: '',
      company: '',
      policyNumber: '',
      type: '',
      premium: '',
      startDate: '',
      endDate: '',
      coverage: []
    });
    setSelectedInsurance(null);
    setShowForm(false);
  };

  const editInsurance = (insurance: Insurance) => {
    setSelectedInsurance(insurance);
    setFormData({
      vehicleId: insurance.vehicleId,
      vehicleName: insurance.vehicleName,
      company: insurance.company,
      policyNumber: insurance.policyNumber,
      type: insurance.type,
      premium: insurance.premium.toString(),
      startDate: insurance.startDate,
      endDate: insurance.endDate,
      coverage: insurance.coverage
    });
    setShowForm(true);
  };

  const deleteInsurance = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta póliza?')) {
      setInsurances(insurances.filter(ins => ins.id !== id));
    }
  };

  const coverageOptions = [
    'Responsabilidad civil',
    'Daños propios',
    'Robo',
    'Incendio',
    'Cristales',
    'Fenómenos naturales',
    'Asistencia en carretera',
    'Conductor elegido'
  ];

  const handleCoverageChange = (coverage: string) => {
    setFormData(prev => ({
      ...prev,
      coverage: prev.coverage.includes(coverage)
        ? prev.coverage.filter(c => c !== coverage)
        : [...prev.coverage, coverage]
    }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Usuario" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Seguros</h1>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Nueva Póliza
              </button>
            </div>

            {/* Alertas de vencimiento */}
            <div className="mb-6">
              {insurances.filter(ins => {
                const daysUntilExpiry = getDaysUntilExpiry(ins.endDate);
                return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
              }).length > 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Pólizas próximas a vencer
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        {insurances.filter(ins => {
                          const daysUntilExpiry = getDaysUntilExpiry(ins.endDate);
                          return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
                        }).map(ins => (
                          <p key={ins.id}>
                            {ins.vehicleName} - {ins.company} (vence en {getDaysUntilExpiry(ins.endDate)} días)
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Lista de seguros */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vehículo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Compañía
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prima Anual
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vencimiento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {insurances.map((insurance) => (
                      <tr key={insurance.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {insurance.vehicleName}
                          </div>
                          <div className="text-sm text-gray-500">
                            Póliza: {insurance.policyNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {insurance.company}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {insurance.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          €{insurance.premium.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(insurance.endDate).toLocaleDateString()}
                          <div className="text-xs text-gray-500">
                            {getDaysUntilExpiry(insurance.endDate) > 0 
                              ? `${getDaysUntilExpiry(insurance.endDate)} días restantes`
                              : 'Vencida'
                            }
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(insurance.status)}`}>
                            {insurance.status === 'active' ? 'Activa' : 
                             insurance.status === 'expired' ? 'Vencida' : 'Cancelada'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => editInsurance(insurance)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => deleteInsurance(insurance.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal del formulario */}
            {showForm && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                  <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {selectedInsurance ? 'Editar Póliza' : 'Nueva Póliza de Seguro'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Vehículo
                          </label>
                          <input
                            type="text"
                            value={formData.vehicleName}
                            onChange={(e) => setFormData({...formData, vehicleName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Compañía
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Número de Póliza
                          </label>
                          <input
                            type="text"
                            value={formData.policyNumber}
                            onChange={(e) => setFormData({...formData, policyNumber: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de Seguro
                          </label>
                          <select
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="">Seleccionar tipo</option>
                            <option value="Terceros">Terceros</option>
                            <option value="Terceros Ampliado">Terceros Ampliado</option>
                            <option value="Todo Riesgo">Todo Riesgo</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Prima Anual (€)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={formData.premium}
                            onChange={(e) => setFormData({...formData, premium: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Inicio
                          </label>
                          <input
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Vencimiento
                          </label>
                          <input
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Coberturas
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {coverageOptions.map((coverage) => (
                            <label key={coverage} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={formData.coverage.includes(coverage)}
                                onChange={() => handleCoverageChange(coverage)}
                                className="mr-2"
                              />
                              <span className="text-sm">{coverage}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                          {selectedInsurance ? 'Actualizar' : 'Crear'} Póliza
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
