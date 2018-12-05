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
		"constant": true,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			},
			{
				"name": "asset",
				"type": "address"
			}
		],
		"name": "getBorrowBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "asset",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "borrow",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "asset",
				"type": "address"
			}
		],
		"name": "assetPrices",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			}
		],
		"name": "calculateAccountValues",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "asset",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "repayBorrow",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "collateralRatio",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			},
			{
				"name": "asset",
				"type": "address"
			}
		],
		"name": "getSupplyBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "collateralMarkets",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "asset",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "supply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "asset",
				"type": "address"
			},
			{
				"name": "requestedAmount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
}