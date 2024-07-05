import { Request, Response } from "express";
import SuperAdminService from "../services/SuperAdminService";
import { getSchoolAbbr, isEduExistInMail } from "../helper/getSchoolNameAbbr";
import { getUserName } from "../helper/getUserNameFromEmail";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import formidable from "formidable";
import path from "path";
import fs from "fs";

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

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

  createStudent = async (req: Request, res: Response) => {
    let {
      email,
      first_name,
      last_name,
      HKID_number,
      birthday,
      gender,
      userRoleEmail,
    } = req.body;

    let parentId = await this.superAdminService.getParentId(email as string);

    console.log("parentId", parentId.id);

    let schoolId = await this.superAdminService.getSchoolId(
      (await getSchoolAbbr(userRoleEmail)) as string
    );

    console.log("schoolId", schoolId);

    let newStudentId = await this.superAdminService.createNewStudent(
      first_name,
      last_name,
      HKID_number,
      birthday,
      gender,
      parentId.id,
      schoolId.id
    );

    console.log("createStudent", newStudentId);

    res.json({ newStudentId });
  };

  uploadStudentImage = (req: Request, res: Response) => {
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
      console.log("files.image", files.image);
      let student_id_int = parseInt((fields.student_id as string[])[0]);
      let studentId = await this.superAdminService.uploadStudentImage(
        student_id_int,

        (files.image as formidable.File[])[0].newFilename
      );

      let absolutePath =
        uploadDir + "\\" + (files.image as formidable.File[])[0].newFilename;

      const rekognition = new AWS.Rekognition();

      const readImageFile = (filePath: string): Buffer => {
        return fs.readFileSync(path.resolve(__dirname, filePath));
      };

      // Function to index faces
      const indexFaces = async (imagePath: string, collectionId: string) => {
        try {
          const imageBuffer = readImageFile(imagePath);

          const params = {
            CollectionId: collectionId,
            ExternalImageId: studentId?.toString(),
            Image: {
              Bytes: imageBuffer,
            },
          };

          const result = await rekognition.indexFaces(params).promise();
          console.log("Face indexing result:", result);
        } catch (error) {
          console.error("Error indexing faces:", error);
        }
      };
      const collectionId = "testing";

      indexFaces(absolutePath, collectionId);

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

  createNotices = async (req: Request, res: Response) => {
    try {
      const { topic, content, notice_choice, grade, class_name, school_id } =
        req.body;
      // console.log({topic, content, notice_choice, grade, class_name, school_id})
      // Declare a String

      // Use String split() method to
      // Convert String to an Array
      // let optionArr = optionStr.split(",");
      // let schoolAbbr = await getSchoolAbbr(req.body.userRoleEmail);

      // console.log("schoolAbbr", schoolAbbr);

      let createNotices = await this.superAdminService.createNotices(
        topic,
        content,
        notice_choice,
        grade,
        class_name,
        school_id
      );

      res.status(200).json({ msg: "create Notices", createNotices });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: "fail Notices", e });
    }
  };
}
