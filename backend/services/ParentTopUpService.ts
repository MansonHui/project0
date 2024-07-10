// import { notStrictEqual } from "assert";
import type { Knex } from "knex";

export default class ParentTopUpService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex("get_parentInfo");
  }

  async getParentInfo(userRole: string, userRoleId: number) {
    console.log("userRoleId", userRole, userRoleId);
    let result = await this.knex
      .select("username", "email", "balance")
      .from("parents")
      .where(`${userRole}s.id`, userRoleId);
    return result;
  }

  async updateBalance(
    userRole: string,
    userRoleId: number,
    balanceIncrement: number
  ) {
    console.log("service check",userRole,userRoleId,balanceIncrement)
    // find out current balance
    const currentBalance = await this.knex("parents")
      .select("balance")
      .where(`${userRole}s.id`, userRoleId)
      .first();

    console.log("check currentBalance", currentBalance, balanceIncrement);
    // calculate new balance
    const newBalance = currentBalance.balance + balanceIncrement;

    console.log(newBalance, "check newBalun");

    // check new balance is within 0 & 10,000
    if (newBalance < 0 || newBalance > 10000) {
      throw new Error("Invalid balance value");
    }

    // update the newBalance into database
    await this.knex("parents").where(`${userRole}s.id`, userRoleId).update({
      balance: newBalance,
    });
  }
}

// .select(
//     'parents.id',
//     'parents.username',
//     'parents.email',
//     'parents.password',
//     'parents.balance'
//   )
//   .from('parents')
//   .innerJoin('transactions', 'parents.id', '=', 'transactions.parent_id')
//   .innerJoin('notice_student_relation', 'transactions.notice_student_relation_id', '=', 'notice_student_relation.id')
//   .innerJoin("notices", "notice_student_relation.notice_id", "=", "notices.id")
//   .innerJoin('notice_choice', 'notices.id', '=', 'notice_choice.notice_id')
//   .where(`${userRole}_id`, userRoleId)
