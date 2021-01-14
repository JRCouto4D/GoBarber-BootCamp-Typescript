import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentService';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';

const appointmentRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

/**
 * appointmentRouter.get('/', async (request, response) => {
      const appointments = await appointmentsRepository.find();

      return response.json(appointments);
  });
 */

appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parseDate = parseISO(date);

  const createAppointment = new CreateAppointmentServices(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    provider_id,
    date: parseDate,
  });

  return response.json(appointment);
});

export default appointmentRouter;
