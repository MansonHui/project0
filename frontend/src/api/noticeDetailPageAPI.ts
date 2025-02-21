import { useQuery } from "@tanstack/react-query";

type NoticeChoiceId = string;
type NoticeChoice = string;
type NoticeContent = string;
type NoticePrice = string;

export interface getNoticeDetailType {
  first_name: string;
  last_name: string;
  student_number: number;
  class_id: number;
  class_name: string;
  grade: string;
  school_name: string;
  // school_year: string;
  notice_id: number;
  topic: string;
  notice_content: string;
  created_at: string;
  parent_username: string;
  admin_name: string;
  notice_choice_ids: NoticeChoiceId[];
  notice_choices: NoticeChoice[];
  notice_choice_contents: NoticeContent[];
  notice_choice_prices: NoticePrice[];
  notice_choice_id: number;
}

export interface getNoticeDetailOptionType {}

export function useGetNoticeDetail(noticeId: number, studentId: number) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["allNoticeDetail"],
    queryFn: async () => {
      let res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/notice/getNoticeDetail?noticeId=${noticeId}&studentId=${studentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
          },
        }
      );
      let result = await res.json();

      return result.getNoticeDetail as getNoticeDetailType[];
    },
  });
  if (isLoading || error || !data || isFetching) {
    return [];
  }
  return data;
}

export async function selectChoice(
  noticeIdNumber: number,
  studentIdNumber: number,
  noticeChoiceId: string
) {
  let res = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/notice/insertchoice?noticeId=${noticeIdNumber}&studentId=${studentIdNumber}`,
    {
      method: "POST",
      body: JSON.stringify({ noticeChoiceId: noticeChoiceId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
      },
    }
  );
  let result = await res.json();

  return result.message;
}
