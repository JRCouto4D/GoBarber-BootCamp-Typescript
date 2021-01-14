import { Router } from 'express';
import AppointmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import UserRouter from '@modules/users/http/routes/users.routes';
import eusureAuthenticated from '@modules/users/http/middlewares/eusureAuthenticated';
import SessionRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', SessionRouter);
routes.use('/users', UserRouter);

routes.use(eusureAuthenticated);
routes.use('/appointment', AppointmentRouter);

export default routes;
