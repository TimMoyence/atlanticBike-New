import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1761244236742 implements MigrationInterface {
    name = 'InitSchema1761244236742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" character varying(30), "role" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_addresses" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "postal_code" character varying NOT NULL, "country" character varying NOT NULL, "is_default" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_8abbeb5e3239ff7877088ffc25b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bike_categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e0ce1fd7f4b400dd897b17f2904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bike_photos" ("id" SERIAL NOT NULL, "bike_id" integer NOT NULL, "url" text NOT NULL, "is_main" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_9d1d7fee01cd1bd50f1dd58e336" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bike_history" ("id" SERIAL NOT NULL, "bike_id" integer NOT NULL, "type" character varying(20) NOT NULL, "description" text NOT NULL, "performed_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_118c7cda18004f3feb0c8a586be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bikes" ("id" SERIAL NOT NULL, "category_id" integer NOT NULL, "frame_number" character varying NOT NULL, "status" character varying(20) NOT NULL, "purchase_date" date, "sale_price" numeric(10,2), "rental_price_per_day" numeric(10,2), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, CONSTRAINT "UQ_9273147645f365e551b9a9b5e6e" UNIQUE ("frame_number"), CONSTRAINT "PK_5237c1fcb162998a0d31e640814" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "bike_id" integer NOT NULL, "rating" integer NOT NULL, "comment" text NOT NULL, "status" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservations" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "bike_id" integer NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "total_price" numeric(10,2) NOT NULL, "status" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accessories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "stock_quantity" integer NOT NULL, "price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4849cfa5b51ec8d79d0d5f34791" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_items" ("id" SERIAL NOT NULL, "pack_id" integer NOT NULL, "bike_id" integer, "accessory_id" integer, "quantity" integer NOT NULL, CONSTRAINT "PK_094a572d118c1966949e333b682" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rental_packs" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_56a70ce1332f25b559794f5e1e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "repairs" ("id" SERIAL NOT NULL, "bike_id" integer NOT NULL, "mechanic_id" integer, "description" text NOT NULL, "repair_date" date NOT NULL, "cost" numeric(10,2) NOT NULL, "status" character varying(20) NOT NULL, CONSTRAINT "PK_f075e413c4b1d29911f893b33e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parts" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "stock_quantity" integer NOT NULL, "price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_daa5595bb8933f49ac00c9ebc79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "repair_parts" ("id" SERIAL NOT NULL, "repair_id" integer NOT NULL, "part_id" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_64522d389bb8b7e7037e50be305" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_addresses" ADD CONSTRAINT "FK_7a5100ce0548ef27a6f1533a5ce" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bike_photos" ADD CONSTRAINT "FK_8ff4f11147cc5763cc00cfcad18" FOREIGN KEY ("bike_id") REFERENCES "bikes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bike_history" ADD CONSTRAINT "FK_6646bc78d28ce355b2c28e8b0a5" FOREIGN KEY ("bike_id") REFERENCES "bikes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bike_history" ADD CONSTRAINT "FK_eec75263cf67adaab820e878599" FOREIGN KEY ("performed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bikes" ADD CONSTRAINT "FK_c0935a8c3476c6d5eaa84301221" FOREIGN KEY ("categoryId") REFERENCES "bike_categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_cfa45787fd89796f2f7a8f9b361" FOREIGN KEY ("bike_id") REFERENCES "bikes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_4af5055a871c46d011345a255a6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_5a3a2bf984e543cfec3b87f275c" FOREIGN KEY ("bike_id") REFERENCES "bikes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_items" ADD CONSTRAINT "FK_d9b46c42fadee3508c1f65a4051" FOREIGN KEY ("pack_id") REFERENCES "rental_packs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_items" ADD CONSTRAINT "FK_91fea6e8326c32b0a0c7273982f" FOREIGN KEY ("bike_id") REFERENCES "bikes"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_items" ADD CONSTRAINT "FK_d41c3d765f65bca44b45dfcc246" FOREIGN KEY ("accessory_id") REFERENCES "accessories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "repairs" ADD CONSTRAINT "FK_8099b307e4383d21246a09eb65d" FOREIGN KEY ("bike_id") REFERENCES "bikes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "repairs" ADD CONSTRAINT "FK_3ce59f534bde487dff994e5726a" FOREIGN KEY ("mechanic_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "repair_parts" ADD CONSTRAINT "FK_b9b5578bb20ec57702c3038fbb8" FOREIGN KEY ("repair_id") REFERENCES "repairs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "repair_parts" ADD CONSTRAINT "FK_e91eae99d332e24b6c19e34d21b" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repair_parts" DROP CONSTRAINT "FK_e91eae99d332e24b6c19e34d21b"`);
        await queryRunner.query(`ALTER TABLE "repair_parts" DROP CONSTRAINT "FK_b9b5578bb20ec57702c3038fbb8"`);
        await queryRunner.query(`ALTER TABLE "repairs" DROP CONSTRAINT "FK_3ce59f534bde487dff994e5726a"`);
        await queryRunner.query(`ALTER TABLE "repairs" DROP CONSTRAINT "FK_8099b307e4383d21246a09eb65d"`);
        await queryRunner.query(`ALTER TABLE "pack_items" DROP CONSTRAINT "FK_d41c3d765f65bca44b45dfcc246"`);
        await queryRunner.query(`ALTER TABLE "pack_items" DROP CONSTRAINT "FK_91fea6e8326c32b0a0c7273982f"`);
        await queryRunner.query(`ALTER TABLE "pack_items" DROP CONSTRAINT "FK_d9b46c42fadee3508c1f65a4051"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_5a3a2bf984e543cfec3b87f275c"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_4af5055a871c46d011345a255a6"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_cfa45787fd89796f2f7a8f9b361"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf"`);
        await queryRunner.query(`ALTER TABLE "bikes" DROP CONSTRAINT "FK_c0935a8c3476c6d5eaa84301221"`);
        await queryRunner.query(`ALTER TABLE "bike_history" DROP CONSTRAINT "FK_eec75263cf67adaab820e878599"`);
        await queryRunner.query(`ALTER TABLE "bike_history" DROP CONSTRAINT "FK_6646bc78d28ce355b2c28e8b0a5"`);
        await queryRunner.query(`ALTER TABLE "bike_photos" DROP CONSTRAINT "FK_8ff4f11147cc5763cc00cfcad18"`);
        await queryRunner.query(`ALTER TABLE "user_addresses" DROP CONSTRAINT "FK_7a5100ce0548ef27a6f1533a5ce"`);
        await queryRunner.query(`DROP TABLE "repair_parts"`);
        await queryRunner.query(`DROP TABLE "parts"`);
        await queryRunner.query(`DROP TABLE "repairs"`);
        await queryRunner.query(`DROP TABLE "rental_packs"`);
        await queryRunner.query(`DROP TABLE "pack_items"`);
        await queryRunner.query(`DROP TABLE "accessories"`);
        await queryRunner.query(`DROP TABLE "reservations"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "bikes"`);
        await queryRunner.query(`DROP TABLE "bike_history"`);
        await queryRunner.query(`DROP TABLE "bike_photos"`);
        await queryRunner.query(`DROP TABLE "bike_categories"`);
        await queryRunner.query(`DROP TABLE "user_addresses"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
