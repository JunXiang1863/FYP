'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '/Users/junxiangooi/FYP/my-fyp/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '/Users/junxiangooi/FYP/my-fyp/components/ui/card';
import { Progress } from "/Users/junxiangooi/FYP/my-fyp/components/ui/progress";
import Image from "next/image";
import { Truck, Package, BarChart, Store, Factory, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "/Users/junxiangooi/FYP/my-fyp/components/ui/use-toast";
import { useAuth } from "/Users/junxiangooi/FYP/my-fyp/contexts/AuthContext";
import { Label } from "/Users/junxiangooi/FYP/my-fyp/components/ui/label";
import { Input } from "/Users/junxiangooi/FYP/my-fyp/components/ui/input";
import { RadioGroup, RadioGroupItem } from "/Users/junxiangooi/FYP/my-fyp/components/ui/radio-group"

export function LandingPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [userType, setUserType] = useState<"supplier" | "retailer" | "">("")
  const [companyName, setCompanyName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [registrationStep, setRegistrationStep] = useState(1)
  const { login, register } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const registrationRef = useRef<HTMLDivElement | null>(null);

  const scrollToRegistration = () => {
    if (isLogin) {
      // If currently showing login, switch to registration
      setIsLogin(false);
      setRegistrationStep(1);
    } else {
      // If currently showing registration, switch back to login
      setIsLogin(true);
    }

    setTimeout(() => {
      if (registrationRef.current) {
        registrationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your email and password.",
        variant: "destructive",
      })
    }
  }

  const handleRegisterStepOne = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email && password) {
      setRegistrationStep(2)
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
    }
  }

  const handleRegisterStepTwo = (e: React.FormEvent) => {
    e.preventDefault()
    if (userType) {
      setRegistrationStep(3)
    } else {
      toast({
        title: "Missing Information",
        description: "Please select an account type.",
        variant: "destructive",
      })
    }
  }

  const handleRegisterStepThree = async (e: React.FormEvent) => {
    e.preventDefault()
    if (companyName && phoneNumber && address) {
      try {
        await register(name, email, password, userType as "supplier" | "retailer", companyName, phoneNumber, address)
        toast({
          title: "Registration Successful",
          description: "You can now log in with your new account.",
        })
        setIsLogin(true)
        setRegistrationStep(1)
      } catch (error) {
        toast({
          title: "Registration Failed",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        })
      }
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
    }
  }

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-4">
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
      <Button type="submit" className="w-full bg-black text-white">
        Login to Dashboard
      </Button>
    </form>
  )

  const renderRegistrationStepOne = () => (
    <form onSubmit={handleRegisterStepOne} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
      <Button type="submit" className="w-full">
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )

  const renderRegistrationStepTwo = () => (
    <form onSubmit={handleRegisterStepTwo} className="space-y-4">
      <div className="space-y-2">
        <Label>Account Type</Label>
        <RadioGroup
          value={userType}
          onValueChange={(value) => setUserType(value as "supplier" | "retailer")}
          className="grid grid-cols-2 gap-4"
        >
          <Label
            htmlFor="supplier"
            className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary ${
              userType === "supplier" ? "border-primary" : ""
            }`}
          >
            <RadioGroupItem value="supplier" id="supplier" className="sr-only" />
            <Factory className="mb-3 h-6 w-6" />
            Supplier
          </Label>
          <Label
            htmlFor="retailer"
            className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary ${
              userType === "retailer" ? "border-primary" : ""
            }`}
          >
            <RadioGroupItem value="retailer" id="retailer" className="sr-only" />
            <Store className="mb-3 h-6 w-6" />
            Retailer
          </Label>
        </RadioGroup>
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => setRegistrationStep(1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button type="submit">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  )

  const renderRegistrationStepThree = () => (
    <form onSubmit={handleRegisterStepThree} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          type="text"
          placeholder="Enter your company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => setRegistrationStep(2)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button type="submit">Create Account</Button>
      </div>
    </form>
  )

  // Update the DashboardImage component
  const DashboardImage = () => {
    // Define the SVG directly as a data URL
    const placeholderSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='20' fill='%239ca3af' text-anchor='middle' dy='.3em'%3EDeliTrack Dashboard%3C/text%3E%3C/svg%3E`;

    return (
      <div className="relative w-[400px] h-[400px] bg-gray-100 rounded-lg shadow-lg">
        <Image
          src={placeholderSVG}
          alt="DeliTrack Dashboard"
          fill
          style={{ objectFit: 'contain' }}
          className="p-4"
          priority
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600">
        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 text-white">
            <h1 className="text-6xl md:text-7xl font-bold mb-4 text-white">
              Welcome to <span className="italic">DeliTrack</span>
            </h1>
            <p className="text-xl mb-6 text-white">
              Streamline your delivery operations with our advanced dashboard.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-gray-100 text-black hover:bg-gray-200"
              onClick={scrollToRegistration}
            >
              {isLogin ? "Create an Account" : "Back to Login"}
            </Button>
          </div>
          <div className="md:w-1/2 ml-10 flex justify-center items-center">
            <DashboardImage />
          </div>
        </div>
      </section>

      


      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose DeliTrack?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Truck className="h-12 w-12 text-blue-500" />}
              title="Efficient Route Planning"
              description="Optimize your delivery routes to save time and fuel."
            />
            <FeatureCard
              icon={<Package className="h-12 w-12 text-blue-500" />}
              title="Real-time Tracking"
              description="Monitor your deliveries in real-time with our advanced tracking system."
            />
            <FeatureCard
              icon={<BarChart className="h-12 w-12 text-blue-500" />}
              title="Comprehensive Analytics"
              description="Gain valuable insights into your delivery performance with detailed analytics."
            />
          </div>
        </div>
      </section>

      {/* Login/Register Section */}
      <section ref={registrationRef} className="py-20 bg-gray-200">
  <div className="container mx-auto px-4">
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {isLogin ? "Login to Your Dashboard" : "Create Your Account"}
        </CardTitle>
        <CardDescription className="text-center">
          {isLogin
            ? "Access your DeliTrack dashboard to manage your deliveries."
            : "Join DeliTrack and start optimizing your delivery operations."}
        </CardDescription>
      </CardHeader>
      {!isLogin && (
        <CardContent>
          <Progress value={(registrationStep / 3) * 100} className="mb-4" />
        </CardContent>
      )}
      <CardContent>
        {isLogin ? (
          renderLoginForm() // Render login form
        ) : (
          <>
            {registrationStep === 1 && renderRegistrationStepOne()} 
            {registrationStep === 2 && renderRegistrationStepTwo()} 
            {registrationStep === 3 && renderRegistrationStepThree()} 
          </>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0"
                onClick={() => {
                  scrollToRegistration();
                }}
              >
                Register here
              </Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0"
                onClick={() => {
                  setIsLogin(true);
                }}
              >
                Login here
              </Button>
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  </div>
</section>

   
  


      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center text-white">
          <p>&copy; 2023 DeliTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center mb-4">{icon}</div>
        <CardTitle className="text-xl font-semibold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center">{description}</p>
      </CardContent>
    </Card>
  )
}
