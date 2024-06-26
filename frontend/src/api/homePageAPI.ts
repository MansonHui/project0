import { useQuery } from "@tanstack/react-query";

interface getClassType{
    class_id: number;
    class_name: string;
    grade: string;
    school_name:string;
    school_year:string;
    admin_username:string;
    student_first_name:string;
    student_last_name:string;
    student_image:string;
    parent_username:string;
}

export function useGetAllClass(){
    const {isLoading, error, data, isFetching } = useQuery({
        queryKey:["allClass"],
        queryFn: async() => {
            let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/home/getAllClassInfo`,{
                method:"GET",
                headers:{
                    "Content-Type":'application/json',
                    "Authorization":`Bearer ${localStorage.getItem('loginToken')}` 
                }
            })
            let result = await res.json()

            return result.getAllClassInfo as getClassType[];
        },
    })
    if(isLoading || error || !data || isFetching) {
        return [];
    }

    return data;
}