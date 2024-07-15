import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    // await knex("student_class_relation").del();

    // Inserts seed entries
    await knex("student_class_relation").insert([
      {
        class_id: 1,
        student_id: 1,
        student_number: 11,
      },
      {
        class_id: 2,
        student_id: 2,
        student_number: 12,
      },
      {
        class_id: 1,
        student_id: 3,
        student_number: 13,
      },
      {
        class_id: 3,
        student_id: 4,
        student_number: 14,
      },
      {
        class_id: 4,
        student_id: 5,
        student_number: 15,
      },
      {
        class_id: 2,
        student_id: 6,
        student_number: 16,
      },
      {
        class_id: 1,
        student_id: 7,
        student_number: 17,
      },
      {
        class_id: 3,
        student_id: 8,
        student_number: 18,
      },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
