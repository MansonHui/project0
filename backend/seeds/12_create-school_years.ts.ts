import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    await knex("school_years").del();

    // Inserts seed entries
    await knex("school_years").insert([
      {
        school_year: "2023-2024",
        school_id: 1,
      },
      {
        school_year: "2022-2023",
        school_id: 1,
      },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
