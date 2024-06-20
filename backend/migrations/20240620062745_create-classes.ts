import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("classes", (table) => {
    table.increments();
    table.enum("grade", [1, 2, 3, 4, 5, 6]);
    table.enum("class_name", ["A", "B", "C", "D", "E"]);

    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("classes");
}
