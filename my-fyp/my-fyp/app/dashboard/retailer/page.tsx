'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, Delivery } from '@/lib/api';

export default function RetailerDashboard() {
  const [deliveries] = useState<Delivery[]>(api.getDeliveries());
  const router = useRouter();

  const handleLogout = () => {
    console.log('Logged out successfully');
    router.push('/'); // Redirect to root or login page
  };

  const incomingDeliveries = deliveries.filter((d) => d.status !== 'Delivered');
  const pastDeliveries = deliveries.filter((d) => d.status === 'Delivered');

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Logout Button */}
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>

      {/* Incoming Deliveries Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-2">Incoming Deliveries</h2>
        <p className="text-gray-600 mb-4">View real-time status of assigned deliveries</p>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-gray-600 font-medium py-2">Driver</th>
              <th className="text-left text-gray-600 font-medium py-2">Status</th>
              <th className="text-left text-gray-600 font-medium py-2">ETA</th>
              <th className="text-left text-gray-600 font-medium py-2">Passcode</th>
            </tr>
          </thead>
          <tbody>
            {incomingDeliveries.map((delivery) => (
              <tr key={`retailer-incoming-${delivery.id}`} className="border-b border-gray-200">
                <td className="py-2 text-gray-800">{delivery.driver}</td>
                <td className="py-2 text-gray-800">{delivery.status}</td>
                <td className="py-2 text-gray-800">{new Date(delivery.eta).toLocaleString()}</td>
                <td className="py-2 text-gray-800">{delivery.passcode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Past Deliveries Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-2">Past Deliveries</h2>
        <p className="text-gray-600 mb-4">Check your delivery history</p>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-gray-600 font-medium py-2">Date</th>
              <th className="text-left text-gray-600 font-medium py-2">Driver</th>
              <th className="text-left text-gray-600 font-medium py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {pastDeliveries.map((delivery) => (
              <tr key={`retailer-past-${delivery.id}`} className="border-b border-gray-200">
                <td className="py-2 text-gray-800">{new Date(delivery.eta).toLocaleDateString()}</td>
                <td className="py-2 text-gray-800">{delivery.driver}</td>
                <td className="py-2 text-gray-800">{delivery.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
