import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

interface getClassType {
  [x: string]: ReactNode;
  class_id: number;
  class_name: string;
  grade: string;
  school_name: string;
  school_year: string;
  admin_username: string;
  student_first_name: string;
  student_last_name: string;
  student_image: string;
  parent_username: string;
}

export function useGetStudentData() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["studentData"],
    queryFn: async () => {
      let res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/student/getstudentData`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
          },
        }
      );
      let result = await res.json();

      // return result as getClassType[];
      return result as any[]
    },
  });
  if (isLoading || error || !data || isFetching) {
    return [];
  }

  return data;
}
