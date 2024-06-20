import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("students", (table) => {
    table.increments();
    table.string("first_name", 255).notNullable();
    table.string("last_name", 255).notNullable();
    table.date("birthday").notNullable();
    table.enum("gender", ["M", "F"]).notNullable();
    table.string("image", 255).nullable();
    table.integer("parent_id").unsigned();
    table.foreign("parent_id").references("parents.id");
    table.integer("school_id").unsigned();
    table.foreign("school_id").references("schools.id");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("students");
}
