'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '/Users/junxiangooi/FYP/my-fyp/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '/Users/junxiangooi/FYP/my-fyp/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '/Users/junxiangooi/FYP/my-fyp/components/ui/select';
import { api, Delivery } from '@/lib/api';

export default function DriverDashboard() {
  const [deliveries, setDeliveries] = useState<Delivery[]>(api.getDeliveries());
  const router = useRouter();

  const updateDeliveryStatus = (id: string, status: Delivery['status']) => {
    const updatedDelivery = api.updateDeliveryStatus(id, status);
    if (updatedDelivery) {
      setDeliveries(deliveries.map((d) => (d.id === id ? updatedDelivery : d)));
    }
  };

  const handleLogout = () => {
    // Perform any logout logic, such as clearing session data
    console.log('Logged out successfully');
    router.push('/'); // Redirect to the root or login page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Logout Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>

      {/* Card for Assignments */}
      <Card className="bg-white shadow-lg rounded-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Deliveries</CardTitle>
          <CardDescription className="text-gray-600">
            View and manage  
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-600 font-medium">Retailer</TableHead>
                <TableHead className="text-gray-600 font-medium">Address</TableHead>
                <TableHead className="text-gray-600 font-medium">Contact</TableHead>
                <TableHead className="text-gray-600 font-medium">Status</TableHead>
                <TableHead className="text-gray-600 font-medium">ETA</TableHead>
                <TableHead className="text-gray-600 font-medium">Delivery Code</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={`driver-${delivery.id}`} className="border-b">
                  <TableCell className="py-2 text-gray-800">{delivery.retailerName}</TableCell>
                  <TableCell className="py-2 text-gray-800">{delivery.address}</TableCell>
                  <TableCell className="py-2 text-gray-800">
                    {delivery.contactName} ({delivery.contactNumber})
                  </TableCell>
                  <TableCell className="py-2 text-gray-800">
  <Select
    defaultValue={delivery.status}
    onValueChange={(value) => updateDeliveryStatus(delivery.id, value as Delivery['status'])}
  >
    <SelectTrigger className="w-full border border-gray-300 bg-white rounded-md px-3 py-2 text-sm">
      <SelectValue />
    </SelectTrigger>
    <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md">
      <SelectItem value="Dispatch" className="px-3 py-2 text-sm">
        Dispatch
      </SelectItem>
      <SelectItem value="In Transit" className="px-3 py-2 text-sm">
        In Transit
      </SelectItem>
      <SelectItem value="Delayed" className="px-3 py-2 text-sm">
        Delayed
      </SelectItem>
      <SelectItem value="Delivered" className="px-3 py-2 text-sm">
        Delivered
      </SelectItem>
    </SelectContent>
  </Select>
</TableCell>

                  <TableCell className="py-2 text-gray-800">
                    {new Date(delivery.eta).toLocaleString()}
                  </TableCell>
                  <TableCell className="py-2 text-gray-800">{delivery.deliveryCode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
