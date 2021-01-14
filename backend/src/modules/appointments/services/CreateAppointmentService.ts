import { startOfHour } from 'date-fns';
import { getCustomRepository, getRepository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

class CreateAppointmentServices {
  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const usersRepository = getRepository(User);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const checkUserExists = await usersRepository.findOne({
      where: {
        id: provider_id,
      },
    });

    if (!checkUserExists) {
      throw new AppError('this provider not found,', 401);
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentServices;
