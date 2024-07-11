import { Knex } from "knex";

export default class TeacherNoticeService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex("get_teacherNotice");
  }

  async getTeacherNotice(userRole: string, userRoleId: number) {
    return await this.knex

      .select(
        "admins.id",
        "admins.admin_name",
        "classes.grade",
        "classes.class_name",
        "school_years.school_year",
        "notice_student_relation.notice_id",
        "notices.id as notices_id",
        "notices.topic as notices_topic",
        "notices.created_at"
      )
      .from("admins")
      .innerJoin(
        "admin_class_relation",
        "admins.id",
        "admin_class_relation.admin_id"
      )
      .innerJoin("classes", "admin_class_relation.class_id", "classes.id")
      .innerJoin(
        "class_school_year_relation",
        "classes.id",
        "class_school_year_relation.class_id"
      )
      .innerJoin(
        "school_years",
        "class_school_year_relation.school_year_id",
        "school_years.id"
      )
      .innerJoin(
        "student_class_relation",
        "classes.id",
        "student_class_relation.class_id"
      )
      .innerJoin("students", "student_class_relation.student_id", "students.id")
      .innerJoin(
        "notice_student_relation",
        "students.id",
        "notice_student_relation.student_id"
      )
      .leftJoin("notices", "notice_student_relation.notice_id", "notices.id")
      .where("admins.id", userRoleId)
      .orderBy("notice_student_relation.notice_id", "desc")
      .groupBy(
        "admins.id",
        "admins.admin_name",
        "classes.grade",
        "classes.class_name",
        "school_years.school_year",
        "notice_student_relation.notice_id",
        "notices.id",
        "notices.topic",
        "notices.created_at"
      );

    //   .where(`${userRole}_id`, userRoleId)
  }

  async getTeacherNoticeDetail(userRole: string, userRoleId: number) {
    return await this.knex("notice_student_relation")
      .join("notices", "notice_student_relation.notice_id", "=", "notices.id")
      .join(
        "student_class_relation",
        "notice_student_relation.student_id",
        "=",
        "student_class_relation.student_id"
      )
      .join("classes", "student_class_relation.class_id", "=", "classes.id")
      .join(
        "admin_class_relation",
        "classes.id",
        "=",
        "admin_class_relation.class_id"
      )
      .join("students", "student_class_relation.student_id", "=", "students.id")
      .join("admins", "admin_class_relation.admin_id", "=", "admins.id")
      .where("admins.id", userRoleId)
      .select(
        "notice_student_relation.id as notice_student_relation_id",
        "notices.id as notice_id",
        "notices.topic",
        "notices.content",
        "notice_student_relation.student_id",
        "notice_student_relation.notice_choice_id",
        "classes.id as class_id",
        "classes.grade",
        "classes.class_name",
        "students.id as student_id",
        "students.first_name",
        "students.last_name",
        "students.parent_id",
        "student_class_relation.student_number",
        "admins.admin_name",
        this.knex.raw(
          "COUNT(CASE WHEN notice_student_relation.notice_choice_id IS NULL THEN 1 END) AS null_count"
        ),
        this.knex.raw(
          "COUNT(CASE WHEN notice_student_relation.notice_choice_id IS NOT NULL THEN 1 END) + 1 AS not_null_count"
        )
      )
      .groupBy(
        "notice_student_relation.id",
        "notices.id",
        "notices.topic",
        "notices.content",
        "notice_student_relation.student_id",
        "notice_student_relation.notice_choice_id",
        "classes.id",
        "classes.grade",
        "classes.class_name",
        "students.id",
        "students.first_name",
        "students.last_name",
        "students.parent_id",
        "student_class_relation.student_number",
        "admins.admin_name"
      );
  }

  // async getNoticeByNoticeID(
  //   userRoleId: number,
  //   school_id: string
  //   // notice_id: number
  //   // userRole: string,
  // ) {
  //   let result = await this.knex

  //     .select(
  //       "topic as notices_topic",
  //       "notices.id as notices_id",
  //       "notices.created_at"
  //     )
  //     .from("notices")
  //     .join("notice_student_relation as nsr", "notices.id", "nsr.notice_id")
  //     .select("nsr.student_id as student_id", "nsr.notice_id as notice_id")
  //     .join("students", "students.id", "nsr.student_id")
  //     // .select("first_name", "last_name")
  //     .join("student_class_relation as scr", "students.id", "scr.student_id")
  //     .join("classes", "classes.id", "scr.class_id")
  //     .select("grade", "class_name")
  //     .join("admin_class_relation as acr", "acr.class_id", "classes.id")
  //     .join("admins", "acr.admin_id", "admins.id")
  //     .select("admin_name", "admins.id")
  //     .join("schools", "schools.id", "students.school_id")
  //     .join("class_school_year_relation as csyr", "csyr.class_id", "classes.id")
  //     .join("school_years as sy", "csyr.school_year_id", "sy.id")
  //     .select("sy.school_year")
  //     .where("students.school_id", school_id)
  //     // .where("notices.id", notice_id)
  //     .where("admins.id", userRoleId)
  //     .distinctOn("notices_id");

  //   console.log("result from new get techer notice", result);

  //   return result;
  // }
}

