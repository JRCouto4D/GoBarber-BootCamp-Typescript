import User from '../infra/typeorm/entities/User';
import ICreateUsersDTO from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
  save(data: ICreateUsersDTO): Promise<User>;
  create(data: ICreateUsersDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}
