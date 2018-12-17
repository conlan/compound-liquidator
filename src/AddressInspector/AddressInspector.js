import React from 'react';

// import ReactTable from "react-table";
import BalanceTable from "../components/BalanceTable/BalanceTable.js"
import { BigNumber } from "bignumber.js";

import { useWeb3Context } from "web3-react/hooks";

import "./AddressInspector.css"

var app;
var accountLiquidity = "";
var web3;

var maxRepayAmount = 0;
var tokenAddressToBeRepaid = "";

function GetIntendedRepayAmount() {
  var repaySlider = document.getElementById('repaySlider');

  return new BigNumber(repaySlider.value / repaySlider.max * maxRepayAmount).toFixed(4);
}

function OnRepaySliderValueChange() {
  var repaySlider = document.getElementById('repaySlider');

  var liquidationButton = document.getElementById('LiquidateButton');

  var repayAmount = GetIntendedRepayAmount();

  liquidationButton.innerText = "Repay " + repayAmount + " " + app.state.asset_repay;
}

function OnRefreshClicked() {
  accountLiquidity = "";
  tokenAddressToBeRepaid = "";

  document.getElementById('repaySlider').value = 50;

  document.getElementById('LiquidateButton').innerText = "Repay";

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
  tokenAddressToBeRepaid = "";
  
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
  var requestAmountClose = GetIntendedRepayAmount();

  if (Number(requestAmountClose) === 0) {
    window.alert("Please set an amount greater than 0.");
  } else {
    var myAccount = web3.account;
    var targetAccount = app.state.inspected_address;

    // determine the asset borrow and collateral
    var assetBorrow = "";
    var assetBorrowDecimals = 0;

    var assetCollateral = ""; 

    app.state.TOKENS.forEach(t => {
      if (t.symbol === app.state.asset_collect) {
        assetCollateral = t.address; // the asset we're collecting is the one that the target collateralized
      }

      if (t.symbol === app.state.asset_repay) {
        assetBorrow = t.address; // the asset that the target borrowed is the one that we are repaying on behalf of them

        assetBorrowDecimals = Math.pow(10, t.decimals);
      }
    });

    // TODO enforce user's balance available
    requestAmountClose = new BigNumber(requestAmountClose * assetBorrowDecimals).toFixed();

    console.log(requestAmountClose);

    var compoundContract = new web3.web3js.eth.Contract(app.state.LIQUIDATION_ABI, app.state.LIQUIDATION_ADDRESS);

    compoundContract.methods.liquidateBorrow(targetAccount, assetBorrow, assetCollateral, requestAmountClose).send(
      { from: myAccount }
    ).on('transactionHash', (txHash) => {
      app.setState({
        asset_repay: "",
        asset_collect: "",

        repaySubmittedTxHash : txHash
      });// TODO await confirmation
    }).on("confirmation", (err, receipt) => {
      if (app.state.repaySubmittedTxHash === receipt.transactionHash) {
        OnRefreshClicked();
      }
  });
  }
}

function AddressInspector (props) { 
    app = props.app;

    web3 = useWeb3Context();

    if (accountLiquidity === "") {
      // only if we're not fetching a pending balance
      if (Object.keys(app.state.pending_balances).length === 0) {
        var compoundContract = new web3.web3js.eth.Contract(app.state.MONEY_MARKET_ABI, app.state.MONEY_MARKET_ADDRESS);

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
    if ((Object.keys(app.state.borrow_balances).length) < Object.keys(app.state.TOKENS).length) {
      refreshDisabled = true;
    } else if ((Object.keys(app.state.supply_balances).length) < Object.keys(app.state.TOKENS).length) {
      // and all the supply balances fetched. If either of these aren't fully fetched then disable refresh
      refreshDisabled = true;
    }

    var canLiquidate = false;
    
    var liquidationText = "";

    var transactionSubmittedText = "";
    var transationSubmittedLink = "";

    var repaySliderDisabled = true;

    // only enable liquidate button if both asset to repay and collect have been set
    if ((app.state.asset_repay.length > 0) && (app.state.asset_collect.length > 0)) {
      if (app.state.asset_repay !== app.state.asset_collect) {
        canLiquidate = true;
      
        liquidationText = "You can repay up to (~" + -accountLiquidity + " ETH) worth of " + app.state.asset_repay + " to receive discounted " +
           app.state.asset_collect + ". (Note: Repaying specific amounts coming soon.)";

        repaySliderDisabled = false;

        // find the address for the token that the user has selected to repay
        app.state.TOKENS.forEach(t => {
          if (t.symbol === app.state.asset_repay) {
            tokenAddressToBeRepaid = t.address;
          }
        });

        // calculate the maximum amount that the user can repay
        var maxRepayAmountInEth = -accountLiquidity;

        if (tokenAddressToBeRepaid in app.state.asset_prices) {
          var assetRepayExchangeRate = app.state.asset_prices[tokenAddressToBeRepaid];

          maxRepayAmount = (-accountLiquidity / assetRepayExchangeRate);
        } else {
          maxRepayAmount = 0;
        }
      } else {
        liquidationText = "Unable to repay " + app.state.asset_repay + " for same asset " + app.state.asset_collect + ".";
      }
    }

    if (app.state.repaySubmittedTxHash.length > 0) {
      transactionSubmittedText = "Repay submitted! View your tx: "
      transationSubmittedLink = app.state.ETHERSCAN_PREFIX + "tx/" + app.state.repaySubmittedTxHash;      
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

        <p>Choose a different asset to repay on behalf of borrower to return their <b>Account Liquidity</b> to 0:</p>
        <BalanceTable app={app} balanceType="Borrowed" stateProperty="asset_repay"/>

        <p className="LiquidationDetails">{liquidationText}</p>

        <p className="TransactionSubmissionDetails">{transactionSubmittedText}<a href={transationSubmittedLink} rel="noopener noreferrer" target="_blank">{transationSubmittedLink}</a></p>

        <div className="ButtonDiv">
          <button className="BackButton" onClick={() => OnBackClicked()}>Back</button>
          
          <button className="LiquidateButton" disabled={!canLiquidate} id="LiquidateButton"
            onClick={() => InitiateLiquidate()}
          >Repay</button>
          <input type="range" onInput={() => OnRepaySliderValueChange()} min="0" max="100"
            className="slider" id="repaySlider" disabled={repaySliderDisabled}/>
        </div>
      </div>

    )
  }

  export default AddressInspector; 