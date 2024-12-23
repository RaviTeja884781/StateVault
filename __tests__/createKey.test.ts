import { createKey } from '../src/StateVault/createKey';

describe('createKey', () => {
  it('should create a key with the specified type', () => {
    const type = 'TEST_TYPE';
    const key = createKey(type);
    expect(key()).toEqual({ type, payload: undefined });
  });

  it('should create a key with the specified type and payload', () => {
    const type = 'TEST_TYPE';
    const payload = { data: 'test' };
    const key = createKey<typeof payload>(type);
    expect(key(payload)).toEqual({ type, payload });
  });

  it('should throw an error if type is not a string', () => {
    expect(() => createKey(123 as any)).toThrow('Key type must be a non-empty string');
  });

  it('should throw an error if type is an empty string', () => {
    expect(() => createKey('')).toThrow('Key type must be a non-empty string');
  });

  it('should throw an error if type is a string with only spaces', () => {
    expect(() => createKey('   ')).toThrow('Key type must be a non-empty string');
  });
});