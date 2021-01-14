import path from 'path';
import fs from 'fs';

import UploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

class UploadUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

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

    await this.usersRepository.save(user);

    return user;
  }
}

export default UploadUserAvatarService;
