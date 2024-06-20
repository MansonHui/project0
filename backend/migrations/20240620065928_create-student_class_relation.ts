import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("student_class_relation", (table) => {
    table.increments();

    table.integer("class_id").unsigned();
    table.foreign("class_id").references("classes.id");

    table.integer("student_id").unsigned();
    table.foreign("student_id").references("students.id");

    table.integer("student_number").unsigned();

    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("student_class_relation");
}
