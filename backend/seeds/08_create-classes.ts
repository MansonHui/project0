import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    // await knex("classes").del();

    // Inserts seed entries
    await knex("classes").insert([
      {
        grade: 1,
        class_name: "A",
      },
      {
        grade: 2,
        class_name: "A",
      },
      {
        grade: 3,
        class_name: "A",
      },
      {
        grade: 4,
        class_name: "A",
      },
      {
        grade: 5,
        class_name: "A",
      },
      {
        grade: 6,
        class_name: "A",
      },
      {
        grade: 1,
        class_name: "B",
      },
      {
        grade: 2,
        class_name: "B",
      },
      {
        grade: 3,
        class_name: "B",
      },
      {
        grade: 4,
        class_name: "B",
      },
      {
        grade: 5,
        class_name: "B",
      },
      {
        grade: 6,
        class_name: "B",
      },
      {
        grade: 1,
        class_name: "C",
      },
      {
        grade: 2,
        class_name: "C",
      },
      {
        grade: 3,
        class_name: "C",
      },
      {
        grade: 4,
        class_name: "C",
      },
      {
        grade: 5,
        class_name: "C",
      },
      {
        grade: 6,
        class_name: "C",
      },
      {
        grade: 1,
        class_name: "D",
      },
      {
        grade: 2,
        class_name: "D",
      },
      {
        grade: 3,
        class_name: "D",
      },
      {
        grade: 4,
        class_name: "D",
      },
      {
        grade: 5,
        class_name: "D",
      },
      {
        grade: 6,
        class_name: "D",
      },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
