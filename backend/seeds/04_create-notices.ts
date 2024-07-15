import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    // await knex("notices").del();

    // Inserts seed entries
    await knex("notices").insert([
      {
        topic: "Summer Sport Class Selection",
        content: "Select the Sport for the summer class Aug 2024",
      },
      {
        topic: "Sport Uniform for the 2024-2025 academic year",
        content:
          "Payment for the Sport Uniform for the 2024-2025 academic year",
      },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
