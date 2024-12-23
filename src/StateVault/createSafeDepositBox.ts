import { Key, KeyCreators, safeDepositBoxConfig, safeDepositBoxReturn } from './types'

export const createSafeDepositBox = <S extends object>({
  name,
  safeInitialState,
  vaultReducers,
}: safeDepositBoxConfig<S>): safeDepositBoxReturn<S> => {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('Slice name must be a non-empty string')
  }
  if (typeof safeInitialState !== 'object'|| safeInitialState === null) {
    throw new Error('Initial state must be an object')
  }
  if (typeof vaultReducers !== 'object' || vaultReducers === null) {
    throw new Error('vaultReducers must be an object')
  }

  const keyCreators: KeyCreators = {}
  Object.keys(vaultReducers).forEach((type) => {
    if (typeof vaultReducers[type] !== 'function') {
      throw new Error(`vaultReducers "${type}" must be a function`)
    }
    keyCreators[type] = (payload?) => ({
      type: `${name}/${type}`,
      payload,
    })
  })

  return {
    name,
    safeInitialState,
    vaultReducer: (state: S = safeInitialState, action: Key) => {
      if (typeof action !== 'object' || action === null) {
        throw new Error('Key must be an object')
      }
      if (typeof action.type !== 'string') {
        throw new Error('Key type must be a string')
      }

      const [sliceName, actionType] = action.type.split('/')
      if (sliceName === name && vaultReducers[actionType]) {
        return vaultReducers[actionType](state, action)
      }
      return state
    },
    keys: keyCreators,
  }
}
