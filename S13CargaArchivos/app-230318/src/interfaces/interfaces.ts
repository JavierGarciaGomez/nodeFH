import { Request } from "express";
import { Document, ObjectId } from "mongoose";

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

export interface ICategory extends Document {
  name: string;
  active: Boolean;
  createdBy: ObjectId;
  updatedBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct extends Document {
  name: string;
  price: number;
  active: Boolean;
  category: ObjectId;
  createdBy: ObjectId;
  updatedBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  uid: string;
  iat: number;
  exp: number;
}

export interface RequestWithUid extends Request {
  user?: IUser;
}

export interface GooglePayload {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}
