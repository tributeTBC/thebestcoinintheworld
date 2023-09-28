let web3;
let userAccount;

const DAI_CONTRACT_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f';  // Example address, you should replace with your desired token's address.
const DAI_ABI = [  // Abbreviated ABI. Only includes necessary parts for fetching balance.
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "type": "function"
    }
];
function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        window.ethereum.enable().then(accounts => {
            fetchNetwork();
        });
    } else {
        alert('MetaMask not detected. Please install it first.');
    }
}

function fetchNetwork() {
    web3.eth.net.getNetworkType().then(networkType => {
        document.getElementById('networkName').textContent = networkType.charAt(0).toUpperCase() + networkType.slice(1); // Capitalize the first letter
    });
}


function fetchDAIBalance() {
    if (web3 && userAccount) {
        const daiToken = new web3.eth.Contract(DAI_ABI, DAI_CONTRACT_ADDRESS);
        daiToken.methods.balanceOf(userAccount).call().then(balance => {
            document.getElementById('daiBalance').textContent = web3.utils.fromWei(balance) + ' DAI';
        });
    }
}
