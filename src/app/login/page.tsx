'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { User, UserCheck } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface LoginFormData {
  userName: string;
  password: string;
}

const handleSubmit = (e: FocusEvent) => {};

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    userName: '',
    password: '',
  });
  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
              <Label htmlFor="name">UserName</Label>
              <div className="relative">
                <User className="absolute left-3" />
                <Input
                  id="userName"
                  name="userName"
                  type="text"
                  placeholder="Enter username"
                  required
                  value={formData.userName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('userName', e.target.value)
                  }
                  className={`pl-10`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-6">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <User className="absolute left-3" />
                <Input
                  id="password"
                  type="text"
                  name="password"
                  placeholder="Enter password"
                  required
                  value={formData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('password', e.target.value)
                  }
                  className={`pl-10`}
                />
              </div>
            </div>

            {/* Submit Button  */}
            <Button type="submit" className="w-full">
              Login
            </Button>
           < div className="text-center">
              <p className="text-sm text-muted-foreground">
              New User ?  {''}
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
