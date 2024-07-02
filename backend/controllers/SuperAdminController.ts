import { Request, Response } from "express";
import SuperAdminService from "../services/SuperAdminService";
import { getSchoolAbbr, isEduExistInMail } from "../helper/getSchoolNameAbbr";
import { getUserName } from "../helper/getUserNameFromEmail";
// import { Upload } from "@aws-sdk/lib-storage";
import dotenv from "dotenv";
import formidable from "formidable";
import fs from "fs";
import path from "path";

dotenv.config();

export default class SuperAdminController {
  constructor(private superAdminService: SuperAdminService) {}

  createAdmin = async (req: Request, res: Response) => {
    console.log("req.body", req.body);
    let email = req.body.email;

    // let emailArray = Object.keys(emailListObject).map(
    //   (key) => emailListObject[key]
    // );
    let response_array = [];

    let username = await getUserName(email);
    let password = username;
    let existEmail = await this.superAdminService.checkDuplicateEmailAdmin(
      email
    );
    let newAdminSchoolAbbr = await getSchoolAbbr(email);

    let superAdminSchoolAbbr = await getSchoolAbbr(req.body.userRoleEmail);

    let isEduExist = await isEduExistInMail(email);

    if (!isEduExist) {
      response_array.push({
        msg: `wrong email format`,
      });
    }

    if (isEduExist) {
      if (newAdminSchoolAbbr) {
        if (newAdminSchoolAbbr === superAdminSchoolAbbr) {
          if (existEmail) {
            response_array.push({ msg: `${email} already exists` });
          }

          if (!existEmail) {
            let isSchoolExist = await this.superAdminService.getSchoolTable(
              newAdminSchoolAbbr
            );

            if (isSchoolExist) {
              let newAdminData = await this.superAdminService.createNewAdmin(
                username,
                email,
                password,
                isSchoolExist.id
              );

              response_array.push({
                msg: `new admins user account ${isSchoolExist.full_name} , ${newAdminData.admin_email} , ${newAdminData.password}`,
              });

              if (!isSchoolExist) {
                response_array.push({
                  msg: `your school not yet subscript our service`,
                });
              }
            }
          }
        }
        if (newAdminSchoolAbbr !== superAdminSchoolAbbr) {
          response_array.push({
            msg: `your are not admin for that school `,
          });
        }
      }
    }

    return res.status(200).json(response_array);
  };

  createParent = async (req: Request, res: Response) => {
    console.log("req.body", req.body);

    // let emailArray = Object.keys(emailListObject).map(
    //   (key) => emailListObject[key]
    // );
    let response_array = [];

    let { email, password } = req.body;
    let username = await getUserName(email);
    let existEmail = await this.superAdminService.checkDuplicateEmailParent(
      email
    );

    if (existEmail) {
      response_array.push({ msg: `${email} already exists` });
    }

    if (!existEmail) {
      let newAdminData = await this.superAdminService.createNewParent(
        username,
        email,
        password
      );

      response_array.push({
        msg: `new parent account  ${newAdminData.email} , ${newAdminData.password},  ${newAdminData.id}`,
      });
    }

    res.status(200).json(response_array);
  };

  createStudent = (req: Request, res: Response) => {
    const uploadDir = path.join(__dirname, "../uploads");
    fs.mkdirSync(uploadDir, { recursive: true });

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFiles: 1,
      maxFileSize: 1024 * 1024,
      filter: (part) => part.mimetype?.startsWith("image/") || false,
    });

    form.parse(req, async (err, fields, files) => {
      console.log("fields.email", fields.email);
      let parentId = await this.superAdminService.getParentId(
        fields.email as unknown as string
      );

      let schoolId = await this.superAdminService.getSchoolId(
        (await getSchoolAbbr(req.body.userRoleEmail)) as string
      );

      console.log("parentId", parentId);

      let newStudentId = await this.superAdminService.createNewStudent(
        fields.first_name as unknown as string,
        fields.last_name as unknown as string,
        fields.HKID_number as unknown as string,
        fields.birthday as unknown as string,
        fields.gender as unknown as string,
        (files.image as unknown as formidable.File)?.newFilename,
        parentId.id,
        schoolId.id
      );

      let absolutePatth =
        uploadDir + "/" + (files.image as unknown as formidable.File)?.newFilename;

      console.log(absolutePatth);

      console.log("newStudentId", newStudentId);

      console.log({ err, fields, files });
      res.json({ fields, files });
    });
  };

  getAllStudentData = async (req: Request, res: Response) => {
    let SchoolAbbr = await getSchoolAbbr(req.body.userRoleEmail);

    console.log("SchoolAbbr", SchoolAbbr);
    let studentData = await this.superAdminService.getAllStudentData(
      SchoolAbbr!
    );
    console.log("req.body.userRoleEmail", req.body.userRoleEmail);
    res.json(studentData);
  };
}
