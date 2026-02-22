import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1771747929254 implements MigrationInterface {
    name = 'AutoMigration1771747929254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."loans_assettype_enum" AS ENUM('ERC721', 'ERC1155')`);
        await queryRunner.query(`CREATE TYPE "public"."loans_status_enum" AS ENUM('ACTIVE', 'REPAID', 'LIQUIDATED')`);
        await queryRunner.query(`CREATE TABLE "loans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "borrower" character varying(42) NOT NULL, "assetContract" character varying(42) NOT NULL, "tokenId" character varying NOT NULL, "amount" character varying NOT NULL, "borrowedUSDC" character varying NOT NULL, "debtToRepay" character varying NOT NULL, "dueDate" bigint NOT NULL, "assetType" "public"."loans_assettype_enum" NOT NULL, "status" "public"."loans_status_enum" NOT NULL DEFAULT 'ACTIVE', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5c6942c1e13e4de135c5203ee61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0c8da9759d89f80b2d951e736c" ON "loans" ("borrower") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_0c8da9759d89f80b2d951e736c"`);
        await queryRunner.query(`DROP TABLE "loans"`);
        await queryRunner.query(`DROP TYPE "public"."loans_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."loans_assettype_enum"`);
    }

}
