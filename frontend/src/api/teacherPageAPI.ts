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

export interface getTeacherNoticeDetailType{
    notice_student_relation_id: number;
    notice_id: number;
    topic: string;
    content: string;
    student_id: number;
    notice_choice_id: number;
    class_id: number;
    grade: string;
    class_name: string;
    first_name: string;
    last_name: string;
    parent_id: number;
    student_number: number;
    admin_name: string;
    null_count: string;
    not_null_count: string;
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

export function useGetTeacherNoticeDetail(){
    const {isLoading, error, data, isFetching } = useQuery ({
        queryKey:["allTeacherNoticeDetail"],
        queryFn: async () => {
            let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/teacherNotice/getTeacherNoticeDetail`,{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
            })
            let result = await res.json()

            return result.getTeacherNoticeDetail as getTeacherNoticeDetailType[];
        }
    })
    if(isLoading || error || !data || isFetching) {
        return [];
    }
    return data;
}