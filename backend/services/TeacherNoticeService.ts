import { Knex } from "knex";

export default class TeacherNoticeService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex("get_teacherNotice");
  }

  async getTeacherNotice(
    userRole: string, 
    userRoleId: number,
    
  ) 
  {
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
      "notices.created_at"
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
      "notices.created_at"
        

        
      );

    //   .where(`${userRole}_id`, userRoleId)
  }

  async getTeacherNoticeDetail(
    userRole: string, 
    userRoleId: number,
    noticeId: number,
    school_id: number,
  ) {

    //Version 6
    return await this.knex
    .select(
      'notices.id as notice_id',
      'notices.topic',
      'notices.content',
      'classes.id as class_id',
      'classes.grade',
      'classes.class_name',
      'admins.admin_name',
      this.knex.raw('ARRAY_AGG(students.id) as student_ids_2'),
      this.knex.raw('ARRAY_AGG(notice_student_relation.notice_choice_id) as notice_choice_id_2'),
      this.knex.raw('ARRAY_AGG(students.last_name || \' \' || students.first_name) as student_names'),
      this.knex.raw('ARRAY_AGG(students.parent_id) as parent_ids'),
      this.knex.raw('ARRAY_AGG(student_class_relation.student_number) as student_numbers'),
      this.knex.raw('ARRAY_AGG(notice_choice.option) as notice_choice_options'),
      this.knex.raw('ARRAY_AGG(notice_choice.content) as notice_choice_contents'),
      this.knex.raw('SUM(CASE WHEN notice_student_relation.notice_choice_id IS NULL THEN 1 ELSE 0 END) as null_count'),
      this.knex.raw('SUM(CASE WHEN notice_student_relation.notice_choice_id IS NOT NULL THEN 1 ELSE 0 END) as notnull_count'),
      'schools.id as school_id'
    )
    .from('notice_student_relation')
    .innerJoin('notices', 'notice_student_relation.notice_id', 'notices.id')
    .innerJoin('student_class_relation', 'notice_student_relation.student_id', 'student_class_relation.student_id')
    .innerJoin('classes', 'student_class_relation.class_id', 'classes.id')
    .innerJoin('admin_class_relation', 'classes.id', 'admin_class_relation.class_id')
    .innerJoin('students', 'student_class_relation.student_id', 'students.id')
    .innerJoin('admins', 'admin_class_relation.admin_id', 'admins.id')
    .innerJoin('schools', 'students.school_id', 'schools.id')
    .leftJoin('notice_choice', 'notice_student_relation.notice_choice_id', 'notice_choice.id')
    .where("admins.id", userRoleId)
    .andWhere('notices.id', noticeId)
    .andWhere('schools.id', school_id)
    .groupBy(
      'notices.id',
      'notices.topic',
      'notices.content',
      'classes.id',
      'classes.grade',
      'classes.class_name',
      'admins.admin_name',
      'schools.id'
    )
    .having(this.knex.raw('SUM(CASE WHEN notice_student_relation.notice_choice_id IS NULL THEN 1 ELSE 0 END) IS NOT NULL'))
    .andHaving(this.knex.raw('SUM(CASE WHEN notice_student_relation.notice_choice_id IS NOT NULL THEN 1 ELSE 0 END) IS NOT NULL'))
    
    //Version 4
    // ('notice_student_relation')
    // .join('notices', 'notice_student_relation.notice_id', '=', 'notices.id')
    // .join('student_class_relation', 'notice_student_relation.student_id', '=', 'student_class_relation.student_id')
    // .join('classes', 'student_class_relation.class_id', '=', 'classes.id')
    // .join('admin_class_relation', 'classes.id', '=', 'admin_class_relation.class_id')
    // .join('students', 'student_class_relation.student_id', '=', 'students.id')
    // .join('admins', 'admin_class_relation.admin_id', '=', 'admins.id')
    // .join('schools', 'classes.school_id', '=', 'schools.id')
    // .leftJoin('notice_choice', 'notice_student_relation.notice_choice_id', '=', 'notice_choice.id')
    // .where('admins.id', userRoleId)
    // .where('notices.id', noticeId)
    // .where('schools.id', 1)
    // .groupBy(
    //   'notices.id',
    //   'notices.topic',
    //   'notices.content',
    //   'classes.id',
    //   'classes.grade',
    //   'classes.class_name',
    //   'admins.admin_name',
    //   'schools.id'
    // )
    // .havingRaw(
    //   'SUM(CASE WHEN notice_student_relation.notice_choice_id IS NULL THEN 1 ELSE 0 END) IS NOT NULL AND SUM(CASE WHEN notice_student_relation.notice_choice_id IS NOT NULL THEN 1 ELSE 0 END) IS NOT NULL'
    // )
    // .select(
    //   'notices.id as notice_id',
    //   'notices.topic',
    //   'notices.content',
    //   'classes.id as class_id',
    //   'classes.grade',
    //   'classes.class_name',
    //   'admins.admin_name',
    //   'schools.id as school_id',
    //   this.knex.raw('ARRAY_AGG(students.id) as student_ids_2'),
    //   this.knex.raw('ARRAY_AGG(notice_student_relation.notice_choice_id) as notice_choice_id_2'),
    //   this.knex.raw('ARRAY_AGG(students.last_name || \' \' || students.first_name) as student_names'),
    //   this.knex.raw('ARRAY_AGG(students.parent_id) as parent_ids'),
    //   this.knex.raw('ARRAY_AGG(student_class_relation.student_number) as student_numbers'),
    //   this.knex.raw('ARRAY_AGG(notice_choice.option) as notice_choice_options'),
    //   this.knex.raw('ARRAY_AGG(notice_choice.content) as notice_choice_contents'),
    //   this.knex.raw('SUM(CASE WHEN notice_student_relation.notice_choice_id IS NULL THEN 1 ELSE 0 END) AS null_count'),
    //   this.knex.raw('SUM(CASE WHEN notice_student_relation.notice_choice_id IS NOT NULL THEN 1 ELSE 0 END) AS not_null_count')
    // );
    
    //Version 3
    // ('notice_student_relation')
    // .join('notices', 'notice_student_relation.notice_id', '=', 'notices.id')
    // .join('student_class_relation', 'notice_student_relation.student_id', '=', 'student_class_relation.student_id')
    // .join('classes', 'student_class_relation.class_id', '=', 'classes.id')
    // .join('admin_class_relation', 'classes.id', '=', 'admin_class_relation.class_id')
    // .join('students', 'student_class_relation.student_id', '=', 'students.id')
    // .join('admins', 'admin_class_relation.admin_id', '=', 'admins.id')
    // .leftJoin('notice_choice', 'notice_student_relation.notice_choice_id', '=', 'notice_choice.id')
    // .where("admins.id", userRoleId)
    // .where('notices.id', noticeId)
    // .groupBy(
    //   'notices.id',
    //   'notices.topic',
    //   'notices.content',
    //   'classes.id',
    //   'classes.grade',
    //   'classes.class_name',
    //   'admins.admin_name'
    // )
    // .havingRaw(
    //   'SUM(CASE WHEN notice_student_relation.notice_choice_id IS NULL THEN 1 ELSE 0 END) IS NOT NULL AND SUM(CASE WHEN notice_student_relation.notice_choice_id IS NOT NULL THEN 1 ELSE 0 END) IS NOT NULL'
    // )
    // .select(
    //   'notices.id as notice_id',
    //   'notices.topic',
    //   'notices.content',
    //   'classes.id as class_id',
    //   'classes.grade',
    //   'classes.class_name',
    //   'admins.admin_name',
    //   this.knex.raw('ARRAY_AGG(students.id) as student_ids_2'),
    //   this.knex.raw('ARRAY_AGG(notice_student_relation.notice_choice_id) as notice_choice_id_2'),
    //   this.knex.raw('ARRAY_AGG(students.last_name || \' \' || students.first_name) as student_names'),
    //   this.knex.raw('ARRAY_AGG(students.parent_id) as parent_ids'),
    //   this.knex.raw('ARRAY_AGG(student_class_relation.student_number) as student_numbers'),
    //   this.knex.raw('ARRAY_AGG(notice_choice.option) as notice_choice_options'),
    //   this.knex.raw('ARRAY_AGG(notice_choice.content) as notice_choice_contents'),
    //   this.knex.raw('SUM(CASE WHEN notice_student_relation.notice_choice_id IS NULL THEN 1 ELSE 0 END) AS null_count'),
    //   this.knex.raw('SUM(CASE WHEN notice_student_relation.notice_choice_id IS NOT NULL THEN 1 ELSE 0 END) AS not_null_count')
    // );
    

  
}
}



