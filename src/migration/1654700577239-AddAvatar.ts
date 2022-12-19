import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAvatar1654700577239 implements MigrationInterface {
  name = 'AddAvatar1654700577239';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "avatar" character varying DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
  }
}
