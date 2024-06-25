import type { Knex } from "knex";

export default class StudentService {
  constructor(private knex: Knex) {}

  async getStudentDataParent(userId: number, StudentId: number) {
    return await this.knex
      .select("*")
      .from("students")
      .join("parents", "students.parent_id", "=", "parents.id")
      .where("parents.id", userId)
      .where("students.id", StudentId);
  }

  async getStudentDataAdmin(userId: number, StudentId: number) {
    return await this.knex
      .select("*")
      .from("students")
      .join("schools", "students.school_id", "=", "schools.id")
      .join("admins", "admins.school_id", "=", "schools.id")
      .where("students.id", StudentId)
      .where("admins.id", userId);
  }
}
