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

  connect(provider: ethers.providers.Provider): ethers.Wallet {
    return this.offlineEthersWallet.connect(provider);
  }
}

class OfflineWalletFactory {
  static create(): OfflineWallet {
    const randomEthersWallet = ethers.Wallet.createRandom();
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

jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn(),
}));

describe('Wallet Integration with Keychain', () => {
  beforeEach(() => {
    (Keychain.setGenericPassword as jest.Mock).mockReset();
    (Keychain.getGenericPassword as jest.Mock).mockReset();
  });

  it('should preserve the private key when a wallet is saved and then retrieved', async () => {
    const newWallet = OfflineWalletFactory.create();
    mockKeychainToStoreAndRetrieveWallet(newWallet);

    await OfflineWalletKeychainStore.save(newWallet);
    const retrievedWallet = await OfflineWalletKeychainStore.load();

    expect(retrievedWallet?.privateKey).toEqual(newWallet.privateKey);
  });

  function mockKeychainToStoreAndRetrieveWallet(wallet: OfflineWallet) {
    (Keychain.setGenericPassword as jest.Mock).mockImplementation(() =>
      Promise.resolve(true),
    );
    (Keychain.getGenericPassword as jest.Mock).mockImplementation(() =>
      Promise.resolve({password: wallet.privateKey}),
    );
  }
});

jest.mock('ethers', () => {
  const originalModule = jest.requireActual('ethers');
  const privateKey = '0x' + Math.random().toString(36).substring(7);
  return {
    ...originalModule,
    Wallet: jest.fn().mockImplementation(() => {
      return {
        connect: jest.fn().mockImplementation(provider => {
          return {provider: provider, connected: true}; // Simulating a connected wallet
        }),
        privateKey: privateKey,
        address: 'mockAddress',
      };
    }),
  };
});

describe('EthereumWallet', () => {
  let mockProvider: ethers.providers.JsonRpcProvider;

  beforeEach(() => {
    mockProvider = new ethers.providers.JsonRpcProvider(
      'http://mockprovider.com',
    );
  });

  it('should connect to the provided Ethereum network provider', async () => {
    const wallet = OfflineWalletFactory.create();
    const connectedWallet = wallet.connect(mockProvider);

    expect(connectedWallet.provider).toBe(mockProvider);
  });
});

export {OfflineWallet, OfflineWalletFactory, OfflineWalletKeychainStore};
