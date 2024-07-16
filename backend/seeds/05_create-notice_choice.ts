import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    // await knex("notice_choice").del();

    // Inserts seed entries
    await knex("notice_choice").insert([
      {
        option: "A",
        notice_id: 1,
        content: "basketball",
        price: 500,
      },
      {
        option: "B",
        notice_id: 1,
        content: "football",
        price: 500,
      },
      {
        option: "C",
        notice_id: 1,
        content: "volleyball",
        price: 500,
      },
      {
        option: "D",
        notice_id: 1,
        content: "badminton",
        price: 500,
      },
      {
        option: "E",
        notice_id: 1,
        content: "tennis",
        price: 500,
      },

      {
        option: "A",
        notice_id: 2,
        content: "Required",
        price: 500,
      },
      {
        option: "B",
        notice_id: 2,
        content: "Not Required",
        price: 0,
      },
    ]);
    await txn.commit()

  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
