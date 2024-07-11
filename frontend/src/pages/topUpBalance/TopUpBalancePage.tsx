import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { GetTopUpBalanceData } from "../../api/topUpBalancePageAPI";
import { updateTopUpBalance } from "../../api/topUpBalancePageAPI";
import { useQueryClient } from "@tanstack/react-query";
import { FormGroup, TextField, Button, Box } from "@mui/material";
import styles from "./TopUpBalancePage.module.css";
import AddIcon from "@mui/icons-material/Add";


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
    <div className={styles.Container}>
      {topUpBalance && topUpBalance.map((entry) => (
        <div key={entry.username}>
          <div className={styles.Message}>

          <div className={styles.Message_type}>
              <div id={styles.iconAndName}>User Name: {""} </div>
              <div>{entry.username}</div>
          </div>

          <div className={styles.Message_type}>
              <div id={styles.iconAndName}>Email: {""} </div>
              <div>{entry.email}</div>
          </div>

          <div className={styles.Message_type}>
                <div id={styles.iconAndName}>Balance HK$:{""} </div>
                <div>{entry.balance}</div>
          </div>
          
          
          
          <div className={styles.addamount}>
          <input
             id={styles.amountArea}
            placeholder="$"
            type="number"
            value={balanceIncrement}
            onChange={(e) => setBalanceIncrement(e.target.value)}
          />
          </div>

          <div>
            <nav id={styles.navbarButton}>
            <Button 
                id={styles.topUpButton}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={()=> {handleBalanceUpdate.mutate({balanceIncrement: Number(balanceIncrement)});
                setBalanceIncrement("");
              }}
            >TopUp </Button>
    
            </nav>
          </div>

          </div>


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