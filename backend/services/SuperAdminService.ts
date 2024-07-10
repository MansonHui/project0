import type { Knex } from "knex";

export default class SuperAdminService {
  constructor(private knex: Knex) {}
  // ===================  register ====================

  // Check email duplicate when register

  async checkDuplicateEmailAdmin(email: string) {
    return (
      await this.knex
        .select("*")
        .from("admins")
        .where("admin_email", email)
        .union([this.knex.select("*").from("parents").where("email", email)])
    )[0];
  }

  async checkDuplicateEmailParent(email: string) {
    return (
      await this.knex.select("*").from("parents").where("email", email)
    )[0];
  }

  async createNewParent(username: string, email: string, password: string) {
    return (
      await this.knex("parents")
        .insert({
          username: username,
          email: email,
          password: password,
          balance: 0,
          created_at: this.knex.fn.now(),
          updated_at: this.knex.fn.now(),
        })
        .returning("*")
    )[0];
  }

  async getSchoolTable(schoolAbbr: string) {
    return (
      await this.knex.select("*").from("schools").where("abbr_name", schoolAbbr)
    )[0];
  }

  async createNewAdmin(
    username: string,
    email: string,
    password: string,
    schoolID: number
  ) {
    return (
      await this.knex("admins")
        .insert({
          admin_name: username,
          admin_email: email,
          password: password,
          school_id: schoolID,
          created_at: this.knex.fn.now(),
          updated_at: this.knex.fn.now(),
        })
        .returning("*")
    )[0];
  }

  async getAllStudentData(abbrName: string) {
    let result = await this.knex
      .select("first_name", "last_name", "image")
      .from("students")

      .join(
        "student_class_relation as scr",
        "scr.student_id",
        "=",
        "students.id"
      )
      .select("student_number")

      .join("classes", "scr.class_id", "=", "classes.id")
      .select("grade", "class_name")

      .join(
        "class_school_year_relation as csy",
        "classes.id",
        "=",
        "csy.class_id"
      )

      .join("school_years", "csy.school_year_id", "=", "school_years.id")
      .select("school_year")

      .join("admin_class_relation as acr", "acr.class_id", "=", "classes.id")

      .join("admins", "acr.admin_id", "=", "admins.id")
      .select("admin_name")

      .join("schools", "students.school_id", "=", "schools.id")
      .select("schools.abbr_name")

      .join("parents", "parents.id", "=", "students.parent_id")
      .select("username")

      .where(`schools.abbr_name`, abbrName);

    return result;
  }

  async getParentId(email: string) {
    let parnetId = await this.knex
      .select("parents.id")
      .from("parents")
      .where("email", email);

    return parnetId[0];
  }

  async getSchoolId(school_Abbr: string) {
    let schoolId = await this.knex
      .select("schools.id")
      .from("schools")
      .where("abbr_name", school_Abbr);

    return schoolId[0];
  }

  async getSchoolFullName(schools_id: string) {
    let [schoolFullName] = await this.knex
      .select("schools.full_name")
      .from("schools")
      .where("id", schools_id);

    return schoolFullName;
  }

  async createNewStudent(
    first_name: string,
    last_name: string,
    HKID_number: string,
    birthday: string,
    gender: string,
    parentId: number,
    schoolId: number
  ) {
    console.log(
      "studnet info from service",
      first_name,
      last_name,
      HKID_number,
      birthday,
      gender,
      parentId,
      schoolId
    );
    return (
      await this.knex("students")
        .insert({
          first_name: first_name,
          last_name: last_name,
          HKID_number: HKID_number,
          birthday: birthday,
          gender: gender,
          parent_id: parentId,
          school_id: schoolId,

          created_at: this.knex.fn.now(),
          updated_at: this.knex.fn.now(),
        })
        .returning([
          "students.id",
          "students.first_name",
          "students.last_name",
          "students.created_at",
        ])
    )[0];
  }

