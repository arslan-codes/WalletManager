import { couldStartTrivia } from "typescript";
import BaseWalletFactory from "./BaseWalletFactory";
import { Iwallet } from "../interfaces/Iwallet";
import { ethers, Wallet } from "ethers";

class EthereumWalletFactory extends BaseWalletFactory {
  //cosntuctor to set the network configuration
  constructor(networkConfig: any) {
    super(networkConfig);
  }

  //admin generated wallet
  async generateWallet(): Promise<Iwallet> {
    const menemonic = this.generateMnemonic();
    return this.generateWalletFromMnemonic(menemonic, "m/44'/60'/0'/0/0");
  }
  //for the mnemonic someone else  will give
  async generateWalletFromMnemonic(
    mnemonic: string,
    derivationPath: string
  ): Promise<Iwallet> {
    const keyPair = await this.generateKeyPairFromMnemonic(
      mnemonic,
      derivationPath
    );
    const encryptedPrivateKey = await this.encryptPrivateKey(
      keyPair.privateKey
    );
    const Wallet = new ethers.Wallet(keyPair.privateKey);
    const address = Wallet.address;

    return {
      address: keyPair.address,
      publickey: keyPair.publicKey,
      encryptedPrivateKey,
      network: "ethereum",
      mnemonic,
      derivationPath,
    };
  }

  //validate the wallet object
  validateWallet(wallet: Iwallet): boolean {
    return ethers.isAddress(wallet.address);
  }
}
export default EthereumWalletFactory;
