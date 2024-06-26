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
              'c.grade',
              'c.class_name',
              'n.topic',
              'n.content',
              's.first_name',
              's.last_name',
              'sch.full_name'
            )
            .join('notice_student_relation as nsr', 's.id', '=', 'nsr.student_id')
            .join('notices as n', 'nsr.notice_id', '=', 'n.id')
            .join('student_class_relation as scr', 's.id', '=', 'scr.student_id')
            .join('classes as c', 'scr.class_id', '=', 'c.id')
            .join('schools as sch', 's.school_id', '=', 'sch.id')
        )
    }
}





// SELECT 
//   c.grade,
//   c.class_name,
//   n.topic,
//   n.content,
//   s.first_name,
//   s.last_name,
//   sch.full_name
// FROM students s
// INNER JOIN schools sch ON s.school_id = sch.id
// INNER JOIN notice_student_relation nsr ON s.id = nsr.student_id
// INNER JOIN notices n ON nsr.notice_id = n.id
// INNER JOIN student_class_relation scr ON s.id = scr.student_id
// INNER JOIN classes c ON scr.class_id = c.id
