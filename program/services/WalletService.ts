type Address = string;
type PrivateKey = string;

const mockAddresses: Address[] = [
  '0x3cB1...d0Ae3',
  '0x7fB1...e4Bc6',
  '0x1aF4...9bFf2',
];

const mockPrivateKeys: Record<Address, PrivateKey> = {
  '0x3cB1...d0Ae3': '0x9aFb...c1Df2',
  '0x7fB1...e4Bc6': '0x7eEd...b9Cf4',
  '0x1aF4...9bFf2': '0x4cCd...a8Ef3',
};

let addressIndex = 0;

export const generateNewAddress = (): Address => {
  const newAddress = mockAddresses[addressIndex % mockAddresses.length];
  addressIndex++;
  return newAddress;
};

export const getCurrentAddress = (): Address => {
  return mockAddresses[0];
};

export const getPrivateKey = (
  address: Address,
): PrivateKey | 'Unknown Address' => {
  return mockPrivateKeys[address] || 'Unknown Address';
};