// SELECT
//   admins.id,
//   admins.admin_name,
//   classes.grade,
//   school_years.school_year,
//   notice_student_relation.notice_id,
//   notices.created_at
// FROM admins
// INNER JOIN admin_class_relation ON admins.id = admin_class_relation.admin_id
// INNER JOIN classes ON admin_class_relation.class_id = classes.id
// INNER JOIN class_school_year_relation ON classes.id = class_school_year_relation.class_id
// INNER JOIN school_years ON class_school_year_relation.school_year_id = school_years.id
// INNER JOIN student_class_relation ON classes.id = student_class_relation.class_id
// INNER JOIN students ON student_class_relation.student_id = students.id
// INNER JOIN notice_student_relation ON students.id = notice_student_relation.student_id
// INNER JOIN notices ON notice_student_relation.notice_id = notices.id
// WHERE admins.id = 1
// GROUP BY
//   admins.id,
//   admins.admin_name,
//   classes.grade,
//   school_years.school_year,
//   notice_student_relation.notice_id,
//   notices.created_at


//Version 6
// SELECT
//   "notices"."id" AS "notice_id",
//   "notices"."topic",
//   "notices"."content",
//   "classes"."id" AS "class_id",
//   "classes"."grade",
//   "classes"."class_name",
//   "admins"."admin_name",
//   ARRAY_AGG(students.id) AS student_ids_2,
//   ARRAY_AGG(notice_student_relation.notice_choice_id) AS notice_choice_id_2,
//   ARRAY_AGG(students.last_name || ' ' || students.first_name) AS student_names,
//   ARRAY_AGG(students.parent_id) AS parent_ids,
//   ARRAY_AGG(student_class_relation.student_number) AS student_numbers,
//   ARRAY_AGG(notice_choice.option) AS notice_choice_options,
//   ARRAY_AGG(notice_choice.content) AS notice_choice_contents,
//   SUM(CASE WHEN notice_student_relation.notice_choice_id IS NULL THEN 1 ELSE 0 END) AS null_count,
//   SUM(CASE WHEN notice_student_relation.notice_choice_id IS NOT NULL THEN 1 ELSE 0 END) AS notnull_count,
//   "schools"."id" AS "school_id"
// FROM "notice_student_relation"
// INNER JOIN "notices" ON "notice_student_relation"."notice_id" = "notices"."id"
// INNER JOIN "student_class_relation" ON "notice_student_relation"."student_id" = "student_class_relation"."student_id"
// INNER JOIN "classes" ON "student_class_relation"."class_id" = "classes"."id"
// INNER JOIN "admin_class_relation" ON "classes"."id" = "admin_class_relation"."class_id"
// INNER JOIN "students" ON "student_class_relation"."student_id" = "students"."id"
// INNER JOIN "admins" ON "admin_class_relation"."admin_id" = "admins"."id"
// INNER JOIN "schools" ON "students"."school_id" = "schools"."id" AND "schools"."id" = 1
// LEFT JOIN "notice_choice" ON "notice_student_relation"."notice_choice_id" = "notice_choice"."id"
// WHERE "admins"."id" = 1
//   AND "notices"."id" = 1
// GROUP BY "notices"."id", "notices"."topic", "notices"."content", "classes"."id", "classes"."grade", "classes"."class_name", "admins"."admin_name", "schools"."id"
// HAVING
//   SUM(CASE WHEN notice_student_relation.notice_choice_id IS NULL THEN 1 ELSE 0 END) IS NOT NULL
//   AND SUM(CASE WHEN notice_student_relation.notice_choice_id IS NOT NULL THEN 1 ELSE 0 END) IS NOT NULL;

