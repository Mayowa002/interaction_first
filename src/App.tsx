import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useReadContract, useWriteContract,useSendTransaction } from "wagmi";
import { parseEther } from 'viem'
import { abi } from "./Bank.tsx";
import { contract } from "./ca.tsx";
import { useState } from "react";
function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract } = useWriteContract();
  const { sendTransaction } = useSendTransaction()

  const [num, setNum] = useState('');

  const changeNum = (event) => {
    setNum(event.target.value);
  };
  <input 
  type="text" 
  placeholder="amount to deposit" 
  onChange={changeNum} 
  // value={num} 
/>
  const result = useReadContract({
    abi,
    address: contract,
    functionName: "getCounter",
  });

  function getCounter() {
    alert(result.data);
  }

  function depositMoney(amount : any){
    sendTransaction({
      to: contract,
      value: parseEther(amount),
    })
  }
  // alert(result.data);
  return (
    <>
      <ConnectButton />
      <br />
      <div>
        <button onClick={getCounter}>CLick me to see counter </button>
      </div>
      <br />
      Deposit
      <div>
      <input 
      type="text" 
      placeholder="amount to deposit" 
      onKeyUp={changeNum} 
      value={num} 
    />
    
    <br/>
        <button onClick={() => depositMoney(num)}> Send</button>
      </div>
    </>
  );
}

export default App;
