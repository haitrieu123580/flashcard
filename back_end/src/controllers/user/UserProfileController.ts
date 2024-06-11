import { Container } from 'typedi';
import { FailureMsgResponse, SuccessMsgResponse } from '@src/core/ApiResponse';
import { UserService } from '@src/services/user/UserService';
import { UserServiceInterface } from '@src/services/user/UserServiceInterface';

export class UserProfileController {
  private userService: UserServiceInterface;

  constructor() {
    this.userService = Container.get(UserService);
  }

  editProfile = async (req: any, res: any) => {
    const data = {
      image: req.file,
      username: req.body.username,
      email: req.body.email,
      user: req.user,
    };
    const response = await this.userService.editProfile(data);
    if (response) {
      return new SuccessMsgResponse('Profile updated successfully.').send(res);
    }
    return new FailureMsgResponse('Profile updated failed').send(res);
  };

  changePassword = async (req: any, res: any) => {
    await this.userService.changePassword(req, res);
  };
}
