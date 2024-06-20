import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("school_years", (table) => {
    table.increments();

    table.string("school_year");

    table.integer("school_id").unsigned();
    table.foreign("school_id").references("schools.id");

    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("school_years");
}
