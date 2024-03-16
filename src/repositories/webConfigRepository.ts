import { User } from '../entities/user/user';

export interface webConfigRepository {
    getUserWebItems(id: String): Promise<any>
}