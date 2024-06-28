import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    await knex("admins").del();

    // Inserts seed entries
    await knex("admins").insert([
      {
        admin_name: "choiping",
        password: "0000",
        admin_email: "choiping@stpeter.edu.hk",
        school_id: 1,
      },
      {
        admin_name: "chiulap",
        password: "1111",
        admin_email: "chiulap@hallowint.edu.hk",
        school_id: 2,
      },
      {
        admin_name: "super",
        password: "stpeter",
        admin_email: "super@stpeter.edu.hk",
        school_id: 1,
      },

      {
        admin_name: "super",
        password: "hallowint",
        admin_email: "super@hallowint.edu.hk",
        school_id: 2,
      },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
