import { Knex } from "knex";

export default class HomeSerive {
  constructor(private knex: Knex) {}
  table() {
    return this.knex("get_class");
  }

  async getALLClassInfo(
    userRole: string,
    userRoleId: number,
    school_id: number
  ) {
    return await this.knex

      .select(
        "students.first_name",
        "students.last_name",
        "students.gender",
        "students.birthday",
        "students.image"
      )
      .from("students")

      .innerJoin(
        "student_class_relation as scr",
        "scr.student_id",
        "students.id"
      )
      .select("scr.student_number")

      .innerJoin("classes", "scr.class_id", "classes.id")
      .select("classes.grade", "classes.class_name")

      .innerJoin("admin_class_relation as acr", "classes.id", " acr.class_id")

      .innerJoin("admins", "acr.admin_id", "admins.id")
      .select("admins.admin_name")
      .innerJoin("schools", "schools.id", "admins.school_id")

      .select("schools.full_name", "schools.abbr_name")

      .innerJoin("parents", "students.parent_id", "parents.id")

      .select("parents.username")

      .innerJoin(
        "class_school_year_relation as csy",
        "csy.class_id",
        "classes.id"
      )
      .innerJoin("school_years", "csy.school_year_id", "school_years.id")

      .select("school_years.school_year")

      .where(`${userRole}s.id`, userRoleId);
    // .where("students.school_id", school_id);
  }
}

// version 2
// SELECT
//     schools.id AS school_id,
//     schools.full_name AS school_name,
//     school_years.school_year,
//     classes.grade,
//     classes.class_name,
//     students.id AS student_id,
//     students.first_name,
//     students.last_name,
//     students.gender,
//     students.birthday,
//     students.image,
//     students.parent_id,
//     students.school_id AS student_school_id,
//     admins.id AS admin_id,
//     admins.admin_name,
//     admins.school_id AS admin_school_id,
//     parents.id AS parent_id,
//     parents.username
// FROM schools
// INNER JOIN school_years ON schools.id = school_years.school_id
// INNER JOIN classes ON schools.id = classes.id
// INNER JOIN students ON schools.id = students.school_id
// INNER JOIN admins ON schools.id = admins.school_id
// INNER JOIN parents ON students.parent_id = parents.id

// .select(
//   'schools.id AS school_id',
//   'schools.full_name AS school_name',
//   'school_years.school_year',
//   'classes.grade',
//   'classes.class_name',
//   'students.id AS student_id',
//   'students.first_name',
//   'students.last_name',
//   'students.gender',
//   'students.birthday',
//   'students.image',
//   'students.parent_id',
//   'students.school_id AS student_school_id',
//   'admins.id AS admin_id',
//   'admins.admin_name',
//   'admins.school_id AS admin_school_id',
//   'parents.id AS parent_id',
//   'parents.username'
// )
// .from('schools')
// .innerJoin('school_years', 'schools.id', 'school_years.school_id')
// .innerJoin('classes', 'schools.id', 'classes.id')
// .innerJoin('students', 'schools.id', 'students.school_id')
// .innerJoin('admins', 'schools.id', 'admins.school_id')
// .innerJoin('parents', 'students.parent_id', 'parents.id')

// version 1
// SELECT DISTINCT
//   c.id AS class_id,
//   c.class_name,
//   c.grade,
//   s.name AS school_name,
//   sy.school_year AS school_year,
//   a.username AS admin_username,
//   st.first_name AS student_first_name,
//   st.last_name AS student_last_name,
//   st.image AS student_image,
//   p.username AS parent_username
// FROM student_class_relation sc
// INNER JOIN admin_class_relation ac ON sc.class_id = ac.class_id
// INNER JOIN classes c ON sc.class_id = c.id
// INNER JOIN class_school_year_relation csy ON c.id = csy.class_id
// INNER JOIN school_years sy ON csy.school_year_id = sy.id
// INNER JOIN admins a ON ac.admin_id = a.id
// INNER JOIN students st ON sc.student_id = st.id
// INNER JOIN schools s ON a.school_id = s.id
// LEFT JOIN parents p ON st.id = p.id

// .select(
//   "c.id as class_id",
//   "c.class_name",
//   "c.grade",
//   "s.full_name as school_name",
//   "st.id as student_id",
//   "sy.school_year",
//   "a.admin_name as admin_username",
//   "st.first_name as student_first_name",
//   "st.last_name as student_last_name",
//   "st.image AS student_image",
//   "p.username as parent_username"
// )
// .from("student_class_relation as sc")
// .join("admin_class_relation as ac", "sc.class_id", "=", "ac.class_id")
// .join("classes as c", "sc.class_id", "=", "c.id")
// .join("class_school_year_relation as csy", "c.id", "csy.class_id")
// .join("school_years as sy", "csy.school_year_id", "sy.id")
// .join("admins as a", "ac.admin_id", "=", "a.id")
// .join("students as st", "sc.student_id", "=", "st.id")
// .join("schools as s", "a.school_id", "=", "s.id")
// .join("parents as p", "st.id", "=", "p.id");
