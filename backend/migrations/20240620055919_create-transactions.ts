import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("transactions", (table) => {
    table.increments();
    table.string("detail");
    table.integer("amount");
    table.integer("parent_id");
    table.foreign("parent_id").references("parents.id");
    table.integer("notice_student_relation_id");
    table
      .foreign("notice_student_relation_id")
      .references("notice_student_relation.id");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("transactions");
}
