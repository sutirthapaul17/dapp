// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {PriceConverter} from "./PriceConverter.sol";

error NotOwner();
error NotDonor();
error AlreadyVoted();
error RequestNotApproved();

contract FundMe {
    using PriceConverter for uint256;

    struct WithdrawalRequest {
        string proof; // Proof (IPFS link or description)
        uint256 amount;
        uint256 approvals;
        bool executed;
        mapping(address => bool) voted;
    }

    mapping(address => uint256) public s_addressToAmountFunded;
    address[] private s_funders;
    WithdrawalRequest[] private s_requests;
    
    address private immutable i_owner;
    uint256 public constant MINIMUM_USD = 5e18;
    AggregatorV3Interface private s_priceFeed;

    constructor(address priceFeed) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeed);
    }

    function fund() public payable {
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD, 
            "You need to spend more ETH!"
        );
        
        if (s_addressToAmountFunded[msg.sender] == 0) {
            s_funders.push(msg.sender);
        }
        s_addressToAmountFunded[msg.sender] += msg.value;
    }

    function getVersion() public view returns (uint256) {
        // AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        return s_priceFeed.version();
    }

    function createWithdrawalRequest(string memory proof, uint256 amount) public {
        require(msg.sender == i_owner, "Only owner can request withdrawals");
        require(amount <= address(this).balance, "Not enough balance");
        
        WithdrawalRequest storage newRequest = s_requests.push();
        newRequest.proof = proof;
        newRequest.amount = amount;
        newRequest.approvals = 0;
        newRequest.executed = false;
    }

    function approveWithdrawal(uint256 requestId) public {
        require(s_addressToAmountFunded[msg.sender] > 0, "Only donors can vote");
        WithdrawalRequest storage request = s_requests[requestId];
        require(!request.executed, "Request already executed");
        require(!request.voted[msg.sender], "You already voted");
        
        request.voted[msg.sender] = true;
        request.approvals++;
    }

    function withdraw(uint256 requestId) public {
        require(msg.sender == i_owner, "Only owner can withdraw");
        WithdrawalRequest storage request = s_requests[requestId];
        require(!request.executed, "Request already executed");
        
        uint256 requiredApprovals = (s_funders.length * 50) / 100; // 50% approval needed
        require(request.approvals > requiredApprovals, "Not enough approvals");
        
        request.executed = true;
        (bool callSuccess,) = payable(msg.sender).call{value: request.amount}("");
        require(callSuccess, "Call failed");
    }

    function getRequestsCount() external view returns (uint256) {
        return s_requests.length;
    }

    function getRequest(uint256 requestId) external view returns (string memory, uint256, uint256, bool) {
        WithdrawalRequest storage request = s_requests[requestId];
        return (request.proof, request.amount, request.approvals, request.executed);
    }


    // function removeRequest(uint _requestId) public {
    //     require(msg.sender == i_owner, "Only owner can remove requests");
    //     require(_requestId < s_requests.length, "Invalid request ID");

    //     // Shift the last request into the deleted spot and remove the last entry
    //     s_requests[_requestId] = s_requests[s_requests.length - 1];
    //     s_requests.pop();
    // }

    function removeRequest(uint _requestId) public {
        require(msg.sender == i_owner, "Only owner can remove requests");
        require(_requestId < s_requests.length, "Invalid request ID");

        // Copy fields manually (except mappings)
        s_requests[_requestId].proof = s_requests[s_requests.length - 1].proof;
        s_requests[_requestId].amount = s_requests[s_requests.length - 1].amount;
        s_requests[_requestId].approvals = s_requests[s_requests.length - 1].approvals;
        s_requests[_requestId].executed = s_requests[s_requests.length - 1].executed;

        // Now pop the last entry
        s_requests.pop();
    }


    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    
    function getFunder(uint256 index) external view returns(address){
        return s_funders[index];
    }

    function getTotalFunders() public view returns (uint256) {
        return s_funders.length;
    }

    function getRequestApprovals(uint256 requestId) public view returns (uint256) {
        WithdrawalRequest storage request = s_requests[requestId];
        return request.approvals;
    }

    function isApprovalThresholdMet(uint256 requestId) public view returns (bool) {
        WithdrawalRequest storage request = s_requests[requestId];
        uint256 requiredApprovals = (s_funders.length * 50) / 100; // 50% approval needed
        return request.approvals >= requiredApprovals;
    }



    function getAddressToAmountFunded(
        address fundingAddress
    ) external view returns (uint256){
        return s_addressToAmountFunded[fundingAddress];
    }
    
    function getOwner() external view returns(address){
        return i_owner;
    }
    
    fallback() external payable { fund(); }
    receive() external payable { fund(); }
}
