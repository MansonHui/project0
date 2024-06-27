import { Knex } from "knex";

export default class AttendanceAndNoticeService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex("allMessageAll");
  }

  async getAll(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;

    return this.knex
      .select(
        "c.grade",
        "c.class_name",
        "n.topic",
        "n.content",
        "s.first_name",
        "s.last_name",
        "sch.full_name",
        this.knex.raw("NULL AS in_out"),
        "n.created_at"
      )
      .from("students as s")
      .innerJoin("schools as sch", "s.school_id", "sch.id")
      .innerJoin("notice_student_relation as nsr", "s.id", "nsr.student_id")
      .innerJoin("notices as n", "nsr.notice_id", "n.id")
      .innerJoin("student_class_relation as scr", "s.id", "scr.student_id")
      .innerJoin("classes as c", "scr.class_id", "c.id")

      .unionAll
      
      (
        this.knex
          .select(
            this.knex.raw("NULL AS grade"),
            this.knex.raw("NULL AS class_name"),
            this.knex.raw("NULL AS topic"),
            this.knex.raw("NULL AS content"),
            "s.first_name",
            "s.last_name",
            this.knex.raw("NULL AS full_name"),
            "student_attendance.in_out",
            "student_attendance.created_at"
          )
          .from("students as s")
          .innerJoin(
            "student_attendance",
            "s.id",
            "student_attendance.student_id"
          )
      )
      .orderBy("created_at")
      .offset(offset)
      .limit(pageSize);
  }
}

// (
//     SELECT
//       c.grade,
//       c.class_name,
//       n.topic,
//       n.content,
//       s.first_name,
//       s.last_name,
//       sch.full_name,
//       NULL AS in_out,
//       n.created_at
//     FROM students s
//     INNER JOIN schools sch ON s.school_id = sch.id
//     INNER JOIN notice_student_relation nsr ON s.id = nsr.student_id
//     INNER JOIN notices n ON nsr.notice_id = n.id
//     INNER JOIN student_class_relation scr ON s.id = scr.student_id
//     INNER JOIN classes c ON scr.class_id = c.id
//   )
//   UNION ALL
//   (
//     SELECT
//       NULL AS grade,
//       NULL AS class_name,
//       NULL AS topic,
//       NULL AS content,
//       s.first_name,
//       s.last_name,
//       NULL AS full_name,
//       student_attendance.in_out,
//       student_attendance.created_at
//     FROM students s
//     INNER JOIN student_attendance ON s.id = student_attendance.student_id
//   )
//   ORDER BY created_at;
