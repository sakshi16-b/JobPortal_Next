'use server';
import { db } from '@/config/db';
import { users } from '@/drizzle/schema';
import argon2 from 'argon2';
import { error } from 'console';
import { eq, or } from 'drizzle-orm';

export const registrationAction = async (data: {
  name: string;
  userName: string;
  email: string;
  password: string;
  role: 'applicant' | 'employer';
}) => {
  try {
    const { name, userName, email, password, role } = data;
    const [user] = await db.select().
    from(users)
    .where
    (or(eq(users.userName,userName),
    eq(users.email,email)));

    if(user){
if((user.email)===email){
return{status:"ERROR",message:"Email Already Exists"}
}
else{
    return{status:"ERROR",message:"Username Already Exists"}
    }
}
 const hashPassword = await argon2.hash(password);
    await db.insert(users).
     values({ name, userName, email, password:hashPassword, role });



type LoginData = {
  email: string;
  password: string;
};
export const loginUserAction = async (data: LoginData) => {
  try {
    const { email, password } = data;
  } catch (e) {}
};
