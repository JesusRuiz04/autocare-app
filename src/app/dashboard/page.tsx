'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/SessionProvider';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import DashboardStats from '@/components/DashboardStats';
import MaintenanceReminders from '@/components/MaintenanceReminders';
import RecentExpenses from '@/components/RecentExpenses';
import VehicleStatus from '@/components/VehicleStatus';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#325f99]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#101a23]">
      <Sidebar />
      <div className="ml-64">
        <Header userName={user.name} />
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#101418] dark:text-white mb-2">
              Panel de Control
            </h1>
            <p className="text-[#5c708a] dark:text-[#90aecb]">
              Bienvenido de vuelta, {user.name}. Aquí tienes un resumen de tus vehículos.
            </p>
          </div>

          {/* Stats Grid */}
          <DashboardStats />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              <MaintenanceReminders />
              <RecentExpenses />
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              <VehicleStatus />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