//Version 5
// SELECT
//   "notices"."id" AS "notice_id",
//   "notices"."topic",
//   "notices"."content",
//   "classes"."id" AS "class_id",
//   "classes"."grade",
//   "classes"."class_name",
//   "admins"."admin_name",
//   ARRAY_AGG(students.id) AS student_ids_2,
//   ARRAY_AGG(notice_student_relation.notice_choice_id) AS notice_choice_id_2,
//   ARRAY_AGG(students.last_name || ' ' || students.first_name) AS student_names,
//   ARRAY_AGG(students.parent_id) AS parent_ids,
//   ARRAY_AGG(student_class_relation.student_number) AS student_numbers,
//   ARRAY_AGG(notice_choice.option) AS notice_choice_options,
//   ARRAY_AGG(notice_choice.content) AS notice_choice_contents,
//   SUM(CASE WHEN notice_student_relation.notice_choice_id IS NULL THEN 1 ELSE 0 END) AS null_count,
//   SUM(CASE WHEN notice_student_relation.notice_choice_id IS NOT NULL THEN 1 ELSE 0 END) AS notnull_count,
//   "schools"."id" AS "school_id"
// FROM "notice_student_relation" 
// INNER JOIN "notices" ON "notice_student_relation"."notice_id" = "notices"."id"
// INNER JOIN "student_class_relation" ON "notice_student_relation"."student_id" = "student_class_relation"."student_id"
// INNER JOIN "classes" ON "student_class_relation"."class_id" = "classes"."id"
// INNER JOIN "admin_class_relation" ON "classes"."id" = "admin_class_relation"."class_id"
// INNER JOIN "students" ON "student_class_relation"."student_id" = "students"."id"
// INNER JOIN "admins" ON "admin_class_relation"."admin_id" = "admins"."id"
// INNER JOIN "schools" ON "classes"."id" = (SELECT class_id FROM student_class_relation WHERE student_id = students.id LIMIT 1)
// LEFT JOIN "notice_choice" ON "notice_student_relation"."notice_choice_id" = "notice_choice"."id"
// WHERE "admins"."id" = 1 AND "notices"."id" = 1 AND "schools"."id" = 1
// GROUP BY "notices"."id", "notices"."topic", "notices"."content", "classes"."id", "classes"."grade", "classes"."class_name", "admins"."admin_name", "schools"."id"
// HAVING 
//   SUM(CASE WHEN notice_student_relation.notice_choice_id IS NULL THEN 1 ELSE 0 END) IS NOT NULL
//   AND SUM(CASE WHEN notice_student_relation.notice_choice_id IS NOT NULL THEN 1 ELSE 0 END) IS NOT NULL;



