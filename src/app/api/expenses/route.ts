import { NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const expenses = await prisma.expense.findMany({
      where: { userId: user.userId },
      include: { vehicle: true },
      orderBy: { date: 'desc' }
    })

    return NextResponse.json(expenses)
  } catch (error) {
    console.error("Error obteniendo gastos:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const data = await request.json()
    const { description, amount, date, category, shop, paymentMethod, vehicleId } = data

    if (!description || !amount || !date || !category) {
      return NextResponse.json(
        { error: "Descripción, monto, fecha y categoría son requeridos" },
        { status: 400 }
      )
    }

    const expense = await prisma.expense.create({
      data: {
        description,
        amount: parseFloat(amount),
        date: new Date(date),
        category,
        shop,
        paymentMethod,
        vehicleId: vehicleId || null,
        userId: user.userId
      },
      include: { vehicle: true }
    })

    return NextResponse.json(expense, { status: 201 })
  } catch (error) {
    console.error("Error creando gasto:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
