import React, { Component } from 'react';

import AccountsTable from './AccountsTable/AccountsTable.js';

import axios from 'axios'

import { useWeb3Context, useAccountBalance } from 'web3-react/hooks'

import './App.css';

import sampleJson from './samplejson.json'

class App extends Component {
	constructor() {
		super();

		this.state = {
			accounts : []
		};
	}

	componentDidMount() {
		console.log("component did mount");

		if (this.state.accounts.length == 0) {
			this.handleRefresh();
		}
	}

	render() {
		if (this.state.accounts.length == 0) {
			return (
				<div>
        			Loading...
				</div>
				);
		} else {
			return (			
				<div>
					{this.renderAccountList()}
				</div>
				)
		}
	}

	renderAccountList() {  
		return (
			<AccountsTable accounts={this.state.accounts}/>
			)
	}

	handleRefresh () {    
		console.log(sampleJson['account_values']);

		var newAccounts = [];

		sampleJson['account_values'].forEach((accountData) => {
			var account = {
				address : accountData.address,

				totalEthBorrow : accountData.total_borrow_value_in_eth.value,

				totalEthSupply : accountData.total_supply_value_in_eth.value,

				blockUpdated : accountData.block_updated
			}

			newAccounts.push(account);

			this.setState({
				accounts : newAccounts
			});      
		});

  //   var URL = 'https://api.compound.finance/api/risk/v1/get_account_values';

  //   axios({
  //     method: 'post',
  //     url: URL,

  //     data: {
  //      'page_size' : 100,
  //      'page_number' : 1,
  //      'min_borrow_value_in_eth' : {
  //       'value' : '500000000000000000'
  //     },
  //     'max_collateral_ratio' : {
  //       'value' : '5'
  //     }
  //   }
  // }).then(response => {
  //   console.log(response.data);
  // }).catch((error) => {
  //   console.log(error);
  // });
}
}

export default App;
