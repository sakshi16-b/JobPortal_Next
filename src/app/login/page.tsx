'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Eye, EyeOff, Lock, Mail, User, UserCheck } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { loginAction } from './loginAction.action';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit=async(e:React.SyntheticEvent<HTMLFormElement>)=>{
  
    try{

    const LoginData={
      email:formData.email.toLowerCase().trim,
      password:formData.password

    };
    
    catch(error){}
    }
  }
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div
            className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center
                justify-center p-4"
          >
            <UserCheck className="w-8 h-8 text-primary-foreground " />
          </div>
          <CardTitle className="text-2xl">Join our Job Portal</CardTitle>
          <CardDescription>Login your account to get started</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}

            <div className="space-y-6">
              <Label htmlFor="name">Email Address *</Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 
                          text-muted-foreground"
                />
                <Input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="Enter your Email"
                  required
                  value={formData.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('email', e.target.value)
                  }
                  className={`pl-10`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="name">Password *</Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 
                        text-muted-foreground"
                />

                <Input
                  id="password"
                  name="password"
                  type="text"
                  placeholder="Create strong Password"
                  required
                  value={formData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('password', e.target.value)
                  }
                  className={`pl-10 pr-10`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* Submit Button  */}
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                New User ? {''}
                <Link
                  href="/register"
                  className="text-primary hover:text-primary/80 font-medium 
    underline-offset-4 hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
