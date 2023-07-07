import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1688754660952 implements MigrationInterface {
    name = 'initialMigration1688754660952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "registrationDate" TIMESTAMP NOT NULL DEFAULT now(), "customerId" integer, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying(125) NOT NULL, "phone" character varying NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date DEFAULT now(), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_a54f4088bd2e596cc15c1f7aa3d" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_a54f4088bd2e596cc15c1f7aa3d"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "contact"`);
    }

}
