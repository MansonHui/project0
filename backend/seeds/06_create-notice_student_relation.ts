import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    await knex("notice_student_relation").del();

    // Inserts seed entries
    await knex("notice_student_relation").insert([
      {
        notice_choice_id: 1,
        student_id: 1,
        notice_id: 1,
      },
      {
        notice_choice_id: 6,
        student_id: 2,
        notice_id: 2,
      },
      {
        notice_choice_id: 2,
        student_id: 3,
        notice_id: 1,
      },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
