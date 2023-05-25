import { abi, contractAddress } from "./constants.js";
import { ethers } from "./ethers-5.2.esm.min.js";

const connectButton = document.getElementById("wallet-connect");
const fundButton = document.getElementById("wallet-fund");
connectButton.onclick = connect;
fundButton.onclick = fund;

async function fund() {
  const ethereum = window.ethereum;
  if (!ethereum) return;
  const ethAmmount = "0.1";
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const fundMeContract = new ethers.Contract(contractAddress, abi, signer);

  try {
    const transactionResponse = await fundMeContract.fund({
      value: ethers.utils.parseEther(ethAmmount),
    });
    await waitForTransactionToBeMined(transactionResponse, provider);
    console.log("done!");
    //listen to event
  } catch (error) {
    console.log({ error });
  }
}

async function connect() {
  const ethereum = window.ethereum;
  if (!ethereum) return;

  await ethereum.request({ method: "eth_requestAccounts" });
  const account = await ethereum.request({ method: "eth_accounts" });
  connectButton.innerHTML = account[0];
}

function waitForTransactionToBeMined(transactionResponse, provider) {
  console.log(`Minig TX: ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(`Completed with ${transactionReceipt.confirmations}`);
    });
    resolve();
  });
}
