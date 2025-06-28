import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export interface AuthUser {
  userId: string
  email: string
  name: string
}

export async function verifyAuth(request: NextRequest): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    
    return {
      userId: decoded.userId,
      email: decoded.email,
      name: decoded.name
    }
  } catch (error) {
    console.error('Error verificando token:', error)
    return null
  }
}
