import React from "react";
import ReactTable from "react-table";

import BigNumber from "bignumber.js";
import { useWeb3Context } from "web3-react/hooks";

import ERC20 from "../../constants/ERC20.js"

import "./BalanceTable.css";

let app;
let web3;

function OnEnableTokenClicked (row) {
  var tokenAddress = row.original.address;

  var tokenContract = new web3.web3js.eth.Contract(ERC20.ABI, tokenAddress);

  // approve maximum amount of tokens
  tokenContract.methods.approve(app.state.LIQUIDATION_ADDRESS, new BigNumber(2**(256) - 1).toFixed() ).send(
    { from: web3.account }
  ).on('transactionHash', (txHash) => {
    console.log("Transaction submitted: " + app.state.ETHERSCAN_PREFIX + "tx/" + txHash);

    // add token address to pending allowances so it shows up a fetching spinner below
    app.state.pending_allowances[tokenAddress] = true;

    app.setState({});
  }).on("confirmation", (err, receipt) => {
    // remove key from pending allowances
    delete app.state.pending_allowances[tokenAddress];

    app.state.allowance_states[tokenAddress] = true;

    app.setState({});
  });
}

function BalanceTable(props) {
  app = props.app;

  var balanceType = props.balanceType;
  var stateProperty = props.stateProperty;
  var borrowerAccount = app.state.inspected_address;

  var data = [];

  web3 = useWeb3Context();

  var compoundContract = new web3.web3js.eth.Contract(
    app.state.MONEY_MARKET_ABI,
    app.state.MONEY_MARKET_ADDRESS
  );

  app.state.TOKENS.forEach(tokenData => {
    var isAllowed = false;

    if (tokenData.address in app.state.allowance_states) {
      isAllowed = app.state.allowance_states[tokenData.address];
    }

    var rowData = {
      symbol: tokenData.symbol,
      address: tokenData.address,
      liquidateAsset: tokenData.symbol,
      clickable : false,
      disabled : true,
      fetching : false,
      allowed : isAllowed
    };

    var asset = tokenData.address;
    var assetFetchKey = asset + balanceType;

    var tokenDecimals = Math.pow(10, tokenData.decimals);

    rowData[balanceType] = "";

    if (asset in app.state.pending_allowances) {
      rowData.fetching = true;
    }

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

              var amount = Number((result / tokenDecimals).toFixed(3));
              if (amount === 0) {
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

              var amount = Number((result / tokenDecimals).toFixed(3));
              if (amount === 0) {
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

  // console.log(data);

  var etherScanPrefix = app.state.ETHERSCAN_PREFIX;

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
        <a href={etherScanPrefix + "address/" + row.value} target="_blank" rel="noopener noreferrer">
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
      maxWidth: 75,
      className: "center",
      Cell: row => {
        if (row.original.fetching) {
          return <div className="BalanceLoading"><img alt="loading" src="./small-loading.gif"/></div>
        } else if (row.original.allowed === false) {
          return (<button onClick={() => OnEnableTokenClicked(row)} className="EnableButton"><span role="img" aria-label="Checkmark">✅</span></button>)
        } else if (row.original.clickable) {
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
