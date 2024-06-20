import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("class_school_year_relation", (table) => {
    table.increments();

    table.integer("school_year_id").unsigned();
    table.foreign("school_year_id").references("school_years.id");

    table.integer("class_id").unsigned();
    table.foreign("class_id").references("classes.id");

    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("class_school_year_relation");
}
