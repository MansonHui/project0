import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    await knex("transactions").del();

    // Inserts seed entries
    await knex("transactions").insert([
      {
        detail: "Summer Sport Class Payment",
        amount: 500,
        parent_id: 1,
        notice_student_relation_id: 1,
      },
      {
        detail: "Sport Uniform Payment",
        amount: 480,
        parent_id: 2,
        notice_student_relation_id: 2,
      },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
