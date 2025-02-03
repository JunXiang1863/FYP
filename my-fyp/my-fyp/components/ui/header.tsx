// /Users/junxiangooi/FYP/my-fyp/components/ui/header.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '/Users/junxiangooi/FYP/my-fyp/components/ui/button';
import { Truck, User, Store, LogOut } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const role = pathname.split('/')[2];

  const getRoleIcon = () => {
    switch (role) {
      case 'supplier':
        return <Truck className="mr-2 h-5 w-5" />;
      case 'driver':
        return <User className="mr-2 h-5 w-5" />;
      case 'retailer':
        return <Store className="mr-2 h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          {getRoleIcon()}
          <h1 className="text-xl font-semibold capitalize">{role} Dashboard</h1>
        </div>
        <Link href="/">
          <Button variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </Link>
      </div>
    </header>
  );
}
