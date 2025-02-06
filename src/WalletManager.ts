import { Iwallet } from "./interfaces/Iwallet";
import { IwalletFactory } from "./interfaces/IwalletFactory";

/*

Manages multiple wallet factories (e.g., Ethereum, Binance).
Allows registering new factories and creating/validating wallets.
*/

class WalletManager {
  public factories: Map<string, IwalletFactory>;

  constructor() {
    this.factories = new Map();
  }

  registerFactory(network: string, factory: IwalletFactory) {
    this.factories.set(network, factory);
  }

  async createWallet(network: string): Promise<Iwallet> {
    const factory = this.factories.get(network);
    if (!factory) {
      throw new Error(`No Factory registered for  network ${network}`);
    }
    return factory.generateWallet();
  }
}

export default WalletManager;
