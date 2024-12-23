import { renderHook } from '@testing-library/react-hooks'
import { useContext } from 'react'
import { StateVaultContext } from '../src/StateVault/StateVaultContext'

describe('StateVaultContext', () => {
  it('should have undefined as default value', () => {
    const { result } = renderHook(() => useContext(StateVaultContext))
    expect(result.current).toBeUndefined()
  })
})