import { couldStartTrivia } from "typescript";
import BaseWalletFactory from "./BaseWalletFactory";
import { Iwallet } from "../interfaces/Iwallet";
import { IwalletFactory } from "../interfaces/IwalletFactory";
import { ethers } from "ethers";

class EthereumWalletFactory extends BaseWalletFactory {
  //cosntuctor to set the network configuration
  constructor(networkConfig: any) {
    super(networkConfig);
  }

  async generateWallet(): Promise<Iwallet> {
    const keyPair = await this.generateKeyPair();
    const encryptedPrivateKey = await this.encryptPrivateKey(
      keyPair.privateKey
    );
    //return the wallet object
    return {
      address: keyPair.address,
      publickey: keyPair.publicKey,
      encryptedPrivateKey,
      network: "ethereum",
    };
  }

  protected async generateKeyPair() {
    const wallet = ethers.Wallet.createRandom();
    return {
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      address: wallet.address,
    };
  }
  //validate the wallet object
  validateWallet(wallet: Iwallet): boolean {
    return ethers.isAddress(wallet.address);
  }
}
export default EthereumWalletFactory;
