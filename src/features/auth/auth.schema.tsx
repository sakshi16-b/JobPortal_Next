import { z } from 'zod';

export const registrationUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'name must be 2 characters long')
    .max(255, 'Name must not exceed 255 characters'),

  userName: z
    .string()
    .trim()
    .min(3, 'Username should be 3 characters long')
    .max(255, 'Username should not exeed 255 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
'Username can contain letters, numbers, underscores and hyphens'    ),

  email: z
  .string()
  .trim()
  .email('Please enter a valid email address')
  .max(255, 'Email should not exceed 255 characters')
  .toLowerCase(),

  password: z
    .string()
    .min(8, 'Password must be at least 8 character long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%^&*!]).{8,}$/,
      'Password must contain uppercase, lowercase, number, special character and be at least 8 characters long'
    ),

  role: z
    .enum(['applicant', 'employer'], {
      error: 'Role must be applicant or employer',
    })
    .default('applicant'),
});
//z.infer automatically creates a  Typescript type from zod schema.
//we are defining a type where we pass typeof zod schema.
export type RegisterUserData = z.infer<typeof registrationUserSchema>;

//optional:=Create a schema with confirm password ,in server we dont need confirm paasword
export const registrationUserwithConfirmSchema = registrationUserSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
// refine()It runs custom validation after the schema fields are checked.
//path: ["confirmPassword"]:This attaches the error specifically to the confirmPassword field, so form libraries can show the error under that input.
//z.infer:=It extracts the TypeScript type from the schema.

export type RegistrationUserWithConfirmData = z.infer<
  typeof registrationUserwithConfirmSchema
>;

export const loginUserSchema = z.object({
  email: z
  .email('Please enter a valid email address')
  .max(255, 'Email should not exceed 255 characters')
  .transform((email) => email.trim().toLowerCase()),

  
  password: z
    .string()
    .min(8, 'Password must be at least 8 character long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'Password must contain one lowercase,one uppercase and one number'
    ),
});
export type LoginUserData = z.infer<typeof loginUserSchema>;
