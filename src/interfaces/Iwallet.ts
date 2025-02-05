//this interface is used to define the wallet object

export interface Iwallet {
  address: string; // the address of the wallet
  publickey: string;
  encryptedPrivateKey: string; //encrypted private key of the wallet
  network: string; // the network of this wallet
}

// to havea consistent structure
//  for wallet objects across the system.
