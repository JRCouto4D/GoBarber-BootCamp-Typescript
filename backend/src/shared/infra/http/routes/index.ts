import { Router } from 'express';
import AppointmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import UserRouter from '@modules/users/infra/http/routes/users.routes';

import SessionRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', SessionRouter);
routes.use('/users', UserRouter);

routes.use('/appointment', AppointmentRouter);

export default routes;
