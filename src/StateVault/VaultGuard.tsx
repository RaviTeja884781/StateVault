import * as React from 'react'
import { useReducer, useMemo, ReactNode } from 'react'
import { StateVaultContext } from './StateVaultContext'
import { Vault } from './types'

interface VaultGuardProps {
  children: ReactNode
  vault: Vault
}

export const VaultGuard: React.FC<VaultGuardProps> = ({
  children,
  vault,
}: VaultGuardProps): JSX.Element => {
  if (!vault || typeof vault !== 'object') {
    throw new Error('Invalid vault provided to VaultGuard')
  }
  if (typeof vault.rootVaultReducer !== 'function') {
    throw new Error('Vault must have a rootVaultReducer function')
  }
  if (typeof vault.safeInitialState !== 'object' || vault.safeInitialState === null) {
    throw new Error('Vault must have an safeInitialState object')
  }

  const [state, dispatch] = useReducer(vault.rootVaultReducer, vault.safeInitialState)

  const value = useMemo(() => {
    return { state, dispatch }
  }, [state])

  return (
    <StateVaultContext.Provider value={value}>
      {children}
    </StateVaultContext.Provider>
  )
}
