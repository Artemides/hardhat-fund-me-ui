const connect = async () => {
  const ethereum = window.ethereum;
  if (!ethereum) return;

  await ethereum.request({ method: "eth_requestAccounts" });
  const account = await ethereum.request({ method: "eth_accounts" });
  document.getElementById("wallet-connect").innerHTML = account[0];
};
