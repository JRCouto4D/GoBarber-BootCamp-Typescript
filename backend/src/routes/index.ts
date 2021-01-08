import { Router } from 'express';
import AppointmentRouter from './appointments.routes';
import UserRouter from './users.routes';
import SessionRouter from './sessions.routes';
import eusureAuthenticated from '../middlewares/eusureAuthenticated';

const routes = Router();

routes.use('/sessions', SessionRouter);
routes.use('/users', UserRouter);

routes.use(eusureAuthenticated);
routes.use('/appointment', AppointmentRouter);

export default routes;
