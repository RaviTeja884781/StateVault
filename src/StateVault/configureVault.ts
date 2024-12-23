import { Reducer } from 'react';
import { Key, Vault, VaultConfig } from './types';

export const configureVault = ({ vaultReducer }: VaultConfig): Vault => {
  if (typeof vaultReducer !== 'object' || vaultReducer === null) {
    throw new Error('Reducer must be an object');
  }

  const rootVaultReducer: Reducer<any, Key> = (state = {}, action) => {
    if (typeof action !== 'object' || action === null) {
      throw new Error('Key must be an object');
    }
    if (typeof action.type !== 'string') {
      throw new Error('Key type must be a string');
    }

    const newState: { [key: string]: any } = {};
    let hasChanged = false;

    Object.entries(vaultReducer).forEach(([key, sliceReducer]) => {
      if (typeof sliceReducer !== 'function') {
        throw new Error(`Reducer for "${key}" must be a function`);
      }
      const previousStateForKey = state[key];
      const nextStateForKey = sliceReducer(previousStateForKey, action);
      newState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    });

    return hasChanged ? newState : state;
  };

  const safeInitialState = Object.entries(vaultReducer).reduce<{ [key: string]: any }>(
    (acc, [key, sliceReducer]) => {
      if (typeof sliceReducer !== 'function') {
        throw new Error(`Reducer for "${key}" must be a function`);
      }
      acc[key] = sliceReducer(undefined, { type: '@@INIT' });
      return acc;
    },
    {}
  );

  return { rootVaultReducer, safeInitialState };
};
