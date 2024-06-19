import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    await knex("students").del();

    // Inserts seed entries
    await knex("students").insert([
      { first_name: "SiuMing", last_name: "Chan", birthday: "2011-11-11" },
      { id: 2, colName: "rowValue2" },
      { id: 3, colName: "rowValue3" },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
