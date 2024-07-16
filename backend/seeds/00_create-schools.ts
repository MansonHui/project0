import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    // await knex("schools").del();

    // Inserts seed entriesyarn
    await knex("schools").insert([
      {
        full_name: "St. Peter Primary School",
        abbr_name: "stpeter",
      },
      {
        full_name: "Hallow International School Hong Kong",
        abbr_name: "hallowint",
      },
      {
        full_name: "Bonham Road Government Primary Schoolset",
        abbr_name: "bonhamroadgovt",
      },
      {
        full_name: "Pooi To Primary School",
        abbr_name: "pooito",
      },
    ]);
    await txn.commit();
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
