import { useQuery } from "@tanstack/react-query";

interface getNoticeType{
    grade: number;
    class_name: string;
    topic: string;
    content: string;
    first_name: string;
    last_name: string;
    full_name: string;
    created_at: string;
}

export function useGetallNotice(){
    const {isLoading, error, data, isFetching } = useQuery ({
        queryKey:["allNotice"],
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