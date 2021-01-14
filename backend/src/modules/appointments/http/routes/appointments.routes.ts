import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../../infra/typeorm/repositories/AppointmentsRepository';

import CreateAppointmentServices from '../../services/CreateAppointmentService';

const appointmentRouter = Router();

appointmentRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parseDate = parseISO(date);

  const createAppointment = new CreateAppointmentServices();

  const appointment = await createAppointment.execute({
    provider_id,
    date: parseDate,
  });

  return response.json(appointment);
});

export default appointmentRouter;
