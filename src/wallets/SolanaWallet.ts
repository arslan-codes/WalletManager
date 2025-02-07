import { Iwallet } from "../interfaces/Iwallet";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import * as bip39 from "bip39";

export class SolanaWallet implements Iwallet {
  address: string;
  publickey: string;
  encryptedPrivateKey: string;
  network: string = "solana";
  derivationPath: string;
  private keypair: Keypair;

  constructor(
    mnemonic: string,
    derivationPath: string,
    encryptedPrivateKey: string
  ) {
    // Derive using ed25519-hd-key
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const derived = derivePath(derivationPath, seed.toString("hex"));
    const privateKeyBuffer = derived.key;
    this.keypair = Keypair.fromSeed(privateKeyBuffer);
    this.address = this.keypair.publicKey.toBase58();
    this.publickey = this.keypair.publicKey.toBase58();
    this.encryptedPrivateKey = encryptedPrivateKey;
    this.derivationPath = derivationPath;
  }
}
