import { useState,useEffect } from "react";

export const useFetch = (url:string)=>{
    const[data,setData] = useState(null);
    useEffect (()=> {
        const fetchData = async () => {
            const res = await fetch(url);
            const response = await res.json();
            setData (response.data);
        };
        fetchData();
    },[url]);
    return data;
};