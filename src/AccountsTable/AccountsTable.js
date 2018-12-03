import React, { Component } from 'react';
import './AccountsTable.css';

class AccountsTable extends React.Component {  
  constructor(props) {
    super(props); 
  }

  render () {
    return (
      <div className='AccountsTable'>
        <table className='AccountsTable'>
        
        <thead>
        <tr>
          <th>Address</th>
          <th>Supply</th>
          <th>Borrow</th>
          <th>Ratio</th>
          <th></th>
        </tr> 
        </thead>

        <tbody>
        <tr>
          <td>0x34343</td>
          <td>3.4</td>
          <td>2.3</td>
          <td>147%</td>
          <td><button className='button' disabled>Liquidate</button></td>
        </tr>
        </tbody>

        </table>
        </div>
    )
  }
}

export default AccountsTable; 