import {
  Key,
  KeyCreator,
  VaultReducerFunction,
  safeDepositBoxConfig,
  safeDepositBoxReturn,
  VaultConfig,
  Vault,
  StateVaultContextType,
} from '../src/StateVault/types'

describe('StateVault Types', () => {
  it('should create a Key with a type and optional payload', () => {
    const key: Key<string> = { type: 'TEST_TYPE', payload: 'test' }
    expect(key.type).toBe('TEST_TYPE')
    expect(key.payload).toBe('test')
  })

  it('should create a KeyCreator function', () => {
    const keyCreator: KeyCreator<string> = (payload) => ({
      type: 'TEST_TYPE',
      payload,
    })
    const key = keyCreator('test')
    expect(key.type).toBe('TEST_TYPE')
    expect(key.payload).toBe('test')
  })

  it('should create a VaultReducerFunction', () => {
    const reducer: VaultReducerFunction<number> = (state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1
        default:
          return state
      }
    }
    expect(reducer(0, { type: 'INCREMENT' })).toBe(1)
    expect(reducer(1, { type: 'UNKNOWN' })).toBe(1)
  })

  it('should create a safeDepositBoxConfig', () => {
    const config: safeDepositBoxConfig<number> = {
      name: 'testBox',
      safeInitialState: 0,
      vaultReducers: {
        increment: (state) => state + 1,
      },
    }
    expect(config.name).toBe('testBox')
    expect(config.safeInitialState).toBe(0)
    expect(config.vaultReducers.increment(0, { type: 'INCREMENT' })).toBe(1)
  })

  it('should create a safeDepositBoxReturn', () => {
    const returnConfig: safeDepositBoxReturn<number> = {
      name: 'testBox',
      safeInitialState: 0,
      vaultReducer: (state) => state + 1,
      keys: {
        increment: (payload) => ({ type: 'INCREMENT', payload }),
      },
    }
    expect(returnConfig.name).toBe('testBox')
    expect(returnConfig.safeInitialState).toBe(0)
    expect(returnConfig.vaultReducer(0, { type: 'INCREMENT' })).toBe(1)
    expect(returnConfig.keys.increment().type).toBe('INCREMENT')
  })

  it('should create a VaultConfig', () => {
    const config: VaultConfig = {
      vaultReducer: {
        increment: (state) => state + 1,
      },
    }
    expect(config.vaultReducer.increment(0, { type: 'INCREMENT' })).toBe(1)
  })

  it('should create a Vault', () => {
    const vault: Vault = {
      rootVaultReducer: (state) => state + 1,
      safeInitialState: 0,
    }
    expect(vault.rootVaultReducer(0, { type: 'INCREMENT' })).toBe(1)
    expect(vault.safeInitialState).toBe(0)
  })

  it('should create a StateVaultContextType', () => {
    const context: StateVaultContextType = {
      state: { test: 'test' },
      dispatch: jest.fn(),
    }
    expect(context.state.test).toBe('test')
    context.dispatch({ type: 'TEST' })
    expect(context.dispatch).toHaveBeenCalledWith({ type: 'TEST' })
  })
})
