import { IwalletFactory } from "../interfaces/IwalletFactory";
import { Iwallet } from "../interfaces/Iwallet";

abstract class BaseWalletFactory implements IwalletFactory {
  //network specification configuation
  protected constructor(networkConfig: any) {}

  /*
   */
  abstract generateWallet(): Promise<Iwallet>;
  abstract validateWallet(wallet: Iwallet): boolean;

  //this is to encypt the private key of the wallet
  async encryptPrivateKey(privateKey: string): Promise<string> {
    return Buffer.from(privateKey).toString("base64"); // basic encryption
  }

  protected abstract generateKeyPair(): Promise<{
    address: string;
    publicKey: string;
    privateKey: string;
  }>;
}

export default BaseWalletFactory;
