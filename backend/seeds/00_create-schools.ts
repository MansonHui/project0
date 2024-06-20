import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    await knex("schools").del();

    // Inserts seed entries
    await knex("schools").insert([
      {
        name: "St. Peter Primary School",
      },
      {
        name: "Hallow International School Hong Kong",
      },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
