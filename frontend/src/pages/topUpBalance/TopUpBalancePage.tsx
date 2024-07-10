import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { GetTopUpBalanceData } from "../../api/topUpBalancePageAPI";
import { updateTopUpBalance } from "../../api/topUpBalancePageAPI";
import { useQueryClient } from "@tanstack/react-query";



export default function TopUpBalancePage() {
    const [balanceIncrement, setBalanceIncrement] = useState("");
    const {data: topUpBalance}  = GetTopUpBalanceData();
    //const [passingAmount, setPassingAmount] = useState("");
    const queryClient = useQueryClient();


  const handleBalanceUpdate = useMutation({
    mutationFn: async( data:{
      balanceIncrement:number}) =>
      updateTopUpBalance(
        data.balanceIncrement
      ),
    
    onSuccess: (message) => {
      console.log("Balance Updated", message);
      queryClient.invalidateQueries({queryKey: ["topUpBalance"]});
    },
    
    onError: (e) =>{
      console.log("error!", e);
    },
});

  return (
    <div>
      {topUpBalance && topUpBalance.map((entry) => (
        <div key={entry.username}>
          <div>User Name: {entry.username}</div>
          <div>Email: {entry.email}</div>
          <div>Balance: {entry.balance}</div>
          <input
            type="number"
            value={balanceIncrement}
            onChange={(e) => setBalanceIncrement(e.target.value)}
          />
          <button onClick={()=> {handleBalanceUpdate.mutate({balanceIncrement: Number(balanceIncrement)});
          setBalanceIncrement("");
        }}
          >TopUp Balance </button>


          {/* <button onClick={handleBalanceUpdate}>Update Balance</button>
          {isUpdating && <div>Updating balance...</div>}
          {updateError  && <div>Error updating balance</div>} */}
        </div>
      ))}
    </div>
  );
}



    //const { mutateAsync, isPending: isUpdating, error: updateError } = updateTopUpBalance();
  
    // const handleBalanceUpdate = async () => {
    //   try {
    //     await mutateAsync(newBalance);
    //   } catch (err) {
    //     console.error("Error updating balance:", err);
    //   }
    // };

    // if (isLoading || !topUpBalance) {
    //   return <div>Loading...</div>;
    // }
  
    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // }