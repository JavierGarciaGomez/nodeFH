import bcrypt from "bcrypt";

const saltRounds = 10;

export const createHashedPassword = async (password: string) =>
  await bcrypt.hash(password, saltRounds);
