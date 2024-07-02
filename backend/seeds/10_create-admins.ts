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
        admin_name: "super",
        password: "stpeter",
        admin_email: "super@stpeter.edu.hk",
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
        password: "hallowint",
        admin_email: "super@hallowint.edu.hk",
        school_id: 2,
      },

      {
        admin_name: "yeungwai",
        password: "2222",
        admin_email: "yeungwai@bonhamroadgovt.edu.hk",
        school_id: 3,
      },
      {
        admin_name: "super",
        password: "bonhamroadgovt",
        admin_email: "super@bonhamroadgovt.edu.hk",
        school_id: 3,
      },

      {
        admin_name: "chuili",
        password: "3333",
        admin_email: "chuili@pooito.edu.hk",
        school_id: 4,
      },
      {
        admin_name: "super",
        password: "pooito",
        admin_email: "super@pooito.edu.hk",
        school_id: 4,
      },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
