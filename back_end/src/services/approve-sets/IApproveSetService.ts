import { ApproveSetRequest } from '@dto/approve-sets/index';

export interface IApproveSetService {
    getPendingSets(): Promise<any>;
    approveSet(data: ApproveSetRequest): Promise<any>;
    rejectSet(data: ApproveSetRequest): Promise<any>;

    getSetByAdmin(data: any): Promise<any>;

}