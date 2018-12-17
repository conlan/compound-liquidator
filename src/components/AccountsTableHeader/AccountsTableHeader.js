import React from "react";

import { useWeb3Context } from "web3-react/hooks";

function AccountsTableHeader(props) {
  var app = props.app;

  var currentBlockText = ""
  var currentBlockLink = app.state.ETHERSCAN_PREFIX + "block/" + props.currentBlock;

  var web3 = useWeb3Context();

  if (props.currentBlock.length > 0) {
    currentBlockText = "Current Block (";

    if (web3.networkId === app.state.MAIN_NETWORK_ID) {
      currentBlockText += "Mainnet";
    } else if (web3.networkId === app.state.STAGING_NETWORK_ID) {
      currentBlockText += "Staging";
    } else {
      currentBlockText += "Unknown";
    }  

    currentBlockText += "): ";
  } else {
    web3.web3js.eth.getBlockNumber().then((currentBlock) => {
      app.setState({
        currentBlock : currentBlock.toString()
      });
    });
  }

  return (
    <div>
      <div className="AccountsLabel">
        <p className="SameLine">
          <b>Accounts</b>
        </p>
      </div>

      <div className="CurrentBlock">
        <p className="SameLine">{currentBlockText}</p>
        <a href={currentBlockLink} target="_blank" rel="noopener noreferrer">
          {props.currentBlock}
        </a>
      </div>
    </div>
  );
}

export default AccountsTableHeader;
