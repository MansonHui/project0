import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("parents", (table) => {
    table.increments();
    table.string("username", 255).notNullable();
    table.string("email").unique().notNullable();
    table.string("password", 255).notNullable();
    table.integer("balance");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("parents");
}
