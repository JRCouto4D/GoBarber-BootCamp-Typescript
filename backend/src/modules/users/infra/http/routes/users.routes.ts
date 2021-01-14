import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import eusureAuthenticated from '@modules/users/infra/http/middlewares/eusureAuthenticated';
import multerConfig from '@config/upload';

import UploadUserAvatarService from '@modules/users/services/UploadUserAvatarService';

const userRoute = Router();
const upload = multer(multerConfig);

userRoute.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

userRoute.patch(
  '/avatar',
  eusureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const uploadUserAvatar = container.resolve(UploadUserAvatarService);

    const user = await uploadUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default userRoute;
