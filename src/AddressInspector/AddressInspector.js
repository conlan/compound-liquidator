import React from 'react';

import ReactTable from "react-table";
import BalanceTable from "../BalanceTable/BalanceTable.js"

import 'react-table/react-table.css'

let app;

function AddressInspector (props) { 
    app = props.app;

    var canLiquidate = false;

    // only enable liquidate button if both asset to repay and collect have been set
    if ((app.state.asset_repay.length > 0) && (app.state.asset_collect.length > 0)) {
      canLiquidate = true;
    }

    return (
      <div>        
        <p>Choose an asset to receive at discount:</p>
        <BalanceTable app={app} balanceType="Supplied" stateProperty="asset_collect"/>        

        <p>Choose an asset to repay:</p>
        <BalanceTable app={app} balanceType="Borrowed" stateProperty="asset_repay"/>
        <br/>

        <button className="LiquidateButton" disabled={!canLiquidate}>Liquidate</button>
      </div>

    )
  }

  export default AddressInspector; 