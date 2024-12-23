import { Reducer } from 'react'

type Key<T = any> = {
  type: string
  payload?: T
}
type KeyCreator<T = any> = (payload?: T) => Key<T>

type KeyCreators = {
  [key: string]: KeyCreator
}

type VaultReducerFunction<S = any> = (state: S, action: Key) => S

type VaultReducers<S = any> = {
  [key: string]: VaultReducerFunction<S>
}

interface safeDepositBoxConfig<S = any> {
  name: string
  safeInitialState: S
  vaultReducers: VaultReducers<S>
}

interface safeDepositBoxReturn<S = any> {
  name: string
  safeInitialState: S
  vaultReducer: VaultReducerFunction<S>
  keys: KeyCreators
}

interface VaultConfig {
  vaultReducer: {
    [key: string]: VaultReducerFunction
  }
}

interface Vault {
  rootVaultReducer: Reducer<any, Key>
  safeInitialState: any
}

interface StateVaultContextType {
  state: any
  dispatch: React.Dispatch<Key>
}

export type {
  Key,
  KeyCreator,
  KeyCreators,
  VaultReducerFunction,
  VaultReducers,
  safeDepositBoxConfig,
  safeDepositBoxReturn,
  VaultConfig,
  Vault,
  StateVaultContextType,
}
