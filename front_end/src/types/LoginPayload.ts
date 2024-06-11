export interface LoginPayload {
  data: {
    username: string;
    password: string;
  };
  onSuccess?: (message?: string) => void;
  onError?: (message?: string) => void;
}
