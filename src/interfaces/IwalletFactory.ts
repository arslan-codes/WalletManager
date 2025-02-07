import { Iwallet } from "./Iwallet";

//this interface is used to define the wallet factory object
export interface IwalletFactory {
  //method to generate a new wallet it will retun the wallet object
  createWallet(): Iwallet;
  //each chain will generate wallet using its derivation path
}
