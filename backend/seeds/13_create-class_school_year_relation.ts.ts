import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    // await knex("class_school_year_relation").del();

    // Inserts seed entries
    await knex("class_school_year_relation").insert([
      {
        school_year_id: 1,
        class_id: 1,
      },
      {
        school_year_id: 1,
        class_id: 2,
      },
      {
        school_year_id: 1,
        class_id: 3,
      },
      {
        school_year_id: 1,
        class_id: 4,
      },
    ]);
    await txn.commit();
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
