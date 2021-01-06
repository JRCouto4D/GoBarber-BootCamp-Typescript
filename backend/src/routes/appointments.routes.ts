import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import CreateAppointmentServices from '../services/CreateAppointmentServices';

const appointmentRouter = Router();
const appointmentRepository = new AppointmentsRepository();

appointmentRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.all();

  return response.json(appointments);
});

appointmentRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentServices(
      appointmentRepository,
    );

    const appointment = createAppointment.execute({
      provider,
      date: parseDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentRouter;
