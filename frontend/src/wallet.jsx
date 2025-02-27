
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const Wallet = () => {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [provider, setProvider] = useState(null);

//   useEffect(() => {
//     if (window.ethereum) {
//       const newProvider = new ethers.BrowserProvider(window.ethereum);
//       setProvider(newProvider);
//       checkConnection(); // Auto-connect on page load
//     }
//   }, []);
  useEffect(() => {
    if (window.ethereum) {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(newProvider);
    }
  }, []);
  useEffect(() => {
    if (provider) {
      checkConnection();
    }
  }, [provider]);

  const checkConnection = async () => {
    try {
      if (!window.ethereum) return;
      
      const accounts = await window.ethereum.request({ method: "eth_accounts" });

      if (accounts.length > 0) {
        const networkData = await provider.getNetwork();
        setNetwork(networkData.chainId);

        if (networkData.chainId !== 31337) {
          alert("Please switch to the Anvil local network (Chain ID: 31337).");
          return;
        }

        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error("Error checking connection:", error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected!");
      return;
    }
  
    if (!provider) {
      console.error("Provider is not initialized yet.");
      return;
    }
  
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  
      if (accounts.length === 0) {
        alert("No accounts found. Make sure your Anvil account is imported into MetaMask.");
        return;
      }
  
      const networkData = await provider.getNetwork();
      setNetwork(networkData.chainId);
  
      if (networkData.chainId !== 31337) {
        alert("Please switch to the Anvil local network (Chain ID: 31337).");
        return;
      }
  
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };
  

  return (
    <div>
      <button onClick={connectWallet}>
        {account
          ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
          : "Connect Wallet"}
      </button>
      {network && <p>Connected to Chain ID: {network}</p>}
    </div>
  );
};

export default Wallet;
