import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("notice_student_relation", (table) => {
    table.increments();
    table.integer("notice_choice_id");
    table.foreign("notice_choice_id").references("notice_choice.id");
    table.integer("student_id");
    table.foreign("student_id").references("students.id");
    table.integer("notice_id");
    table.foreign("notice_id").references("notices.id");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("notice_student_relation");
}
