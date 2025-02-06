import { Iwallet } from "./Iwallet";

//this interface is used to define the wallet factory object
export interface IwalletFactory {
  //method to generate a new wallet it will retun the wallet object
  generateWallet(): Promise<Iwallet>;
  generateWalletFromMnemonic(
    mnemonic: string,
    derivationPath: string
  ): Promise<Iwallet>;

  //method to validate the wallet object it will return true if the wallet is valid
  validateWallet(wallet: Iwallet): boolean;

  //method to encrypt the private key of the wallet it will return the encrypted private key
  encryptPrivateKey(privateKey: string): Promise<string>;
}
