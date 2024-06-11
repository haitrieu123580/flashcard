import { NewCardData } from '@src/dto/cards';
import { Cards } from '@src/entity/Cards';
import { Sets } from '@src/entity/Sets';
import { User } from '@src/entity/User';

export interface IVocabularyCardRepo {
  create_card(user: User, set: Sets, cards: NewCardData): Promise<Cards | null>;

  edit_card(card: Cards): Promise<Cards | null>;

  delete_card(cardId: string): Promise<boolean>;

  isExistCard(cardId: string): Promise<boolean>;

  getCardById(cardId: string): Promise<any>;
}
