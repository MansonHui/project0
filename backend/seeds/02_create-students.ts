import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  // Deletes ALL existing entries

  try {
    await knex("students").del();

    // Inserts seed entries
    await knex("students").insert([
      {
        first_name: "siuming",
        last_name: "chan",
        HKID_number: "A1234",
        birthday: "2018-11-11",
        gender: "M",
        image: "chansiuming.jpg",
        parent_id: 1,
        school_id: 1,
      },
      {
        first_name: "keung",
        last_name: "wong",
        HKID_number: "B5678",
        birthday: "2017-10-10",
        gender: "M",
        image: "wongkeung.jpg",
        parent_id: 2,
        school_id: 2,
      },
      {
        first_name: "yung",
        last_name: "wong",
        HKID_number: "C1234",
        birthday: "2018-09-09",
        gender: "M",
        image: "wongyung.jpg",
        parent_id: 2,
        school_id: 1,
      },
      {
        first_name: "lei",
        last_name: "wong",
        HKID_number: "D5678",
        birthday: "2018-09-09",
        gender: "F",
        image: "wonglei.jpg",
        parent_id: 2,
        school_id: 3,
      },
      {
        first_name: "wai",
        last_name: "chan",
        HKID_number: "E1234",
        birthday: "2018-12-09",
        gender: "M",
        image: "chanwai.jpg",
        parent_id: 1,
        school_id: 4,
      },
      {
        first_name: "siukeung",
        last_name: "fung",
        HKID_number: "F5678",
        birthday: "2018-12-09",
        gender: "M",
        image: "fungsiukeung.jpg",
        parent_id: 3,
        school_id: 3,
      },
      {
        first_name: "siumui",
        last_name: "fung",
        HKID_number: "G1234",
        birthday: "2018-12-09",
        gender: "F",
        image: "fungsiumui.jpg",
        parent_id: 3,
        school_id: 4,
      },
      {
        first_name: "chun",
        last_name: "chan",
        HKID_number: "H5678",
        birthday: "2017-10-10",
        gender: "M",
        image: "chanchun.jpg",
        parent_id: 1,
        school_id: 2,
      },
    ]);
  } catch (err) {
    console.log(err);
    await txn.rollback();
    return;
  }
}
