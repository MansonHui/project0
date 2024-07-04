import { Knex } from "knex";

export default class NoticeDetailService{
    constructor(private knex:Knex){}
    table(){
        return this.knex("get_noticeDetail")
    }

    async getNoticeDetail(userRole: string, userRoleId: number){

        return(
            await this.knex
            .select(
                'students.first_name',
                'students.last_name',
                'student_class_relation.student_number',
                'classes.id as class_id',
                'classes.class_name',
                'classes.grade',
                'schools.full_name as school_name',
                this.knex.raw('(SELECT school_year FROM school_years ORDER BY id DESC LIMIT 1) AS school_year'),
                'notices.id as notice_id',
                'notices.topic',
                'notices.content as notice_content',
                'notices.created_at as notice_created_at',
                'parents.username as parent_username',
                'admins.admin_name'
              )
              .from('students')
              .innerJoin('student_class_relation', 'students.id', 'student_class_relation.student_id')
              .innerJoin('classes', 'student_class_relation.class_id', 'classes.id')
              .innerJoin('schools', 'students.school_id', 'schools.id')
              .innerJoin('notice_student_relation', 'students.id', 'notice_student_relation.student_id')
              .innerJoin('notices', 'notice_student_relation.notice_id', 'notices.id')
              .innerJoin('admin_class_relation', 'classes.id', 'admin_class_relation.class_id')
              .innerJoin('admins', 'admin_class_relation.admin_id', 'admins.id')
              .innerJoin('parents', 'students.parent_id', 'parents.id')
              .where(`${userRole}_id`, userRoleId)
              .distinct()
        )
    }
}





// SELECT DISTINCT
//   students.first_name,
//   students.last_name,
//   student_class_relation.student_number,
//   classes.id AS class_id,
//   classes.class_name,
//   classes.grade,
//   schools.full_name AS school_name,
//   (
//     SELECT school_year
//     FROM school_years
//     ORDER BY id DESC
//     LIMIT 1  
//   ) AS school_year,
//   notices.id AS notice_id,
//   notices.topic,
//   notices.content AS notice_content,
//   notices.created_at AS notice_created_at,
//   parents.username AS parent_username,
//   admins.admin_name
// FROM students
// INNER JOIN student_class_relation ON students.id = student_class_relation.student_id
// INNER JOIN classes ON student_class_relation.class_id = classes.id
// INNER JOIN schools ON students.school_id = schools.id
// INNER JOIN notice_student_relation ON students.id = notice_student_relation.student_id
// INNER JOIN notices ON notice_student_relation.notice_id = notices.id
// INNER JOIN admin_class_relation ON classes.id = admin_class_relation.class_id  
// INNER JOIN admins ON admin_class_relation.admin_id = admins.id
// INNER JOIN parents ON students.parent_id = parents.id
// WHERE parents.id = 1
