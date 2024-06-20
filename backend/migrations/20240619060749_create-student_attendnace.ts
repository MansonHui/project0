import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("student_attendance", (table) => {
    table.increments();
    table.integer("student_id").unsigned();
    table.foreign("student_id").references("students.id");
    table.enum("in_out", ["in", "out"]);
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("student_attendance");
}
