import type { Knex } from "knex";

export default class AuthService {
  constructor(private knex: Knex) {}
  // =================== User register ====================

  // Check email duplicate when register

  async checkDuplicateEmail(email: string) {
    return (
      await this.knex
        .select("*")
        .from("admins")
        .where("email", email)
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
          created_at: this.knex.fn.now(),
          updated_at: this.knex.fn.now(),
        })
        .returning("id")
    )[0];
  }
}
