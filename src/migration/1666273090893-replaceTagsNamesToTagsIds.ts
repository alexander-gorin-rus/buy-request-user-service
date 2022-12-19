import { MigrationInterface, QueryRunner } from 'typeorm';

export class replaceTagsNamesToTagsIds1666273090893
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION dblink;`);

    const tags = await queryRunner.query(
      `SELECT * FROM dblink('dbname=product_service', 'select id, name from public.tag tags') tags (id uuid, name text)`,
    );
    const settings = await queryRunner.query(`SELECT * FROM public.setting`);

    for (const setting of settings) {
      const newTags = tags.filter((tag) => setting.tags.includes(tag.name));
      await queryRunner.query(
        `UPDATE public.setting SET tags='{${newTags.map(
          (tag) => tag.id,
        )}}' WHERE id='${setting.id}'`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tags = await queryRunner.query(
      `SELECT * FROM dblink('dbname=product_service', 'select id, name from public.tag tags') tags (id uuid, name text)`,
    );
    const settings = await queryRunner.query(`SELECT * FROM public.setting`);

    for (const setting of settings) {
      const newTags = tags.filter((tag) => setting.tags.includes(tag.id));
      await queryRunner.query(
        `UPDATE public.setting SET tags='{${newTags.map(
          (tag) => tag.name,
        )}}' WHERE id='${setting.id}'`,
      );
    }

    await queryRunner.query(`DROP EXTENSION dblink;`);
  }
}
