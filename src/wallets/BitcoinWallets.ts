import { Iwallet } from "../interfaces/Iwallet";
import * as bitcoin from "bitcoinjs-lib";
import * as ecc from "tiny-secp256k1";
import { ECPairFactory } from "ecpair";

const ECPair = ECPairFactory(ecc);

export class BitcoinWallet implements Iwallet {
  address: string;
  publickey: string;
  encryptedPrivateKey: string;
  network: string = "bitcoin";
  derivationPath: string;
  private privateKey: string;

  constructor(
    privateKey: string,
    derivationPath: string,
    encryptedPrivateKey: string
  ) {
    this.privateKey = privateKey;

    // Ensure the private key is a valid 32-byte buffer
    const privateKeyBuffer = Buffer.from(this.privateKey, "hex");
    if (privateKeyBuffer.length !== 32) {
      throw new Error("Invalid private key length. Must be 32 bytes.");
    }

    const keyPair = ECPair.fromPrivateKey(privateKeyBuffer);
    this.publickey = Buffer.from(keyPair.publicKey).toString("hex");

    const { address } = bitcoin.payments.p2pkh({
      pubkey: Buffer.from(keyPair.publicKey),
    });
    if (!address) {
      throw new Error("Failed to derive address");
    }

    this.address = address;
    this.encryptedPrivateKey = encryptedPrivateKey;
    this.derivationPath = derivationPath;
  }
}
