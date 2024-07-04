import { useQuery } from "@tanstack/react-query";

type NoticeChoice = string
type NoticeContent = string
type NoticePrice = string

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
  notice_choices: NoticeChoice[];

  notice_choice_contents: NoticeContent[];
  notice_choice_prices: NoticePrice[];
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
