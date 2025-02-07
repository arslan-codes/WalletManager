export interface IwalletMapping {
  mnemonic: string;
  addresses: {
    ETH: string;
    BTC: string;
    SOL: string;
    // more chains will be aadded here  needed
  };
}
