import { useCallback, useContext } from 'react'
import { Key } from './types'
import { StateVaultContext } from './StateVaultContext'

export const useVaultKey = (): ((
  action:
    | Key
    | ((dispatch: React.Dispatch<Key>, getState: () => any) => void)
) => void) => {
  const context = useContext(StateVaultContext)
  if (!context) {
    throw new Error('useVaultKey must be used within a Provider')
  }
  return useCallback(
    (action) => {
      if (typeof action === 'function') {
        return action(context.dispatch, () => context.state)
      }
      return context.dispatch(action)
    },
    [context]
  )
}
