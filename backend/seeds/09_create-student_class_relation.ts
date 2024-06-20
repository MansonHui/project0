import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    await knex("student_class_relation").del();

    // Inserts seed entries
    await knex("student_class_relation").insert([
      {
        class_id: 1,
        student_id: 1,
        student_number: 1,
      },
      {
        class_id: 2,
        student_id: 2,
        student_number: 2,
      },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
