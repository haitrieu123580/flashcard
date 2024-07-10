import { Request } from 'express';

import { User } from '../../entity/User';

export interface UserRepoInterface {
  createUser: (data: any) => Promise<User | null>;

  me: (id: string) => Promise<User | null>;

  updateUserProfile: (data: User) => Promise<User | null>;

  //todo : delete this function
  storeToken: (id: string, token: string) => Promise<boolean>;

  updateUserPassword: (id: string, password: string) => Promise<boolean>;

  getAllUserInfoBy: (
    searchBy: string,
    searchValue: any,
  ) => Promise<User | null>;

  getUserBy: (searchBy: string, searchValue: any) => Promise<User | null>;
}
export default UserRepoInterface;
