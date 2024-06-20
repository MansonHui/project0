import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("notices", (table) => {
    table.increments();
    table.string("topic");
    table.string("content");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("notices");
}
