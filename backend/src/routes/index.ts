import { Router } from 'express';
import AppointmentRouter from './appointments.routes';
import UserRouter from './users.routes';

const routes = Router();

routes.use('/appointment', AppointmentRouter);
routes.use('/users', UserRouter);

export default routes;
