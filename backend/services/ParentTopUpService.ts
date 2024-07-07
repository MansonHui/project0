import type { Knex } from "knex";

export default class ParentTopUpService {
    constructor(private knex: Knex) {}
    table() {
      return this.knex("get_parentInfo");
    }

    async getParentInfo(userRole: string, userRoleId: number){
        let result = await this.knex
        .select(
            "username",
            "email",
            "password",
            "balance"

        )
        .from("parents")

        
        return result;
    }

}