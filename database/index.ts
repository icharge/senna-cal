import 'reflect-metadata';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { EventEntity } from '../entity/event.entity';

export const initializeDatabase = async (
  optionOverrides: Record<string, any> = {}
): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions();
  const options: any = {
    ...connectionOptions,
    // entities: [__dirname + '/entity/*.entity{.ts,.js}'],
    entities: [EventEntity],
    migrations: [__dirname + '/migrations/*.ts'],
    // synchronize: true,
    // autoSchemaSync: true,
    ...optionOverrides,
  };

  const connection = await createConnection(options);

  return connection;
};

export default initializeDatabase;
