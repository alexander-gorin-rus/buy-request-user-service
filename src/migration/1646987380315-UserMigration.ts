import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserMigration1646987380315 implements MigrationInterface {
  name = 'UserMigration1646987380315';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "clientAccountId" text NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "userName" character varying NOT NULL, "phone" character varying NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "company" character varying, "settingId" uuid, CONSTRAINT "REL_a2122bd128c9af8378a378ed6b" UNIQUE ("settingId"), CONSTRAINT "PK_9329565d6c290fbbe2a1134436f" PRIMARY KEY ("id", "clientAccountId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31ef2b4d30675d0c15056b7f6e" ON "user" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "setting" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tags" character varying array NOT NULL, "emails" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_fcb21187dc6094e24a48f677bed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_a2122bd128c9af8378a378ed6b8" FOREIGN KEY ("settingId") REFERENCES "setting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_a2122bd128c9af8378a378ed6b8"`,
    );
    await queryRunner.query(`DROP TABLE "setting"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_31ef2b4d30675d0c15056b7f6e"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
