import React from "react";

import ReactTable from "react-table";

import "./BalanceTable.css";

import Tokens from "../CompoundStaging.js";

import { useWeb3Context /*, useAccountBalance */ } from "web3-react/hooks";

function BalanceTable(props) {
  let app = props.app;

  var balanceType = props.balanceType;
  var stateProperty = props.stateProperty;
  var borrowerAccount = app.state.inspected_address;

  var data = [];

  var compoundAddress = Tokens.moneyMarketAddress;
  var compoundABI = Tokens.moneyMarketABI;

  var web3 = useWeb3Context();

  var compoundContract = new web3.web3js.eth.Contract(compoundABI, compoundAddress);

  Tokens.tokens.forEach(tokenData => {
    var rowData = {
      symbol: tokenData.symbol,
      address: tokenData.address,
      liquidateAsset: tokenData.symbol
    };

    var asset = tokenData.address;
    var assetFetchKey = asset + balanceType;

    var tokenDecimals = Math.pow(10, tokenData.decimals);

    rowData[balanceType] = "loading balance...";    

    if (balanceType === "Borrowed" && asset in app.state.borrow_balances) {
      rowData["Borrowed"] = app.state.borrow_balances[asset];
    } else if (
      balanceType === "Supplied" && asset in app.state.supply_balances
    ) {
      rowData["Supplied"] = app.state.supply_balances[asset];
    } else if (Object.keys(app.state.pending_balances).length > 0) {
      // don't re-fetch an asset if we're already fetching one
    } else {
      app.state.pending_balances[assetFetchKey] = 0;

      // console.log(Object.keys(app.state.pending_balances).length + " <");

      if (balanceType === "Borrowed") {
        compoundContract.methods
          .getBorrowBalance(borrowerAccount, asset)
          .call(function(error, result) {
            delete app.state.pending_balances[assetFetchKey];

            if (error === null) {
              var newBalances = app.state.borrow_balances;

              var amount = (result / tokenDecimals).toFixed(3);
              if (amount == 0) {
                amount = "0";
              }

              newBalances[asset] = amount;

              app.setState({
                borrow_balances: newBalances
              });
            } else {
              app.setState({});
            }
          });
      } else {
        compoundContract.methods
          .getSupplyBalance(borrowerAccount, asset)
          .call(function(error, result) {
            delete app.state.pending_balances[assetFetchKey];

            if (error === null) {
              var newBalances = app.state.supply_balances;

              var amount = (result / tokenDecimals).toFixed(3);
              if (amount == 0) {
                amount = "0";
              }

              newBalances[asset] = amount;

              app.setState({
                supply_balances: newBalances
              });
            } else {
              app.setState({});
            }
          });
      }
    }

    data.push(rowData);
  });

  var columns = [
    {
      Header: "Symbol",
      accessor: "symbol",
      maxWidth: 200
    },
    {
      Header: "Address",
      accessor: "address",
      Cell: row => (
        <a href={"https://etherscan.io/address/" + row.value} target="_blank">
          {row.value}
        </a>
      )
    },
    {
      Header: balanceType,
      accessor: balanceType,
      maxWidth: 200,
      className: "right",
      
    },
    {
      Header: "",
      accessor: "liquidateAsset",
      maxWidth: 100,
      Cell: row => (
        <input
          type="radio"
          className="LiquidateRadioInput"
          checked={app.state[stateProperty] === row.value}
          disabled={
            ('Supplied' in row.original && row.original.Supplied == 0) ||
            ('Borrowed' in row.original && row.original.Borrowed == 0)
          }
          onClick={() => {
            if (stateProperty === "asset_repay") {
              app.setState({
                asset_repay: row.value
              });
            } else {
              app.setState({
                asset_collect: row.value
              });
            }
          }}
          onChange={() => {
            console.log(row.original.Supplied == 0);
          }}
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
      className="AddressInspectorTable -striped"
      defaultPageSize={data.length}
    />
  );
}

export default BalanceTable;
