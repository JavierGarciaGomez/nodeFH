import bcrypt from "bcrypt";

const saltRounds = 10;

export const createHashedPassword = async (password: string) =>
  await bcrypt.hash(password, saltRounds);

export const validatePassword = async (
  enteredPassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};
