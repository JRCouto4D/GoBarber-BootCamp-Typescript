import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';
import UploadConfig from '../config/upload';

import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UploadUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new AppError('Only authenticate users can change avatar.', 401);
      // Apenas usuários autenticados podem alterar o avatar.
    }

    if (user.avatar) {
      // deletar avatar anterior

      const userAvatarFieldPath = path.join(
        UploadConfig.directory,
        user.avatar,
      );
      /**
       * junta o caminho para pasta tmp, com nome do avatar do usuário, fomando
       * um link para o arquivo
       */

      const userAvatarFileExists = await fs.promises.stat(userAvatarFieldPath);
      // verifica se o arquivo de img existe na pasta tmp

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFieldPath);
        // deleta o arquivo de img da pasta tmp
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UploadUserAvatarService;
