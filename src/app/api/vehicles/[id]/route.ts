import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const data = await request.json()
    const { make, model, year, plate, color, vin, mileage, fuelType } = data

    // Verificar que el vehículo pertenece al usuario
    const existingVehicle = await prisma.vehicle.findFirst({
      where: {
        id: params.id,
        userId: (session.user as any).id
      }
    })

    if (!existingVehicle) {
      return NextResponse.json(
        { error: "Vehículo no encontrado" },
        { status: 404 }
      )
    }

    const vehicle = await prisma.vehicle.update({
      where: { id: params.id },
      data: {
        make,
        model,
        year: parseInt(year),
        plate,
        color,
        vin,
        mileage: mileage ? parseInt(mileage) : null,
        fuelType
      }
    })

    return NextResponse.json(vehicle)
  } catch (error) {
    console.error("Error actualizando vehículo:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Verificar que el vehículo pertenece al usuario
    const existingVehicle = await prisma.vehicle.findFirst({
      where: {
        id: params.id,
        userId: (session.user as any).id
      }
    })

    if (!existingVehicle) {
      return NextResponse.json(
        { error: "Vehículo no encontrado" },
        { status: 404 }
      )
    }

    await prisma.vehicle.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Vehículo eliminado" })
  } catch (error) {
    console.error("Error eliminando vehículo:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
