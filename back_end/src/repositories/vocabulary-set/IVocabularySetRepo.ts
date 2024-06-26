import { Constants } from '@src/core/Constant';
import { createNewCardData, CreateNewSetData } from '@src/dto/set';
import { Cards } from '@src/entity/Cards';
import { Sets } from '@src/entity/Sets';

export interface IVocabularySetRepo {
  create_new_set_and_cards(
    userId: string,
    set: CreateNewSetData,
    cards: createNewCardData[] | undefined,
  ): Promise<any>;

  get_all_public_sets(data: any): Promise<[Sets[], number]>;

  get_set_by_id(setId: string): Promise<Sets | null>;

  edit_set(set: Sets): Promise<Sets>;

  deleteSetById(setId: string): Promise<any>;

  createSet(set: CreateNewSetData | Sets): Promise<Sets | null>;

  getSetsByStatus(status: string): Promise<[Sets[], number]>;
}
