import WalletManager from "./WalletManager";
import EthereumWalletFactory from "./factories/EthereumWalletFactory";

async function main() {
  const walletManager = new WalletManager();
  const ethFactory = new EthereumWalletFactory({});
  walletManager.registerFactory("ethereum", ethFactory);

  try {
    const ethWallet = await walletManager.createWallet("ethereum");
    console.log("created ethereum wallet ", ethWallet);
  } catch (error) {
    console.error("Error creating wallet", error);
  }
}

main();
