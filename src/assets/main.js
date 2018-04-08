const BASE_URI = "https://tlniidpl87.execute-api.eu-west-1.amazonaws.com/production"

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
  xhr.open("GET", BASE_URI + "/appId")
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
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

window.sendRequest = () => {
  const button = document.getElementById("button"),
        address = document.getElementById("input"),
        error = document.getElementById("error"),
        notification = document.getElementById("notification")

  error.style.display = "none"
  notification.style.display = "none"
  button.setAttribute("disabled", "disabled")

  if (address.value !== "" && address.value.length === 42) {
    button.innerText = "Loading.."

    const xhr = new XMLHttpRequest()
    xhr.open("POST", `${BASE_URI}/agi/${location.search.split("=")[1]}/${address.value}`)
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.response).result,
                txHash = response.transactionHash || ""

          notification.style.display = "block"
          notification.innerHTML = `<p>Success! <br /> Tx Hash: <a href="https://kovan.etherscan.io/tx/${txHash}" target="_blank">${txHash}</a></p>`
        } else {
          const reason = JSON.parse(xhr.response)

          error.style.display = "block"
          error.innerHTML = "Something went wrong! Reason: " + (reason.message || reason.error_description)
        }

        button.innerText = "Submit"
        button.removeAttribute("disabled")
      }
    }
    xhr.send()
  } else {
    error.style.display = "block"
    button.removeAttribute("disabled")
    error.innerHTML = "Insert a valid address"
  }
}
