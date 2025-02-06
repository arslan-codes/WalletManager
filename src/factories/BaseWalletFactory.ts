import { IwalletFactory } from "../interfaces/IwalletFactory";
import { Iwallet } from "../interfaces/Iwallet";
import * as bip39 from "bip39";
// import * as bip32 from "bip32";
// import bip32 from "bip32";
const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require("bip32");
const bip32 = BIP32Factory(ecc);

abstract class BaseWalletFactory implements IwalletFactory {
  //network specification configuation
  protected constructor(protected readonly networkConfig: any) {}

  /*
   */
  abstract generateWallet(): Promise<Iwallet>;
  abstract generateWalletFromMnemonic(
    mnemonic: string,
    derivationPath: string
  ): Promise<Iwallet>;
  abstract validateWallet(wallet: Iwallet): boolean;

  //this is to encypt the private key of the wallet
  async encryptPrivateKey(privateKey: string): Promise<string> {
    return Buffer.from(privateKey).toString("base64"); // basic encryption
  }
  protected generateMnemonic(): string {
    return bip39.generateMnemonic(); //12 word menemonic
  }
  protected async generateKeyPairFromMnemonic(
    menemonic: string,
    derivationPath: string
  ): Promise<{
    privateKey: string;
    publicKey: string;
    address: string;
  }> {
    const seed = await bip39.mnemonicToSeed(menemonic); //covnert the mneomonic to seed
    const root = bip32.fromSeed(seed); //convert the seed to root
    const child = root.derivePath(derivationPath);
    return {
      privateKey: child.privateKey.toString("hex") || "",
      publicKey: child.publicKey.toString("hex"),
      address: "", // will be network specific
    };
  }
}
export default BaseWalletFactory;
