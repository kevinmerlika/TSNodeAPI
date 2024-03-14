import mysql, { Connection } from 'mysql2';
import { PoolConnection } from 'mysql2/typings/mysql/lib/PoolConnection';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file


// Load environment variables from .env file
export class ConnectionManager {
    private static instance: ConnectionManager;
    private connection: any;

    

    private constructor() {

        console.log(process.env.DB_HOST);
        console.log(process.env.DB_PASSWORD);

        
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        this.connection.connect((err: any) => {
            if (err) {
                console.log(err);
                
                console.error('Error connecting to MySQL:', err);
                throw err;
            }
            console.log('Connected to MySQL database');
        });
    }

    public static getInstance(): ConnectionManager {
        if (!ConnectionManager.instance) {
            ConnectionManager.instance = new ConnectionManager();
            console.log("got instance new");
            
        }
        console.log("it exists");
        
        return ConnectionManager.instance;
    }

    public getConnection(): PoolConnection {
        return this.connection;
    }
}
