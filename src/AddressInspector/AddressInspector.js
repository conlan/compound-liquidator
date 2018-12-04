import React from 'react';

// import { useWeb3Context, useAccountBalance } from 'web3-react/hooks'

import ReactTable from "react-table";
import BalanceTable from "./BalanceTable/BalanceTable.js"

import 'react-table/react-table.css'

let app;

function AddressInspector (props) { 
    app = props.app;

    var canLiquidate = false;

    // check if both repay and collect assets are set
    if ((app.state.asset_repay.length > 0) && (app.state.asset_collect.length > 0)) {
      canLiquidate = true;
    }

    return (
      <div>
        <p>Choose asset to repay on behalf of borrower:</p>
        <BalanceTable app={app} balance_type="Borrow"/>

        <p>Choose asset to receive at discount (5%):</p>
        <BalanceTable app={app} balance_type="Collateral"/>
        <br/>
        <button className='LiquidateButton' disabled={!canLiquidate}>Liquidate</button>
      </div>

    )
  }

  export default AddressInspector; 