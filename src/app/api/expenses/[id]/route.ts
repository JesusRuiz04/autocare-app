import { NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const user = await verifyAuth(request)
    
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const data = await request.json()
    const { description, amount, date, category, shop, paymentMethod, vehicleId } = data

    // Verificar que el gasto pertenece al usuario
    const existingExpense = await prisma.expense.findFirst({
      where: {
        id: params.id,
        userId: user.userId
      }
    })

    if (!existingExpense) {
      return NextResponse.json(
        { error: "Gasto no encontrado" },
        { status: 404 }
      )
    }

    const expense = await prisma.expense.update({
      where: { id: params.id },
      data: {
        description,
        amount: parseFloat(amount),
        date: new Date(date),
        category,
        shop,
        paymentMethod,
        vehicleId: vehicleId || null
      },
      include: { vehicle: true }
    })

    return NextResponse.json(expense)
  } catch (error) {
    console.error("Error actualizando gasto:", error)
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
    const user = await verifyAuth(request)
    
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Verificar que el gasto pertenece al usuario
    const existingExpense = await prisma.expense.findFirst({
      where: {
        id: params.id,
        userId: user.userId
      }
    })

    if (!existingExpense) {
      return NextResponse.json(
        { error: "Gasto no encontrado" },
        { status: 404 }
      )
    }

    await prisma.expense.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Gasto eliminado" })
  } catch (error) {
    console.error("Error eliminando gasto:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
