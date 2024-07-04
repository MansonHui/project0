import { Knex } from "knex";

export default class AttendanceAndNoticeService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex("allMessageAll");
  }

  // async getAll(userRole: string, userRoleId: number, page = 1, pageSize = 10) {
  //   const offset = (page - 1) * pageSize;
    async getAll(userRole: string,
      userRoleId: number,
      noticeId: number,
      studentId: number) {
    return this.knex

    .select(
      'students.first_name',
      'students.last_name',
      'student_attendance.in_out',
      'student_attendance.created_at',
      'students.id AS student_id',
      this.knex.raw('NULL AS grade'),
      this.knex.raw('NULL AS class_name'),
      this.knex.raw('NULL AS topic'),
      this.knex.raw('NULL AS content'),
      this.knex.raw('NULL AS full_name'),
      this.knex.raw('NULL AS notice_id')
    )
    .from('students')
    .innerJoin('student_attendance', 'students.id', '=', 'student_attendance.student_id')
    .where(`${userRole}_id`, userRoleId)
    .unionAll(
      this.knex.select(
        'students.first_name',
        'students.last_name',
        this.knex.raw('NULL AS in_out'),
        this.knex.raw('NULL AS created_at'),
        'students.id AS student_id',
        'classes.grade',
        'classes.class_name',
        'notices.topic',
        'notices.content',
        'schools.full_name',
        'notices.id as notice_id'
      )
      .from('students')
      .join('notice_student_relation', 'students.id', '=', 'notice_student_relation.student_id')
      .join('notices', 'notice_student_relation.notice_id', '=', 'notices.id')
      .join('student_class_relation', 'students.id', '=', 'student_class_relation.student_id')
      .join('classes', 'student_class_relation.class_id', '=', 'classes.id')
      .join('schools', 'students.school_id', '=', 'schools.id')
      .where(`${userRole}_id`, userRoleId)
    )
    
  }
}

// Version 3 加入 notice.id 
// (
//   SELECT
//     students.first_name,
//     students.last_name,
//     student_attendance.in_out,
//     student_attendance.created_at,
//     NULL AS id,
//     NULL AS grade,
//     NULL AS class_name,
//     NULL AS topic,
//     NULL AS content,
//     NULL AS full_name,
//     NULL AS notice_id
//   FROM students
//   INNER JOIN student_attendance
//   ON students.id = student_attendance.student_id
// )
// UNION ALL
// (
//   SELECT
//     students.first_name,
//     students.last_name,
//     NULL AS in_out,
//     NULL AS created_at,
//     students.id,
//     classes.grade,
//     classes.class_name,
//     notices.topic,
//     notices.content,
//     schools.full_name,
//     notices.id as notice_id
//   FROM students
//   JOIN notice_student_relation ON students.id = notice_student_relation.student_id
//   JOIN notices ON notice_student_relation.notice_id = notices.id
//   JOIN student_class_relation ON students.id = student_class_relation.student_id
//   JOIN classes ON student_class_relation.class_id = classes.id
//   JOIN schools ON students.school_id = schools.id
// )





// version 2
// (
//   SELECT
//     students.first_name,
//     students.last_name,
//     student_attendance.in_out,
//     student_attendance.created_at,
//     NULL AS id,
//     NULL AS grade,
//     NULL AS class_name,
//     NULL AS topic,
//     NULL AS content,
//     NULL AS full_name
//   FROM students
//   INNER JOIN student_attendance
//   ON students.id = student_attendance.student_id
// )
// UNION ALL
// (
//   SELECT
//     students.first_name,
//     students.last_name,
//     NULL AS in_out,
//     NULL AS created_at,
//     students.id,
//     classes.grade,
//     classes.class_name,
//     notices.topic,
//     notices.content,
//     schools.full_name
//   FROM students
//   JOIN notice_student_relation ON students.id = notice_student_relation.student_id
//   JOIN notices ON notice_student_relation.notice_id = notices.id
//   JOIN student_class_relation ON students.id = student_class_relation.student_id
//   JOIN classes ON student_class_relation.class_id = classes.id
//   JOIN schools ON students.school_id = schools.id
// )

// version 1
// SELECT
//   classes.grade,
//   classes.class_name,
//   notices.topic,
//   notices.content,
//   students.first_name,
//   students.last_name,
//   schools.full_name,
//   NULL AS in_out,
//   notices.created_at,
//   students.id AS student_id
// FROM students
// INNER JOIN schools ON students.school_id = schools.id
// INNER JOIN notice_student_relation ON students.id = notice_student_relation.student_id
// INNER JOIN notices ON notice_student_relation.notice_id = notices.id
// INNER JOIN student_class_relation ON students.id = student_class_relation.student_id
// INNER JOIN classes ON student_class_relation.class_id = classes.id
// UNION ALL
// SELECT
//   NULL AS grade,
//   NULL AS class_name,
//   NULL AS topic,
//   NULL AS content,
//   students.first_name,
//   students.last_name,
//   NULL AS full_name,
//   student_attendance.in_out,
//   student_attendance.created_at,
//   students.id AS student_id
// FROM students
// INNER JOIN student_attendance ON students.id = student_attendance.student_id
// ORDER BY created_at;
