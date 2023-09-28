let web3;
let web3Modal;

async function initWeb3Modal() {
    const providerOptions = {
        // You can add other providers here if needed
    };

    web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true, 
        providerOptions
    });
}

async function connect() {
    const provider = await web3Modal.connect();
    web3 = new Web3(provider);
    updateUI();
}

async function updateUI() {
    const accounts = await web3.eth.getAccounts();
    document.getElementById("account").innerText = `Connected account: ${accounts[0]}`;
}

// Initialize web3Modal
initWeb3Modal();
