import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppointmentsRepository from '../dtos/ICreateAppointmentsRepository';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentsRepository): Promise<Appointment>;
  findByDate(data: Date): Promise<Appointment | undefined>;
}
