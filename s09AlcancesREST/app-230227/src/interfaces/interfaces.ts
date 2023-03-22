import { Document } from "mongoose";

// export enum UserRole {
//   ADMIN_ROLE = "admin",
//   USER_ROLE = "user",
// }

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  imgUrl: string;
  role: string;
  active: boolean;
  googleCreated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRole extends Document {
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
