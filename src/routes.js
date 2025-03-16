//Importo somente a funcão router
import { Router } from 'express';

import DashboardsController from './app/controllers/DashboardsController';
import SessionsController from './app/controllers/SessionsController';
import authMiddleware from './app/middlewares/auth';

//Importar validações de Query
import { validateDashboard } from './app/middlewares/validator';

const routes = new Router();

//################## PROOF #####################
//Session
routes.post('/proof/session', SessionsController.store);
routes.get('/proof/dashboard', validateDashboard, DashboardsController.index);

//################## PROOF #####################

//################## MIDDLEWARE AUTH #####################
routes.use(authMiddleware);
//################## MIDDLEWARE AUTH #####################

//################## AUTH PROOF #####################
//Dashboard
//################## AUTH PROOF #####################

export default routes;
