import { Request, Response } from 'express';
import { Container, Service } from 'typedi';
import {
  ApiError,
  AuthFailureError,
  BadRequestError,
  ErrorType,
  ForbiddenError,
  InternalError,
  NoDataError,
  NotFoundError,
} from '@src/core/ApiError';
import { FailureMsgResponse, SuccessMsgResponse } from '@src/core/ApiResponse';
import { Constants } from '@src/core/Constant';
import { createNewSetAndCardsRequest, UpdateSetRequest } from '@src/dto/set';
import { GetAllPublicSetRequest } from '@src/dto/set/GetAllPublicSetRequest';
import {
  SetsListResponse,
  SetsServiceResponse,
} from '@src/dto/set/SetsListResponse';
import { Sets } from '@src/entity/Sets';
import { TestKits } from '@src/entity/TestKit';
import { S3Service } from '@services/s3/S3Service';
import { IVocabularyCardRepo } from '@repositories/vocabulary-card/IVocabularyCardRepo';
import { VocabularyCardRepo } from '@repositories/vocabulary-card/VocabularyCardRepo';
import { IVocabularySetRepo } from '@repositories/vocabulary-set/IVocabularySetRepo';
import { VocabularySetRepo } from '@repositories/vocabulary-set/VocabularySetRepo';
import { FirebaseUploadService } from '@services/firebase/firebaseUploadService';
import { IVocabularySetService } from './IVocabularySetService';

@Service()
class VocabularySetService implements IVocabularySetService {
  private setRepo: IVocabularySetRepo;
  private s3Service: S3Service;
  private cardRepo: IVocabularyCardRepo;
  private firebaseUploadService: FirebaseUploadService;

  constructor() {
    this.setRepo = Container.get(VocabularySetRepo);
    this.s3Service = Container.get(S3Service);
    this.cardRepo = Container.get(VocabularyCardRepo);
    this.firebaseUploadService = Container.get(FirebaseUploadService);
  }

  get_all_public_sets = async (
    query: GetAllPublicSetRequest,
  ): Promise<SetsListResponse | null> => {
    const { page_size, page_index, filter, name } = query;
    let data = {};
    const take = Number(page_size) || Constants.DEFAULT_PAGINATION.take;
    let skip = 0;
    if (Number(page_index) === 1) {
      skip = 0;
    } else {
      skip =
        (Number(page_index) - 1) * Number(page_size) ||
        Constants.DEFAULT_PAGINATION.skip;
    }
    if (filter === 'asc' || filter === 'desc') {
      data = { take: take, skip: skip, filter, sortBy: 'setName' };
    } else if (filter === 'latest' || filter === 'oldest') {
      data = { take: take, skip: skip, filter, name, sortBy: 'createdDate' };
    } else if (filter === 'level_asc' || filter === 'level_desc') {
      data = { take: take, skip: skip, filter, name, sortBy: 'level' };
    } else {
      data = { take: take, skip: skip, filter, name, sortBy: 'createdDate' };
    }
    const [sets, count] = await this.setRepo.get_all_public_sets(data);
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
          totalTestKits: set?.testKits?.length,
        })),
        count,
      };
    } else {
      throw new NoDataError('Set not found!');
    }
  };

  getSet = async (setId: string): Promise<Sets | null | undefined | any> => {
    const set = await this.setRepo.get_set_by_id(setId);
    if (!setId) {
      throw new BadRequestError('Set id is required');
    }
    if (!set) {
      throw new NoDataError('Set not found!');
    }
    if (set?.is_public === false) {
      throw new BadRequestError('Set not public');
    }
    if (set) {
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
    }
  };

  deleteSet = async (req: Request, res: Response): Promise<any> => {
    try {
      const id = req.params.id;
      const isExist = await this.setRepo.get_set_by_id(id);
      if (isExist) {
        const result = await this.setRepo.deleteSetById(id);
        if (result) {
          return new SuccessMsgResponse('Delete set successfully').send(res);
        }
        return new FailureMsgResponse('Delete set failed').send(res);
      }
      return new FailureMsgResponse('Set not founded!').send(res);
    } catch (error) {}
  };
  CreateSetAndCards = async (data: createNewSetAndCardsRequest) => {
    let is_public = false;
    if (data.user) {
      const { id, role } = data.user;
      is_public = Number(role) === Constants.USER_ROLE.ADMIN;
    }
    const userId = data?.user?.id || '';
    if (data.cards) {
      for (let i = 0; i < data.cards.length; i++) {
        const card = data.cards[i];
        const image = card.image;
        const image_url = image ? await this.firebaseUploadService.uploadFile(image) : null;
        card.image = image_url?.downloadURL || '';
      }
    }
    const set_image_url = data.set_image
      ? await this.firebaseUploadService.uploadFile(data.set_image)
      : null;
    const set = {
      name: data.set_name,
      description: data.set_description,
      image: set_image_url?.downloadURL || '',
      is_public: is_public,
      level: Number(data.level),
    };
    return this.setRepo.create_new_set_and_cards(userId, set, data?.cards);
  };

  editSet = async (data: UpdateSetRequest): Promise<any> => {
    const setId = data?.id;
    const files = data?.files;
    const isDeleteImage = data.is_delete_image === 'true';
    const { set_name, set_description } = data;
    const set_image = files.find((file: any) => file.fieldname === 'set_image');
    const set_image_url = set_image
      ? await this.firebaseUploadService.uploadFile(set_image)
      : null;
    const updateSet = await this.setRepo.get_set_by_id(setId);
    if (!updateSet) {
      throw new NotFoundError('Set not found!');
    }
    //todo check user is admin or not
    const set = {
      ...updateSet,
      name: set_name,
      description: set_description ? set_description : updateSet.description,
      image: isDeleteImage
        ? null
        : set_image_url
          ? set_image_url.downloadURL
          : updateSet.image,
      level: Number(data.level),
    };
    return this.setRepo.edit_set(set);
  };
}
export default VocabularySetService;
