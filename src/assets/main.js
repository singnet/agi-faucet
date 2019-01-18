// Backend application repository: https://github.com/singnet/agi-faucet-lambda
const { backendUrl } = require("./../../config.json")

window.onload = function () {
  if (location.search !== "") {
    document.getElementById("control").style.display = "block"
  } else {
    document.getElementById("login").style.display = "block"
    document.getElementById("subtitle").style.display = "block"
  }
}

window.githubLogin = () => {
  const xhr = new XMLHttpRequest()
  xhr.open("GET", backendUrl + "/appId")
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        window.location.href = "https://github.com/login/oauth/authorize?client_id=" + JSON.parse(xhr.response).clientId
      } else {
        const error = document.getElementById("error")

        error.style.display = "block"
        error.innerText = "Something went wrong! Reason: " + xhr.responseText
      }
    }
  }
  xhr.send()
}

window.sendAGI = () => {
  const radio = document.getElementsByName('radio');
  let network;
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      network = radio[i].value;
    }
  }

  sendRequest(network)
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
            notification.innerHTML = `<p>Success! <br /> Tx Hash: <a href="https://${etherscanURI}/tx/${txHash}" target="_blank">${txHash}</a></p>`

          } else {
            const reason = JSON.parse(xhr.response)

            error.style.display = "block"
            error.innerHTML = "Something went wrong! Reason: " + (reason.error && reason.error.message || reason.message || reason.error && reason.error.error_description)
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
