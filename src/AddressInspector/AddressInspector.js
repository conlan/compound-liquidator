import React from 'react';

import ReactTable from "react-table";
import BalanceTable from "../BalanceTable/BalanceTable.js"

import { useWeb3Context } from "web3-react/hooks";

import Tokens from "../constants/Compound.js";

import "./AddressInspector.css"

var app;
var accountLiquidity = "";
var web3;

function OnRefreshClicked() {
  accountLiquidity = "";

  app.setState({
    borrow_balances : {},
    supply_balances : {},

    pending_balances: {}, // what we're currently fetching

    asset_repay: "",
    asset_collect: "",

    repaySubmittedTxHash : "",

    liquidateBlocked : true
  });
}

function OnBackClicked() {
  accountLiquidity = "";
  
  app.setState({
    inspected_address: "",

    borrow_balances: {},
    supply_balances: {},

    pending_balances: {}, // what we're currently fetching

    asset_repay: "",
    asset_collect: "",

    repaySubmittedTxHash : "",

    liquidateBlocked : true
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
    }

    if (t.symbol === app.state.asset_repay) {
      assetBorrow = t.address; // the asset that the target borrowed is the one that we are repaying on behalf of them
    }
  });  

  var requestAmountClose = -1; // TODO this should be an input field or slider 

  var liquidationAddress = Tokens.liquidationAddress;
  var compoundABI = Tokens.moneyMarketABI;

  var compoundContract = new web3.web3js.eth.Contract(compoundABI, liquidationAddress);

  compoundContract.methods.liquidateBorrow(targetAccount, assetBorrow, assetCollateral, requestAmountClose).send(
    { from: myAccount }
  ).on('transactionHash', (txHash) => {
    app.setState({
      asset_repay: "",
      asset_collect: "",

      repaySubmittedTxHash : txHash
    });
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
          if (error == null) {
              accountLiquidity = (result / 1e18).toFixed(6);

              var liquidateBlocked = (accountLiquidity >= 0);

              app.setState({
                liquidateBlocked : liquidateBlocked
              });
            } else {
              console.log(error);
            }
        });
      }

      if (app.state.liquidationDiscount < 0) {
        compoundContract.methods.liquidationDiscount().call(function(error, result) {
          if (error == null) {
            result = result / 1e18;
            
            app.setState({
              liquidationDiscount : result
            });
          }
        });
      }
    }

    // refresh not disabled by default
    var refreshDisabled = false;

    // but check that we have all the borrow balances fetched
    if ((Object.keys(app.state.borrow_balances).length) < Object.keys(Tokens.tokens).length) {
      refreshDisabled = true;
    } else if ((Object.keys(app.state.supply_balances).length) < Object.keys(Tokens.tokens).length) {
      // and all the supply balances fetched. If either of these aren't fully fetched then disable refresh
      refreshDisabled = true;
    }

    var canLiquidate = false;
    
    var liquidationText = "";

    var transactionSubmittedText = "";
    var transationSubmittedLink = "";

    // only enable liquidate button if both asset to repay and collect have been set
    if ((app.state.asset_repay.length > 0) && (app.state.asset_collect.length > 0)) {
      canLiquidate = true;
      
      liquidationText = "You must repay at least (~" + -accountLiquidity + " ETH) worth of " + app.state.asset_repay + " to receive discounted " +
         app.state.asset_collect + ". (Note: Repaying specific amounts coming soon.)";
    }

    if (app.state.repaySubmittedTxHash.length > 0) {
      transactionSubmittedText = "Repay submitted! View your tx: "
      transationSubmittedLink = "https://etherscan.io/tx/" + app.state.repaySubmittedTxHash;      
    }

    var liquidationDiscountDisplay = "";
    if (app.state.liquidationDiscount < 0) {
      liquidationDiscountDisplay = "-";
    } else {
      liquidationDiscountDisplay = (app.state.liquidationDiscount * 100);
    }

    var accountLiquidityDisplay = "";
    if (accountLiquidity.length > 0) {
      accountLiquidityDisplay = accountLiquidity + " ETH";
    } else {
      // if account liquidity not set then disable refresh
      refreshDisabled = true;
    }

    var stateColor = (app.state.inspected_address_state === 'risky') ? '#ffbf00' : 
      (app.state.inspected_address_state === 'safe') ? '#57d500' : '#ff2e00';

    var stateText = app.state.inspected_address_state;


    return (
      <div className="AddressInspector">
        <div>
          <p className="SameLine"><b>Address:</b> <i>{app.state.inspected_address}</i></p>

          <button className="RefreshButton" onClick={() => OnRefreshClicked()} disabled={refreshDisabled}>Refresh</button>
        </div>
        <p><b>Account Liquidity:</b> {accountLiquidityDisplay}</p>
        <span><p><b>State: </b><span style={{color:stateColor}}>&#x25cf;</span> {stateText}</p></span>
        
        <p>Choose an asset to receive at {liquidationDiscountDisplay}% discount:</p> 
        <BalanceTable app={app} balanceType="Supplied" stateProperty="asset_collect"/>        

        <p>Choose an asset to repay on behalf of borrower to return their <b>Account Liquidity</b> to 0:</p>
        <BalanceTable app={app} balanceType="Borrowed" stateProperty="asset_repay"/>

        <p className="LiquidationDetails">{liquidationText}</p>

        <p className="TransactionSubmissionDetails">{transactionSubmittedText}<a href={transationSubmittedLink} target="_blank">{transationSubmittedLink}</a></p>

        <div className="ButtonDiv">
          <button className="BackButton" onClick={() => OnBackClicked()}>Back</button>
          <button className="LiquidateButton" disabled={!canLiquidate}
            onClick={() => InitiateLiquidate()}
          >Repay</button>
        </div>
      </div>

    )
  }

  export default AddressInspector; 