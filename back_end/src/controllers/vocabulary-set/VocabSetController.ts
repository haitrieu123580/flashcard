import { Request, Response } from 'express';
import { Container, Inject } from 'typedi';
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
  SuccessMsgResponse,
  SuccessResponse,
} from '@src/core/ApiResponse';
import { createNewSetAndCardsRequest, UpdateSetRequest } from '@src/dto/set';
import { GetAllPublicSetRequest } from '@src/dto/set/GetAllPublicSetRequest';
import { IVocabularySetService } from '@services/vocabulary-set/IVocabularySetService';
import VocabularySetService from '@services/vocabulary-set/VocabularySetService';

class VocabularySetController {
  private service: IVocabularySetService;
  constructor() {
    this.service = Container.get(VocabularySetService);
  }

  get_all_public_sets = async (req: Request, res: Response): Promise<any> => {
    const query: GetAllPublicSetRequest = {
      page_size: req.query?.page_size?.toString(),
      page_index: req.query?.page_index?.toString(),
      filter: req.query?.filter?.toString(),
      name: req.query?.name?.toString(),
    };
    const result = await this.service.get_all_public_sets(query);
    if (result) {
      return new SuccessResponse('Get all public sets successfully', {
        ...result,
      }).send(res);
    }

    return new FailureMsgResponse('Empty!').send(res);
  };

  getSet = async (req: Request, res: Response): Promise<any> => {
    const setId = req.params.id;
    const result = await this.service.getSet(setId);
    if (result) {
      return new SuccessResponse('Get set successfully', {
        ...result,
      }).send(res);
    }
  };

  // Change 'req' type from 'Request' to 'data' after verifyToken middleware, (user id)
  createSet = async (req: any, res: Response): Promise<any> => {
    const cards = [];
    const formData = req.body;
    const files = req.files;
    if (!formData.set_name) {
      throw new BadRequestError('Set name is required');
    }
    for (let i = 0; formData[`card[${i}].term`]; i++) {
      let image = null;
      const term = formData[`card[${i}].term`];
      const define = formData[`card[${i}].define`];
      const example = formData[`card[${i}].example`];
      files.forEach((file: any) => {
        if (file.fieldname === `card[${i}].image`) {
          image = file;
        }
      });
      cards.push({ term, define, image, example });
    }

    const data: createNewSetAndCardsRequest = {
      user: {
        id: req?.user.id,
        email: req?.user.email,
        role: req?.user.role,
        username: req?.user.username,
      },
      set_name: formData.set_name,
      set_description: formData.set_description,
      set_image: files.find((file: any) => file.fieldname === 'set_image'),
      level: formData.level,
      cards: cards,
    };
    await this.service.CreateSetAndCards(data);
    return new SuccessMsgResponse('Create set successfully').send(res);
  };

  updateSet = async (req: any, res: Response): Promise<any> => {
    const data: UpdateSetRequest = {
      user: {
        id: req?.user.id,
        email: req?.user.email,
        role: req?.user.role,
        username: req?.user.username,
      },
      id: req.params.id,
      set_name: req.body.set_name,
      set_description: req.body.set_description,
      is_delete_image: req.body.is_delete_image,
      level: req.body.level,
      files: req.files,
    };
    const response = await this.service.editSet(data);
    if (response) {
      return new SuccessMsgResponse('Update set successfully').send(res);
    }
    throw new InternalError('Update set failed! Please try again later.');
  };

  deleteSet = async (req: Request, res: Response): Promise<any> => {
    return this.service.deleteSet(req, res);
  };
}
export default VocabularySetController;
