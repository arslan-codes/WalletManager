import { IwalletFactory } from "../interfaces/IwalletFactory";
import { BitcoinWallet } from "../wallets/BitcoinWallets";
import { HDWallet } from "../utils/hdwallet";
import { DERIVATION_PATHS } from "../constants/derivationPaths";

export class BitcoinWalletFactory implements IwalletFactory {
  private hdWallet: HDWallet;
  constructor(mnemonic: string) {
    this.hdWallet = new HDWallet(mnemonic);
  }

  createWallet() {
    const derivationPath = DERIVATION_PATHS.BTC;
    const keyPair = this.hdWallet.deriveKeyPair(derivationPath);
    const encryptedPrivateKey = Buffer.from(keyPair.privateKey).toString(
      "base64"
    );
    return new BitcoinWallet(
      keyPair.privateKey,
      derivationPath,
      encryptedPrivateKey
    );
  }
}
