import type { Knex } from "knex";

export default class StudentService {
  [x: string]: any;
  constructor(private knex: Knex) {}

  async getStudentData(
    userRole: string,
    userRoleId: number,
    studentId: number
  ) {
    return await this.knex
      .select("*")
      .from("students")
      .join("schools", "students.school_id", "=", "schools.id")
      .join("admins", "schools.id", "=", "admins.school_id")
      .join("parents", "students.parent_id", "=", "parents.id")

      .where(`${userRole}s.id`, userRoleId)
      .where("students.id", studentId);
  }
}
