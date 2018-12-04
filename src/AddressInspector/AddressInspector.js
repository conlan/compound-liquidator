import React from 'react';

// import { useWeb3Context, useAccountBalance } from 'web3-react/hooks'

import ReactTable from "react-table";
import 'react-table/react-table.css'
import './AddressInspector.css';

let app;

function AddressInspector (props) { 
  app = props.app;

  var data = [];
  var columns = [
  {
    Header: "Symbol",
    accessor : 'symbol',
    maxWidth: 200,
    
  },{
    Header: "Address",
    accessor : 'address',
    maxWidth: 750,
    Cell: row => (
      <a href={'https://etherscan.io/address/' + row.value} target='_blank'>{row.value}</a>            
      )
    },
    {
      Header: "Borrowed",
      accessor : 'borrowed',
      maxWidth: 200
    },
    {
      Header: "Collateralized",
      accessor : 'collateralized',
      maxWidth: 200
    },
    {
      Header: "Liquidate",
      accessor : 'liquidate',
      maxWidth: 200
    }
    ];

    return (
    <ReactTable 
    data={data}
    columns={columns}
    showPagination={false}
    sortable={false}
    className="AddressInspectorTable"
    />

    )
  }

  export default AddressInspector; 