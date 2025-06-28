import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const vehicles = await prisma.vehicle.findMany({
      where: { userId: (session.user as any).id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(vehicles)
  } catch (error) {
    console.error("Error obteniendo vehículos:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const data = await request.json()
    const { make, model, year, plate, color, vin, mileage, fuelType } = data

    if (!make || !model || !year) {
      return NextResponse.json(
        { error: "Marca, modelo y año son requeridos" },
        { status: 400 }
      )
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        make,
        model,
        year: parseInt(year),
        plate,
        color,
        vin,
        mileage: mileage ? parseInt(mileage) : null,
        fuelType,
        userId: (session.user as any).id
      }
    })

    return NextResponse.json(vehicle, { status: 201 })
  } catch (error) {
    console.error("Error creando vehículo:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
