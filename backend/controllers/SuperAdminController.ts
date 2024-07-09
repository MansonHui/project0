import { Request, Response } from "express";
import SuperAdminService from "../services/SuperAdminService";
import { getSchoolAbbr, isEduExistInMail } from "../helper/getSchoolNameAbbr";
import { getUserName } from "../helper/getUserNameFromEmail";
import AWS from "aws-sdk";
import dotenv from "dotenv";

import path from "path";

import { formatDateTimeToNumber } from "../helper/formatDateTimeToNumber";

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

    let newStudentDetail = await this.superAdminService.createNewStudent(
      first_name,
      last_name,
      HKID_number,
      birthday,
      gender,
      parentId.id,
      schoolId.id
    );

    console.log("createStudent", newStudentDetail);

    res.json({ newStudentDetail });
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

  uploadStudentImage = async (req: Request, res: Response) => {
    const studentDate = JSON.parse(req.body.studentData);

    let { id, first_name, last_name, created_at } = studentDate;

    console.log("studentDate", studentDate);

    const numericDateTime = await formatDateTimeToNumber(created_at);

    const base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    let newFilename = `${last_name}${first_name}${numericDateTime}.jpg`;

    console.log(newFilename);

    const imagePath = path.join(__dirname, `../uploads/${newFilename}`);

    console.log("imagePath", imagePath);

    require("fs").writeFileSync(imagePath, buffer);

    let studentId = await this.superAdminService.uploadStudentImage(
      id,
      newFilename
    );

    console.log("Image saved successfully:", imagePath);

    const rekognition = new AWS.Rekognition();

    // const readImageFile = (filePath: string): Buffer => {
    //   return fs.readFileSync(path.resolve(__dirname, filePath));
    // };

    // Function to index faces
    const indexFaces = async (buffer: Buffer, collectionId: string) => {
      try {
        // const imageBuffer = readImageFile(imagePath);

        const params = {
          CollectionId: collectionId,
          ExternalImageId: studentId?.toString(),
          Image: {
            Bytes: buffer,
          },
        };

        const result = await rekognition.indexFaces(params).promise();
        console.log("Face indexing result:", result.FaceRecords![0].Face);
        return result.FaceRecords![0].Face;
      } catch (error) {
        console.error("Error indexing faces:", error);
        return;
      }
    };
    const collectionId = "testing";

    let result = await indexFaces(buffer, collectionId);

    console.log("result", result);

    res.status(200).json({ msg: "photocaptured" });
  };

  createAttendance = async (req: Request, res: Response) => {
    const base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const collectionId = "testing";
    const rekognition = new AWS.Rekognition();

    // Function to index faces
    const searchFaceByImage = async (buffer: Buffer, collectionId: string) => {
      try {
        const params = {
          CollectionId: collectionId,
          FaceMatchThreshold: 80,
          Image: {
            Bytes: buffer,
          },
        };

        const result = await rekognition.searchFacesByImage(params).promise();

        return result;
      } catch (error) {
        console.error("server error:", error);
        return;
      }
    };

    let resultbyphotoindex = await searchFaceByImage(buffer, collectionId);

    if (resultbyphotoindex) {
      if (resultbyphotoindex!.FaceMatches!.length > 0) {
        if (resultbyphotoindex!.FaceMatches![0].Face) {
          console.log(
            "resultbyphotoindex",
            resultbyphotoindex!.FaceMatches![0].Face!.ExternalImageId
          );

          let student_id_string =
            resultbyphotoindex!.FaceMatches![0].Face!.ExternalImageId;

          let student_id_number = parseInt(student_id_string as string);

          let attendanceRecord = await this.superAdminService.checkAttendance(
            student_id_number
          );

          console.log("attendanceRecord", attendanceRecord);

          if (attendanceRecord.length === 0) {
            let result = await this.superAdminService.createInAttendance(
              student_id_number
            );

            res.json({
              msg: "wellcome your first school day",
              result: result.created_at,
              in_out: result.in_out,
            });
          }

          if (attendanceRecord.length > 0) {
            console.log("attendanceRecord.length", attendanceRecord.length);
            const latestAttendanceDate = new Date(
              attendanceRecord[0].created_at
            );
            const formattedlatestAttendanceDate =
              latestAttendanceDate.toDateString();

            const today = new Date();

            const formattedrtoday = today.toDateString();

            if (formattedlatestAttendanceDate === formattedrtoday) {
              if (attendanceRecord[0].in_out === "out") {
                await this.superAdminService.createInAttendance(
                  student_id_number
                );

                res.json({
                  msg: "welcome to school",
                });
              }
              if (attendanceRecord[0].in_out === "in") {
                await this.superAdminService.createOutAttendance(
                  student_id_number
                );

                res.json({
                  msg: "Goodbye",
                });
              }
            }

            if (formattedlatestAttendanceDate !== formattedrtoday) {
              await this.superAdminService.createInAttendance(
                student_id_number
              );

              return res.json({
                msg: "welcome to school",
              });
            }

            // return res.json({
            //   msg: attendanceRecord[0].created_at,
            //   in_out: attendanceRecord[0].in_out,
            // });
          }
        }
      } else res.json({ msg: "no face match" });
    } else res.json({ msg: "pleae take photo again" });

    return;
  };
}
