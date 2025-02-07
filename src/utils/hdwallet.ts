import * as bip39 from "bip39";
import { BIP32Factory } from "bip32";
const ecc = require("tiny-secp256k1");
const bip32 = BIP32Factory(ecc);

export class HDWallet {
  mnemonic: string;
  constructor(mnemonic: string) {
    this.mnemonic = mnemonic;
  }

  deriveKeyPair(path: string): { privateKey: string; publicKey: string } {
    const seed = bip39.mnemonicToSeedSync(this.mnemonic);
    const root = bip32.fromSeed(seed);
    const child = root.derivePath(path);
    if (!child.privateKey) {
      throw new Error("faild to derive private key");
    }
    return {
      privateKey: Buffer.from(child.privateKey).toString("hex"),
      publicKey: ecc.pointFromScalar(child.privateKey, true).toString("hex"),
    };
  }
}
