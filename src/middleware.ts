import { Request, Response, NextFunction } from 'express';

function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Error) {
    res.status(500).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Unexpected error' });
  }
}

export default errorHandler;
