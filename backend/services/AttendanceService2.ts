import { Knex } from "knex";

export default class AttendanceService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex("get_attendance");
  }

  async getAllattendance(userRole: string, userRoleId: number) {
    return await this.knex("students")
      .select(
        "students.id",
        "students.first_name",
        "students.last_name",
        "student_attendance.in_out",
        "student_attendance.created_at"
      )
      .innerJoin(
        "student_attendance",
        "students.id",
        "student_attendance.student_id"
      )
      .orderBy("student_attendance.created_at", "desc")

      .where(`${userRole}_id`, userRoleId);
  }
}

// SELECT students.first_name, students.last_name, student_attendance.in_out, student_attendance.created_at
// FROM students
// INNER JOIN student_attendance
// ON students.id = student_attendance.student_id
// ORDER BY student_attendance.created_at DESC;

// SELECT students.first_name, students.last_name, student_attendance.in_out, student_attendance.created_at
// FROM students
// INNER JOIN student_attendance
// ON students.id = student_attendance.student_id;
