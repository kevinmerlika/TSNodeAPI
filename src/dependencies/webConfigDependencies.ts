import { ConnectionManager } from "../connections/connectionManager";
import { webConfigController } from "../controllers/webConfigController";
import { webConfigRepositoryImpl } from "../repositories/webConfigRepositoryImpl";
import { webConfigService } from "../services/webConfigService";

export function injectWebDependencies() {
    const connectionManager = ConnectionManager.getInstance();
    const connect = connectionManager.getConnection();
    const webConfigRepository: webConfigRepositoryImpl = webConfigRepositoryImpl.getInstance(connect);
    const webconfigservice = new webConfigService(webConfigRepository);
    const webconfigcontroller = new webConfigController(webconfigservice);

    console.log("good");
    console.log(webconfigcontroller);
    
    return webconfigcontroller;
}
