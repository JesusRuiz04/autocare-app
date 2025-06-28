import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ user: null })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    return NextResponse.json({
      user: {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name
      }
    })

  } catch (error) {
    console.error('Error verificando sesión:', error)
    return NextResponse.json({ user: null })
  }
}

export async function DELETE() {
  // Logout - el frontend se encarga de eliminar el token del localStorage
  return NextResponse.json({ message: 'Logout exitoso' })
}
