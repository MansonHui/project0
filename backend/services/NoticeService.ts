import { Knex } from "knex";

export default class NoticeSerice {
  constructor(private knex: Knex) {}
  table() {
    return this.knex("get_notice");
  }

  async getAllNotice(userRole: string, userRoleId: number) {
    console.log("check User Role", userRole);
    return await this.knex("students")
      .select(
        "students.id as student_id",
        "notices.id as notice_id",
        "classes.grade",
        "classes.class_name",
        "notices.topic",
        //   'notices.content',
        "students.first_name",
        "students.last_name",
        "schools.full_name",
        "notices.created_at"
      )
      .join(
        "notice_student_relation",
        "students.id",
        "=",
        "notice_student_relation.student_id"
      )
      .join("notices", "notice_student_relation.notice_id", "=", "notices.id")
      .join(
        "student_class_relation",
        "students.id",
        "=",
        "student_class_relation.student_id"
      )
      .join("classes", "student_class_relation.class_id", "=", "classes.id")
      .join("schools", "students.school_id", "=", "schools.id")

      .where(`${userRole}_id`, userRoleId);
  }

  async getNoticeDetail(
    userRole: string,
    userRoleId: number,
    noticeId: number,
    studentId: number
  ) {
    return await this.knex.raw(`SELECT DISTINCT
  students.first_name,
  students.last_name,
  student_class_relation.student_number,
  classes.id AS class_id,
  classes.class_name,
  classes.grade,
  schools.full_name AS school_name,
  notices.id AS notice_id,
  notices.topic,
  notices.content AS notice_content,
  notices.created_at,
  parents.username AS parent_username,
  admins.admin_name,
  array_agg(notice_choice.id) AS notice_choice_ids,
  array_agg(notice_choice.option) AS notice_choices,
  array_agg(notice_choice.content) AS notice_choice_contents,
  array_agg(notice_choice.price) AS notice_choice_prices,
  notice_student_relation.notice_choice_id
FROM students
JOIN student_class_relation ON students.id = student_class_relation.student_id
JOIN classes ON student_class_relation.class_id = classes.id
JOIN schools ON students.school_id = schools.id
JOIN notice_student_relation ON students.id = notice_student_relation.student_id
JOIN notices ON notices.id = notice_student_relation.notice_id
JOIN admin_class_relation ON admin_class_relation.class_id = classes.id
JOIN admins ON admin_class_relation.admin_id = admins.id
JOIN parents ON students.parent_id = parents.id
JOIN notice_choice ON notice_choice.notice_id = notices.id
WHERE notices.id = ${noticeId}
  AND student_class_relation.student_id = ${studentId}
GROUP BY
  students.first_name,
  students.last_name,
  student_class_relation.student_number,
  classes.id,
  classes.class_name,
  classes.grade,
  schools.full_name,
  notices.id,
  notices.topic,
  notices.content,
  notices.created_at,
  parents.username,
  admins.admin_name,
  notice_student_relation.notice_choice_id;`);
  }

  async insertChoice(studentId: number, noticeId: number, noticeChoiceId: number) {
    console.log("3",studentId,noticeId,noticeChoiceId);
    
    let result = await this.knex('notice_student_relation')
    .update({ notice_choice_id: noticeChoiceId })
    .where({ student_id: studentId, notice_id: noticeId });
      // .where('student_id', studentId)
      // .andWhere('notice_id', noticeId)
      // .update('notice_choice_id', noticeChoiceId );
    
      console.log("check ",result);
    return result; 
    
  }

    // return await this.knex('notice_student_relation')
    // .where({ student_id, notice_id })
    // .update({ notice_choice_id })
    // .then(() => {
    //   console.log('Record updated');
    // });

      
  



}

// adams code
// .raw(`SELECT DISTINCT students.first_name,students.last_name,student_class_relation.student_number,classes.id as class_id,classes.class_name,classes.grade,schools.full_name as school_name,
//   notices.id as notice_id,notices.topic,notices.content as notice_content,notices.created_at, parents.username as parent_username,admins.admin_name, array_agg(notice_choice.option) as notice_choices
//   from students
//   join student_class_relation on students.id = student_class_relation.student_id
//   join classes on student_class_relation.class_id = classes.id
//   join schools on students.school_id = schools.id
//   join notice_student_relation on students.id = notice_student_relation.student_id
//   join notices on notices.id = notice_student_relation.notice_id
//   join admin_class_relation on admin_class_relation.class_id = classes.id
//   join admins on  admin_class_relation.admin_id = admins.id
//   join parents on students.parent_id = parents.id
//   join notice_choice on notice_choice.notice_id = notices.id
//   where notices.id = ${noticeId}
//   and student_class_relation.student_id = ${studentId}
//   group by students.first_name,students.last_name,student_class_relation.student_number,classes.id ,classes.class_name,classes.grade,schools.full_name,
//   notices.id,notices.topic,notices.content,notices.created_at, parents.username,admins.admin_name
//   `);
