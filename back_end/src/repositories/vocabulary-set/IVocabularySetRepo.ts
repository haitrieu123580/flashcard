
export interface IVocabularySetRepo {

    create_new_set_and_cards(userId: string, set: any, cards: any): Promise<any>;

    get_all_public_sets(data: any): Promise<any>;

    get_set_by_id(setId: string): Promise<any>;

    edit_set_by_id(setId: string, set: any): Promise<any>;

    deleteSetById(setId: string): Promise<any>;

    isExistSet(setId: string): Promise<boolean>;

    createSet(set: any): Promise<any>;

}