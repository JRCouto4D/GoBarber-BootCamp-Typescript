import { Router } from 'express';

import eusureAuthenticated from '@modules/users/infra/http/middlewares/eusureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentRouter.use(eusureAuthenticated);

/**
 * appointmentRouter.get('/', async (request, response) => {
      const appointments = await appointmentsRepository.find();

      return response.json(appointments);
  });
 */

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
