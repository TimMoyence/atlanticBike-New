import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdInUpdateorCreateTable1761247948824 implements MigrationInterface {
    name = 'AddUserIdInUpdateorCreateTable1761247948824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_or_created_by" integer`);
        await queryRunner.query(`ALTER TABLE "bike_categories" ADD "updated_or_created_by" integer`);
        await queryRunner.query(`ALTER TABLE "bike_history" ADD "updated_or_created_by" integer`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD "updated_or_created_by" integer`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "updated_or_created_by" integer`);
        await queryRunner.query(`ALTER TABLE "parts" ADD "updated_or_created_by" integer`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "updated_or_created_by" integer`);
        await queryRunner.query(`ALTER TABLE "rental_packs" ADD "updated_or_created_by" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rental_packs" DROP COLUMN "updated_or_created_by"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "updated_or_created_by"`);
        await queryRunner.query(`ALTER TABLE "parts" DROP COLUMN "updated_or_created_by"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "updated_or_created_by"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP COLUMN "updated_or_created_by"`);
        await queryRunner.query(`ALTER TABLE "bike_history" DROP COLUMN "updated_or_created_by"`);
        await queryRunner.query(`ALTER TABLE "bike_categories" DROP COLUMN "updated_or_created_by"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_or_created_by"`);
    }

}
