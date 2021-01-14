import { Router } from 'express';

import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const userRepository = new UserRepository();
  const authenticateUser = new AuthenticateUserService(userRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

export default sessionsRouter;
