import { Iwallet } from "../interfaces/Iwallet";
import { ethers } from "ethers";

export class EthereumWallet implements Iwallet {
  address: string;
  publickey: string;
  encryptedPrivateKey: string;
  network: string = "ethereum";
  // mnemonic: string;
  derivationPath: string;
  private wallet: ethers.Wallet;
  constructor(
    privateKey: string,
    derivationPath: string,
    encryptedPrivateKey: string
  ) {
    this.wallet = new ethers.Wallet(`0x${privateKey}`);
    this.address = this.wallet.address;
    this.publickey = this.wallet.signingKey.publicKey;
    this.encryptedPrivateKey = encryptedPrivateKey;
    this.derivationPath = derivationPath;
  }
}
