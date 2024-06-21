import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    await knex("students").del();

    // Inserts seed entries
    await knex("students").insert([
      {
        first_name: "siuming",
        last_name: "chan",
        birthday: "2018-11-11",
        gender: "M",
        image: "chansiuming.jpg",
        parent_id: 1,
        school_id: 1,
      },
      {
        first_name: "keung",
        last_name: "wong",
        birthday: "2017-10-10",
        gender: "M",
        image: "wongkeung.jpg",
        parent_id: 2,
        school_id: 2,
      },
      {
        first_name: "yung",
        last_name: "wong",
        birthday: "2018-09-09",
        gender: "F",
        image: "wongyung.jpg",
        parent_id: 2,
        school_id: 1,
      },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
