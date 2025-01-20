"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "supplier" | "retailer"
  companyName: string
  phoneNumber: string
  address: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (
    name: string,
    email: string,
    password: string,
    role: "supplier" | "retailer",
    companyName: string,
    phoneNumber: string,
    address: string,
  ) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // This is a mock login. In a real app, you'd call an API here.
    if (email === "supplier@example.com" && password === "password") {
      const user: User = {
        id: "1",
        name: "John Doe",
        email,
        role: "supplier",
        companyName: "Acme Supplies",
        phoneNumber: "123-456-7890",
        address: "123 Main St, Anytown, USA",
      }
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      throw new Error("Invalid credentials")
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    role: "supplier" | "retailer",
    companyName: string,
    phoneNumber: string,
    address: string,
  ) => {
    // This is a mock registration. In a real app, you'd call an API here.
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      companyName,
      phoneNumber,
      address,
    }
    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // In a real app, you'd store this in a database
    console.log("Registered user:", newUser)
    // Don't automatically log in the user after registration
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

