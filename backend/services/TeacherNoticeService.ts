import { Knex } from "knex";

export default class TeacherNoticeService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex("get_teacherNotice");
  }

  async getTeacherNotice(userRole: string, userRoleId: number) {
    return await this.knex

    .select(
        "admins.id",
        "admins.admin_name",
        "classes.grade",
        "classes.class_name",
        "school_years.school_year",
        "notice_student_relation.notice_id",
        "notices.id as notices_id", 
        "notices.topic as notices_topic",
        
      )
      .from("admins")
      .innerJoin(
        "admin_class_relation",
        "admins.id",
        "admin_class_relation.admin_id"
      )
      .innerJoin("classes", "admin_class_relation.class_id", "classes.id")
      .innerJoin(
        "class_school_year_relation",
        "classes.id",
        "class_school_year_relation.class_id"
      )
      .innerJoin(
        "school_years",
        "class_school_year_relation.school_year_id",
        "school_years.id"
      )
      .innerJoin(
        "student_class_relation",
        "classes.id",
        "student_class_relation.class_id"
      )
      .innerJoin("students", "student_class_relation.student_id", "students.id")
      .innerJoin(
        "notice_student_relation",
        "students.id",
        "notice_student_relation.student_id"
      )
      .leftJoin(
        "notices",
        "notice_student_relation.notice_id",
        "notices.id"
      )
      .where("admins.id", userRoleId)
      .orderBy('notice_student_relation.notice_id', 'desc')
      .groupBy(
        "admins.id",
        "admins.admin_name",
        "classes.grade",
        'classes.class_name',
        "school_years.school_year",
        "notice_student_relation.notice_id",
        "notices.id",
        "notices.topic",
        
      );

    //   .where(`${userRole}_id`, userRoleId)
  }
}

// SELECT
//   admins.id,
//   admins.admin_name,
//   classes.grade,
//   school_years.school_year,
//   notice_student_relation.notice_id
// FROM admins
// INNER JOIN admin_class_relation ON admins.id = admin_class_relation.admin_id
// INNER JOIN classes ON admin_class_relation.class_id = classes.id
// INNER JOIN class_school_year_relation ON classes.id = class_school_year_relation.class_id
// INNER JOIN school_years ON class_school_year_relation.school_year_id = school_years.id
// INNER JOIN student_class_relation ON classes.id = student_class_relation.class_id
// INNER JOIN students ON student_class_relation.student_id = students.id
// INNER JOIN notice_student_relation ON students.id = notice_student_relation.student_id
// WHERE admins.id = 1
// GROUP BY
//   admins.id,
//   admins.admin_name,
//   classes.grade,
//   school_years.school_year,
//   notice_student_relation.notice_id
