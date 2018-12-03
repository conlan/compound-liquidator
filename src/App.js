import React, { Component } from 'react';

import './App.css';
import AccountsTable from './AccountsTable/AccountsTable.js';

import { Web3Provider } from 'react-web3';

import axios from 'axios'

import sampleJson from './samplejson.json'

class App extends Component {
	constructor() {
		super();

    this.state = {
      accounts : []
    };


	}

  componentDidMount() {

  }

  render() {
    if (this.state.accounts.length == 0) {
      return (
        <div className="App">
        	<button className='button' onClick={() => {this.handleRefresh()}}>Refresh</button>
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
      <AccountsTable/>      
    )
  }

  handleRefresh () {    
    console.log(sampleJson['account_values']);
    
    var newAccounts = [];

    sampleJson['account_values'].forEach((accountData) => {
      var account = {
        address : accountData.address,

        totalEthBorrow : accountData.total_borrow_value_in_eth,

        totalEthSupply : accountData.total_supply_value_in_eth
      }

      newAccounts.push(account);
      
      this.setState({
        accounts : newAccounts
      });      
    });
    
    // var URL = 'https://api.compound.finance/api/risk/v1/get_top_account_values'

    // axios.get(URL, { 
    //   headers: { 
    //       'Accept' : 'application/json'

          
          
    //   } 
    // }).then(response => {
    //   var newAccounts = [];

    //   response.data.account_values.forEach((accountData) => {
        
    //     var account = {
    //       address : accountData.address,

    //       totalEthBorrow : accountData.total_borrow_value_in_eth,

    //       totalEthSupply : accountData.total_supply_value_in_eth
    //     }

    //     newAccounts.push(account);
    //   });

    //   this.setState({
    //     accounts : newAccounts
    //   }); 
    // }).catch((error) => {
    //     console.log('error ' + error);
    // });
  }
}

export default App;
