// export interface GetProfilePayload {
//     // onSuccess?: (data?: any) => void;
//     onError?: (data?: any) => void;
// }
export interface GetProfilePayload {
  data?: {
    username: string;
    password: string;
  };
  onSuccess?: (message?: any) => void;
  onError?: (message?: any) => void;
}
