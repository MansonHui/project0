import { useQuery } from "@tanstack/react-query";

interface getClassType {
      school_id: number;
      school_name: string;
      school_year: string;
			grade: string;
			class_name: string;
			student_id: number;
			first_name: string;
			last_name: string;
			gender: string;
      birthday: string;
      image: string;
			parent_id: number;
			student_school_id: number;
			admin_id: number;
			admin_name: string;
			admin_school_id: number;
			username: string;
}

export function useGetAllClass() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["allClass"],
    queryFn: async () => {
      let res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/home/getAllClassInfo`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
          },
        }
      );
      let result = await res.json();

      return result.getAllClassInfo as getClassType[];
    },
  });
  if (isLoading || error || !data || isFetching) {
    return [];
  }

  return data;
}
