import { Request, Response } from 'express';
import { EditUserProfileRequest } from '@src/dto/user';

export interface UserServiceInterface {
  editProfile: (data: EditUserProfileRequest) => Promise<any>;

  changePassword: (userId: any, data: any) => Promise<any>;
}