// Version 3
// SELECT
//   notices.id as notice_id,
//   notices.topic,
//   notices.content,
//   classes.id as class_id,
//   classes.grade,
//   classes.class_name,
//   admins.admin_name,
//   ARRAY_AGG(students.id) as student_ids_2,
//   ARRAY_AGG(notice_student_relation.notice_choice_id) as notice_choice_id_2,
//   ARRAY_AGG(students.last_name || ' ' || students.first_name) as student_names,
//   ARRAY_AGG(students.parent_id) as parent_ids,
//   ARRAY_AGG(student_class_relation.student_number) as student_numbers,
//   ARRAY_AGG(notice_choice.option) as notice_choice_options,
//   ARRAY_AGG(notice_choice.content) as notice_choice_contents,
//   SUM(CASE WHEN notice_student_relation.notice_choice_id IS NULL THEN 1 ELSE 0 END) AS null_count,
//   SUM(CASE WHEN notice_student_relation.notice_choice_id IS NOT NULL THEN 1 ELSE 0 END) AS not_null_count
// FROM notice_student_relation
// JOIN notices ON notice_student_relation.notice_id = notices.id
// JOIN student_class_relation ON notice_student_relation.student_id = student_class_relation.student_id
// JOIN classes ON student_class_relation.class_id = classes.id
// JOIN admin_class_relation ON classes.id = admin_class_relation.class_id
// JOIN students ON student_class_relation.student_id = students.id
// JOIN admins ON admin_class_relation.admin_id = admins.id
// LEFT JOIN notice_choice ON notice_student_relation.notice_choice_id = notice_choice.id
// WHERE admins.id = 1
//   AND notices.id = 10
// GROUP BY
//   notices.id,
//   notices.topic,
//   notices.content,
//   classes.id,
//   classes.grade,
//   classes.class_name,
//   admins.admin_name
// HAVING 
//   SUM(CASE WHEN notice_student_relation.notice_choice_id IS NULL THEN 1 ELSE 0 END) IS NOT NULL
//   AND SUM(CASE WHEN notice_student_relation.notice_choice_id IS NOT NULL THEN 1 ELSE 0 END) IS NOT NULL;

