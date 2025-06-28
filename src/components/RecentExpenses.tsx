'use client';

import { useRouter } from 'next/navigation';

export default function RecentExpenses() {
  const router = useRouter();
  const expenses = [
    {
      id: 1,
      description: 'Cambio de aceite y filtro',
      amount: 45.50,
      date: '2024-01-28',
      category: 'Mantenimiento',
      vehicle: 'Toyota Corolla'
    },
    {
      id: 2,
      description: 'Gasolina',
      amount: 65.20,
      date: '2024-01-26',
      category: 'Combustible',
      vehicle: 'Toyota Corolla'
    },
    {
      id: 3,
      description: 'Lavado del coche',
      amount: 12.00,
      date: '2024-01-25',
      category: 'Limpieza',
      vehicle: 'Honda Civic'
    },
    {
      id: 4,
      description: 'Revisión técnica',
      amount: 35.00,
      date: '2024-01-22',
      category: 'Inspección',
      vehicle: 'Honda Civic'
    },
    {
      id: 5,
      description: 'Gasolina',
      amount: 58.90,
      date: '2024-01-20',
      category: 'Combustible',
      vehicle: 'Toyota Corolla'
    }
  ];

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
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#101418] dark:text-white">
          Gastos Recientes
        </h3>
        <button 
          onClick={() => router.push('/expenses')}
          className="btn-primary text-sm"
        >
          Ver Todos
        </button>
      </div>

      <div className="space-y-3">
        {expenses.map((expense) => (
          <div key={expense.id} className="flex items-center justify-between p-3 border border-[#d4dae2] dark:border-[#314d68] rounded-xl hover:bg-gray-50 dark:hover:bg-[#223649] transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#eaedf1] dark:bg-[#223649] rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-[#5c708a] dark:text-[#90aecb]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-[#101418] dark:text-white text-sm">
                  {expense.description}
                </h4>
                <p className="text-xs text-[#5c708a] dark:text-[#90aecb]">
                  {expense.vehicle} • {new Date(expense.date).toLocaleDateString('es-ES')}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
