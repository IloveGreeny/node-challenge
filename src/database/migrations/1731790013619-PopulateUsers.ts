import { MigrationInterface, QueryRunner } from "typeorm";

export class Populate1MillionUsers1731790013619 implements MigrationInterface {
    name = 'Populate1MillionUsers1731790013619';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExists = await queryRunner.hasColumn("user", "errors");

        if (!columnExists) {
            await queryRunner.query(`ALTER TABLE "user" ADD "errors" BOOLEAN DEFAULT false`);
        }

        const issuesColumnExists = await queryRunner.hasColumn("user", "issues");
        if (!issuesColumnExists) {
            await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "errors" TO "issues"`);
            await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "issues" SET DEFAULT false`);
        }

        const batchSize = 10000;
        const totalUsers = 1000000;

        for (let i = 0; i < totalUsers; i += batchSize) {
            const batch = [];
            for (let j = 0; j < batchSize; j++) {
                const firstName = `FirstName${i + j}`;
                const lastName = `LastName${i + j}`;
                const age = Math.floor(Math.random() * (60 - 18 + 1)) + 18;
                const gender = Math.random() < 0.5 ? 'male' : 'female';
                const issues = Math.random() < 0.8;

                batch.push(`('${firstName}', '${lastName}', ${age}, '${gender}', ${issues})`);
            }

            const query = `INSERT INTO "user" ("firstName", "lastName", "age", "gender", "issues") VALUES ${batch.join(", ")}`;
            await queryRunner.query(query);
        }

        console.log('1 million users have been added successfully.');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const errorsColumnExists = await queryRunner.hasColumn("user", "errors");

        if (errorsColumnExists) {
            await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "errors"`);
        }

        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "issues" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "issues" TO "errors"`);
    }
}

