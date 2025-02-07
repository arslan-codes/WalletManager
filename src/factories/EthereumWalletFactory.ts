import { IwalletFactory } from "../interfaces/IwalletFactory";
import { EthereumWallet } from "../wallets/EthereumWallet";
import { HDWallet } from "../utils/hdwallet";
import { DERIVATION_PATHS } from "../constants/derivationPaths";

export class EthereumWalletFactory implements IwalletFactory {
  private hdWallet: HDWallet;
  constructor(mnemonic: string) {
    this.hdWallet = new HDWallet(mnemonic);
  }

  createWallet() {
    const derivationPath = DERIVATION_PATHS.ETH;
    const keyPair = this.hdWallet.deriveKeyPair(derivationPath);
    // Encrypt the private key (for demo, base64‑encode it)
    const encryptedPrivateKey = Buffer.from(keyPair.privateKey).toString(
      "base64"
    );
    return new EthereumWallet(
      keyPair.privateKey,
      derivationPath,
      encryptedPrivateKey
    );
  }
}
