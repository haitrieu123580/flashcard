
export interface IVocabularyCardRepo {

    create_card(setID: any, cards: any): Promise<boolean>;

    edit_card(cardId: string, cardData: any): Promise<boolean>;

    delete_card(cardId: string): Promise<boolean>;

    isExistCard(cardId: string): Promise<boolean>;

    getCardById(cardId: string): Promise<any>;
}