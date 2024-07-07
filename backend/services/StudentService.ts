import type { Knex } from "knex";

export default class StudentService {
  [x: string]: any;
  constructor(private knex: Knex) {}

  async getAllStudentData(userRole: string, userRoleId: number) {
    let result = await this.knex
      .select(
        "image",
        "first_name",
        "last_name",
        "full_name"
      )
      .from("students")

      .join(
        "student_class_relation as scr",
        "scr.student_id",
        "=",
        "students.id"
      )
      .select("student_number")

      .join("classes", "scr.class_id", "=", "classes.id")
      .select("grade", "class_name")

      .join("admin_class_relation as acr", "classes.id", "=", "acr.class_id")

      .join("admins", "admins.id", "=", "acr.admin_id")

      .join("parents", "parents.id", "=", "students.parent_id")
      .select("username")

      .join("schools", "schools.id", "=", "admins.school_id")
      .where(`${userRole}s.id`, userRoleId);

    return result;
  }
}
