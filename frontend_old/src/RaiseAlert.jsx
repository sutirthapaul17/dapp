import { useState, useEffect } from "react";
import { ethers } from "ethers";
import fundMeABI from "./fundMeABI"; // Ensure correct path to ABI file

const contractAddress = "0x0B306BF915C4d645ff596e518fAf3F9669b97016"; // Replace with your actual contract address

const RaiseSpamButton = ({ provider, signer }) => {
  const [loading, setLoading] = useState(false);
  const [walletSigner, setWalletSigner] = useState(signer);

  useEffect(() => {
    // If no signer is provided, try to get one from provider
    const getSigner = async () => {
      if (!walletSigner && provider) {
        const signerFromProvider = await provider.getSigner();
        setWalletSigner(signerFromProvider);
      }
    };
    getSigner();
  }, [provider, walletSigner]);

  const raiseSpamAlert = async () => {
    if (!walletSigner) {
      alert("Wallet not connected. Please connect to Metamask.");
      return;
    }

    const proof = prompt("Enter proof for spam alert:");
    if (!proof) return;

    try {
      setLoading(true);
      const contract = new ethers.Contract(contractAddress, fundMeABI, walletSigner);
      const tx = await contract.raiseSpamRequest(proof);
      await tx.wait();
      alert("Spam alert raised successfully!");
    } catch (error) {
      console.error("Error raising spam alert:", error);
      alert(`Failed to raise spam alert: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={raiseSpamAlert}
      disabled={loading}
      style={{
        padding: "10px",
        backgroundColor: "red",
        color: "white",
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {loading ? "Raising Alert..." : "Raise Spam Alert"}
    </button>
  );
};

export default RaiseSpamButton;
