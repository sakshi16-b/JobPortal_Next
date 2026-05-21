
'use server';
import { db } from '@/config/db';
import { users } from '@/drizzle/schema';
import argon2 from 'argon2';
import { error } from 'console';
import { eq, or, and } from 'drizzle-orm';

export const registrationAction = async (data: {
  name: string;
  userName: string;
  email: string;
  password: string;
  role: 'applicant' | 'employer';
}) => {
  try {
    const { name, userName, email, password, role } = data;
    const [user] = await db
      .select()
      .from(users)
      .where(or(eq(users.userName, userName), eq(users.email, email)));

    if (user) {
      if (user.email === email) {
        return { status: 'ERROR', message: 'Email Already Exists' };
      } else {
        return { status: 'ERROR', message: 'Username Already Exists' };
      }
    }
    const hashPassword = await argon2.hash(password);
    await db
      .insert(users)
      .values({ name, userName, email, password: hashPassword, role });

    return {
      status: 'SUCCESS',
      message: 'User Registered Successfully',
    };
  } catch (error) {
    // console.log(error);
    return {
      status: 'ERROR',
      message: 'Something went wrong',
    };
  }
};

export const loginAction = async (data: {
  password: string;
  email: string;
}) => {
  try {
    const { email, password } = data;
    const [user] = await db.select().from(users).where(eq(users.email, email));
    console.log(user);

    if (!user) {
      return {
        status: 'ERROR',
        message: 'Invalid mail or password',
      };
    }
    const isPasswordCorrect = await argon2.verify(user.password, password);

    if (!isPasswordCorrect) {
      return {
        status: 'ERROR',
        message: 'Invalid mail or password',
      };
    }
    return {
      status: 'SUCCESS',
      message: 'Successfully logged in',
    };
  } catch (e) {
    console.log(e);
    return {
      status: 'ERROR',
      message: 'Something went wrong',
    };
  }
};
