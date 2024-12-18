import { Response } from "express";

export const handleError = (
  res: Response,
  error: unknown,
  message: string = "An error occurred",
  statusCode: number = 500
): void => {
  if (error instanceof Error) {
    console.error("Error:", error.message);
    res.status(statusCode).json({ message: `${message}: ${error.message}` });
  } else {
    console.error("Unknown error:", error);
    res.status(statusCode).json({ message: message });
  }
};
