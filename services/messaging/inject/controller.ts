import { Request, Response, NextFunction } from 'express';
import appDependency, { AppDependency } from '../app.dep';

export type ControllerPayload = {
  req?: Partial<Request>;
  res?: Response;
  next?: NextFunction;
  dep?: AppDependency;
};

export const inject =
  (controller) => (req: Request, res: Response, next: NextFunction) =>
    controller({ req, res, next, dep: appDependency });
