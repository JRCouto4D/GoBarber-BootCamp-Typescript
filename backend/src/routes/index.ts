import { Router } from 'express';
import AppointmentRouter from './appointments.routes';

const routes = Router();

routes.use('/appointment', AppointmentRouter);

export default routes;
