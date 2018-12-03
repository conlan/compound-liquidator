import React from 'react';

import { useWeb3Context, useAccountBalance } from 'web3-react/hooks'

import ReactTable from "react-table";
import 'react-table/react-table.css'

import './AccountsTable.css';

function AccountsTableRow(props) {
  var minCollateralRatio = 1.5;

  var account = props.account;
  
  var supplyAmount = (account.totalEthSupply / 1e18).toFixed(2);
  var borrowAmount = (account.totalEthBorrow / 1e18).toFixed(2);

  var ratio = +((supplyAmount / borrowAmount).toFixed(2));

  var disabledStatus = (ratio >= minCollateralRatio);

  var ratioDisplay = (ratio * 100) + "%";

  return (
    <tr>
    <td>{account.address}</td>
    <td>{supplyAmount}</td>
    <td>{borrowAmount}</td>
    <td>{ratioDisplay}</td>
    <td><button className='button' disabled={disabledStatus} >Liquidate</button></td>
    </tr>
    )
  }

  function AccountsTableBody(props) {
    let accounts = props.accounts;

    return accounts.map(account => {
      return (
      <AccountsTableRow key={account.address} account={account}/>
      )
    });
  }


  class AccountsTable extends React.Component {  
    constructor(props) {
      super(props); 
    }

    render () {
      const data = [];

      this.props.accounts.forEach((account) => {
        var supplyAmount = (account.totalEthSupply / 1e18).toFixed(3);
        var borrowAmount = (account.totalEthBorrow / 1e18).toFixed(3);

        var ratio = +((supplyAmount / borrowAmount).toFixed(2));

        var state = (ratio >= 2) ? "safe" : "risky";

        var ratioDisplay = (ratio * 100).toFixed() + "%";

        var account = {
          address : account.address,
          supply : supplyAmount,
          borrow : borrowAmount,
          ratio : ratioDisplay,
          state : state,
          block : account.blockUpdated
        }
        data.push(account);
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
                color: row.value === 'safe' ? '#57d500' : '#ffbf00',
                transition: 'all .3s ease'
              }}>
                &#x25cf;
              </span> {
                row.value === 'safe' ? 'Safe' : 'Risky'
              }
            </span>
          )
        },
        {
          Header: "Action",
          accessor : 'liquidate',
          maxWidth: 200
        }
      ];

      var showPageSizeOptions = false;
      var defaultPageSize = 25;
      return (
        <ReactTable 
          data={data}
          columns={columns}
          defaultPageSize={defaultPageSize}
          showPageSizeOptions={showPageSizeOptions}
            className="-striped"
        />
      )
    }
  }

  export default AccountsTable; 