import React from "react";

import { useWeb3Context } from "web3-react/hooks";

let app;

function AccountsTableHeader(props) {
  app = props.app;

  var currentBlockText = ""
  var currentBlockLink = "https://etherscan.io/block/" + props.currentBlock;

  if (props.currentBlock.length > 0) {
    currentBlockText = "Current Block: ";
  } else {
    var web3 = useWeb3Context();

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
        <a href={currentBlockLink} target="_blank">
          {props.currentBlock}
        </a>
      </div>
    </div>
  );
}

export default AccountsTableHeader;
