import { MongooseError } from "mongoose";

export interface ExpressError extends Partial<Error> {
  status: number;
}

export interface MongoError extends Partial<MongooseError> {
  status: number;
  code: number;
}
