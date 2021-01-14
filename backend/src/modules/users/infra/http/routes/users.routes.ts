import { Router } from 'express';
import multer from 'multer';

import eusureAuthenticated from '@modules/users/infra/http/middlewares/eusureAuthenticated';
import multerConfig from '@config/upload';

import UserAvatarController from '../controllers/UserAvatarController';

import UsersController from '../controllers/UsersController';

const userAvatarController = new UserAvatarController();

const usersController = new UsersController();

const userRoute = Router();
const upload = multer(multerConfig);

userRoute.post('/', usersController.create);

userRoute.patch(
  '/avatar',
  eusureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default userRoute;
