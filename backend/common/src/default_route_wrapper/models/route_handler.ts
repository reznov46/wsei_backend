import { Request, Response } from 'express';
import DefaultResponse from './default_response/default_response';

type routeHandler = (req: Request, res: Response) => Promise<DefaultResponse>;

export default routeHandler;
