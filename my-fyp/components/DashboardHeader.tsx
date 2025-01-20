"use client"

import { Bell, LogOut, User } from "lucide-react"
import { Button } from "/Users/junxiangooi/FYP/my-fyp/components/ui/button"
import { useAuth } from "/Users/junxiangooi/FYP/my-fyp/contexts/AuthContext"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Supplier Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            {user && (
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}