import { User } from '@entity/User';

export type CreateNewSetData = {
  name: string;
  description?: string;
  image?: string;
  is_public: boolean;
  level: number;
  created_by?: string;
  user?: User;
  cards?: {
    id: string;
    term: string;
    define: string;
    image?: string;
    example?: string;
  }[];
  questions?: {
    id: string;
    question: string;
    answer: string;
  }[];
};

export type UpdateSetRequest = {
  // todo: create jwt data type
  user:
  | {
    id: string;
    role: string;
    email: string;
    username: string;
  }
  | undefined;
  id: string;
  set_name: string;
  set_description?: string;
  is_delete_image?: 'true' | 'false' | undefined;
  files?: any;
  level?: number | string;
  cards?: {
    term: string;
    define: string;
    example?: string;
    image?: any;
  };
};

export type createNewSetAndCardsRequest = {
  user?:
  | {
    id: string;
    role: string;
    email: string;
    username: string;
  }
  | undefined;
  set_name: string;
  set_description?: string;
  set_image?: any;
  is_public?: boolean;
  files?: any;
  level?: number | string;
  cards?: {
    term: string;
    define: string;
    example?: string;
    image?: any; //raw image binary
  }[];
};

export type createNewCardData = {
  term: string;
  define: string;
  image?: string;
  example?: any;
};
