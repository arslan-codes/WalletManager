import { IwalletFactory } from "../interfaces/IwalletFactory";

import { SolanaWallet } from "../wallets/SolanaWallet";
import { DERIVATION_PATHS } from "../constants/derivationPaths";

export class SolanaWalletFactory implements IwalletFactory {
  private mnemonic: string;
  constructor(mnemonic: string) {
    this.mnemonic = mnemonic;
  }

  createWallet() {
    const derivationPath = DERIVATION_PATHS.SOL;

    const encryptedPrivateKey = Buffer.from(this.mnemonic).toString("base64");
    return new SolanaWallet(this.mnemonic, derivationPath, encryptedPrivateKey);
  }
}
