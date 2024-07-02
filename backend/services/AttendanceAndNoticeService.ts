import { Knex } from "knex";

export default class AttendanceAndNoticeService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex("allMessageAll");
  }

  // async getAll(userRole: string, userRoleId: number, page = 1, pageSize = 10) {
  //   const offset = (page - 1) * pageSize;
    async getAll(userRole: string, userRoleId: number) {
      

    return this.knex
    .select(
      "students.id AS student_id",
      "classes.grade",
      "classes.class_name",
      "notices.topic",
      "notices.content",
      "students.first_name",
      "students.last_name",
      "schools.full_name",
      "students.parent_id",
      this.knex.raw("NULL AS in_out"),
      "notices.created_at"
    )
    .from("students")
    .innerJoin("schools", "students.school_id", "schools.id")
    .innerJoin(
      "notice_student_relation",
      "students.id",
      "notice_student_relation.student_id"
    )
    .innerJoin("notices", "notice_student_relation.notice_id", "notices.id")
    .innerJoin(
      "student_class_relation",
      "students.id",
      "student_class_relation.student_id"
    )
    .innerJoin("classes", "student_class_relation.class_id", "classes.id")
    .where(`${userRole}_id`, userRoleId)
    .unionAll(
      this.knex
        .select(
          "students.id AS student_id",
          this.knex.raw("NULL AS grade"),
          this.knex.raw("NULL AS class_name"),
          this.knex.raw("NULL AS topic"),
          this.knex.raw("NULL AS content"),
          "students.first_name",
          "students.last_name",
          this.knex.raw("NULL AS full_name"),
          "students.parent_id",
          "student_attendance.in_out",
          "student_attendance.created_at"
        )
        .from("students")
        .innerJoin(
          "student_attendance",
          "students.id",
          "student_attendance.student_id"
        )
        .where(`${userRole}_id`, userRoleId)
    )
    .orderBy("created_at");
      

      
  }
}

// version 2
// (
//   SELECT
//     students.first_name,
//     students.last_name,
//     student_attendance.in_out,
//     student_attendance.created_at,
//     NULL AS id,
//     NULL AS grade,
//     NULL AS class_name,
//     NULL AS topic,
//     NULL AS content,
//     NULL AS full_name
//   FROM students
//   INNER JOIN student_attendance
//   ON students.id = student_attendance.student_id
// )
// UNION ALL
// (
//   SELECT
//     students.first_name,
//     students.last_name,
//     NULL AS in_out,
//     NULL AS created_at,
//     students.id,
//     classes.grade,
//     classes.class_name,
//     notices.topic,
//     notices.content,
//     schools.full_name
//   FROM students
//   JOIN notice_student_relation ON students.id = notice_student_relation.student_id
//   JOIN notices ON notice_student_relation.notice_id = notices.id
//   JOIN student_class_relation ON students.id = student_class_relation.student_id
//   JOIN classes ON student_class_relation.class_id = classes.id
//   JOIN schools ON students.school_id = schools.id
// )

// version 1
// SELECT
//   classes.grade,
//   classes.class_name,
//   notices.topic,
//   notices.content,
//   students.first_name,
//   students.last_name,
//   schools.full_name,
//   NULL AS in_out,
//   notices.created_at,
//   students.id AS student_id
// FROM students
// INNER JOIN schools ON students.school_id = schools.id
// INNER JOIN notice_student_relation ON students.id = notice_student_relation.student_id
// INNER JOIN notices ON notice_student_relation.notice_id = notices.id
// INNER JOIN student_class_relation ON students.id = student_class_relation.student_id
// INNER JOIN classes ON student_class_relation.class_id = classes.id
// UNION ALL
// SELECT
//   NULL AS grade,
//   NULL AS class_name,
//   NULL AS topic,
//   NULL AS content,
//   students.first_name,
//   students.last_name,
//   NULL AS full_name,
//   student_attendance.in_out,
//   student_attendance.created_at,
//   students.id AS student_id
// FROM students
// INNER JOIN student_attendance ON students.id = student_attendance.student_id
// ORDER BY created_at;
