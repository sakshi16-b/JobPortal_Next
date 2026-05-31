'use server';
import { db } from '@/config/db';
import { users } from '@/drizzle/schema';
import argon2 from 'argon2';

export const registrationAction = async (data: {
  name: string;
  userName: string;
  email: string;
  password: string;
  role: 'applicant' | 'employer';
}) => {
  try {
    const { name, userName, email, password, role } = data;
    console.log(name, userName, email, password, role);
    const hashPassword = await argon2.hash(password);
    await db
      .insert(users)
      .values({ name, userName, email, password: hashPassword, role });

    return {
      status: 'SUCCESS',
      message: 'Registration Completed Successfully',
    };
  } catch (error) {
    return {
      status: 'ERROR',
      message: 'Unknown Error Occured! Please try again later',
    };
  }
};
