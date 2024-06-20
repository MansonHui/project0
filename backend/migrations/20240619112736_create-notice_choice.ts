import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("notice_choice", (table) => {
    table.increments();
    table.enum("option", ["A", "B", "C", "D", "E"]);
    table.integer("notice_id");
    table.foreign("notice_id").references("notices.id");
    table.string("content");
    table.integer("price");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("notice_choice");
}
