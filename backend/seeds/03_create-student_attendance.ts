import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    await knex("student_attendance").del();

    // Inserts seed entries
    await knex("student_attendance").insert([
      { student_id: 1, in_out: "in" },
      { student_id: 1, in_out: "out" },
      { student_id: 2, in_out: "in" },
      { student_id: 2, in_out: "out" },
      { student_id: 3, in_out: "in" },
      { student_id: 3, in_out: "out" },
      { student_id: 4, in_out: "in" },
      { student_id: 4, in_out: "out" },
      { student_id: 5, in_out: "in" },
      { student_id: 5, in_out: "out" },
      { student_id: 6, in_out: "in" },
      { student_id: 6, in_out: "out" },
      { student_id: 7, in_out: "in" },
      { student_id: 7, in_out: "out" },
      { student_id: 8, in_out: "in" },
      { student_id: 8, in_out: "out" },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
