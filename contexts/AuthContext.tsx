import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Initialize auth state
    try {
      // Your auth initialization logic
      setLoading(false)
    } catch (error) {
      console.error('Auth initialization error:', error)
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Your login logic
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    userType: "supplier" | "retailer",
    companyName: string,
    phoneNumber: string,
    address: string
  ) => {
    try {
      // Your registration logic
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 