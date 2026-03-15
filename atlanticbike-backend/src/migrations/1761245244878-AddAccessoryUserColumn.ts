import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccessoryUserColumn1761245244878 implements MigrationInterface {
    name = 'AddAccessoryUserColumn1761245244878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accessories" ADD "updated_or_created_by" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accessories" DROP COLUMN "updated_or_created_by"`);
    }

}
