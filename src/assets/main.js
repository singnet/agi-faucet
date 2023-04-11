// Backend application repository: https://github.com/singnet/agi-faucet-lambda
const abi = JSON.parse('[{"inputs":[{"internalType":"address","name":"_agixTokenAddress","type":"address"},{"internalType":"address","name":"_rejuveTokenAddress","type":"address"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Distribution","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawal","type":"event"},{"inputs":[],"name":"agixToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"agixWithdrawalAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"agixBalance","type":"uint256"},{"internalType":"uint256","name":"rejuveBalance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rejuveToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rejuveWithdrawalAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_tokenId","type":"uint8"}],"name":"requestTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setLockTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setWithdrawalAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]');

window.connect = async() => {
  const button = document.getElementById("connect");
  const showAccount = document.querySelector('.showAccount');

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  account = await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner().getAddress();

  console.log(signer);
  showAccount.innerHTML = signer;
  button.innerHTML = "CONNECTED";
}

window.onload = async function () {
  if (location.search !== "") {
    document.getElementById("control").style.display = "block"
  }
}

window.requsetTokens = async() => {
  const notification = document.getElementById("notification");
  const error = document.getElementById("error");

  notification.style.display = "none";
  error.style.display = "none";

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log('get provider');
  const signer = await provider.getSigner();
  console.log('get signer');
  const contract = new ethers.Contract('0x19570fbC4e05940960b0A44C5f771008Af7935A2', abi, signer);
  console.log('get contract');

  const radio = document.getElementsByName('radio');
  let token;
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      token = radio[i].value;
    }
  }
  console.log(token);

  if (token === 'agix') {
    try {
      tx = await contract.requestTokens(0);
      notification.style.display = "block";
      notification.innerHTML = `<p>Success AGIX send! <br />Hash: <a href="https://goerli.etherscan.io/tx/${tx.hash}" target="_blank">${tx.hash}</a></p>`;
    } catch(err) {
      error.style.display = "block";
      error.innerHTML = `<p>${err.message} Try again</p>`;
    }
  } else {
    try {
      tx = await contract.requestTokens(1);
      notification.style.display = "block";
      notification.innerHTML = `<p>Success RJV send! <br />Hash: <a href="https://goerli.etherscan.io/tx/${tx.hash}" target="_blank">${tx.hash}</a></p>`;
    } catch(err) {
      error.style.display = "block";
      error.innerHTML = `<p>${err.message} Try again</p>`;
    }
  }
}

function sendRequest(network) {
  const button = document.getElementById("button"),
    address = document.getElementById("input"),
    error = document.getElementById("error"),
    notification = document.getElementById("notification")

  error.style.display = "none"
  notification.style.display = "none"
  button.setAttribute("disabled", "disabled")

  if (address.value !== "" && address.value.length === 42) {
    button.innerText = "Loading.."

    try {
      const xhr = new XMLHttpRequest()
      xhr.open("POST", `${backendUrl}/agi`)

      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {

            const response = JSON.parse(xhr.response).result,
              txHash = response.transactionHash || ""

            const etherscanURI = network === 'mainnet' ? `etherscan.io` : `${network}.etherscan.io`
            notification.style.display = "block"
            notification.style.wordWrap = "break-word"
            notification.style.overflowWrap = "break-word"
            notification.innerHTML = `<p>Success! <br /> Tx Hash: <a href="https://${etherscanURI}/tx/${txHash}" target="_blank">${txHash}</a></p>`

          } else {
            const reason = JSON.parse(xhr.response)

            error.style.display = "block"
            error.innerHTML = "Something went wrong! Reason: " + (reason.error && reason.error.message ||  reason.error && reason.error.error_description || reason.message)
          }

          button.innerText = "Submit"
          button.removeAttribute("disabled")
        }
      }
      xhr.send(JSON.stringify({
        network,
        code: location.search.split("=")[1],
        address: address.value
      }))
    } catch (e) {
      error.style.display = "block"
      button.removeAttribute("disabled")
      error.innerHTML = "Error"
      console.log(e)
    }
  } else {
    error.style.display = "block"
    button.removeAttribute("disabled")
    error.innerHTML = "Insert a valid address"
  }
}
