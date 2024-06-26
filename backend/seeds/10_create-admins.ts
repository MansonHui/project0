import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    await knex("admins").del();

    // Inserts seed entries
    await knex("admins").insert([
      {
        username: "choiping",
        password: "0000",
        email: "choiping@stpeter.edu.hk",
        school_id: 1,
      },
      {
        username: "chiulap",
        password: "1111",
        email: "chiulap@hallowint.edu.hk",
        school_id: 2,
      },
      {
        username: "super",
        password: "super",
        email: "super@tecky.edu.hk",
      },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
