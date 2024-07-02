import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    await knex("parents").del();

    // Inserts seed entries
    await knex("parents").insert([
      {
        username: "chantaiming",
        email: "chantaiming@gmail.com",
        password: "1234",
        balance: 100,
      },
      {
        username: "tsangmeimei",
        email: "tsangmeimei@gmail.com",
        password: "5678",
        balance: 200,
      },
      {
        username: "fungkeung",
        email: "fungkeung@gmail.com",
        password: "9012",
        balance: 300,
      },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
