import { useQuery } from "@tanstack/react-query";

export interface getAttendanceType{
    grade:null;
    in_out: string;
    first_name: string;
    last_name: string;
    created_at: string;
}



export function useGetallAttendance(){
    const {isLoading, error, data, isFetching } = useQuery ({
        queryKey:["allAttendance"],
        queryFn: async() => {
            let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/attendance/getAllAttendance`,{
                method:"GET",
                headers:{
                    "Content-Type":'application/json',
                    "Authorization":`Bearer ${localStorage.getItem('loginToken')}` 
                }
            })
            let result = await res.json()

            return result.getAllattendance as getAttendanceType[];
        }

    })
    if(isLoading || error || !data || isFetching) {
        return [];
    }
    return data;

}