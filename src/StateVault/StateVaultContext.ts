import { createContext } from 'react'
import { StateVaultContextType } from './types'

export const StateVaultContext = createContext<
  StateVaultContextType | undefined
>(undefined)
