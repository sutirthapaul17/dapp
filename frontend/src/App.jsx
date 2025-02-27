// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// // import FundMeABI from "../src/abi/fundMeABI.js";
// // import { fundMeABI } from "./fundMeABI";
// import fundMeABI from './fundMeABI.js';
// import Wallet from "./wallet";



// const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Replace with deployed contract address
// // const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
// // const signer = provider.getSigner();
// const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// // Fetch the first account from Anvil to use as a signer
// async function getSigner() {
//   const accounts = await provider.listAccounts(); // Get available accounts
//   return provider.getSigner(accounts[0]); // Use the first account as the signer
// }

// // const contract = new ethers.Contract(CONTRACT_ADDRESS, fundMeABI, signer);

// let contract;

// (async () => {
//   const signer = await getSigner();
//   contract = new ethers.Contract(CONTRACT_ADDRESS, fundMeABI, signer);
// })();


// export default function FundMeApp() {
//   const [amount, setAmount] = useState("");
//   const [proof, setProof] = useState("");
//   const [withdrawalAmount, setWithdrawalAmount] = useState("");
//   const [requestId, setRequestId] = useState("");
//   const [requests, setRequests] = useState([]);

// //   useEffect(() => {
// //     async function fetchRequests() {
// //       const count = await contract.getRequestsCount();
// //       const reqs = [];
// //       for (let i = 0; i < count; i++) {
// //         const request = await contract.getRequest(i);
// //         reqs.push({ id: i, proof: request[0], amount: request[1], approvals: request[2], executed: request[3] });
// //       }
// //       setRequests(reqs);
// //     }
// //     fetchRequests();
// //   }, []);

//     useEffect(() => {
//         async function fetchRequests() {
//         if (!contract) {
//             console.error("Contract not initialized yet.");
//             return;
//         }
    
//         const count = await contract.getRequestsCount();
//         const reqs = [];
//         for (let i = 0; i < count; i++) {
//             const request = await contract.getRequest(i);
//             reqs.push({
//             id: i,
//             proof: request[0],
//             amount: request[1],
//             approvals: request[2],
//             executed: request[3],
//             });
//         }
//         setRequests(reqs);
//         }
    
//         fetchRequests();
//     }, []);
  

// //   const fund = async () => {
// //     const tx = await contract.fund({ value: ethers.parseEther(amount) });
// //     await tx.wait();
// //     alert("Funded successfully!");
// //   };
//     const fund = async () => {
//         const signer = await getSigner(); // Ensure signer is fetched
//         const contract = new ethers.Contract(CONTRACT_ADDRESS, fundMeABI, signer);
        
//         const tx = await contract.fund({ value: ethers.parseEther(amount) });
//         await tx.wait();
//         alert("Funded successfully!");
//     };
  
//   const createWithdrawalRequest = async () => {
//     const tx = await contract.createWithdrawalRequest(proof, ethers.parseEther(withdrawalAmount));
//     await tx.wait();
//     alert("Withdrawal request created!");
//   };

//   const approveWithdrawal = async () => {
//     const tx = await contract.approveWithdrawal(requestId);
//     await tx.wait();
//     alert("Withdrawal approved!");
//   };

//   const withdraw = async () => {
//     const tx = await contract.withdraw(requestId);
//     await tx.wait();
//     alert("Funds withdrawn!");
//   };

//   return (
//     <div>
//       <h2>FundMe DApp</h2>
//       <Wallet/>
//       <div>
//         <h3>Fund</h3>
//         <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount in ETH" />
//         <button onClick={fund}>Fund</button>
//       </div>
//       <div>
//         <h3>Create Withdrawal Request</h3>
//         <input type="text" value={proof} onChange={(e) => setProof(e.target.value)} placeholder="Proof" />
//         <input type="text" value={withdrawalAmount} onChange={(e) => setWithdrawalAmount(e.target.value)} placeholder="Amount in ETH" />
//         <button onClick={createWithdrawalRequest}>Create Request</button>
//       </div>
//       <div>
//         <h3>Approve Withdrawal</h3>
//         <input type="text" value={requestId} onChange={(e) => setRequestId(e.target.value)} placeholder="Request ID" />
//         <button onClick={approveWithdrawal}>Approve</button>
//       </div>
//       <div>
//         <h3>Withdraw Funds</h3>
//         <input type="text" value={requestId} onChange={(e) => setRequestId(e.target.value)} placeholder="Request ID" />
//         <button onClick={withdraw}>Withdraw</button>
//       </div>
//       <div>
//         <h3>Withdrawal Requests</h3>
//         {requests.map((req) => (
//           <div key={req.id}>
//             <p>Request ID: {req.id}</p>
//             <p>Proof: {req.proof}</p>
//             <p>Amount: {ethers.formatEther(req.amount)} ETH</p>
//             <p>Approvals: {req.approvals}</p>
//             <p>Status: {req.executed ? "Executed" : "Pending"}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { ethers } from "ethers";
import fundMeABI from "./fundMeABI.js";
import Wallet from "./wallet";