  async createNotices(
    topic: string,
    content: string,
    optionStr: any[],
    grade: number,
    class_name: string,
    school_id: number
  ) {
    // Insert data into the "notices" table
    const [noticeId] = await this.knex("notices")
      .insert({
        topic: topic,
        content: content,
        created_at: this.knex.fn.now(),
        updated_at: this.knex.fn.now(),
      })
      .returning("id");

    console.log("noticeId.id", noticeId.id);

    console.log("optionStr", optionStr);

    for (const option of optionStr) {
      // console.log({
      //   option: option.option,
      //   content: option.content,
      //   price: option.price,
      //   notice_id: noticeId.id,
      //   created_at: this.knex.fn.now(),
      //   updated_at: this.knex.fn.now(),
      // });
      await this.knex("notice_choice").insert({
        option: option.option,
        content: option.content,
        price: option.price,
        notice_id: noticeId.id as number,
        created_at: this.knex.fn.now(),
        updated_at: this.knex.fn.now(),
      });
    }

    console.log({
      grade,
      class_name,
    });
    const [classId] = await this.knex
      .select("classes.id")
      .from("classes")
      .where("grade", grade)
      .where("class_name", class_name);

    console.log("classIdfrom  ", classId.id);

    // const [schoolID] = await this.knex
    //   .select("schools.id")
    //   .where("schools.abbr_name", schoolAbbr);

    // console.log("classIdfrom  ", schoolID.id);

    const studentsId = await this.knex
      .select("students.id")
      .from("students")
      .join("student_class_relation as scr", "scr.student_id", "students.id")
      .where("scr.class_id", classId.id)
      .where("students.school_id", school_id);

    for (const eachStudentId of studentsId) {
      console.log("eachStudentId.id", eachStudentId.id);

      let notice_student_relation_id = await this.knex(
        "notice_student_relation"
      )
        .insert({
          notice_id: noticeId.id as number,
          student_id: eachStudentId.id as number,
          created_at: this.knex.fn.now(),
          updated_at: this.knex.fn.now(),
        })
        .returning("id");

      console.log("notice_student_relation_id ", notice_student_relation_id);
    }

    // Perform joins with other tables
    let result = await this.knex("notices")
      .join("notice_choice", "notices.id", "notice_choice.notice_id")
      // .join("notice_student_relation as nsr", "notices.id", "nsr.notice_id")
      // .join("students", "students.id", "nsr.student_id")
      // .join("student_class_relation as scr", "students.id", "scr.student_id")
      // .join("classes", "classes.id", "scr.class_id")
      // .join("schools", "schools.id", "students.school_id")
      // .join("admins", "admins.school_id", "schools.id")
      // .where("classes.id", classId.id)
      .where("notices.id", noticeId.id)
      .returning("*");

    console.log("result", result);

    return result;
  }

  async uploadStudentImage(student_id: number, image: any) {
    try {
      let updatedRows = await this.knex("students")
        .where("id", student_id)
        .update({ image: image })
        .returning("id");

      let schoolNameAndStudentId = await this.knex
        .select("students.id", "schools.full_name")
        .from("students")
        .join("schools", "schools.id", "students.school_id")
        .where("students.id", student_id);

      console.log("schoolNameAndStudentId", schoolNameAndStudentId);

      if (updatedRows.length > 0) {
        console.log(
          `Image updated for student with ID ${student_id} ${schoolNameAndStudentId[0].full_name}`
        );
        return updatedRows[0]!.id as string;
      } else {
        console.log(`Student with ID ${student_id} not found.`);
        return null;
      }
    } catch (error) {
      console.error("Error updating student image:", error);
      throw error; // Handle the error appropriately in your application
    }

    // let [studentid] = await this.knex("students")
    //   .update({ image: image })
    //   .where("students.id", student_id)
    //   .returning("students.id");

    // return studentid.id;
  }

  async checkAttendance(student_id_number: number) {
    let existingRecordCurrentDate = await this.knex("student_attendance as sa")
      .select("sa.created_at")
      .select("in_out")
      .select("students.first_name")
      .join("students", "students.id", "sa.student_id")
      .where("sa.student_id", student_id_number)
      .orderBy("sa.created_at", "desc");

    // console.log("existingRecordCurrentDate", existingRecordCurrentDate);

    return existingRecordCurrentDate;
  }

  async createInAttendance(student_id_number: number) {
    let [createdInRecord] = await this.knex("student_attendance as sa")
      .insert({
        student_id: student_id_number,
        in_out: "in",
      })
      .where("sa.student_id", student_id_number)
      .returning("sa.student_id");
    console.log("createdInRecord", createdInRecord);
    return createdInRecord;
  }

  async createOutAttendance(student_id_number: number) {
    let [createdOutRecord] = await this.knex("student_attendance as sa")
      .join("students as s", "s.id", "sa.student_id")
      .insert({
        student_id: student_id_number,
        in_out: "out",
      })
      .where("sa.student_id", student_id_number)
      .returning("sa.student_id");

    console.log("createdOutRecord", createdOutRecord);
    return createdOutRecord;
  }
}
