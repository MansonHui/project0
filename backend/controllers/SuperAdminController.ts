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
    try {
      const email = req.body.email;
      const response_array: { msg: string; status?: number }[] = []; // Add 'status' field
      const username = await getUserName(email);
      const password = username;
      const existEmail = await this.superAdminService.checkDuplicateEmailAdmin(
        email
      );

      // Get the school name abbreviation from input of the new registered teacher's account
      const newAdminSchoolAbbr = await getSchoolAbbr(email);

      // Get the school name abbreviation from the JWT token of the superadmin
      const superAdminSchoolAbbr = await getSchoolAbbr(req.body.userRoleEmail);

      // Only allow email addresses with "edu" for registration of new teacher accounts
      const isEduExist = await isEduExistInMail(email);
      if (!isEduExist) {
        response_array.push({ msg: "Wrong email format", status: 400 }); // Set status for invalid email
      } else if (newAdminSchoolAbbr) {
        if (newAdminSchoolAbbr === superAdminSchoolAbbr) {
          if (existEmail) {
            response_array.push({
              msg: `${email} already exists`,
              status: 409,
            }); // Conflict status
          } else {
            const isSchoolExist = await this.superAdminService.getSchoolTable(
              newAdminSchoolAbbr
            );
            if (isSchoolExist) {
              const newAdminData = await this.superAdminService.createNewAdmin(
                username,
                email,
                password,
                isSchoolExist.id
              );
              response_array.push({
                msg: `New admin user account: ${isSchoolExist.full_name}, ${newAdminData.admin_email}`,
                status: 200, // Success status
              });
            } else {
              response_array.push({
                msg: "Your school has not yet subscribed to our service",
                status: 404, // Not found status
              });
            }
          }
        } else {
          response_array.push({
            msg: "You are not an admin for that school",
            status: 400, // Forbidden status
          });
        }
      } else {
        response_array.push({ msg: "Wrong email format", status: 400 }); // Set status for invalid email
      }

      return res.json(response_array);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Internal server error" }); // Internal server error status
    }
  };

  createParent = async (req: Request, res: Response) => {
    try {
      const response_array: { msg: string; status?: number }[] = []; // Add 'status' field

      let { email, password } = req.body;
      let username = await getUserName(email);
      let existEmail = await this.superAdminService.checkDuplicateEmailParent(
        email
      );
      console.log("existEmail", existEmail);
      if (password) {
        if (existEmail) {
          response_array.push({ msg: `${email} already exists`, status: 400 });
        } else {
          let newAdminData = await this.superAdminService.createNewParent(
            username,
            email,
            password
          );

          response_array.push({
            msg: `new parent account  ${newAdminData.email}`,
            status: 200,
          });
        }
      } else {
        if (!existEmail) {
          console.log("in no exist this");
          response_array.push({ msg: `${email} not exist`, status: 400 });
        } else {
          response_array.push({ msg: `${email} welcome back`, status: 200 });
        }
      }

      return res.json(response_array);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Internal server error" }); // Internal server error status
    }
  };

  createStudent = async (req: Request, res: Response) => {
    try {
      let {
        email,
        first_name,
        last_name,
        HKID_number,
        birthday,
        gender,
        userRoleEmail,
        grade,
        className,
      } = req.body;

      let parentId = await this.superAdminService.getParentId(email as string);

      let schoolId = await this.superAdminService.getSchoolId(
        (await getSchoolAbbr(userRoleEmail)) as string
      );

      let newStudentDetail = await this.superAdminService.createNewStudent(
        first_name,
        last_name,
        HKID_number,
        birthday,
        gender,
        parentId.id,
        schoolId.id,
        grade,
        className
      );

      return res.json({ newStudentDetail });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Internal server error" }); // Internal server error status
    }
  };

  getAllStudentData = async (req: Request, res: Response) => {
    let school_id = req.body.school_id;

    try {
      let studentData = await this.superAdminService.getAllStudentData(
        school_id
      );

      return res.json(studentData);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Internal server error" }); // Internal server error status
    }
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

      return res.status(200).json({ msg: "create Notices", createNotices });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Internal server error" }); // Internal server error status
    }
  };

  uploadStudentImage = async (req: Request, res: Response) => {
    try {
      const school_id = JSON.parse(req.body.school_id);

      const getSchoolFullName = await this.superAdminService.getSchoolFullName(
        school_id
      );

      console.log("getSchoolFullName.full_name", getSchoolFullName.full_name);
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

      return res.status(200).json({
        msg: `${first_name} ${last_name} welcome to join ${getSchoolFullName.full_name}`,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Internal server error" }); // Internal server error status
    }
  };

  createAttendance = async (req: Request, res: Response) => {
    try {
      const base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const collectionId = "testing";
      const rekognition = new AWS.Rekognition();

      // Function to index faces
      const searchFaceByImage = async (
        buffer: Buffer,
        collectionId: string
      ) => {
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

            let [studentsDetail] =
              await this.superAdminService.getStudentClassAndStudentNumber(
                student_id_number
              );

            console.log("studentsDetail", studentsDetail);

            console.log("attendanceRecord", attendanceRecord);

            if (attendanceRecord.length === 0) {
              let result = await this.superAdminService.createInAttendance(
                student_id_number
              );

              let [studentsDetail] =
                await this.superAdminService.getStudentClassAndStudentNumber(
                  student_id_number
                );

              console.log("studentsDetail", studentsDetail);

              return res.json({
                msg: `Hi ${studentsDetail.first_name} welcome to your first school day, Class ${studentsDetail.grade} ${studentsDetail.class_name},student Number ${studentsDetail.student_number}`,
              });
            } else {
              console.log("attendanceRecord.length", attendanceRecord.length);
              const latestAttendanceDate = new Date(
                attendanceRecord[0].created_at
              );

              const formattedlatestAttendanceDate =
                latestAttendanceDate.toDateString();

              const today = new Date();

              const formattedrtoday = today.toDateString();

              if (formattedlatestAttendanceDate === formattedrtoday) {
                console.log(
                  "attendanceRecord[0].in_out",
                  attendanceRecord[0].in_out
                );

                const currentAttendanceTime = today.getTime();
                const latestAttendanceTime = latestAttendanceDate.getTime();
                let timeDifference = Math.abs(
                  currentAttendanceTime - latestAttendanceTime
                );
                if (timeDifference > 60000) {
                  if (attendanceRecord[0].in_out === "out") {
                    await this.superAdminService.createInAttendance(
                      student_id_number
                    );

                    return res.json({
                      msg: `Hi ${attendanceRecord[0].first_name} Welcome Back`,
                    });
                  } else if (attendanceRecord[0].in_out === "in") {
                    await this.superAdminService.createOutAttendance(
                      student_id_number
                    );
                    return res.json({
                      msg: `Good Bye ${attendanceRecord[0].first_name}`,
                    });
                  } else
                    return res.json({
                      msg: `Hi ${attendanceRecord[0].first_name} you look great today`,
                    });
                } else
                  return res.json({
                    msg: `Hi ${attendanceRecord[0].first_name}, attendance already taken`,
                  });
              } else {
                await this.superAdminService.createInAttendance(
                  student_id_number
                );

                return res.json({
                  msg: `Hi ${attendanceRecord[0].first_name}, Today is ${formattedrtoday} `,
                });
              }

              // return res.json({
              //   msg: attendanceRecord[0].created_at,
              //   in_out: attendanceRecord[0].in_out,
              // });
            }
          } else return res.json({ msg: "Seems your are not our students" });
        } else return res.json({ msg: "Seems your are not our students" });
      } else
        return res.json({
          msg: "your photo is not clear enough,pleae take photo again",
        });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Internal server error" }); // Internal server error status
    }
  };
}
