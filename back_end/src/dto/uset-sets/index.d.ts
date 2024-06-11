import { UserJWTData } from '../auth/index';

export type CopyCardToSetRequest = {
  user: UserJWTData;
  setId: string;
  cardId: string;
};

export type QuickAddCardToSetRequest = {
  user: UserJWTData | undefined;
  cardId: string;
  set_name: string;
};

export type RequestToApproveSet = {
  user: UserJWTData | undefined;
  setId: string;
};
