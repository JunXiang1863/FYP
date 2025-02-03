"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "/Users/junxiangooi/FYP/my-fyp/components/ui/button"
import { Input } from "/Users/junxiangooi/FYP/my-fyp/components/ui/input"
import { Label } from "/Users/junxiangooi/FYP/my-fyp/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "/Users/junxiangooi/FYP/my-fyp/components/ui/card"
import { useAuth } from "/Users/junxiangooi/FYP/my-fyp/contexts/AuthContext"
import { useToast} from "/Users/junxiangooi/FYP/my-fyp/components/ui/use-toast"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      router.push("/supplier/dashboard")
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login to DeliTrack</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Login</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

