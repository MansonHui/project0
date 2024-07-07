import { useQuery } from "@tanstack/react-query";

export interface getTeacherNoticeType{
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

export function useGetTeacherNotice(){
    const {isLoading, error, data, isFetching } = useQuery ({
        queryKey:["allTeacherNotice"],
        queryFn: async() => {
            let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/teacherNotice/getTeacherNotice`,{
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
            })
            let result = await res.json()

            return result.getTeacherNotice as getTeacherNoticeType[];
        }
    })
    if(isLoading || error || !data || isFetching) {
        return [];
    }
    return data;
}