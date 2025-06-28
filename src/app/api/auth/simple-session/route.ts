import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ user: null })
    }

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
  // Logout - eliminar cookie
  const response = NextResponse.json({ message: 'Logout exitoso' })
  
  response.cookies.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0
  })

  return response
}
