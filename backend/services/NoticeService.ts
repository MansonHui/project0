import { Knex } from "knex";

export default class NoticeSerice{
    constructor(private knex:Knex){}
    table(){
        return this.knex("get_notice")
    }

    async getAllNotice(){
        return(
            await this.knex('students as s')
            .select(
              's.id',
              'sa.student_id',
              'sa.in_out',
              'sa.created_at',
              'n.topic',
              'n.content',
              'n.created_at',
              'nsr.notice_choice_id'
            )
            .leftJoin('student_attendance as sa', 's.id', 'sa.student_id')
            .leftJoin('notice_student_relation as nsr', 's.id', 'nsr.student_id')
            .leftJoin('notices as n', 'nsr.notice_id', 'n.id')
        )
    }
}






// SELECT
//   s.id,
//   sa.student_id, sa.in_out, sa.created_at,
//   n.topic, n.content, n.created_at,
//   nsr.notice_choice_id
// FROM students s
// LEFT JOIN student_attendance sa ON s.id = sa.student_id
// LEFT JOIN notice_student_relation nsr ON s.id = nsr.student_id
// LEFT JOIN notices n ON nsr.notice_id = n.id