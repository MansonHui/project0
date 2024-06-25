import { useQuery } from "@tanstack/react-query";

interface getNoticeType{
    id: number;
    student_id: number;
    in_out: string;
    created_at: string;
    topic: string;
    content: string; 
    option: string;
    notice_choice_id: number;
}

export function useGetallNotice_Attendance(){
    const {isLoading, error, data, isFetching } = useQuery ({
        queryKey:["allNotice_Attendance"],
        queryFn: async() => {
            let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/notice/getAllNotice`)
            let result = await res.json()

            return result.getAllNotice as getNoticeType[];
        }
    })
    if(isLoading || error || !data || isFetching) {
        return [];
    }
    return data;
}