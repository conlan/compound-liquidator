import React from "react";

import ReactTable from "react-table";

import "./BalanceTable.css";

import Tokens from "../Compound.js";

import { useWeb3Context } from "web3-react/hooks";

function BalanceTable(props) {
  let app = props.app;

  var balanceType = props.balanceType;
  var stateProperty = props.stateProperty;
  var borrowerAccount = app.state.inspected_address;

  var data = [];

  var compoundAddress = Tokens.moneyMarketAddress;
  var compoundABI = Tokens.moneyMarketABI;

  var web3 = useWeb3Context();

  var compoundContract = new web3.web3js.eth.Contract(
    compoundABI,
    compoundAddress
  );

  Tokens.tokens.forEach(tokenData => {
    var rowData = {
      symbol: tokenData.symbol,
      address: tokenData.address,
      liquidateAsset: tokenData.symbol,
      clickable : false,
      disabled : true,
      fetching : false
    };

    var asset = tokenData.address;
    var assetFetchKey = asset + balanceType;

    var tokenDecimals = Math.pow(10, tokenData.decimals);

    rowData[balanceType] = "";

    if (balanceType === "Borrowed" && asset in app.state.borrow_balances) {
      rowData["Borrowed"] = app.state.borrow_balances[asset];
    } else if (
      balanceType === "Supplied" &&
      asset in app.state.supply_balances
    ) {
      rowData["Supplied"] = app.state.supply_balances[asset];
    } else if (Object.keys(app.state.pending_balances).length > 0) {
      // don't re-fetch an asset if we're already fetching one
    } else {
      app.state.pending_balances[assetFetchKey] = 0;

      rowData.fetching = true;

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

    if (("Supplied" in rowData && rowData.Supplied == 0) ||
      ("Borrowed" in rowData && rowData.Borrowed == 0) ) {      
      rowData.clickable = false;
    } else {
      rowData.clickable = true;
    }
    
    rowData.disabled = app.state.liquidateBlocked;

    data.push(rowData);
  });

  console.log(data);

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
      className: "right"
    },
    {
      Header: "",
      accessor: "liquidateAsset",
      maxWidth: 100,
      Cell: row => {
        if (row.original.clickable) {
          return (          
            <input
              type="radio"
              className="LiquidateRadioInput"
              checked={app.state[stateProperty] === row.value}
              disabled={row.original.disabled}
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
        } else if (row.original.fetching) {
          return <div className="BalanceLoading"><img src="./small-loading.gif"/></div>
        } else {
          return <div/>
        }
      }
    }
  ];

  return (
    <ReactTable
      data={data}
      columns={columns}
      resizable={false}
      showPagination={false}
      sortable={false}
      className="AddressInspectorTable -striped"
      defaultPageSize={data.length}
    />
  );
}

export default BalanceTable;
