import { useState, useEffect } from "react"
import { ethers } from "ethers"
import fundMeABI from "../fundMeABI.js"
import Wallet from "../wallet.jsx"
import RaiseSpamButton from "../RaiseAlert.jsx"


const CONTRACT_ADDRESS = "0x0B306BF915C4d645ff596e518fAf3F9669b97016"

export default function FundMeApp() {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)
  const [requests, setRequests] = useState([])
  const [amount, setAmount] = useState("")
  const [proof, setProof] = useState("")
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [requestId, setRequestId] = useState("")
  const [owner, setOwner] = useState("")
  const [requestIdToRemove, setRequestIdToRemove] = useState("")

  const [fundBalance, setFundBalance] = useState("0")
  const [numFunders, setNumFunders] = useState("0")
  const [approvals, setApprovals] = useState("0")
  const [approvalPercentage, setApprovalPercentage] = useState("0%")

  // Initialize Provider, Signer, and Contract
  useEffect(() => {
    const init = async () => {
      try {
        const newProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")
        setProvider(newProvider)

        const accounts = await newProvider.listAccounts()
        if (accounts.length === 0) {
          console.error("No accounts found.")
          return
        }

        const newSigner = newProvider.getSigner(accounts[0].address)
        setSigner(newSigner)

        const newContract = new ethers.Contract(CONTRACT_ADDRESS, fundMeABI, newSigner)
        setContract(newContract)
      } catch (error) {
        console.error("Error initializing contract:", error)
      }
    }

    init()
  }, [])

  // Fetch Requests
  useEffect(() => {
    const init = async () => {
      try {
        const newProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")
        setProvider(newProvider)

        const accounts = await newProvider.listAccounts()
        if (accounts.length === 0) {
          console.error("No accounts found.")
          return
        }

        const newSigner = await newProvider.getSigner()
        setSigner(newSigner)

        const newContract = new ethers.Contract(CONTRACT_ADDRESS, fundMeABI, newSigner)
        setContract(newContract)
      } catch (error) {
        console.error("Error initializing contract:", error)
      }
    }

    init()
  }, [])

  const fetchRequests = async () => {
    if (!contract) return

    try {
      const count = await contract.getRequestsCount()
      console.log("Total requests:", count)
      const reqs = []

      for (let i = 0; i < count; i++) {
        const request = await contract.getRequest(i)
        // console.log(Request ${i}:, request)

        reqs.push({
          id: i,
          proof: request[0],
          amount: request[1],
          approvals: request[2],
          executed: request[3],
        })
      }

      setRequests(reqs)
      console.log("Final requests array:", reqs)
    } catch (error) {
      console.error("Error fetching requests:", error)
    }
  }

  useEffect(() => {
    if (contract) fetchRequests()
  }, [contract])

  // Fetch Owner
  const fetchOwner = async () => {
    if (!contract) {
      console.error("Contract not initialized.")
      return
    }

    try {
      const ownerAddress = await contract.getOwner()
      setOwner(ownerAddress)
    } catch (error) {
      console.error("Error fetching owner address:", error)
    }
  }

  // Fetch Fund Balance
  const fetchContractData = async () => {
    try {
      const signer = provider.getSigner()
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)

      // Fetch fund balance
      const balance = await provider.getBalance(CONTRACT_ADDRESS)
      setFundBalance(ethers.formatEther(balance))

      // Fetch number of funders
      const fundersCount = await contractInstance.getTotalFunders()
      setNumFunders(fundersCount.toString())

      // Fetch approvals (for the latest request)
      const requestsCount = await contractInstance.getRequestsCount()
      if (requestsCount > 0) {
        const [, , approvalCount] = await contractInstance.getRequest(requestsCount - 1)
        setApprovals(approvalCount.toString())

        // Calculate approval percentage
        const approvalPercent = fundersCount > 0 ? ((approvalCount / fundersCount) * 100).toFixed(2) + "%" : "0%"
        setApprovalPercentage(approvalPercent)
      } else {
        setApprovals("0")
        setApprovalPercentage("0%")
      }
    } catch (error) {
      console.error("Error fetching contract data:", error)
    }
  }

  useEffect(() => {
    if (!provider) return

    fetchContractData()

    // Listen for events to update dynamically
    if (contract) {
      contract.on("Funded", fetchContractData)
      contract.on("Approved", fetchContractData)
    }

    return () => {
      if (contract) {
        contract.off("Funded", fetchContractData)
        contract.off("Approved", fetchContractData)
      }
    }
  }, [provider, contract])

  // Remove Request
  const removeRequest = async () => {
    if (!contract) {
      console.error("Contract not initialized yet.")
      return
    }

    try {
      const tx = await contract.removeRequest(requestIdToRemove)
      await tx.wait()
      alert("Request removed successfully!")
      setRequestIdToRemove("")
    } catch (error) {
      console.error("Error removing request:", error)
      alert("Failed to remove request. Check console for details.")
    }
  }

  // Ensure Contract is Available Before Calls
  const fund = async () => {
    if (!contract) {
      console.error("Contract not initialized yet.")
      return
    }

    const tx = await contract.fund({ value: ethers.parseEther(amount) })
    await tx.wait()
    alert("Funded successfully!")
  }

  const createWithdrawalRequest = async () => {
    if (!contract) {
      console.error("Contract not initialized yet.")
      return
    }

    const tx = await contract.createWithdrawalRequest(proof, ethers.parseEther(withdrawalAmount))
    await tx.wait()
    alert("Withdrawal request created!")
  }

  const approveWithdrawal = async () => {
    if (!contract) {
      console.error("Contract not initialized yet.")
      return
    }

    const tx = await contract.approveWithdrawal(requestId)
    await tx.wait()
    alert("Withdrawal approved!")
  }

  const withdraw = async () => {
    if (!contract) {
      console.error("Contract not initialized yet.")
      return
    }

    const tx = await contract.withdraw(requestId)
    await tx.wait()
    alert("Funds withdrawn!")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-16 md:w-64 bg-indigo-700 text-white">
        <div className="p-4 flex items-center justify-center">
          <div className="bg-white rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">FundMe Dashboard</h1>
            <p className="text-gray-500">Good Morning!</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border  border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <Wallet />
            <RaiseSpamButton />
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 font-medium">Contract balance</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <p className="text-3xl text-gray-500 font-bold">${fundBalance}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 font-medium">No of Donors</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <p className="text-3xl text-gray-500 font-bold">{numFunders}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 font-medium">% of donors approval</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-3xl text-gray-500 font-bold">{approvalPercentage}</p>
          </div>
        </div>

        {/* Create Campaign Button */}
        <div className="mb-8">
          <button
            onClick={createWithdrawalRequest}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
          >
            Create Campaign
          </button>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Fund</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount in ETH"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={fund}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Fund
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Create Withdrawal Request</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={proof}
                onChange={(e) => setProof(e.target.value)}
                placeholder="Proof"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                placeholder="Amount in ETH"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={createWithdrawalRequest}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Create Request
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Remove Withdrawal Request</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={requestIdToRemove}
                onChange={(e) => setRequestIdToRemove(e.target.value)}
                placeholder="Enter Request ID"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={removeRequest}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Remove Request
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Approve Withdrawal</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
                placeholder="Request ID"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={approveWithdrawal}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Approve
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Contract Owner</h3>
            <div className="space-y-4">
              <button
                onClick={fetchOwner}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Show Owner Address
              </button>
              {owner && <p className="text-gray-700 break-all p-2 bg-gray-50 rounded-md">{owner}</p>}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Withdraw Funds</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
                placeholder="Request ID"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={withdraw}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Withdrawal Requests Table */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Withdrawal Requests</h3>
          {requests.length === 0 ? (
            <p className="text-gray-500">No withdrawal requests found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Proof
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Approvals
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((req) => (
                    <tr key={req.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                        {req.proof}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ethers.formatEther(req.amount)} ETH
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.approvals.toString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {req.executed ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
    </div>
  )
}