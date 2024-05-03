ABI// Backend application repository: https://github.com/singnet/agi-faucet-lambda
import ABI from "./abi.json";

const currentNetwork = "SEPOLIA";
const contractAddress = "0xB6E2421746BF4c5d941755c6272F9f2661282F78";
const provider = new ethers.providers.Web3Provider(window.ethereum);

const networks = {
  SEPOLIA: {
    id: "0xaa36a7",
    name: "sepolia"
  }
}

const tokens = {
    agix: {
      id: 0,
      name: "AGIX",
    },
    rjv: {
      id: 1,
      name: "RJV",
    },
};

const createNotification = (tokenName, txHash) => {
    return (
      `<p>
        Success! ${tokenName} send! <br/>
        Hash: 
          <a href="https://${networks[currentNetwork].name}.etherscan.io/tx/${txHash}" target="_blank">
            ${txHash}
          </a>
      </p>`
    );
};

const validateNetworkId = async () => {
  const chainId = await provider.send("eth_chainId");

  if (chainId !== networks[currentNetwork].id) {
    await provider.send(
      'wallet_switchEthereumChain',
      [{ chainId: networks[currentNetwork].id }], // chainId must be in hexadecimal numbers
    );
  }
}

window.connect = async () => {
    const connectButton = document.querySelector("#connect");
    const accountBlock = document.querySelector("#account");

    await validateNetworkId();

    const account = await provider.send("eth_requestAccounts", []);
    const signerAddress = await provider.getSigner().getAddress();

    console.log("accounts", account);
    console.log("Signer address", signerAddress);

    accountBlock.innerHTML = signerAddress;
    connectButton.innerHTML = "CONNECTED";
};

window.onload = async function () {
    if (location.search !== "") {
        document.getElementById("control").style.display = "block";
    }
};

window.requestTokens = async () => {
    let token;
    const radioButtons = document.getElementsByName("tokensRadio");
    const notificationBlock = document.querySelector("#notification");
    const errorBlock = document.querySelector("#error");

    notificationBlock.style.display = "none";
    errorBlock.style.display = "none";

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
        contractAddress,
        ABI,
        signer
    );

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            token = radioButtons[i].value;
        }
    }

    console.log("Selected token", token);

    try {
      await validateNetworkId();
      const currentToken = tokens[token];
      const tx = await contract.requestTokens(currentToken.id);
      notificationBlock.style.display = "block";
      notificationBlock.innerHTML = createNotification(currentToken.name, tx.hash);
    } catch (error) {
      errorBlock.style.display = "block";
      errorBlock.innerHTML = `<p>${error.message} <br> Please, try again</p>`;
  }
};
