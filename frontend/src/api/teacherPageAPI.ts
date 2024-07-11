import { useQuery } from "@tanstack/react-query";

type StudentId = number;
type NoticeChoiceId = number;
type StudentId2 = number;
type NoticeChoiceId2 = number;
type StudentName = string;
type ParentId = number;
type StudentNum = number;
type NoticeChoiceOption = string;
type NoticeChoiceContent = string;

export interface getTeacherNoticeType {
  id: number;
  admin_name: string;
  grade: string;
  class_name: string;
  school_year: string;
  notice_id: number;
  notices_id: number;
  notices_topic: string;
  created_at: string;
}

export interface getTeacherNoticeDetailType {
  notice_id: number;
  topic: string;
  content: string;
  class_id: number;
  grade: string;
  class_name: string;
  admin_name: string;
  student_ids: StudentId[];
  notice_choice_ids: NoticeChoiceId[];
  student_ids_2: StudentId2[];
  notice_choice_id_2: NoticeChoiceId2[];
  null_count: string;
  notnull_count: string;
  student_names: StudentName[];
  parent_ids: ParentId[];
  student_numbers: StudentNum[];
  notice_choice_options: NoticeChoiceOption[];
  notice_choice_contents: NoticeChoiceContent[];
}

export function useGetTeacherNotice() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["allTeacherNotice"],
    queryFn: async () => {
      let res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/teacherNotice/getTeacherNotice`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
          },
        }
      );
      let result = await res.json();

      return result.getTeacherNotice as getTeacherNoticeType[];
    },
  });
  if (isLoading || error || !data || isFetching) {
    return [];
  }
  return data;
}

export function useGetTeacherNoticeDetail(noticeId: number) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["allTeacherNoticeDetail"],
    queryFn: async () => {
      let res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/teacherNotice/getTeacherNoticeDetail?noticeId=${noticeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
          },
        }
      );
      let result = await res.json();

      return result.getTeacherNoticeDetail as getTeacherNoticeDetailType[];
    },
  });
  if (isLoading || error || !data || isFetching) {
    return [];
  }
  return data;
}

// export interface getNoticeByNoticeID {
//   admin_name: string;
//   class_name: string;
//   created_at: string;
//   grade: string;
//   id: number;
//   notice_id: number;
//   notices_id: number;
//   notices_topic: string;
//   school_year: string;
// }

// export function useGetNoticeByNoticeID() {
//   const { isLoading, error, data, isFetching } = useQuery({
//     queryKey: ["useNoticeByNoticeID"],
//     queryFn: async () => {
//       let res = await fetch(
//         `${process.env.REACT_APP_API_ENDPOINT}/teacherNotice/getNoticeByNoticeID`,
//         {
//           method: "post",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
//           },
//         }
//       );
//       let result = await res.json();

//       console.log("result.getNoticeByNoticeID", result.getNoticeByNoticeID);

//       return result.getNoticeByNoticeID as getNoticeByNoticeID[];
//     },
//   });
//   if (isLoading || error || !data || isFetching) {
//     return [];
//   }
//   return data;
// }
