import React from 'react';

import ReactTable from "react-table";
import BalanceTable from "../BalanceTable/BalanceTable.js"

import { useWeb3Context /*, useAccountBalance */ } from "web3-react/hooks";

import Tokens from "../CompoundStaging.js";

import "./AddressInspector.css"

var app;
var accountLiquidity = "";
var web3;

function GoBackFromAddressInspector() {
  accountLiquidity = "";
  
  app.setState({
    inspected_address: "",

    borrow_balances: {},
    supply_balances: {},

    pending_balances: {}, // what we're currently fetching

    asset_repay: "",
    asset_collect: "",

    repaySubmittedTxHash : ""
  });
}

function InitiateLiquidate() {
  var myAccount = web3.account;
  var targetAccount = app.state.inspected_address;

  // determine the asset borrow and collateral
  var assetBorrow = "";
  var assetCollateral = ""; 

  Tokens.tokens.forEach(t => {
    if (t.symbol === app.state.asset_collect) {
      assetCollateral = t.address; // the asset we're collecting is the one that the target collateralized
    } else if (t.symbol === app.state.asset_repay) {
      assetBorrow = t.address; // the asset that the target borrowed is the one that we are repaying on behalf of them
    }
  });  

  var requestAmountClose = -1; // TODO this should be an input field or slider 

  var compoundAddress = Tokens.moneyMarketAddress;
  var compoundABI = Tokens.moneyMarketABI;

  var compoundContract = new web3.web3js.eth.Contract(compoundABI, compoundAddress);

  compoundContract.methods.liquidateBorrow(targetAccount, assetBorrow, assetCollateral, requestAmountClose).send(
    { from: myAccount }
  ).on('transactionHash', (txHash) => {
    // var txLink = "https://rinkeby.etherscan.io/tx/" + txHash;

    app.setState({
      asset_repay: "",
      asset_collect: "",

      repaySubmittedTxHash : txHash
    });
  
    // console.log("View your liquidation tx at: " + txLink);
  })
}

function AddressInspector (props) { 
    app = props.app;

    web3 = useWeb3Context();

    if (accountLiquidity == "") {
      // only if we're not fetching a pending balance
      if (Object.keys(app.state.pending_balances).length == 0) {      
        var compoundAddress = Tokens.moneyMarketAddress;
        var compoundABI = Tokens.moneyMarketABI;

        var compoundContract = new web3.web3js.eth.Contract(compoundABI, compoundAddress);

        compoundContract.methods.getAccountLiquidity(app.state.inspected_address).call(function(error, result) {
            accountLiquidity = (result / 1e18).toFixed(5) + " ETH";

            app.setState({});
        });
      }

      if (app.state.liquidationDiscount < 0) {
        compoundContract.methods.liquidationDiscount().call(function(error, result) {
          if (error == null) {
            app.setState({
              liquidationDiscount : result
            });
          }
        });
      }
    }

    var canLiquidate = false;
    
    var liquidationText = "";

    var transactionSubmittedText = "";
    var transationSubmittedLink = "";

    // only enable liquidate button if both asset to repay and collect have been set
    if ((app.state.asset_repay.length > 0) && (app.state.asset_collect.length > 0)) {
      canLiquidate = true;
      
      liquidationText = "You will repay (" + accountLiquidity + ") worth of " + app.state.asset_repay + " to receive discounted " +
         app.state.asset_collect + ". (Note: You need a sufficient balance to close the entire position. Repaying specific amounts coming soon.)";
    }

    if (app.state.repaySubmittedTxHash.length > 0) {
      transactionSubmittedText = "Repay submitted! View your tx: "
      transationSubmittedLink = "https://rinkeby.etherscan.io/tx/" + app.state.repaySubmittedTxHash;      
    }

    var liquidationDiscountDisplay = "";
    if (app.state.liquidationDiscount < 0) {
      liquidationDiscountDisplay = "-";
    } else {
      liquidationDiscountDisplay = (app.state.liquidationDiscount * 100);
    }

    return (
      <div className="AddressInspector">       
        <p><b>Address:</b> <i>{app.state.inspected_address}</i></p>
        <p><b>Account Liquidity:</b> {accountLiquidity}</p>
        <p><b>State:</b> Unsafe</p>
        
        <p>Choose an asset to receive at {liquidationDiscountDisplay}% discount:</p> 
        <BalanceTable app={app} balanceType="Supplied" stateProperty="asset_collect"/>        

        <p>Choose an asset to repay on behalf of borrower to return their <b>Account Liquidity</b> to 0:</p>
        <BalanceTable app={app} balanceType="Borrowed" stateProperty="asset_repay"/>

        <p className="LiquidationDetails">{liquidationText}</p>

        <p className="TransactionSubmissionDetails">{transactionSubmittedText}<a href={transationSubmittedLink} target="_blank">{transationSubmittedLink}</a></p>

        <div className="ButtonDiv">
          <button className="BackButton" onClick={() => GoBackFromAddressInspector()}>Back</button>      
          <button className="LiquidateButton" disabled={!canLiquidate}
            onClick={() => InitiateLiquidate()}
          >Repay</button>
        </div>
      </div>

    )
  }

  export default AddressInspector; 