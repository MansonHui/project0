import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("admins", (table) => {
    table.increments();
    table.string("admin_name").nullable();
    table.string("password").nullable();
    table.string("admin_email").nullable();

    table.integer("school_id").unsigned();
    table.foreign("school_id").references("schools.id").nullable;

    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("admins");
}
