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
import { loginUserAction } from '@/features/auth/server/auth.actions';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginUserData, loginUserSchema } from '@/features/auth/auth.schema';

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginUserSchema) });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginUserData) => {
    try {
      const response = await loginUserAction(data);

      if (response.status === 'SUCCESS') toast.success(response.message);
      else toast.error(response.message);
    } catch (error) {}
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  placeholder="Enter your Email"
                  required
                  {...register('email')}
                  className={`pl-10  focus:outline-none focus:ring-0 focus-visible:ring-0 ${errors.email ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
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
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your Password"
                  required
                  {...register('password')}
                  className={`pl-10 pr-10  focus:outline-none focus:ring-0 focus-visible:ring-0 ${errors.password ? 'border-destructive' : ''}`}
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
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
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
