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
        "students.id",
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
}

// SELECT
//   students.id
//   classes.grade,
//   classes.class_name,
//   notices.topic,
//   notices.content,
//   students.first_name,
//   students.last_name,
//   schools.full_name,
//   notices.created_at
// FROM students
// JOIN notice_student_relation ON students.id = notice_student_relation.student_id
// JOIN notices ON notice_student_relation.notice_id = notices.id
// JOIN student_class_relation ON students.id = student_class_relation.student_id
// JOIN classes ON student_class_relation.class_id = classes.id
// JOIN schools ON students.school_id = schools.id
