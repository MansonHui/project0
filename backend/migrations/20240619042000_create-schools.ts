import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("schools", (table) => {
    table.increments();

    table.string("name");

    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("schools");
}
