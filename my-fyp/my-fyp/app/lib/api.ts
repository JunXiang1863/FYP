import { v4 as uuidv4 } from 'uuid';

export interface Delivery {
  id: string;
  retailerName: string;
  contactName: string;
  contactNumber: string;
  address: string;
  driver: string;
  status: 'Dispatch' | 'In Transit' | 'Delayed' | 'Delivered';
  eta: string;
  deliveryCode: string;
  passcode: string;
}

let deliveries: Delivery[] = [];

export const api = {
  createDelivery: (data: Omit<Delivery, 'id' | 'deliveryCode' | 'passcode'>): Delivery => {
    const newDelivery: Delivery = {
      ...data,
      id: uuidv4(),
      deliveryCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
      passcode: Math.random().toString(36).substr(2, 6).toUpperCase(),
    };
    deliveries.push(newDelivery);
    return newDelivery;
  },

  getDeliveries: (): Delivery[] => {
    return deliveries;
  },

  updateDeliveryStatus: (id: string, status: Delivery['status']): Delivery | undefined => {
    const delivery = deliveries.find(d => d.id === id);
    if (delivery) {
      delivery.status = status;
      return delivery;
    }
    return undefined;
  },
};