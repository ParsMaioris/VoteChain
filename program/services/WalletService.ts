import {ethers} from 'ethers';
import * as Keychain from 'react-native-keychain';

class OfflineWallet {
  private offlineEthersWallet: ethers.Wallet;

  constructor(ethersWallet: ethers.Wallet) {
    this.offlineEthersWallet = ethersWallet;
  }

  get privateKey(): string {
    return this.offlineEthersWallet.privateKey;
  }

  get address(): string {
    return this.offlineEthersWallet.address;
  }

  connect(provider: ethers.Provider): ethers.Wallet {
    return this.offlineEthersWallet.connect(provider);
  }
}

class OfflineWalletFactory {
  static create(): OfflineWallet {
    const randomHDNodeWallet = ethers.Wallet.createRandom();
    const randomEthersWallet = new ethers.Wallet(randomHDNodeWallet.privateKey);
    return new OfflineWallet(randomEthersWallet);
  }
}

class OfflineWalletKeychainStore {
  static async save(wallet: OfflineWallet): Promise<void> {
    try {
      await Keychain.setGenericPassword('wallet', wallet.privateKey);
    } catch (error) {
      console.error('Error saving wallet to keychain:', error);
    }
  }

  static async load(): Promise<OfflineWallet | null> {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const ethersWallet = new ethers.Wallet(credentials.password);
        return new OfflineWallet(ethersWallet);
      }
      return null;
    } catch (error) {
      console.error('Error loading wallet from keychain:', error);
      return null;
    }
  }
}

export {OfflineWallet, OfflineWalletFactory, OfflineWalletKeychainStore};
