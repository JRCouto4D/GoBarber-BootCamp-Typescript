import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import eusureAuthenticated from '@modules/users/infra/http/middlewares/eusureAuthenticated';
import multerConfig from '@config/upload';

import UploadUserAvatarService from '@modules/users/services/UploadUserAvatarService';

const userRouter = Router();
const upload = multer(multerConfig);

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

userRouter.patch(
  '/avatar',
  eusureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const uploadUserAvatar = new UploadUserAvatarService();

    const user = await uploadUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default userRouter;
