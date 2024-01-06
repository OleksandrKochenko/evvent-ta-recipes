import { MongooseError } from "mongoose";
import { Request } from "express";
import { ObjectId } from "mongodb";
import { JwtPayload } from "jsonwebtoken";

export interface ExpressError extends Partial<Error> {
  status: number;
}

export interface MongoError extends Partial<MongooseError> {
  status: number;
  code: number;
}

export interface RequestWithUser extends Partial<Request> {
  user?: { _id: ObjectId; name: string };
}

export interface JwtPayloadWithId extends Partial<JwtPayload> {
  _id: ObjectId;
}
