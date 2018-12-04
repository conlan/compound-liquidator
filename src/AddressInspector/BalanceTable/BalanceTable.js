import React from 'react';

import ReactTable from "react-table";

import "./BalanceTable.css"

function BalanceTable (props) { 
  let app = props.app;

  var balanceType = props.balanceType;
  var stateProperty = props.stateProperty;

  var data = [];

  data.push({
    symbol : "WETH",
    address : "0x334343",
    borrowed : 0.343,
    collateral : 0.555,
    liquidateAsset : "WETH"
  })

  data.push({
    symbol : "DAI",
    address : "0x334343",
    borrowed : 0.343,
    collateral : 0.555,
    liquidateAsset : "DAI"
  })

  data.push({
    symbol : "BAT",
    address : "0x334343",
    borrowed : 0.343,
    collateral : 0.555,
    liquidateAsset : "BAT"
  })

  data.push({
    symbol : "ZRX",
    address : "0x334343",
    borrowed : 0.343,
    collateral : 0.555,
    liquidateAsset : "ZRX"
  })

  data.push({
    symbol : "REP",
    address : "0x334343",
    borrowed : 0.343,
    collateral : 0.555,
    liquidateAsset : "REP"
  })

  var columns = [
  {
    Header: "Symbol",
    accessor : 'symbol',
    maxWidth: 200,
    
  },{
    Header: "Address",
    accessor : 'address',
    Cell: row => (
      <a href={'https://etherscan.io/address/' + row.value} target='_blank'>{row.value}</a>            
      )
    },
    {
      Header: props.balance_type,
      accessor : props.balance_type,
      maxWidth: 200,
        className: "right"
    },
    {
      Header: "",
      accessor : 'liquidateAsset',
      maxWidth: 100,
      Cell: row => (
        <input type="radio" checked={app.state[stateProperty] === row.value}
        onClick={
          () => {
            if (stateProperty === 'asset_repay') {
              app.setState({
                asset_repay : row.value
              });
            } else {
              app.setState({
                asset_collect : row.value
              });
            }
          }
        }
        onChange={
          () => {

          }
        }
        />
        )
    }
    ];

    return (
      <ReactTable 
      data={data}
      columns={columns}
      showPagination={false}
      sortable={false}
      className="AddressInspectorTable"
      defaultPageSize={data.length}
      />

    )
  }

  export default BalanceTable; 