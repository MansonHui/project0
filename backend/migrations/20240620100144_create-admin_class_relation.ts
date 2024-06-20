import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("admin_class_relation", (table) => {
    table.increments();

    table.integer("class_id").unsigned();
    table.foreign("class_id").references("classes.id");

    table.integer("admin_id").unsigned();
    table.foreign("admin_id").references("admins.id");

    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("admin_class_relation");
}
