import { Db, MigrationInterface, MongoClient } from '@/imports';
import { envConfig } from '@/config';
import { userRoles } from '@/config/userRoles.config';

export class Roles implements MigrationInterface {
  public async up(db: Db, client: MongoClient): Promise<void> {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await db
          .collection(envConfig.DB_COLLECTION_NAME_ROLES)
          .insertMany(userRoles);
      });
    } finally {
      await session.endSession();
    }
  }
  public async down(db: Db, client: MongoClient): Promise<void> {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await db
          .collection(envConfig.DB_COLLECTION_NAME_ROLES)
          .deleteMany(userRoles);
      });
    } finally {
      await session.endSession();
    }
  }
}