//Version 2
// SELECT DISTINCT
//     notices.id AS notice_id,
//     notices.topic,
//     notices.content,
//     classes.id AS class_id,
//     classes.grade,
//     classes.class_name,
//     admins.admin_name,
//     (SELECT ARRAY_AGG(students.id)
//      FROM student_class_relation
//      JOIN students ON student_class_relation.student_id = students.id
//      WHERE student_class_relation.class_id = classes.id) AS student_ids_2,
//     (SELECT ARRAY_AGG(notice_student_relation.notice_choice_id)
//      FROM notice_student_relation
//      JOIN student_class_relation ON notice_student_relation.student_id = student_class_relation.student_id
//      WHERE student_class_relation.class_id = classes.id) AS notice_choice_id_2,
//     (SELECT COUNT(*)
//      FROM (
//          SELECT notice_choice_id
//          FROM notice_student_relation
//          JOIN student_class_relation ON notice_student_relation.student_id = student_class_relation.student_id
//          WHERE student_class_relation.class_id = classes.id
//          AND notice_choice_id IS NULL
//      ) AS subquery) AS null_count,
//     (SELECT COUNT(*)
//      FROM (
//          SELECT notice_choice_id
//          FROM notice_student_relation
//          JOIN student_class_relation ON notice_student_relation.student_id = student_class_relation.student_id
//          WHERE student_class_relation.class_id = classes.id
//          AND notice_choice_id IS NOT NULL
//      ) AS subquery) AS notNull_count,
//     (SELECT ARRAY_AGG(students.last_name || ' ' || students.first_name)
//      FROM student_class_relation
//      JOIN students ON student_class_relation.student_id = students.id
//      WHERE student_class_relation.class_id = classes.id) AS student_names,
//     (SELECT ARRAY_AGG(students.parent_id)
//      FROM student_class_relation
//      JOIN students ON student_class_relation.student_id = students.id
//      WHERE student_class_relation.class_id = classes.id) AS parent_ids,
//     (SELECT ARRAY_AGG(student_class_relation.student_number)
//      FROM student_class_relation
//      WHERE student_class_relation.class_id = classes.id) AS student_numbers,
//     ARRAY_AGG(notice_choice.option) AS notice_choice_options,
//     ARRAY_AGG(notice_choice.content) AS notice_choice_contents
// FROM notice_student_relation
// JOIN notices ON notice_student_relation.notice_id = notices.id
// JOIN student_class_relation ON notice_student_relation.student_id = student_class_relation.student_id
// JOIN classes ON student_class_relation.class_id = classes.id
// JOIN admin_class_relation ON classes.id = admin_class_relation.class_id
// JOIN students ON student_class_relation.student_id = students.id
// JOIN admins ON admin_class_relation.admin_id = admins.id
// LEFT JOIN notice_choice ON notice_student_relation.notice_choice_id = notice_choice.id
// WHERE admin_class_relation.admin_id = 1
// GROUP BY
//     notices.id,
//     notices.topic,
//     notices.content,
//     classes.id,
//     classes.grade,
//     classes.class_name,
//     admins.admin_name;

