import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Probar conexión a la base de datos
    const userCount = await prisma.user.count()
    const vehicleCount = await prisma.vehicle.count()
    const expenseCount = await prisma.expense.count()
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection working',
      data: {
        users: userCount,
        vehicles: vehicleCount,
        expenses: expenseCount
      }
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
