import { Request, Response } from 'express';
import Logger from '../logger/logger';
import BadRequestDefaultResponse from './models/default_response/bad_request_default_response';
import DefaultResponse from './models/default_response/default_response';
import ForbiddenDefaultResponse from './models/default_response/forbidden_default_response';
import InternalErrorDefaultResponse from './models/default_response/internal_error_default_response';
import NotFoundDefaultResponse from './models/default_response/not_found_default_response';
import NoContentDefaultResponse from './models/default_response/no_content_default_response';
import OkDefaultResponse from './models/default_response/ok_default_response';
import routeHandler from './models/route_handler';

const logger = new Logger('DefaultRouteWrapper');

const defaultRouteWrapper = (route: routeHandler): ((req: Request, res: Response) => void) => {
	return async (req: Request, res: Response) => {
		try {
			const response = await route(req, res);
			if (!response) {
				throw new Error('No response from route handler!');
			}

			res.status(response.status);
			res.send(response.message);
		} catch (error) {
			logger.error(error);
			logger.trace(error);

			res.status(500);
			res.send(`Internal server error (${error})`);
		}
	};
};

export {
	defaultRouteWrapper,
	DefaultResponse,
	OkDefaultResponse,
	NoContentDefaultResponse,
	BadRequestDefaultResponse,
	ForbiddenDefaultResponse,
	NotFoundDefaultResponse,
	InternalErrorDefaultResponse,
	routeHandler,
};
