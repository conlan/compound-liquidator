export default { 
  tokens : [
		{		
      		"symbol" : "WETH",
      		"address" : "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      		"decimals" : 18
      	},
      	{		
      		"symbol" : "DAI",
      		"address" : "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359",
      		"decimals" : 18
      	},
      	{		
      		"symbol" : "BAT",
      		"address" : "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
      		"decimals" : 18
      	},
      	{		
      		"symbol" : "ZRX",
      		"address" : "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
      		"decimals" : 18
      	},
      	{		
      		"symbol" : "REP",
      		"address" : "0x1985365e9f78359a9B6AD760e32412f4a445E862",
      		"decimals" : 18   
      	}
  ],
  moneyMarketAddress : "0x61bbd7bd5ee2a202d7e62519750170a52a8dfd45",
  moneyMarketABI : [
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "name": "pendingAdmin",
    "inputs": [],
    "constant": true
  },
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "bool",
        "name": ""
      }
    ],
    "name": "paused",
    "inputs": [],
    "constant": true
  },
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "name": "oracle",
    "inputs": [],
    "constant": true
  },
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": "mantissa"
      }
    ],
    "name": "liquidationDiscount",
    "inputs": [],
    "constant": true
  },
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "bool",
        "name": "isSupported"
      },
      {
        "type": "uint256",
        "name": "blockNumber"
      },
      {
        "type": "address",
        "name": "interestRateModel"
      },
      {
        "type": "uint256",
        "name": "totalSupply"
      },
      {
        "type": "uint256",
        "name": "supplyRateMantissa"
      },
      {
        "type": "uint256",
        "name": "supplyIndex"
      },
      {
        "type": "uint256",
        "name": "totalBorrows"
      },
      {
        "type": "uint256",
        "name": "borrowRateMantissa"
      },
      {
        "type": "uint256",
        "name": "borrowIndex"
      }
    ],
    "name": "markets",
    "inputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "constant": true
  },
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": "mantissa"
      }
    ],
    "name": "collateralRatio",
    "inputs": [],
    "constant": true
  },
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": "principal"
      },
      {
        "type": "uint256",
        "name": "interestIndex"
      }
    ],
    "name": "supplyBalances",
    "inputs": [
      {
        "type": "address",
        "name": ""
      },
      {
        "type": "address",
        "name": ""
      }
    ],
    "constant": true
  },
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": "mantissa"
      }
    ],
    "name": "originationFee",
    "inputs": [],
    "constant": true
  },
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "name": "collateralMarkets",
    "inputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "constant": true
  },
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "name": "admin",
    "inputs": [],
    "constant": true
  },
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": "principal"
      },
      {
        "type": "uint256",
        "name": "interestIndex"
      }
    ],
    "name": "borrowBalances",
    "inputs": [
      {
        "type": "address",
        "name": ""
      },
      {
        "type": "address",
        "name": ""
      }
    ],
    "constant": true
  },
  {
    "type": "constructor",
    "stateMutability": "nonpayable",
    "payable": false,
    "inputs": []
  },
  {
    "type": "fallback",
    "stateMutability": "payable",
    "payable": true
  },
  {
    "type": "event",
    "name": "SupplyReceived",
    "inputs": [
      {
        "type": "address",
        "name": "account",
        "indexed": false
      },
      {
        "type": "address",
        "name": "asset",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "amount",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "startingBalance",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "newBalance",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SupplyWithdrawn",
    "inputs": [
      {
        "type": "address",
        "name": "account",
        "indexed": false
      },
      {
        "type": "address",
        "name": "asset",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "amount",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "startingBalance",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "newBalance",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "BorrowTaken",
    "inputs": [
      {
        "type": "address",
        "name": "account",
        "indexed": false
      },
      {
        "type": "address",
        "name": "asset",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "amount",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "startingBalance",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "borrowAmountWithFee",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "newBalance",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "BorrowRepaid",
    "inputs": [
      {
        "type": "address",
        "name": "account",
        "indexed": false
      },
      {
        "type": "address",
        "name": "asset",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "amount",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "startingBalance",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "newBalance",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "BorrowLiquidated",
    "inputs": [
      {
        "type": "address",
        "name": "targetAccount",
        "indexed": false
      },
      {
        "type": "address",
        "name": "assetBorrow",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "borrowBalanceBefore",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "borrowBalanceAccumulated",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "amountRepaid",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "borrowBalanceAfter",
        "indexed": false
      },
      {
        "type": "address",
        "name": "liquidator",
        "indexed": false
      },
      {
        "type": "address",
        "name": "assetCollateral",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "collateralBalanceBefore",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "collateralBalanceAccumulated",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "amountSeized",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "collateralBalanceAfter",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "NewPendingAdmin",
    "inputs": [
      {
        "type": "address",
        "name": "oldPendingAdmin",
        "indexed": false
      },
      {
        "type": "address",
        "name": "newPendingAdmin",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "NewAdmin",
    "inputs": [
      {
        "type": "address",
        "name": "oldAdmin",
        "indexed": false
      },
      {
        "type": "address",
        "name": "newAdmin",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "NewOracle",
    "inputs": [
      {
        "type": "address",
        "name": "oldOracle",
        "indexed": false
      },
      {
        "type": "address",
        "name": "newOracle",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SupportedMarket",
    "inputs": [
      {
        "type": "address",
        "name": "asset",
        "indexed": false
      },
      {
        "type": "address",
        "name": "interestRateModel",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "NewRiskParameters",
    "inputs": [
      {
        "type": "uint256",
        "name": "oldCollateralRatioMantissa",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "newCollateralRatioMantissa",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "oldLiquidationDiscountMantissa",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "newLiquidationDiscountMantissa",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "NewOriginationFee",
    "inputs": [
      {
        "type": "uint256",
        "name": "oldOriginationFeeMantissa",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "newOriginationFeeMantissa",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SetMarketInterestRateModel",
    "inputs": [
      {
        "type": "address",
        "name": "asset",
        "indexed": false
      },
      {
        "type": "address",
        "name": "interestRateModel",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "EquityWithdrawn",
    "inputs": [
      {
        "type": "address",
        "name": "asset",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "equityAvailableBefore",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "amount",
        "indexed": false
      },
      {
        "type": "address",
        "name": "owner",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SuspendedMarket",
    "inputs": [
      {
        "type": "address",
        "name": "asset",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SetPaused",
    "inputs": [
      {
        "type": "bool",
        "name": "newState",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Failure",
    "inputs": [
      {
        "type": "uint256",
        "name": "error",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "info",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "detail",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "getCollateralMarketsLength",
    "inputs": [],
    "constant": true
  },
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "assetPrices",
    "inputs": [
      {
        "type": "address",
        "name": "asset"
      }
    ],
    "constant": true
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "_setPendingAdmin",
    "inputs": [
      {
        "type": "address",
        "name": "newPendingAdmin"
      }
    ],
    "constant": false
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "_acceptAdmin",
    "inputs": [],
    "constant": false
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "_setOracle",
    "inputs": [
      {
        "type": "address",
        "name": "newOracle"
      }
    ],
    "constant": false
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "_setPaused",
    "inputs": [
      {
        "type": "bool",
        "name": "requestedState"
      }
    ],
    "constant": false
  },
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "int256",
        "name": ""
      }
    ],
    "name": "getAccountLiquidity",
    "inputs": [
      {
        "type": "address",
        "name": "account"
      }
    ],
    "constant": true
  },
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "getSupplyBalance",
    "inputs": [
      {
        "type": "address",
        "name": "account"
      },
      {
        "type": "address",
        "name": "asset"
      }
    ],
    "constant": true
  },
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "getBorrowBalance",
    "inputs": [
      {
        "type": "address",
        "name": "account"
      },
      {
        "type": "address",
        "name": "asset"
      }
    ],
    "constant": true
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "_supportMarket",
    "inputs": [
      {
        "type": "address",
        "name": "asset"
      },
      {
        "type": "address",
        "name": "interestRateModel"
      }
    ],
    "constant": false
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "_suspendMarket",
    "inputs": [
      {
        "type": "address",
        "name": "asset"
      }
    ],
    "constant": false
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "_setRiskParameters",
    "inputs": [
      {
        "type": "uint256",
        "name": "collateralRatioMantissa"
      },
      {
        "type": "uint256",
        "name": "liquidationDiscountMantissa"
      }
    ],
    "constant": false
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "_setOriginationFee",
    "inputs": [
      {
        "type": "uint256",
        "name": "originationFeeMantissa"
      }
    ],
    "constant": false
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "_setMarketInterestRateModel",
    "inputs": [
      {
        "type": "address",
        "name": "asset"
      },
      {
        "type": "address",
        "name": "interestRateModel"
      }
    ],
    "constant": false
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "_withdrawEquity",
    "inputs": [
      {
        "type": "address",
        "name": "asset"
      },
      {
        "type": "uint256",
        "name": "amount"
      }
    ],
    "constant": false
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "supply",
    "inputs": [
      {
        "type": "address",
        "name": "asset"
      },
      {
        "type": "uint256",
        "name": "amount"
      }
    ],
    "constant": false
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "withdraw",
    "inputs": [
      {
        "type": "address",
        "name": "asset"
      },
      {
        "type": "uint256",
        "name": "requestedAmount"
      }
    ],
    "constant": false
  },
  {
    "type": "function",
    "stateMutability": "view",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      },
      {
        "type": "uint256",
        "name": ""
      },
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "calculateAccountValues",
    "inputs": [
      {
        "type": "address",
        "name": "userAddress"
      }
    ],
    "constant": true
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "repayBorrow",
    "inputs": [
      {
        "type": "address",
        "name": "asset"
      },
      {
        "type": "uint256",
        "name": "amount"
      }
    ],
    "constant": false
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "liquidateBorrow",
    "inputs": [
      {
        "type": "address",
        "name": "targetAccount"
      },
      {
        "type": "address",
        "name": "assetBorrow"
      },
      {
        "type": "address",
        "name": "assetCollateral"
      },
      {
        "type": "uint256",
        "name": "requestedAmountClose"
      }
    ],
    "constant": false
  },
  {
    "type": "function",
    "stateMutability": "nonpayable",
    "payable": false,
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "name": "borrow",
    "inputs": [
      {
        "type": "address",
        "name": "asset"
      },
      {
        "type": "uint256",
        "name": "amount"
      }
    ],
    "constant": false
  }
]
}