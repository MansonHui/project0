import type { Knex } from "knex";

export default class SuperAdminService {
  constructor(private knex: Knex) {}
  // ===================  register ====================

  // Check email duplicate when register

  async checkDuplicateEmailAdmin(email: string) {
    return (
      await this.knex
        .select("*")
        .from("admins")
        .where("admin_email", email)
        .union([this.knex.select("*").from("parents").where("email", email)])
    )[0];
  }

  async checkDuplicateEmailParent(email: string) {
    return (
      await this.knex.select("*").from("parents").where("email", email)
    )[0];
  }

  async createNewParent(username: string, email: string, password: string) {
    return (
      await this.knex("parents")
        .insert({
          username: username,
          email: email,
          password: password,
          balance: 0,
          created_at: this.knex.fn.now(),
          updated_at: this.knex.fn.now(),
        })
        .returning("*")
    )[0];
  }

  async getSchoolTable(schoolAbbr: string) {
    return (
      await this.knex.select("*").from("schools").where("abbr_name", schoolAbbr)
    )[0];
  }

  async createNewAdmin(
    username: string,
    email: string,
    password: string,
    schoolID: number
  ) {
    return (
      await this.knex("admins")
        .insert({
          admin_name: username,
          admin_email: email,
          password: password,
          school_id: schoolID,
          created_at: this.knex.fn.now(),
          updated_at: this.knex.fn.now(),
        })
        .returning("*")
    )[0];
  }

  async getAllStudentData(abbrName: string) {
    let result = await this.knex
      .select("first_name", "last_name", "image")
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

      .join(
        "class_school_year_relation as csy",
        "classes.id",
        "=",
        "csy.class_id"
      )

      .join("school_years", "csy.school_year_id", "=", "school_years.id")
      .select("school_year")

      .join("admin_class_relation as acr", "acr.class_id", "=", "classes.id")

      .join("admins", "acr.admin_id", "=", "admins.id")
      .select("admin_name")

      .join("schools", "students.school_id", "=", "schools.id")
      .select("schools.abbr_name")

      .join("parents", "parents.id", "=", "students.parent_id")
      .select("username");

    // .where(`schools.abbr_name`, abbrName);

    return result;
  }
}
