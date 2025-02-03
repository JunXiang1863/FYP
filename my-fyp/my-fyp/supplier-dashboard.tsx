"use client"

import { Settings, BarChart3, Package, Activity } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function SupplierDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-background p-6">
        <div className="flex items-center gap-2 mb-8">
          <Package className="h-6 w-6" />
          <h1 className="text-xl font-bold">SecureTrack Pro</h1>
        </div>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Package className="h-4 w-4" />
            Deliveries
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Activity className="h-4 w-4" />
            Live Tracking
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Supplier Dashboard</h2>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Enter as Supplier</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Supplier Portal</SheetTitle>
              </SheetHeader>
              {/* Add your supplier form content here */}
            </SheetContent>
          </Sheet>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,789</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Deliveries</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">+4% from last hour</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivery Success Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.3%</div>
              <p className="text-xs text-muted-foreground">+1.1% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Delivery Time</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 hours</div>
              <p className="text-xs text-muted-foreground">-8 minutes from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Delivery Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              {/* Chart will be added here */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['2305', '2304', '2303', '2302'].map((id) => (
                  <div key={id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">DEL-{id}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">In Progress</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

