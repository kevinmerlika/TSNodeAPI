import { Connection, ConnectionConfig, PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2';
import { User } from '../entities/user/user';
import { UserRepository } from './userRepository';
import mysql from 'mysql2';


export class UserRepositoryImpl implements UserRepository {

    private static instance: UserRepositoryImpl;
    private connectionManager: PoolConnection;

    private constructor(connection: PoolConnection) {
        this.connectionManager = connection;
    }

    static getInstance(connection: PoolConnection): UserRepositoryImpl {
        if (!UserRepositoryImpl.instance) {
            UserRepositoryImpl.instance = new UserRepositoryImpl(connection);
        }
        return UserRepositoryImpl.instance;
    }


    
    async findById(id: string): Promise<User | null> {
        const connection = this.connectionManager;

        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const rows = <RowDataPacket[]>results;
                    if (rows.length === 0) {
                        resolve(null); // No user found with the given ID
                    } else {
                        const userRow = rows[0];
                        const user: User = {
                            id: userRow.id,
                            username: userRow.username,
                            email: userRow.email,
                            // Include other user properties as needed
                        };
                        resolve(user);
                    }
                }
            });
        });
    }



    findByEmail(email: string): Promise<User | null> {

        const connection = this.connectionManager;

        console.log(`Looking in db -> ${email}`);
        

        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const rows = <RowDataPacket[]>results;
                    if (rows.length === 0) {
                        resolve(null); // No user found with the given ID
                    } else {
                        const userRow = rows[0];
                        const user: User = {
                            id: userRow.id,
                            username: userRow.username,
                            email: userRow.email,
                            // Include other user properties as needed
                        };
                        resolve(user);
                    }
                }
            });
        });
    }

    async createUser(user: User): Promise<User> {
        const connection = this.connectionManager;

        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO users SET ?', user, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const insertResult = <ResultSetHeader>result;
                    user.id = insertResult.insertId;
                    resolve(user);
                }
            });
        });
    }
}