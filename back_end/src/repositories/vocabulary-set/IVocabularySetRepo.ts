import { Sets } from "@src/entity/Sets";
import { CreateNewSetData, createNewCardData } from "@src/dto/set";
import { Cards } from "@src/entity/Cards";

export interface IVocabularySetRepo {

    create_new_set_and_cards(userId: string, set: CreateNewSetData, cards: createNewCardData[] | undefined): Promise<any>;

    get_all_public_sets(data: any): Promise<[Sets[], number]>;

    get_set_by_id(setId: string): Promise<Sets | null>;

    edit_set_by_id(set: Sets): Promise<Sets>;

    deleteSetById(setId: string): Promise<any>;

    createSet(set: CreateNewSetData): Promise<any>;
}