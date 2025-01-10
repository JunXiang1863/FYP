'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation'; // For navigation
import { api, Delivery } from '/Users/junxiangooi/FYP/my-fyp/app/lib/api';

type DeliveryFormInputs = Omit<Delivery, 'id' | 'deliveryCode' | 'passcode'>;

export default function SupplierDashboard() {
  const { register, handleSubmit, reset, setValue } = useForm<DeliveryFormInputs>();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const router = useRouter(); // Hook for navigation

  useEffect(() => {
    setDeliveries(api.getDeliveries());
  }, []);

  const onSubmit: SubmitHandler<DeliveryFormInputs> = (data) => {
    const newDelivery = api.createDelivery(data);

    setDeliveries((prevDeliveries) => {
      const isDuplicate = prevDeliveries.some((delivery) => delivery.id === newDelivery.id);
      return isDuplicate ? prevDeliveries : [...prevDeliveries, newDelivery];
    });

    reset();
  };

  const handleStatusChange = (id: string, newStatus: Delivery['status']) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === id ? { ...delivery, status: newStatus } : delivery
      )
    );

    // Call the API to update the status (optional)
    api.updateDeliveryStatus(id, newStatus);
  };

  const handleLogout = () => {
    // Perform any logout logic here, if needed
    console.log('Logged out successfully');
    router.push('/'); // Navigate back to the root page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8">
      {/* Logout Button */}
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>

      {/* Create New Delivery Form */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-2">Create New Delivery</h1>
        <p className="text-gray-600 mb-4">Enter delivery details and assign a driver</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('retailerName')}
            placeholder="Retailer Name"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring focus:ring-gray-200"
            required
          />
          <input
            {...register('contactName')}
            placeholder="Contact Name"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring focus:ring-gray-200"
            required
          />
          <input
            {...register('contactNumber')}
            placeholder="Contact Number"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring focus:ring-gray-200"
            required
          />
          <input
            {...register('address')}
            placeholder="Address"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring focus:ring-gray-200"
            required
          />
          <div className="relative">
            <select
              onChange={(e) => setValue('driver', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring focus:ring-gray-200 bg-white"
              required
            >
              <option value="" disabled selected>
                Select Driver
              </option>
              <option value="Driver A">Driver A</option>
              <option value="Driver B">Driver B</option>
              <option value="Driver C">Driver C</option>
            </select>
          </div>
          <div className="relative">
            <select
              onChange={(e) => setValue('status', e.target.value as Delivery['status'])}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring focus:ring-gray-200 bg-white"
              required
            >
              <option value="" disabled selected>
                Select Status
              </option>
              <option value="Dispatch">Dispatch</option>
              <option value="In Transit">In Transit</option>
              <option value="Delayed">Delayed</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <input
            {...register('eta')}
            type="datetime-local"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring focus:ring-gray-200"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white font-bold py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Create Delivery
          </button>
        </form>
      </div>

      {/* Active Deliveries Table */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-2">Active Deliveries</h2>
        <p className="text-gray-600 mb-4">View and manage ongoing deliveries</p>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-gray-600 font-semibold py-2">Retailer</th>
              <th className="text-left text-gray-600 font-semibold py-2">Driver</th>
              <th className="text-left text-gray-600 font-semibold py-2">Status</th>
              <th className="text-left text-gray-600 font-semibold py-2">ETA</th>
              <th className="text-left text-gray-600 font-semibold py-2">Delivery Code</th>
              <th className="text-left text-gray-600 font-semibold py-2">Passcode</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="border-b border-gray-200">
                <td className="py-2 text-gray-800">{delivery.retailerName}</td>
                <td className="py-2 text-gray-800">{delivery.driver}</td>
                <td className="py-2 text-gray-800">
                  <select
                    value={delivery.status}
                    onChange={(e) => handleStatusChange(delivery.id, e.target.value as Delivery['status'])}
                    className="border border-gray-300 rounded-lg p-1 bg-white focus:ring focus:ring-gray-200"
                  >
                    <option value="Dispatch">Dispatch</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="py-2 text-gray-800">{new Date(delivery.eta).toLocaleString()}</td>
                <td className="py-2 text-gray-800">{delivery.deliveryCode}</td>
                <td className="py-2 text-gray-800">{delivery.passcode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
