import { MigrationInterface, QueryRunner } from 'typeorm';

export class addLocaleFieldUser1664798046955 implements MigrationInterface {
  name = 'addLocaleFieldUser1664798046955';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "locale" character varying DEFAULT 'RU'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "locale"`);
  }
}
