'use server';
export const loginAction = async (data: {
  email: string;
  password: string;
}) => {
  const { email, password } = data;
  console.log(email,password);
};
