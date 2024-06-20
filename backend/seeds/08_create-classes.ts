import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    await knex("classes").del();

    // Inserts seed entries
    await knex("classes").insert([
      {
        grade: 1,
        class_name: "A",
      },
      {
        grade: 2,
        class_name: "B",
      },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
