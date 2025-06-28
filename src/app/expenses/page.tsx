'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function ExpensesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [timeFrame, setTimeFrame] = useState('monthly');
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any>(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
    vehicle: '',
    shop: '',
    paymentMethod: 'card'
  });

  const router = useRouter();

  const handleAddExpense = () => {
    setEditingExpense(null);
    setFormData({
      description: '',
      amount: '',
      date: '',
      category: '',
      vehicle: '',
      shop: '',
      paymentMethod: 'card'
    });
    setShowModal(true);
  };

  const handleEditExpense = (expense: any) => {
    setEditingExpense(expense);
    setFormData({
      description: expense.description,
      amount: expense.amount.toString(),
      date: expense.date,
      category: expense.category,
      vehicle: expense.vehicle,
      shop: expense.shop,
      paymentMethod: expense.paymentMethod || 'card'
    });
    setShowModal(true);
  };

  const handleDeleteExpense = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este gasto?')) {
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount || !formData.date || !formData.category) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }

    if (editingExpense) {
      // Editar gasto existente
      setExpenses(expenses.map(expense => 
        expense.id === editingExpense.id 
          ? { 
              ...expense, 
              description: formData.description,
              amount: parseFloat(formData.amount),
              date: formData.date,
              category: formData.category,
              vehicle: formData.vehicle,
              shop: formData.shop,
              paymentMethod: formData.paymentMethod
            }
          : expense
      ));
    } else {
      // Añadir nuevo gasto
      const newExpense = {
        id: Math.max(...expenses.map(e => e.id), 0) + 1,
        description: formData.description,
        amount: parseFloat(formData.amount),
        date: formData.date,
        category: formData.category,
        vehicle: formData.vehicle,
        shop: formData.shop,
        paymentMethod: formData.paymentMethod
      };
      setExpenses([newExpense, ...expenses]);
    }

    setShowModal(false);
    setEditingExpense(null);
  };

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: 'Cambio de aceite y filtro',
      amount: 45.50,
      date: '2024-01-28',
      category: 'Mantenimiento',
      vehicle: 'Toyota Corolla',
      shop: 'Taller AutoService'
    },
    {
      id: 2,
      description: 'Gasolina',
      amount: 65.20,
      date: '2024-01-26',
      category: 'Combustible',
      vehicle: 'Toyota Corolla',
      shop: 'Estación Shell'
    },
    {
      id: 3,
      description: 'Lavado completo',
      amount: 12.00,
      date: '2024-01-25',
      category: 'Limpieza',
      vehicle: 'Honda Civic',
      shop: 'Lavadero Express'
    },
    {
      id: 4,
      description: 'Revisión técnica ITV',
      amount: 35.00,
      date: '2024-01-22',
      category: 'Inspección',
      vehicle: 'Honda Civic',
      shop: 'Centro ITV'
    },
    {
      id: 3,
      description: 'Lavado completo',
      amount: 12.00,
      date: '2024-01-25',
      category: 'Limpieza',
      vehicle: 'Honda Civic',
      shop: 'Lavadero Express',
      paymentMethod: 'cash'
    },
    {
      id: 4,
      description: 'Revisión técnica ITV',
      amount: 35.00,
      date: '2024-01-22',
      category: 'Inspección',
      vehicle: 'Honda Civic',
      shop: 'Centro ITV',
      paymentMethod: 'card'
    },
    {
      id: 5,
      description: 'Gasolina',
      amount: 58.90,
      date: '2024-01-20',
      category: 'Combustible',
      vehicle: 'Toyota Corolla',
      shop: 'Estación Repsol',
      paymentMethod: 'card'
    }
  ]);

  const monthlyStats = {
    total: 1200,
    fuel: 480,
    maintenance: 350,
    insurance: 270,
    others: 100
  };

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#325f99]"></div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Mantenimiento':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Combustible':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Limpieza':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Inspección':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Seguro':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400';
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
                Gastos
              </h1>
              <p className="text-[#5c708a] dark:text-[#90aecb]">
                Analiza y controla todos los gastos de tus vehículos
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
                className="input-field"
              >
                <option value="monthly">Mensual</option>
                <option value="yearly">Anual</option>
              </select>
              <button 
                onClick={handleAddExpense}
                className="btn-primary"
              >
                + Nuevo Gasto
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[#5c708a] dark:text-[#90aecb]">Total</p>
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-[#101418] dark:text-white">€{monthlyStats.total}</p>
              <p className="text-sm text-green-600 dark:text-green-400">-5% vs mes anterior</p>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[#5c708a] dark:text-[#90aecb]">Combustible</p>
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-[#101418] dark:text-white">€{monthlyStats.fuel}</p>
              <p className="text-sm text-[#5c708a] dark:text-[#90aecb]">40% del total</p>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[#5c708a] dark:text-[#90aecb]">Mantenimiento</p>
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-[#101418] dark:text-white">€{monthlyStats.maintenance}</p>
              <p className="text-sm text-[#5c708a] dark:text-[#90aecb]">29% del total</p>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[#5c708a] dark:text-[#90aecb]">Seguros</p>
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-[#101418] dark:text-white">€{monthlyStats.insurance}</p>
              <p className="text-sm text-[#5c708a] dark:text-[#90aecb]">23% del total</p>
            </div>
          </div>

          {/* Expense Chart */}
          <div className="card mb-8">
            <h3 className="text-lg font-semibold text-[#101418] dark:text-white mb-4">
              Gastos por Categoría
            </h3>
            <div className="h-64 bg-[#eaedf1] dark:bg-[#223649] rounded-xl flex items-center justify-center">
              <p className="text-[#5c708a] dark:text-[#90aecb]">Gráfico de gastos (placeholder)</p>
            </div>
          </div>

          {/* Recent Expenses */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#101418] dark:text-white">
                Gastos Recientes
              </h3>
              <button className="btn-secondary text-sm">
                Ver Todos
              </button>
            </div>

            <div className="space-y-3">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-4 border border-[#d4dae2] dark:border-[#314d68] rounded-xl hover:bg-gray-50 dark:hover:bg-[#223649] transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#eaedf1] dark:bg-[#223649] rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#5c708a] dark:text-[#90aecb]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#101418] dark:text-white">
                        {expense.description}
                      </h4>
                      <p className="text-sm text-[#5c708a] dark:text-[#90aecb]">
                        {expense.vehicle} • {expense.shop}
                      </p>
                      <p className="text-xs text-[#5c708a] dark:text-[#90aecb]">
                        {new Date(expense.date).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                      {expense.category}
                    </span>
                    <span className="font-semibold text-[#101418] dark:text-white">
                      €{expense.amount.toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEditExpense(expense)}
                        className="p-2 text-[#5c708a] hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Editar gasto"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="p-2 text-[#5c708a] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Eliminar gasto"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Modal para añadir/editar gasto */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1a252e] rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-[#101418] dark:text-white mb-4">
              {editingExpense ? 'Editar Gasto' : 'Nuevo Gasto'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#101418] dark:text-white mb-1">
                  Descripción *
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="input-field"
                  placeholder="Ej: Cambio de aceite"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#101418] dark:text-white mb-1">
                  Cantidad *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="input-field"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#101418] dark:text-white mb-1">
                  Fecha *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#101418] dark:text-white mb-1">
                  Categoría *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="input-field"
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                  <option value="Combustible">Combustible</option>
                  <option value="Limpieza">Limpieza</option>
                  <option value="Inspección">Inspección</option>
                  <option value="Seguro">Seguro</option>
                  <option value="Reparación">Reparación</option>
                  <option value="Multas">Multas</option>
                  <option value="Peajes">Peajes</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#101418] dark:text-white mb-1">
                  Vehículo
                </label>
                <input
                  type="text"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                  className="input-field"
                  placeholder="Ej: Toyota Corolla"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#101418] dark:text-white mb-1">
                  Establecimiento
                </label>
                <input
                  type="text"
                  value={formData.shop}
                  onChange={(e) => setFormData({...formData, shop: e.target.value})}
                  className="input-field"
                  placeholder="Ej: Taller AutoService"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#101418] dark:text-white mb-1">
                  Método de Pago
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  className="input-field"
                >
                  <option value="card">Tarjeta</option>
                  <option value="cash">Efectivo</option>
                  <option value="transfer">Transferencia</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  {editingExpense ? 'Actualizar' : 'Añadir'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
