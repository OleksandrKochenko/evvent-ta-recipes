import { ExpressError } from "./customTypes";

const messageList: object = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

export const HttpError = (
  status: number,
  message: string = messageList[status as keyof object]
) => {
  const error = new Error(message) as ExpressError;
  error.status = status;
  return error;
};
