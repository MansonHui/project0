import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("students", (table) => {
    table.increments();
    table.string("name", 255).unique().notNullable();
    table.date("birthday").unique().notNullable();
    table.enum("gender", ["M", "F"]).unique().notNullable();
    table.string("image", 255).nullable();
    table.integer("parent_id");
    table.foreign("parent_id").references("parnets.id");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("studnets");
}
