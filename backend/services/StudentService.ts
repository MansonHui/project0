import type { Knex } from "knex";

export default class StudentService {
  constructor(private knex: Knex) {}

  async getAllStudentData(userRole: string, userRoleId: number) {
    let result = await this.knex
      .select(
        "first_name",
        "last_name",
        "image",
        "grade",
        "class_name",
        "student_number",
        "admin_name",
        "username",
        "full_name"
      )
      .from("students")
      .join(
        "student_class_relation as scr",
        "scr.student_id",
        "=",
        "students.id"
      )
      .join("classes", "scr.class_id", "=", "classes.id")
      .join("admin_class_relation as acr", "classes.id", "=", "acr.class_id")
      .join("admins", "admins.id", "=", "acr.admin_id")
      .join("parents", "parents.id", "=", "students.parent_id")
      .join("schools", "schools.id", "=", "admins.school_id")
      .where(`${userRole}_id`, userRoleId);

    return result;
  }
}
