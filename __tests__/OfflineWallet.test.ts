import {ethers} from 'ethers';
import {
  OfflineWallet,
  OfflineWalletFactory,
  OfflineWalletKeychainStore,
} from '../program/utils/OfflineWallet';
import Keychain from 'react-native-keychain';

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
          return {provider: provider, connected: true};
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
