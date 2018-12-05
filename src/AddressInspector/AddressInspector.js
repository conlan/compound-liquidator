import React from 'react';

import ReactTable from "react-table";
import BalanceTable from "../BalanceTable/BalanceTable.js"

import { useWeb3Context /*, useAccountBalance */ } from "web3-react/hooks";

import Tokens from "../CompoundStaging.js";

import "./AddressInspector.css"

var app;
var accountLiquidity = "";

function GoBackFromAddressInspector() {
  accountLiquidity = "";
  
  app.setState({
    inspected_address: "",

    borrow_balances: {},
    supply_balances: {},

    pending_balances: {}, // what we're currently fetching

    asset_repay: "",
    asset_collect: ""
  });
}

function AddressInspector (props) { 
    app = props.app;

    // only if we're not fetching a pending balance
    if (Object.keys(app.state.pending_balances).length == 0) {
      if (accountLiquidity == "") {
        var compoundAddress = Tokens.moneyMarketAddress;
        var compoundABI = Tokens.moneyMarketABI;

        var web3 = useWeb3Context();

        var compoundContract = new web3.web3js.eth.Contract(compoundABI, compoundAddress);

        compoundContract.methods.getAccountLiquidity(app.state.inspected_address).call(function(error, result) {
            accountLiquidity = (result / 1e18).toFixed(3) + " ETH";

            app.setState({});
        });
      }
    }

    var canLiquidate = false;

    // only enable liquidate button if both asset to repay and collect have been set
    if ((app.state.asset_repay.length > 0) && (app.state.asset_collect.length > 0)) {
      canLiquidate = true;
    }

    return (
      <div className="AddressInspector">       
        <p><b>Account:</b> <i>{app.state.inspected_address}</i></p>
        <p><b>Liquidity:</b> {accountLiquidity}</p>
        <p><b>State:</b> Unsafe</p>
        
        <p>Choose an asset to receive at 5% discount:</p>
        <BalanceTable app={app} balanceType="Supplied" stateProperty="asset_collect"/>        

        <p>Choose an asset to repay on behalf of borrower:</p>
        <BalanceTable app={app} balanceType="Borrowed" stateProperty="asset_repay"/>
        <br/>

        <div className="ButtonDiv">
          <button className="BackButton" onClick={() => GoBackFromAddressInspector()}>Back</button>
        
          <button className="LiquidateButton" disabled={!canLiquidate}>Liquidate</button>
        </div>
      </div>

    )
  }

  export default AddressInspector; 