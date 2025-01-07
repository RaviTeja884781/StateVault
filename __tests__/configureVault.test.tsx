import { configureVault } from '../src/StateVault/configureVault';
import { Reducer } from 'react';
import { VaultConfig } from '../src/StateVault/types';

describe('configureVault', () => {
  it('should throw an error if vaultReducer is not an object', () => {
    expect(() => configureVault({ vaultReducer: null as any })).toThrow('Reducer must be an object');
    expect(() => configureVault({ vaultReducer: 'not an object' as any })).toThrow('Reducer must be an object');
  });

  it('should return a vault with rootVaultReducer and safeInitialState', () => {
    const mockReducer: Reducer<any, any> = (state = {}, _action) => state;
    const vaultConfig: VaultConfig = {
      vaultReducer: {
        test: mockReducer,
      },
    };

    const vault = configureVault(vaultConfig);

    expect(vault).toHaveProperty('rootVaultReducer');
    expect(vault).toHaveProperty('safeInitialState');
    expect(vault.safeInitialState).toHaveProperty('test');
  });

  it('rootVaultReducer should throw an error if action is not an object', () => {
    const mockReducer: Reducer<any, any> = (state = {}) => state;
    const vaultConfig: VaultConfig = {
      vaultReducer: {
        test: mockReducer,
      },
    };

    const { rootVaultReducer } = configureVault(vaultConfig);

    expect(() => rootVaultReducer({}, null as any)).toThrow('Key must be an object');
  });

  it('rootVaultReducer should throw an error if action type is not a string', () => {
    const mockReducer: Reducer<any, any> = (state = {}) => state;
    const vaultConfig: VaultConfig = {
      vaultReducer: {
        test: mockReducer,
      },
    };

    const { rootVaultReducer } = configureVault(vaultConfig);

    expect(() => rootVaultReducer({}, { type: null } as any)).toThrow('Key type must be a string');
  });

  it('rootVaultReducer should call slice reducers and update state accordingly', () => {
    const mockReducer: Reducer<any, any> = (state = 0, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
        default:
          return state;
      }
    };
    const vaultConfig: VaultConfig = {
      vaultReducer: {
        counter: mockReducer,
      },
    };

    const { rootVaultReducer } = configureVault(vaultConfig);

    const initialState = { counter: 0 };
    const action = { type: 'INCREMENT' };
    const newState = rootVaultReducer(initialState, action);

    expect(newState.counter).toBe(1);
  });

  it('safeInitialState should initialize state using slice reducers', () => {
    const mockReducer: Reducer<any, any> = (state = 0) => state;
    const vaultConfig: VaultConfig = {
      vaultReducer: {
        counter: mockReducer,
      },
    };

    const { safeInitialState } = configureVault(vaultConfig);

    expect(safeInitialState.counter).toBe(0);
  });
});