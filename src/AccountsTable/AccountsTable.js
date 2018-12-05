import React from 'react';

// import { useWeb3Context, useAccountBalance } from 'web3-react/hooks'

import ReactTable from "react-table";
import 'react-table/react-table.css'
import './AccountsTable.css';

let app;

function InspectAddress(address, state) {  
  app.setState({
    inspected_address : address,
    inspected_address_state : state
  });
}

function AccountsTable (props) { 
  app = props.app;

    const data = [];
    props.accounts.forEach((account) => {
      var supplyAmount = (account.totalEthSupply / 1e18).toFixed(3);
      var borrowAmount = (account.totalEthBorrow / 1e18).toFixed(3);

      var ratio = +((supplyAmount / borrowAmount).toFixed(3));

      var minCollateralRatio = 1.5;
      var riskyCollateralRatio = 2;

      var state = "";

      if (ratio < minCollateralRatio) {
        state = "unsafe";
      } else if (ratio <= riskyCollateralRatio) {
        state = "risky";
      } else {
        state = "safe";
      }

      var ratioDisplay = (ratio * 100).toFixed(1) + "%";

      // var liquidateStatus = (ratio >= minCollateralRatio) ? '0' : '1';

      var accountObj = {
        address : account.address,
        supply : supplyAmount,
        borrow : borrowAmount,
        ratio : ratioDisplay,
        state : state,
        block : account.blockUpdated
      }
      data.push(accountObj);
    });

    const columns = [
    {
      Header: "Address",
      accessor : 'address',
      maxWidth: 750,
      Cell: row => (
        <a href={'https://etherscan.io/address/' + row.value} target='_blank'>{row.value}</a>            
        )

      },
      {
        Header: "Supply",
        accessor : 'supply',
        maxWidth: 200,
        className: "right"
      },
      {
        Header: "Borrow",
        accessor : 'borrow',
        maxWidth: 200,
        className: "right"
      },
      {
        Header: "Ratio",
        accessor : 'ratio',
        maxWidth: 200,
        className: "right"
      },
      {
        Header: "State",
        accessor : 'state',
        maxWidth: 200,
        Cell: row => (
        <span>
        <span style={{
          color: row.value === 'safe' ? '#57d500' : row.value === 'risky' ? '#ffbf00' : '#ff2e00',

          transition: 'all .3s ease'
        }}>
        &#x25cf;
        </span> {
          row.value === 'safe' ? 'Safe' : row.value === 'risky' ? 'Risky' : 'Unsafe'
        }
        </span>
        )
      },
      {
        Header: "",
        accessor : 'liquidate',
        maxWidth: 200,
        Cell: row => (
        <button className="InspectButton" 
        onClick={
          () => InspectAddress(row.row.address, row.original.state)
        }>Inspect</button>
        )
      }
      ];

      var showPageSizeOptions = false;
      var defaultPageSize = 15;

      var minRows = defaultPageSize;

      return (

        <div className="AccountsTable">
            <p><b>Accounts</b></p>
          
      <ReactTable 
      data={data}
      columns={columns}
      defaultPageSize={defaultPageSize}
      showPageSizeOptions={showPageSizeOptions}
      className="-striped"
      />
      <p><a href="https://github.com/conlan/compound-liquidator" target="_blank">Github</a> | <a href="https://compound.finance" target="_blank">Compound</a> | <a href="https://compound.finance/developers#liquidate" target="_blank">Documentation</a> | Use at your own <b><font color="red">risk!</font></b></p>
      </div>
      )
    }

    export default AccountsTable; 