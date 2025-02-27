// const fundMeABI = [
//   {
//       "type": "constructor",
//       "inputs": [
//           {
//               "name": "priceFeed",
//               "type": "address",
//               "internalType": "address"
//           }
//       ],
//       "stateMutability": "nonpayable"
//   },
//   {
//       "type": "fallback",
//       "stateMutability": "payable"
//   },
//   {
//       "type": "receive",
//       "stateMutability": "payable"
//   },
//   {
//       "type": "function",
//       "name": "MINIMUM_USD",
//       "inputs": [],
//       "outputs": [
//           {
//               "name": "",
//               "type": "uint256",
//               "internalType": "uint256"
//           }
//       ],
//       "stateMutability": "view"
//   },
//   {
//       "type": "function",
//       "name": "approveWithdrawal",
//       "inputs": [
//           {
//               "name": "requestId",
//               "type": "uint256",
//               "internalType": "uint256"
//           }
//       ],
//       "outputs": [],
//       "stateMutability": "nonpayable"
//   },
//   {
//       "type": "function",
//       "name": "createWithdrawalRequest",
//       "inputs": [
//           {
//               "name": "proof",
//               "type": "string",
//               "internalType": "string"
//           },
//           {
//               "name": "amount",
//               "type": "uint256",
//               "internalType": "uint256"
//           }
//       ],
//       "outputs": [],
//       "stateMutability": "nonpayable"
//   },
//   {
//       "type": "function",
//       "name": "fund",
//       "inputs": [],
//       "outputs": [],
//       "stateMutability": "payable"
//   },
//   {
//       "type": "function",
//       "name": "getAddressToAmountFunded",
//       "inputs": [
//           {
//               "name": "fundingAddress",
//               "type": "address",
//               "internalType": "address"
//           }
//       ],
//       "outputs": [
//           {
//               "name": "",
//               "type": "uint256",
//               "internalType": "uint256"
//           }
//       ],
//       "stateMutability": "view"
//   },
//   {
//       "type": "function",
//       "name": "getFunder",
//       "inputs": [
//           {
//               "name": "index",
//               "type": "uint256",
//               "internalType": "uint256"
//           }
//       ],
//       "outputs": [
//           {
//               "name": "",
//               "type": "address",
//               "internalType": "address"
//           }
//       ],
//       "stateMutability": "view"
//   },
//   {
//       "type": "function",
//       "name": "getOwner",
//       "inputs": [],
//       "outputs": [
//           {
//               "name": "",
//               "type": "address",
//               "internalType": "address"
//           }
//       ],
//       "stateMutability": "view"
//   },
//   {
//       "type": "function",
//       "name": "getRequest",
//       "inputs": [
//           {
//               "name": "requestId",
//               "type": "uint256",
//               "internalType": "uint256"
//           }
//       ],
//       "outputs": [
//           {
//               "name": "",
//               "type": "string",
//               "internalType": "string"
//           },
//           {
//               "name": "",
//               "type": "uint256",
//               "internalType": "uint256"
//           },
//           {
//               "name": "",
//               "type": "uint256",
//               "internalType": "uint256"
//           },
//           {
//               "name": "",
//               "type": "bool",
//               "internalType": "bool"
//           }
//       ],
//       "stateMutability": "view"
//   },
//   {
//       "type": "function",
//       "name": "getRequestsCount",
//       "inputs": [],
//       "outputs": [
//           {
//               "name": "",
//               "type": "uint256",
//               "internalType": "uint256"
//           }
//       ],
//       "stateMutability": "view"
//   },
//   {
//       "type": "function",
//       "name": "getVersion",
//       "inputs": [],
//       "outputs": [
//           {
//               "name": "",
//               "type": "uint256",
//               "internalType": "uint256"
//           }
//       ],
//       "stateMutability": "view"
//   },
//   {
//       "type": "function",
//       "name": "s_addressToAmountFunded",
//       "inputs": [
//           {
//               "name": "",
//               "type": "address",
//               "internalType": "address"
//           }
//       ],
//       "outputs": [
//           {
//               "name": "",
//               "type": "uint256",
//               "internalType": "uint256"
//           }
//       ],
//       "stateMutability": "view"
//   },
//   {
//       "type": "function",
//       "name": "withdraw",
//       "inputs": [
//           {
//               "name": "requestId",
//               "type": "uint256",
//               "internalType": "uint256"
//           }
//       ],
//       "outputs": [],
//       "stateMutability": "nonpayable"
//   }
// ];
const fundMeABI = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "priceFeed",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "fallback",
    "stateMutability": "payable"
  },
  {
    "type": "receive",
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "MINIMUM_USD",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "approveWithdrawal",
    "inputs": [
      {
        "name": "requestId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "createWithdrawalRequest",
    "inputs": [
      {
        "name": "proof",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "fund",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getAddressToAmountFunded",
    "inputs": [
      {
        "name": "fundingAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getContractBalance",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getFunder",
    "inputs": [
      {
        "name": "index",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getOwner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getRequest",
    "inputs": [
      {
        "name": "requestId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getRequestApprovals",
    "inputs": [
      {
        "name": "requestId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getRequestsCount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalFunders",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getVersion",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hasRaisedSpamRequest",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isApprovalThresholdMet",
    "inputs": [
      {
        "name": "requestId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "raiseSpamRequest",
    "inputs": [
      {
        "name": "_proof",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "removeRequest",
    "inputs": [
      {
        "name": "_requestId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "s_addressToAmountFunded",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "spamReports",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "reporter",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "proof",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "spamRequestCount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "name": "requestId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
]


// Export if using in a Node.js environment
export default fundMeABI;
