import React, { Component } from "react";

import AccountsTable from "./AccountsTable/AccountsTable.js";
import AddressInspector from "./AddressInspector/AddressInspector.js";

import axios from "axios";

// import { useWeb3Context, useAccountBalance } from 'web3-react/hooks'

import "./App.css";

import sampleJson from "./samplejson.json";

function ParseAccountDataResponse(json, app) {
  var newAccounts = [];

  json.account_values.forEach(accountData => {
    var account = {
      address: accountData.address,

      totalEthBorrow: accountData.total_borrow_value_in_eth.value,

      totalEthSupply: accountData.total_supply_value_in_eth.value,

      blockUpdated: accountData.block_updated
    };
    newAccounts.push(account);
  });

  app.setState({
    accounts: newAccounts
  });
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      accounts: [],

      inspected_address: "",
      borrow_balances: {},
      supply_balances: {},
      pending_balances: {},

      asset_repay: "",
      asset_collect: ""
    };
  }

  componentDidMount() {
    if (this.state.accounts.length == 0) {
      this.refreshAccountList();
    }
  }

  render() {
    if (this.state.inspected_address.length > 0) {
      return (
        <AddressInspector app={this} />
      );
    } else {
      if (this.state.accounts.length == 0) {
        return (
          <div>
            <img src="./loading.gif" className="Loading" />
          </div>
        );
      } else {
        return (
          <AccountsTable accounts={this.state.accounts} app={this} />          
        );
      }
    }
  }

  refreshAccountList() {
    // ParseAccountDataResponse(sampleJson, this);

    // var URL = "https://api.compound.finance/api/risk/v1/get_account_values";
    var URL = "https://api.stage.compound.finance/api/risk/v1/get_account_values";

    axios({
      method: "post",
      url: URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        // ,'compound-api-key' : 'xxx'
      },
      data: {
        page_size: 100,
        page_number: 1,
        min_borrow_value_in_eth: {
          value: "50000000000000000"
        },
        max_collateral_ratio: {
          value: "5"
        }
      }
    }).then(response => {
        console.log(response);

        ParseAccountDataResponse(response.data, this);
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export default App;
