import { Request, Response } from "express";
import SuperAdminService from "../services/SuperAdminService";
import { getSchoolAbbr } from "../helper/getSchoolNameAbbr";
import { getUserName } from "../helper/getUserNameFromEmail";
// import { Upload } from "@aws-sdk/lib-storage";
import dotenv from "dotenv";
// import formidable from "formidable";

dotenv.config();

export default class SuperAdminController {
  constructor(private superAdminService: SuperAdminService) {}

  createAdmin = async (req: Request, res: Response) => {
    console.log("req.body", req.body);
    let emailListArray = req.body.emailList;

    // let emailArray = Object.keys(emailListObject).map(
    //   (key) => emailListObject[key]
    // );
    let response_array = [];
    for (let result of emailListArray) {
      let email = result;
      let username = await getUserName(email);
      let password = "1234567";
      let existEmail = await this.superAdminService.checkDuplicateEmailAdmin(
        email
      );
      let schoolAbbr = await getSchoolAbbr(email);

      if (existEmail) {
        response_array.push({ msg: `${email} already exists` });
      }

      if (!existEmail) {
        if (schoolAbbr) {
          let getSchoolTable = await this.superAdminService.getSchoolTable(
            schoolAbbr
          );

          if (getSchoolTable) {
            let newAdminData = await this.superAdminService.createNewAdmin(
              username,
              email,
              password,
              getSchoolTable.id
            );

            response_array.push({
              msg: `new admins user account ${getSchoolTable.full_name} , ${newAdminData.admin_email} , ${newAdminData.password}`,
            });
          } else {
            response_array.push({
              msg: `your school not yet subscript our service`,
            });
          }
        }
        // if (!schoolAbbr) {
        //   let newParentdetail = await this.superAdminService.createNewParent(
        //     username,
        //     email,
        //     password
        //   );

        //   console.log(newParentdetail);

        //   response_array.push({
        //     msg: `${newParentdetail.email} established`,
        //   });
        // }
      }
    }

    res.status(200).json(response_array);
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

  // createStudent = (req: Request, res: Response) => {
  //   const searchForm = formidable({
  //     uploadDir: "images/image_search",
  //     keepExtensions: true,
  //     maxFiles: 1,
  //     maxFileSize: 1024 * 1024 * 5,
  //     filter: (part) => part.mimetype?.startsWith("image/") || false,

  //   });
  // };

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
