import { webConfigRepositoryImpl } from "../repositories/webConfigRepositoryImpl";

export class webConfigService {
    constructor(private webConfigRepository: webConfigRepositoryImpl) {
        console.log("creating webConfigRepository");
        
    }
    

    async getWebConfigurations(userId: string): Promise<any | null>{
        console.log("good it reached service");
        
        return this.webConfigRepository.getUserWebItems(userId)
    }
}
