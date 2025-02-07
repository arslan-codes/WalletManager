// import { IwalletFactory } from "../interfaces/IwalletFactory";
// import { Iwallet } from "../interfaces/IWallet";

// import * as bip39 from "bip39";
// import { mnemonicToSeed } from "bip39";
// // import * as bip32 from "bip32";
// // import bip32 from "bip32";
// const ecc = require("tiny-secp256k1");
// const { BIP32Factory } = require("bip32");
// const bip32 = BIP32Factory(ecc);

// abstract class BaseWalletFactory implements IwalletFactory {
//   //network specification configuation
//   protected constructor(protected readonly networkConfig: any) {}
//   createWallet(): Iwallet {
//     throw new Error("Method not implemented.");
//   }

//   /*
//    */
//   abstract generateWallet(): Promise<Iwallet>;

//   abstract generateWalletFromMnemonic(
//     mnemonic: string,
//     derivationPath: string
//   ): Promise<Iwallet>;
//   abstract validateWallet(wallet: Iwallet): boolean;

//   //this is to encypt the private key of the wallet
//   async encryptPrivateKey(privateKey: string): Promise<string> {
//     return Buffer.from(privateKey).toString("base64"); // basic encryption
//   }
//   protected generateMnemonic(): string {
//     return bip39.generateMnemonic(); //12 word menemonic
//   }
//   protected async deriveKeyPairFromMnemonic(
//     mnemonic: string,
//     derivationPath: string
//   ): Promise<{
//     privateKey: string;
//     publicKey: string;
//   }> {
//     /**
//           const seed = await mnemonicToSeed(mnemonic);
// \
//       const hdNode = ethers.HDNodeWallet.fromSeed(seed);
//       const child = hdNode.derivePath(derivationPath);
//       const privateKey = child.privateKey;
//       const wallet = new ethers.Wallet(privateKey, provider);

//  */
//     const seed = await bip39.mnemonicToSeed(mnemonic);
//     const root = bip32.fromSeed(seed);
//     const child = root.derivePath(derivationPath);

//     if (!child.privateKey) {
//       throw new Error("Failed to derive private key");
//     }

//     console.log("privateKey:", child.privateKey);
//     console.log("publicKey:", child.publicKey);

//     return {
//       privateKey: child.privateKey.toString("hex"),
//       publicKey: `0x${child.publicKey.toString("hex")}`,
//     };
//   }
// }
// export default BaseWalletFactory;
