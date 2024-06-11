import { Service } from 'typedi';
import { comparePassword, hasingPassword } from '@helper/HashingPassword';

import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';
import UserRepoInterface from './UserRepoInterface';

@Service()
class UserRepo implements UserRepoInterface {
  private userDataSource = AppDataSource.getRepository(User);

  createUser = (data: any): Promise<User | null> => {
    const user = new User();
    user.email = data.email;
    user.username = data.username;
    const { password } = hasingPassword(String(data.password));
    user.password = password;
    return this.userDataSource.save(user);
  };

  me = async (id: string): Promise<User | null> => {
    const result = await this.userDataSource.findOne({
      where: {
        id: id,
      },
    });
    return result;
  };

  updateUserProfile = async (data: User): Promise<User | null> => {
    data.updated_at = new Date();
    return this.userDataSource.save(data);
  };

  storeToken = async (id: string, token: string): Promise<boolean> => {
    const user = await this.userDataSource.findOneBy({
      id: id,
    });
    if (user) {
      user.token = token;
      user.updated_at = new Date();
      const result = await this.userDataSource.save(user);
      if (result) return true;
      return false;
    }
    return false;
  };

  updateUserPassword = async (
    userId: string,
    newPassword: string,
  ): Promise<boolean> => {
    const updatedUser = await this.userDataSource.findOne({
      where: {
        id: userId,
      },
    });
    if (updatedUser) {
      updatedUser.password = newPassword;
      updatedUser.updated_at = new Date();
      const result = await this.userDataSource.save(updatedUser);
      if (result) return true;
      return false;
    }
    return false;
  };

  getAllUserInfoBy = async (
    searchBy: string,
    searchValue: any,
  ): Promise<User | null> => {
    const result = await this.userDataSource.findOne({
      where: {
        [searchBy]: searchValue,
      },
      select: [
        'id',
        'username',
        'email',
        'password',
        'role',
        'avatar',
        'created_at',
        'updated_at',
      ],
    });
    return result;
  };

  getUserBy = (searchBy: string, searchValue: any): Promise<User | null> => {
    return this.userDataSource.findOne({
      where: {
        [searchBy]: searchValue,
      },
      relations: {
        sets: true,
      },
    });
  };
}

export default UserRepo;