// const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
// const CONTRACT_ADDRESS = "0x59b670e9fA9D0A427751Af201D676719a970857b";
const CONTRACT_ADDRESS = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

export default function FundMeApp() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [requests, setRequests] = useState([]);
  const [amount, setAmount] = useState("");
  const [proof, setProof] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [requestId, setRequestId] = useState("");
  const [owner, setOwner] = useState("");
  const [requestIdToRemove, setRequestIdToRemove] = useState("");

  const [fundBalance, setFundBalance] = useState("0");
  const [numFunders, setNumFunders] = useState("0");
  const [approvals, setApprovals] = useState("0");
  const [approvalPercentage, setApprovalPercentage] = useState("0%");

  // Initialize Provider, Signer, and Contract
  useEffect(() => {
    const init = async () => {
      try {
        const newProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        setProvider(newProvider);
  
        const accounts = await newProvider.listAccounts();
        if (accounts.length === 0) {
          console.error("No accounts found.");
          return;
        }
  
        const newSigner = newProvider.getSigner(accounts[0].address); // ✅ FIXED HERE
        setSigner(newSigner);
  
        const newContract = new ethers.Contract(CONTRACT_ADDRESS, fundMeABI, newSigner);
        setContract(newContract);
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };
  
    init();
  }, []);
  

    // Fetch Requests

    useEffect(() => {
        const init = async () => {
        try {
            const newProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
            setProvider(newProvider);
    
            const accounts = await newProvider.listAccounts();
            if (accounts.length === 0) {
            console.error("No accounts found.");
            return;
            }
    
            const newSigner = await newProvider.getSigner(); // ✅ Fix signer initialization
            setSigner(newSigner);
    
            const newContract = new ethers.Contract(CONTRACT_ADDRESS, fundMeABI, newSigner); // ✅ Use signer
            setContract(newContract);
        } catch (error) {
            console.error("Error initializing contract:", error);
        }
        };
    
        init();
    }, []);

    const fetchRequests = async () => {
        if (!contract) return;
      
        try {
          const count = await contract.getRequestsCount();
          console.log("Total requests:", count); // ✅ Check count here
          const reqs = [];
      
          for (let i = 0; i < count; i++) {
            const request = await contract.getRequest(i);
            console.log(`Request ${i}:`, request); // ✅ Log request details
      
            reqs.push({
              id: i,
              proof: request[0],
              amount: request[1],
              approvals: request[2],
              executed: request[3],
            });
          }
      
          setRequests(reqs);
          console.log("Final requests array:", reqs); // ✅ Check final array
        } catch (error) {
          console.error("Error fetching requests:", error);
        }
    };
      
    useEffect(() => {
        if (contract) fetchRequests();
    }, [contract]); // ✅ Add contract as dependency
      
    // Fetch Owner
    const fetchOwner = async () => {
        if (!contract) {
          console.error("Contract not initialized.");
          return;
        }
      
        try {
          const ownerAddress = await contract.getOwner(); // Call getOwner()
          setOwner(ownerAddress);
        } catch (error) {
          console.error("Error fetching owner address:", error);
        }
    };



    // Fetch Fund Balance

    const fetchContractData = async () => {
        try {
            const signer = provider.getSigner();
            const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

            // Fetch fund balance
            const balance = await provider.getBalance(CONTRACT_ADDRESS);
            setFundBalance(ethers.formatEther(balance));

            // Fetch number of funders
            const fundersCount = await contractInstance.getTotalFunders(); // Correct function call
            setNumFunders(fundersCount.toString());

            // Fetch approvals (for the latest request)
            const requestsCount = await contractInstance.getRequestsCount();
            if (requestsCount > 0) {
                const [, , approvalCount] = await contractInstance.getRequest(requestsCount - 1); // Get latest request approvals
                setApprovals(approvalCount.toString());

                // Calculate approval percentage
                const approvalPercent = fundersCount > 0
                    ? ((approvalCount / fundersCount) * 100).toFixed(2) + "%"
                    : "0%";
                setApprovalPercentage(approvalPercent);
            } else {
                setApprovals("0");
                setApprovalPercentage("0%");
            }
        } catch (error) {
            console.error("Error fetching contract data:", error);
        }
    };

    
    useEffect(() => {
        if (!provider) return;
    
        fetchContractData(); // Initial fetch
    
        // Listen for events to update dynamically
        if (contract) {
            contract.on("Funded", fetchContractData);
            contract.on("Approved", fetchContractData);
        }
    
        return () => {
            if (contract) {
                contract.off("Funded", fetchContractData);
                contract.off("Approved", fetchContractData);
            }
        };
    }, [provider, contract]);
    


    // Remove Request
    const removeRequest = async () => {
        if (!contract) {
          console.error("Contract not initialized yet.");
          return;
        }
      
        try {
          const tx = await contract.removeRequest(requestIdToRemove);
          await tx.wait();
          alert("Request removed successfully!");
          setRequestIdToRemove(""); // Clear input field
        } catch (error) {
          console.error("Error removing request:", error);
          alert("Failed to remove request. Check console for details.");
        }
    };

    
    

  // Ensure Contract is Available Before Calls
  const fund = async () => {
    if (!contract) {
      console.error("Contract not initialized yet.");
      return;
    }

    const tx = await contract.fund({ value: ethers.parseEther(amount) });
    await tx.wait();
    alert("Funded successfully!");
  };

  const createWithdrawalRequest = async () => {
    if (!contract) {
      console.error("Contract not initialized yet.");
      return;
    }

    const tx = await contract.createWithdrawalRequest(proof, ethers.parseEther(withdrawalAmount));
    await tx.wait();
    alert("Withdrawal request created!");
  };

  const approveWithdrawal = async () => {
    if (!contract) {
      console.error("Contract not initialized yet.");
      return;
    }

    const tx = await contract.approveWithdrawal(requestId);
    await tx.wait();
    alert("Withdrawal approved!");
  };

  const withdraw = async () => {
    if (!contract) {
      console.error("Contract not initialized yet.");
      return;
    }

    const tx = await contract.withdraw(requestId);
    await tx.wait();
    alert("Funds withdrawn!");
  };

    // const withdraw = async () => {
    //     if (!contract) {
    //         console.error("Contract not initialized yet.");
    //         return;
    //     }

    //     try {
    //         const requestsCount = await contract.getRequestsCount();
    //         if (requestsCount === 0) {
    //             alert("No withdrawal requests found.");
    //             return;
    //         }

    //         const fundersCount = await contract.getTotalFunders();
    //         const [, , approvalCount] = await contract.getRequest(requestsCount - 1); // Get latest request

    //         // Calculate required approvals (at least 51% of funders)
    //         const requiredApprovals = Math.ceil(fundersCount * 0.51);
            
    //         if (approvalCount < requiredApprovals) {
    //             alert(`Not approved by enough funders yet! (${approvalCount}/${requiredApprovals} approvals required)`);
    //             return;
    //         }

    //         const tx = await contract.withdraw(requestsCount - 1); // Withdraw latest request
    //         await tx.wait();
    //         alert("Funds withdrawn successfully!");
    //     } catch (error) {
    //         console.error("Withdrawal error:", error);
    //         alert("Error withdrawing funds. Check console for details.");
    //     }
    // };



  return (
    <div>
      <h2>FundMe DApp</h2>
      <Wallet />
      <div>
        <h3>Fund</h3>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount in ETH" />
        <button onClick={fund}>Fund</button>
      </div>
      <div>
        <h3>Create Withdrawal Request</h3>
        <input type="text" value={proof} onChange={(e) => setProof(e.target.value)} placeholder="Proof" />
        <input type="text" value={withdrawalAmount} onChange={(e) => setWithdrawalAmount(e.target.value)} placeholder="Amount in ETH" />
        <button onClick={createWithdrawalRequest}>Create Request</button>
      </div>
      
      <div>
        <h3>Remove Withdrawal Request</h3>
        <input
        type="text"
        value={requestIdToRemove}
        onChange={(e) => setRequestIdToRemove(e.target.value)}
        placeholder="Enter Request ID"
        />
        <button onClick={removeRequest}>Remove Request</button>
      </div>

      <div>
        <h2>Fund Balance: <span>{fundBalance}</span> ETH</h2>
        <h2>Number of Funders: <span>{numFunders}</span></h2>
        <h2>Approvals: <span>{approvals}</span> / <span>{numFunders}</span></h2>
        <h2>Approval Percentage: <span>{approvalPercentage}</span></h2>

      </div>



      <div>
        <h3>Approve Withdrawal</h3>
        <input type="text" value={requestId} onChange={(e) => setRequestId(e.target.value)} placeholder="Request ID" />
        <button onClick={approveWithdrawal}>Approve</button>
      </div>

      <div>
        <h3>Contract Owner</h3>
        <button onClick={fetchOwner}>Show Owner Address</button>
        {owner && <p>Owner: {owner}</p>}
      </div>


      <div>
        <h3>Withdraw Funds</h3>
        <input type="text" value={requestId} onChange={(e) => setRequestId(e.target.value)} placeholder="Request ID" />
        <button onClick={withdraw}>Withdraw</button>
      </div>
      <div>
            <h3>Withdrawal Requests</h3>
            {requests.length === 0 ? (
                <p>No withdrawal requests found.</p>
            ) : (
                requests.map((req) => (
                <div key={req.id}>
                    <p>Request ID: {req.id}</p>
                    <p>Proof: {req.proof}</p>
                    <p>Amount: {ethers.formatEther(req.amount)} ETH</p>
                    <p>Approvals: {req.approvals}</p>
                    <p>Status: {req.executed ? "Executed" : "Pending"}</p>
                </div>
                ))
            )}
       </div>

    </div>
  );
}
