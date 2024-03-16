import { Connection, ConnectionConfig, PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2';
import { webConfigRepository } from "./webConfigRepository";

export class webConfigRepositoryImpl implements webConfigRepository {


    private static instance: webConfigRepositoryImpl;
    private connectionManager: PoolConnection;

    constructor(connection: PoolConnection){
        this.connectionManager = connection;
    }


    static getInstance(connection: PoolConnection): webConfigRepositoryImpl{
        if (!webConfigRepositoryImpl.instance) {
            console.log("got connectionnnn");
            
            webConfigRepositoryImpl.instance = new webConfigRepositoryImpl(connection);
        }
        return webConfigRepositoryImpl.instance;

    } 

    async getUserWebItems(id: String): Promise<any> {
        const connection = this.connectionManager;
        console.log(connection);
        
        console.log("retrieving navbar items");
    }

}