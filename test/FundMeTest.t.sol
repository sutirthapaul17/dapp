// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

import {Test,console} from "forge-std/Test.sol";
import {FundMe} from "../src/fundMe.sol";
import {DeployFundMe} from "../script/DeployFundMe.s.sol";

contract FundMeTest is Test{
    // uint256 number = 1;
    FundMe fundMe;
    address user = makeAddr("user");
    uint256 constant SEND_VALUE = 0.1 ether;
    uint256 constant STARTING_BALANCE = 1000 ether;
    uint256 constant GAS_PRICE = 1;

    function setUp() external {
        // console.log("Setting up");
        // number = 2;
        // fundMe = new FundMe(0x694AA1769357215DE4FAC081bf1f309aDC325306);  
        DeployFundMe deployFundMe = new DeployFundMe();
        fundMe = deployFundMe.run(); 
        vm.deal(user,STARTING_BALANCE);

    }

    function testMinDollarisFive() public view{
        // console.log("Hello World");
        // console.log("Number is ",number);
        // assertEq(number,2);
        assertEq(fundMe.MINIMUM_USD(),5e18);
    }
    function testOwnerIsMsgSender() public view {
        assertEq(fundMe.getOwner(),msg.sender);
    }
    function testPriceFeedVersionIsAccurate() public view {
        uint256 version = fundMe.getVersion();
        assertEq(version,4);
    }

    function testFundFailsWithoutEnoughtETH() public{
        vm.expectRevert();
        fundMe.fund();
    }

    function testFundUpdatesFundedDataStructure() public {
        vm.prank(user);
        fundMe.fund{value: SEND_VALUE}();

        uint256 amountFunded = fundMe.getAddressToAmountFunded(user);
        assertEq(amountFunded,SEND_VALUE);
    }

    function testAddsFunderToArrayOfFunders() public {
        vm.prank(user);
        fundMe.fund{value: SEND_VALUE}();

        address funder = fundMe.getFunder(0);
        // assertEq(funders.length,1);
        assertEq(funder,user);
    }

    modifier funded(){
        vm.prank(user);
        fundMe.fund{value: SEND_VALUE}();
        _;
    }

    function testOnlyOwnerCanWithdraw() public funded {
        vm.prank(user);
        // fundMe.fund{value: SEND_VALUE}();
        vm.expectRevert();
        //  vm.prank(user);
        fundMe.withdraw(0);
    }

    function testWithDrawWithASingleFunder() public funded{
        // Arrange
        uint256 startingOwnerBalance = fundMe.getOwner().balance;
        uint256 startingFundMeBalance = address(fundMe).balance;

        // Act
        // uint256 gasStart = gasleft();
        vm.txGasPrice(GAS_PRICE);
        vm.prank(fundMe.getOwner());
        fundMe.withdraw(0);
        // uint256 gasEnd = gasleft();
        // uint256 gasUsed = (gasStart - gasEnd) * tx.gasprice;
        // console.log("Gas used: ",gasUsed);

        //Assert
        uint256 endingOwnerBalance = fundMe.getOwner().balance;
        uint256 endingFundMeBalance = address(fundMe).balance;
        assertEq(endingFundMeBalance,0);
        assertEq(
            startingFundMeBalance + startingOwnerBalance, endingOwnerBalance
        );
    }

    function testWithDrawFromMultipleFunders() public funded{
        //Arrange
        uint160 numberOfFunders = 10;
        uint160 startingFunderIndex = 1;
        for(uint160 i = startingFunderIndex; i < numberOfFunders; i++){
            //vm.prank new address
            //vm.deal new address
            //address()
            // hoax(<some address>,SEND_VALUE);
            hoax(address(i),SEND_VALUE);
            fundMe.fund{value: SEND_VALUE}();
        }

        
        uint256 startingOwnerBalance = fundMe.getOwner().balance;
        uint256 startingFundMeBalance = address(fundMe).balance;

        // Act
        vm.startPrank(fundMe.getOwner());
        fundMe.withdraw(0);
        vm.stopPrank();

        //Assert
        assert(address(fundMe).balance == 0);
        assert(startingFundMeBalance + startingOwnerBalance == fundMe.getOwner().balance);


    }

}