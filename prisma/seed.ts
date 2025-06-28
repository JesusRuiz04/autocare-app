import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Creando usuario de prueba...')
  
  // Crear usuario demo
  const hashedPassword = await bcrypt.hash('demo123', 12)
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@auto.com' },
    update: {},
    create: {
      email: 'demo@auto.com',
      name: 'Usuario Demo',
      password: hashedPassword,
    },
  })

  console.log({ demoUser })

  // Crear algunos vehículos de ejemplo
  const vehicle1 = await prisma.vehicle.create({
    data: {
      make: 'Toyota',
      model: 'Corolla',
      year: 2020,
      plate: 'ABC-123',
      color: 'Blanco',
      mileage: 45000,
      fuelType: 'Gasolina',
      userId: demoUser.id,
    },
  })

  const vehicle2 = await prisma.vehicle.create({
    data: {
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      plate: 'XYZ-789',
      color: 'Azul',
      mileage: 32000,
      fuelType: 'Gasolina',
      userId: demoUser.id,
    },
  })

  // Crear algunos gastos de ejemplo
  await prisma.expense.create({
    data: {
      description: 'Cambio de aceite y filtro',
      amount: 45.50,
      date: new Date('2024-01-28'),
      category: 'Mantenimiento',
      shop: 'Taller AutoService',
      paymentMethod: 'card',
      vehicleId: vehicle1.id,
      userId: demoUser.id,
    },
  })

  await prisma.expense.create({
    data: {
      description: 'Gasolina',
      amount: 65.20,
      date: new Date('2024-01-26'),
      category: 'Combustible',
      shop: 'Estación Shell',
      paymentMethod: 'card',
      vehicleId: vehicle1.id,
      userId: demoUser.id,
    },
  })

  console.log('Usuario de prueba y datos de ejemplo creados!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
