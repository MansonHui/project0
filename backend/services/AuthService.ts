import type { Knex } from "knex";

export default class AuthService {
  constructor(private knex: Knex) {}
  // ===================  register ====================

  // Check email duplicate when register

  async checkDuplicateEmail(email: string) {
    return (
      await this.knex
        .select("*")
        .from("admins")
        .where("admin_email", email)
        .union([this.knex.select("*").from("parents").where("email", email)])
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

  async login(email: string, password: string) {
    const adminResult = await this.knex
      .select("admin_email as admin")
      .select("*")
      .from("admins")
      .where("admin_email", email)
      .andWhere("password", password);

    if (adminResult.length === 0) {
      const parentsResult = await this.knex
        .select("email as parent")
        .select("*")
        .from("parents")
        .where("email", email)
        .andWhere("password", password);

      return parentsResult[0];
    } else {
      return adminResult[0];
    }
  }
}
