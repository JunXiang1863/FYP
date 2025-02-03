'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/Users/junxiangooi/FYP/my-fyp/components/ui/card"

export default function DashboardPage() {
  const params = useParams()
  const role = params.role as string

  const getRoleContent = () => {
    switch (role) {
      case 'supplier':
        return (
          <>
            <Card className="p-4 bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Delivery Entry</CardTitle>
                <CardDescription className="text-sm text-gray-600">Create and manage deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Form for entering retail seller details and assigning deliveries will go here.</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-white shadow-md mt-4">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Active Deliveries</CardTitle>
                <CardDescription className="text-sm text-gray-600">View and manage ongoing deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Table or list of active deliveries will go here.</p>
              </CardContent>
            </Card>
          </>
        )
      case 'driver':
        return (
          <Card className="p-4 bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">My Assignments</CardTitle>
              <CardDescription className="text-sm text-gray-600">View and manage your delivery assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>List of assigned deliveries with options to update status will go here.</p>
            </CardContent>
          </Card>
        )
      case 'retailer':
        return (
          <>
            <Card className="p-4 bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Incoming Deliveries</CardTitle>
                <CardDescription className="text-sm text-gray-600">View real-time status of assigned deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <p>List of incoming deliveries with real-time status will go here.</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-white shadow-md mt-4">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Past Deliveries</CardTitle>
                <CardDescription className="text-sm text-gray-600">Check your delivery history</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Table of past deliveries with basic details will go here.</p>
              </CardContent>
            </Card>
          </>
        )
      default:
        return <p className="text-red-500">Invalid role</p>
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid gap-4">{getRoleContent()}</div>
    </div>
  )
}
