import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    await knex("admin_class_relation").del();

    // Inserts seed entries
    await knex("admin_class_relation").insert([
      {
        class_id: 1,
        admin_id: 1,
      },
      {
        class_id: 2,
        admin_id: 2,
      },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
