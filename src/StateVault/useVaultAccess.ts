import { useContext } from 'react'
import { StateVaultContext } from './StateVaultContext'

export const useVaultAccess = <TSelected = unknown>(
  selector: (state: any) => TSelected
): TSelected => {
  const context = useContext(StateVaultContext)
  if (!context) {
    throw new Error('useVaultAccess must be used within a Provider')
  }
  if (typeof selector !== 'function') {
    throw new Error('Selector must be a function')
  }
  return selector(context.state)
}
