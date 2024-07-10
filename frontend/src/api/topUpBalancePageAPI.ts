import { useQuery, useMutation,useQueryClient } from "@tanstack/react-query";



interface UserData {
  username: string;
  email: string;
  balance: number;
}


export function GetTopUpBalanceData() {
    return useQuery({
    queryKey: ["topUpBalance"],
    queryFn: async () => {
      let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/parentTopup/getparentInfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
      });
      let result = await res.json();
      return result as UserData[];
    },
  });
}


export async function updateTopUpBalance(balanceIncrement:number) {
  const res = await fetch (`${process.env.REACT_APP_API_ENDPOINT}/parentTopup/updateBalance`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
    },
    body: JSON.stringify({
      add_on_value: balanceIncrement,
    })

  }
  )
  const result = await res.json();
  return result.message;
}




// export function updateTopUpBalance() {
//     const queryClient = useQueryClient();
  
//     return useMutation({
//       mutationFn: async (newBalance: number) => {
//         let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/parentTopup/updateBalance`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
//           },
//           body: JSON.stringify({ newBalance }),
//         });
//         let result = await res.json();
//         return result as UserData;
//       },
//       onSuccess: () => {
//         queryClient.invalidateQueries({queryKey:["topUpBalance"]});
//         //queryClient.invalidateQueries({queryKey:['topUpBalance']});
//       },
//     });
//   }


//   if (isLoading || error || !data || isFetching) {
//     return [];
//   }
//   return data;
// }

// export function updateTopUpBalance(newBalance: number) {
//   //const { mutate, isLoading, error, data } = useMutation(async (newBalance) => {
//    // const { mutate, isLoading, error, data } = useMutation({
//     const mutation = useMutation({
//         mutationFn: async () => {
//           let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/parentTopup/updateBalance`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
//       },
//       body: JSON.stringify({ newBalance }),
//     });
//     let result = await res.json();
//     return result as UserData;
//     },
//   });

//   return mutation;
// }