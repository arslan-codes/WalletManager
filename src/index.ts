import { WalletManager } from "./WalletManager";
import * as bip39 from "bip39";

function main() {
  const masterMnemonic = bip39.generateMnemonic(); //12 word menemonic

  const walletManager = new WalletManager(masterMnemonic);

  console.log("Master Mnemonic:", masterMnemonic);
  // Create wallets for each chain
  const ethWallet = walletManager.createWallet("ETH");
  const btcWallet = walletManager.createWallet("BTC");
  const solWallet = walletManager.createWallet("SOL");

  console.log(
    "Ethereum Wallet Address:",
    ethWallet.address,
    "priv key: ",
    ethWallet.encryptedPrivateKey
  );

  console.log(
    "Bitcoin Wallet Address:",
    btcWallet.address,
    "priv key: ",
    btcWallet.encryptedPrivateKey
  );
  console.log(
    "Solana Wallet Address:",
    solWallet.address,
    "priv key: ",
    solWallet.encryptedPrivateKey
  );
}

main();
