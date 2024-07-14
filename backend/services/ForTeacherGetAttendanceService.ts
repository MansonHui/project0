import { Knex } from "knex";

export default class ForTeacherGetAttendanceService {
  constructor(private knex: Knex) {}

  async getForTeacherGetAttendance(
    userRole: string,
    userRoleId: number,
    userRoleName: string
  ) {
    if (userRole === "admin" && userRoleName !== "super") {
      return await this.knex

        .select(
          this.knex.raw("ROW_NUMBER() OVER() as id"),
          "admins.id as admins_id",
          "classes.id as class_id",
          "classes.grade as class_grade",
          "classes.class_name as class_name",
          this.knex.raw(
            "DATE(student_attendance.created_at) as attendance_date"
          ),
          this.knex.raw(
            "SUM(CASE WHEN student_attendance.in_out = 'in' THEN 1 ELSE 0 END) as total_in"
          ),
          this.knex.raw(
            "SUM(CASE WHEN student_attendance.in_out = 'out' THEN 1 ELSE 0 END) as total_out"
          )
        )
        .from(
          this.knex
            .select(
              "admins.id as admin_id",
              "classes.id as class_id",
              "classes.grade as class_grade",
              "classes.class_name as class_name",
              "student_class_relation.id as student_class_relation_id",
              "student_class_relation.class_id as student_class_id",
              "student_class_relation.student_id as subquery_student_id",
              "student_class_relation.student_number as student_number",
              "students.id as student_id",
              "students.parent_id as student_parent_id"
            )
            .from("admins")
            .innerJoin(
              "admin_class_relation",
              "admins.id",
              "admin_class_relation.admin_id"
            )
            .innerJoin("classes", "admin_class_relation.class_id", "classes.id")
            .innerJoin(
              "student_class_relation",
              "classes.id",
              "student_class_relation.class_id"
            )
            .innerJoin(
              "students",
              "student_class_relation.student_id",
              "students.id"
            )
            .where("admins.id", userRoleId)
            .as("subquery")
        )
        .leftJoin(
          "student_attendance",
          "subquery.subquery_student_id",
          "student_attendance.student_id"
        )
        .innerJoin("admins", "subquery.admin_id", "admins.id")
        .innerJoin("classes", "subquery.class_id", "classes.id")
        .groupBy(
          "admins.id",
          "classes.id",
          "classes.grade",
          "classes.class_name",
          this.knex.raw("DATE(student_attendance.created_at)")
        )
        .orderBy("attendance_date", "desc");
    } else {
      return console.log("data for super admin");
    }
  }
}

// SELECT
//   admins.id AS admins_id,
//   classes.id AS class_id,
//   classes.grade AS class_grade,
//   classes.class_name AS class_name,
//   DATE(student_attendance.created_at) AS attendance_date,
//   SUM(CASE WHEN student_attendance.in_out = 'in' THEN 1 ELSE 0 END) AS total_in,
//   SUM(CASE WHEN student_attendance.in_out = 'out' THEN 1 ELSE 0 END) AS total_out
// FROM (
//   SELECT
//     admins.id AS admin_id,
//     classes.id AS class_id,
//     classes.grade AS class_grade,
//     classes.class_name AS class_name,
//     student_class_relation.id AS student_class_relation_id,
//     student_class_relation.class_id AS student_class_id,
//     student_class_relation.student_id AS subquery_student_id,
//     student_class_relation.student_number AS student_number,
//     students.id AS student_id,
//     students.parent_id AS student_parent_id
//   FROM admins
//   INNER JOIN admin_class_relation ON admins.id = admin_class_relation.admin_id
//   INNER JOIN classes ON admin_class_relation.class_id = classes.id
//   INNER JOIN student_class_relation ON classes.id = student_class_relation.class_id
//   INNER JOIN students ON student_class_relation.student_id = students.id
//   WHERE admins.id = 1
// ) AS subquery
// LEFT JOIN student_attendance ON subquery.subquery_student_id = student_attendance.student_id
// INNER JOIN admins ON subquery.admin_id = admins.id
// INNER JOIN classes ON subquery.class_id = classes.id
// GROUP BY
//   admins.id,
//   classes.id,
//   classes.grade,
//   classes.class_name,
//   DATE(student_attendance.created_at)
// ORDER BY
//   attendance_date DESC;

// INSERT INTO student_attendance (student_id, in_out, created_at, updated_at)
// VALUES (1, 'in', '2024-07-06 00:00:00', '2024-07-06 00:00:00');
