import { Iwallet } from "./interfaces/Iwallet";

import { IwalletFactory } from "./interfaces/IwalletFactory";
import { EthereumWalletFactory } from "./factories/EthereumWalletFactory";
import { BitcoinWalletFactory } from "./factories/BitcoinWalletFactory";
import { SolanaWalletFactory } from "./factories/SolanaWalletFactory";

export class WalletManager {
  private factories: Map<string, IwalletFactory>;
  private wallets: Map<string, Iwallet>;
  private masterMnemonic: string;

  constructor(mnemonic: string) {
    this.masterMnemonic = mnemonic;
    this.factories = new Map();
    this.wallets = new Map();

    // Register factories for each chain
    this.factories.set("ETH", new EthereumWalletFactory(this.masterMnemonic));
    this.factories.set("BTC", new BitcoinWalletFactory(this.masterMnemonic));
    this.factories.set("SOL", new SolanaWalletFactory(this.masterMnemonic));
  }

  createWallet(chain: string): Iwallet {
    const factory = this.factories.get(chain);
    if (!factory) {
      throw new Error(`Unsupported chain: ${chain}`);
    }
    const wallet = factory.createWallet();
    this.wallets.set(chain, wallet);
    return wallet;
  }

  getWallet(chain: string): Iwallet {
    if (this.wallets.has(chain)) {
      return this.wallets.get(chain)!;
    } else {
      return this.createWallet(chain);
    }
  }
}
