import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("schools", (table) => {
    table.increments();

    table.string("full_name");
    table.string("abbr_name");

    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("schools");
}
