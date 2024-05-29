import { UserJWTData } from "../auth"
export type ApproveSetRequest = {
    user: UserJWTData | undefined;
    setId: string;
    level?: number;
}