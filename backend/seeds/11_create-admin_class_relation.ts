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
        admin_id: 3,
      },
      {
        class_id: 3,
        admin_id: 5,
      },
      {
        class_id: 4,
        admin_id: 7,
      },
    ]);

    // for (let i = 1; i < 25; i++) {
    //   await knex("admin_class_relation").insert([
    //     {
    //       class_id: i,
    //       admin_id: 2,
    //     },
    //     {
    //       class_id: i,
    //       admin_id: 4,
    //     },
    //     {
    //       class_id: i,
    //       admin_id: 6,
    //     },
    //     {
    //       class_id: i,
    //       admin_id: 8,
    //     },
    //   ]);
    // }
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
