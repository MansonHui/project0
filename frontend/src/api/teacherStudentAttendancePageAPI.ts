import { useQuery } from "@tanstack/react-query";

export interface getTeacherStudentAttendanceType{
    id: string;
    admins_id: number;
    class_id: number;
    class_grade: string;
    class_name: string;
    attendance_date: string;
    total_in: string;
    total_out: string;

}

export function useGetTeacherStudentAttendance(){
    const {isLoading, error, data, isFetching } = useQuery ({
        queryKey:["allNotice"],
        queryFn: async() => {
            let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/forTeacherGetAttendance/getForTeacherGetAttendance`,{
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
              })
            let result = await res.json()

            return result.getForTeacherGetAttendance as getTeacherStudentAttendanceType[]
        }

    })
    if(isLoading || error || !data || isFetching) {
        return [];
    }
    return data;
}