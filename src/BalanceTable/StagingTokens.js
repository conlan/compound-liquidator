export default { 
  tokens : [
		{		
      		"symbol" : "WETH",
      		"address" : "0xc778417e063141139fce010982780140aa0cd5ab",
      		"decimals" : 18
      	},
      	{		
      		"symbol" : "DAI",
      		"address" : "0x4e17c87c52d0e9a0cad3fbc53b77d9514f003807",
      		"decimals" : 18
      	},
      	{		
      		"symbol" : "BAT",
      		"address" : "0xbf7bbeef6c56e53f79de37ee9ef5b111335bd2ab",
      		"decimals" : 18
      	},
      	{		
      		"symbol" : "ZRX",
      		"address" : "0x8de2f821bc97979b7171e7a6fe065b9e17f73b87",
      		"decimals" : 18
      	},
      	{		
      		"symbol" : "REP",
      		"address" : "0x930b647320f738d92f5647b2e5c4458497ce3c95",
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