// Version 1
// SELECT DISTINCT
//     notices.id AS notice_id,
//     notices.topic,
//     notices.content,
//     classes.id AS class_id,
//     classes.grade,
//     classes.class_name,
//     admins.admin_name,
//     (SELECT ARRAY_AGG(notice_student_relation.student_id)
//      FROM notice_student_relation
//      WHERE notice_student_relation.notice_id = notices.id) AS student_ids,
//     (SELECT ARRAY_AGG(notice_student_relation.notice_choice_id)
//      FROM notice_student_relation
//      WHERE notice_student_relation.notice_id = notices.id) AS notice_choice_ids,
//     (SELECT ARRAY_AGG(students.id)
//      FROM student_class_relation
//      JOIN students ON student_class_relation.student_id = students.id
//      WHERE student_class_relation.class_id = classes.id) AS student_ids_2,
//     (SELECT ARRAY_AGG(notice_student_relation.notice_choice_id)
//      FROM notice_student_relation
//      JOIN student_class_relation ON notice_student_relation.student_id = student_class_relation.student_id
//      WHERE student_class_relation.class_id = classes.id) AS notice_choice_id_2,
//     (SELECT COUNT(*)
//      FROM (
//          SELECT notice_choice_id
//          FROM notice_student_relation
//          JOIN student_class_relation ON notice_student_relation.student_id = student_class_relation.student_id
//          WHERE student_class_relation.class_id = classes.id
//          AND notice_choice_id IS NULL
//      ) AS subquery) AS null_count,
//     (SELECT COUNT(*)
//      FROM (
//          SELECT notice_choice_id
//          FROM notice_student_relation
//          JOIN student_class_relation ON notice_student_relation.student_id = student_class_relation.student_id
//          WHERE student_class_relation.class_id = classes.id
//          AND notice_choice_id IS NOT NULL
//      ) AS subquery) AS notNull_count,
//     (SELECT ARRAY_AGG(students.last_name || ' ' || students.first_name)
//      FROM student_class_relation
//      JOIN students ON student_class_relation.student_id = students.id
//      WHERE student_class_relation.class_id = classes.id) AS student_names,
//     (SELECT ARRAY_AGG(students.parent_id)
//      FROM student_class_relation
//      JOIN students ON student_class_relation.student_id = students.id
//      WHERE student_class_relation.class_id = classes.id) AS parent_ids,
//     (SELECT ARRAY_AGG(student_class_relation.student_number)
//      FROM student_class_relation
//      WHERE student_class_relation.class_id = classes.id) AS student_numbers
// FROM notice_student_relation
// JOIN notices ON notice_student_relation.notice_id = notices.id
// JOIN student_class_relation ON notice_student_relation.student_id = student_class_relation.student_id
// JOIN classes ON student_class_relation.class_id = classes.id
// JOIN admin_class_relation ON classes.id = admin_class_relation.class_id
// JOIN students ON student_class_relation.student_id = students.id
// JOIN admins ON admin_class_relation.admin_id = admins.id
// WHERE admin_class_relation.admin_id = 1
// GROUP BY
//     notices.id,
//     notices.topic,
//     notices.content,
//     classes.id,
//     classes.grade,
//     classes.class_name,
//     admins.admin_name;
