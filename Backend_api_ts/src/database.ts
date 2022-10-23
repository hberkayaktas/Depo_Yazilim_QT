import { createPool, Pool } from 'mysql2/promise'

export async function connect(): Promise<Pool> {
    const connection = await createPool({
      host:'localhost',
      user: 'root',
      database: 'node-app2',
      password:'123456',
    });
    return connection;
}