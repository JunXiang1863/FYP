'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '/Users/junxiangooi/FYP/my-fyp/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '/Users/junxiangooi/FYP/my-fyp/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '/Users/junxiangooi/FYP/my-fyp/components/ui/select';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<string | undefined>();
  const router = useRouter();

  const handleLogin = () => {
    if (selectedRole) {
      router.push(`/dashboard/${selectedRole}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px] bg-white shadow-lg border border-gray-200 rounded-lg">
        <CardHeader className="flex flex-col items-center justify-center h-[150px]">
          <CardTitle className="text-xl font-semibold">
            Welcome to DeliTrack
          </CardTitle>
          <CardDescription className="text-gray-500 text-sm">
            Choose your role to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full border border-gray-300 rounded-md p-3 text-lg bg-white">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-auto">
              <SelectItem value="supplier" className="text-lg p-2">
                <span>Supplier</span>
              </SelectItem>
              <SelectItem value="driver" className="text-lg p-2">
                <span>Driver</span>
              </SelectItem>
              <SelectItem value="retailer" className="text-lg p-2">
                <span>Retail Seller</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter className="pt-4">
          <Button
            className="w-full bg-gray-700 text-white hover:bg-gray-800 rounded-md py-2"
            onClick={handleLogin}
            disabled={!selectedRole}
          >
            Enter Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
