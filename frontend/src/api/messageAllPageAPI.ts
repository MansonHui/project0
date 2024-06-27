import { useQuery } from "@tanstack/react-query";
import { getAttendanceType } from "./attendancePageAPI";
import { getNoticeType } from "./noticePageAPI";

// export interface getMessageAllType{
//   grade: number;
//   class_name: string;
//   topic: string;
//   content: string;
//   first_name: string;
//   last_name: string;
//   full_name: string;
//   created_at: string;
//   in_out: string;
// }

export function useGetMessageAll(): {
  status: string;
  data: Array<getNoticeType | getAttendanceType>;
} {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["allMessageAll"],
    queryFn: async () => {
      let res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/Message/MessageAll`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
          },
        }
      );
      let result = await res.json();
                                                // Isomnia data: comeback text
      return { status: "success", data: result.getAllAttendanceAndNotice };
      // return result.(((MessageAll)))) <==== wrong ;
    },
  });
  if (isLoading || error || !data || isFetching) {
    return { status: "loading", data: [] };
  } else return data;
}