// SELECT
//   admins.id,
//   admins.admin_name,
//   classes.grade,
//   school_years.school_year,
//   notice_student_relation.notice_id,
//   notices.created_at
// FROM admins
// INNER JOIN admin_class_relation ON admins.id = admin_class_relation.admin_id
// INNER JOIN classes ON admin_class_relation.class_id = classes.id
// INNER JOIN class_school_year_relation ON classes.id = class_school_year_relation.class_id
// INNER JOIN school_years ON class_school_year_relation.school_year_id = school_years.id
// INNER JOIN student_class_relation ON classes.id = student_class_relation.class_id
// INNER JOIN students ON student_class_relation.student_id = students.id
// INNER JOIN notice_student_relation ON students.id = notice_student_relation.student_id
// INNER JOIN notices ON notice_student_relation.notice_id = notices.id
// WHERE admins.id = 1
// GROUP BY
//   admins.id,
//   admins.admin_name,
//   classes.grade,
//   school_years.school_year,
//   notice_student_relation.notice_id,
//   notices.created_at

// SELECT
//     notice_student_relation.id AS notice_student_relation_id,
//     notices.id AS notice_id,
//     notices.topic,
//     notices.content,
//     notice_student_relation.student_id,
//     notice_student_relation.notice_choice_id,
//     classes.id AS class_id,
//     classes.grade,
//     classes.class_name,
//     students.id AS student_id,
//     students.first_name,
//     students.last_name,
//     students.parent_id,
//     student_class_relation.student_number,
//     admins.admin_name,
//     COUNT(CASE WHEN notice_student_relation.notice_choice_id IS NULL THEN 1 END) AS null_count,
//     COUNT(CASE WHEN notice_student_relation.notice_choice_id IS NOT NULL THEN 1 END) AS not_null_count
// FROM notice_student_relation
// JOIN notices ON notice_student_relation.notice_id = notices.id
// JOIN student_class_relation ON notice_student_relation.student_id = student_class_relation.student_id
// JOIN classes ON student_class_relation.class_id = classes.id
// JOIN admin_class_relation ON classes.id = admin_class_relation.class_id
// JOIN students ON student_class_relation.student_id = students.id
// JOIN admins ON admin_class_relation.admin_id = admins.id
// WHERE admin_class_relation.admin_id = 1
// GROUP BY
//     notice_student_relation.id,
//     notices.id,
//     notices.topic,
//     notices.content,
//     notice_student_relation.student_id,
//     notice_student_relation.notice_choice_id,
//     classes.id,
//     classes.grade,
//     classes.class_name,
//     students.id,
//     students.first_name,
//     students.last_name,
//     students.parent_id,
//     student_class_relation.student_number,
//     admins.admin_name;
