import { Container, Service } from 'typedi';
import {
  ApiError,
  AuthFailureError,
  BadRequestError,
  ErrorType,
  ForbiddenError,
  InternalError,
  NotFoundError,
} from '@src/core/ApiError';
import {
  FailureMsgResponse,
  FailureResponse,
  InternalErrorResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from '@src/core/ApiResponse';
import { Constants } from '@src/core/Constant';
import { CreateNewSetData, UpdateSetRequest } from '@src/dto/set';
import {
  SetsListResponse,
  SetsServiceResponse,
} from '@src/dto/set/SetsListResponse';
import {
  CopyCardToSetRequest,
  QuickAddCardToSetRequest,
  RequestToApproveSet,
} from '@src/dto/uset-sets';
import { Sets } from '@src/entity/Sets';
import { IUserSetsRepo } from '@src/repositories/user-sets/IUserSetsRepo';
import { UserSetsRepo } from '@src/repositories/user-sets/UserSetsRepo';
import { IVocabularyCardRepo } from '@src/repositories/vocabulary-card/IVocabularyCardRepo';
import { VocabularyCardRepo } from '@src/repositories/vocabulary-card/VocabularyCardRepo';
import UserRepo from '@repositories/user/UseRepo';
import UserRepoInterface from '@repositories/user/UserRepoInterface';
import { IVocabularySetRepo } from '@repositories/vocabulary-set/IVocabularySetRepo';
import { VocabularySetRepo } from '@repositories/vocabulary-set/VocabularySetRepo';

import { S3Service } from '../s3/S3Service';
import { IUserSetsService } from './IUserSetsService';

@Service()
export class UserSetsService implements IUserSetsService {
  private userSetsRepo: IUserSetsRepo;
  private userRepo: UserRepoInterface;
  private setRepo: IVocabularySetRepo;
  private cardRepo: IVocabularyCardRepo;
  private s3Service: S3Service;
  constructor() {
    this.userSetsRepo = Container.get(UserSetsRepo);
    this.userRepo = Container.get(UserRepo);
    this.setRepo = Container.get(VocabularySetRepo);
    this.cardRepo = Container.get(VocabularyCardRepo);
    this.s3Service = Container.get(S3Service);
  }
  async getUserSetsList(userId: string): Promise<SetsListResponse | null> {
    const user = await this.userRepo.getUserBy('id', userId);
    if (!user) {
      throw new AuthFailureError('User not found');
    }
    const [sets, count] = await this.userSetsRepo.getUserSetsList(userId);
    if (sets?.length) {
      sets.forEach((set: any) => {
        try {
          set.cards.forEach((card: any) => {
            return (card.example = card.example
              ? JSON.parse(card.example || '')
              : '');
          });
        } catch (error) {}

        return set;
      });
      return {
        sets: sets.map((set: any) => ({
          ...set,
          totalCards: set?.cards?.length,
          totalQuestions: set?.questions?.length,
        })),
        count,
      };
    } else {
      throw new NotFoundError('Set not found!');
    }
  }
  getUserSetById = async (
    userId: string,
    setId: string,
  ): Promise<Sets | any> => {
    const set = await this.setRepo.get_set_by_id(setId);
    const user = await this.userRepo.getUserBy('id', userId);
    if (!set) {
      throw new NotFoundError('Set not found!');
    }
    if (set?.user?.id == user?.id) {
      set.cards.forEach((card: any) => {
        return (card.example = card.example
          ? JSON.parse(card.example || '')
          : '');
      });

      const levelCount = set?.testKits.reduce((count: any, testKit: any) => {
        const level = testKit.level;
        const existingLevel = count.find((item: any) => item.level === level);
        if (existingLevel) {
          existingLevel.count += 1;
        } else {
          count.push({ level, count: 1 });
        }
        return count;
      }, []);

      return {
        ...set,
        levelCount,
      };
    } else {
      throw new AuthFailureError('Set not belong to user');
    }
  };
  addCardToUserSet = async (data: CopyCardToSetRequest): Promise<any> => {
    const { setId, cardId } = data;
    const { id } = data.user;
    //check if set belong to user
    const set = await this.setRepo.get_set_by_id(setId);
    if (set && set?.user?.id === id) {
      const card = await this.cardRepo.getCardById(cardId);
      if (card) {
        return this.userSetsRepo.addCardToSet(set, card);
      } else {
        throw new NotFoundError('Card not found!');
      }
    } else {
      throw new ForbiddenError('Set not belong to user');
    }
  };

  quickCreateSet = async (data: QuickAddCardToSetRequest): Promise<any> => {
    const user = await this.userRepo.getUserBy('id', data.user?.id);
    if (!user) {
      throw new AuthFailureError('User not found');
    }
    if (!data.set_name) {
      throw new BadRequestError('Set name is required');
    }
    const card = await this.cardRepo.getCardById(data.cardId);
    if (!card) {
      throw new NotFoundError('Card not found!');
    }
    const newSet = new Sets();
    newSet.name = data.set_name;
    newSet.is_public = false;
    newSet.created_by = user.username;
    newSet.user = user;
    return this.userSetsRepo.addCardToSet(newSet, card);
  };
  updateUserSet = async (data: UpdateSetRequest): Promise<any> => {
    const setId = data.id;
    const id = data?.user?.id;

    const files = data?.files;
    const isDeleteImage = data.is_delete_image === 'true';
    const { set_name, set_description } = data;
    const set_image = files?.find(
      (file: any) => file.fieldname === 'set_image',
    );
    const updatedSet = await this.setRepo.get_set_by_id(setId);
    const user = await this.userRepo.getUserBy('id', id);
    if (updatedSet?.user?.id !== user?.id) {
      throw new AuthFailureError('Set not belong to user');
    }
    const set_image_url = set_image
      ? await this.s3Service.uploadFile(set_image)
      : null;
    const updateSet = await this.setRepo.get_set_by_id(setId);
    if (!updateSet) {
      throw new NotFoundError('Set not found!');
    }
    const set = {
      ...updateSet,
      name: set_name,
      description: set_description ? set_description : updateSet.description,
      updated_by: user?.email || '',
      image: isDeleteImage
        ? null
        : set_image_url
          ? set_image_url.Location
          : updateSet.image,
    };
    return this.setRepo.edit_set(set);
  };

  deleteUserSet = async (req: any, res: any): Promise<any> => {
    try {
      const setId = req.params.id;
      const { id } = req.user;
      const set = await this.setRepo.get_set_by_id(setId);
      const user = await this.userRepo.getUserBy('id', id);
      if (set?.user?.id !== user?.id) {
        return new FailureMsgResponse('Set not belong to user').send(res);
      }
      const result = await this.setRepo.deleteSetById(setId);
      if (result) {
        return new SuccessMsgResponse('Delete set successfully').send(res);
      }
      return new FailureMsgResponse('Delete set failed').send(res);
    } catch (error) {}
  };

  requestToPublicSet = async (data: RequestToApproveSet): Promise<any> => {
    const { setId } = data;
    if (!data.user?.id || !setId) {
      throw new BadRequestError('Invalid data');
    }
    const user = await this.userRepo.getUserBy('id', data?.user?.id);
    if (!user) {
      throw new AuthFailureError('User not found');
    }
    const set = await this.setRepo.get_set_by_id(data.setId);
    if (!set) {
      throw new NotFoundError('Set not found');
    }
    if (set.user.id !== user.id) {
      throw new ForbiddenError('You cannot approve this set');
    }
    if (set.status === Constants.SET_STATUS.APPROVED) {
      throw new BadRequestError('Set is already approved');
    }
    if (set.status === Constants.SET_STATUS.REJECTED) {
      throw new BadRequestError('Set is already rejected');
    }
    if (set.status === Constants.SET_STATUS.PENDING) {
      throw new BadRequestError('Set is already pending');
    }
    set.status = Constants.SET_STATUS.PENDING;
    const result = await this.setRepo.edit_set(set);
    return result;
  };
}
