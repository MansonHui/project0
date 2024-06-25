import { Knex } from "knex";

export default class HomeSerive{
    constructor(private knex:Knex){}
    table(){
        return this.knex("get_class")
    }

    async getALLClassInfo(){
        return(
            await this.knex
            .select(
                'c.id as class_id',
                'c.class_name',
                'c.grade',
                's.full_name as school_name',
                'sy.school_year',
                'a.username as admin_username',
                'st.first_name as student_first_name',
                'st.last_name as student_last_name',
                'st.image AS student_image',
                'p.username as parent_username'
              )
              .from('student_class_relation as sc')
              .join('admin_class_relation as ac', 'sc.class_id', '=', 'ac.class_id')
              .join('classes as c', 'sc.class_id', '=', 'c.id')
              .join('class_school_year_relation as csy', 'c.id', 'csy.class_id')
              .join('school_years as sy', 'csy.school_year_id', 'sy.id')
              .join('admins as a', 'ac.admin_id', '=', 'a.id')
              .join('students as st', 'sc.student_id', '=', 'st.id')
              .join('schools as s', 'a.school_id', '=', 's.id')
              .leftJoin('parents as p', 'st.id', '=', 'p.id')
              .distinct()
        );
    }
}

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