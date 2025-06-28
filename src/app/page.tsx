'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#325f99] to-[#4a79a8]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#325f99] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="ml-2 text-xl font-bold text-[#101418]">Auto Manager</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/login" className="btn-secondary">
                Iniciar Sesión
              </Link>
              <Link href="/register" className="btn-primary">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Gestiona el mantenimiento de tu vehículo
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Lleva un control completo de gastos, mantenimientos, seguros y más. 
              Mantén tu vehículo en perfecto estado con nuestra plataforma integral.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/register" className="bg-white text-[#325f99] hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg tracking-[0.015em] transition-colors">
                Comenzar Gratis
              </Link>
              <Link href="/demo" className="border-2 border-white text-white hover:bg-white hover:text-[#325f99] px-8 py-4 rounded-xl font-bold text-lg tracking-[0.015em] transition-colors">
                Ver Demo
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Control de Mantenimientos</h3>
              <p className="text-white/80">
                Programa y rastrea todos los mantenimientos de tu vehículo. 
                Recibe recordatorios automáticos para no perder ninguna cita.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Gestión de Gastos</h3>
              <p className="text-white/80">
                Registra todos los gastos relacionados con tu vehículo. 
                Obtén reportes detallados y analiza tus patrones de gasto.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Comunidad</h3>
              <p className="text-white/80">
                Conecta con otros propietarios de vehículos. 
                Comparte experiencias y obtén consejos útiles.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
