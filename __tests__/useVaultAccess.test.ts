import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { StateVaultContext } from '../src/context/StateVaultContext' 
import { useVaultAccess } from '../src'

describe('useVaultAccess Hook', () => {
  it('should throw an error if used outside of a Provider', () => {
    const { result } = renderHook(() => useVaultAccess(() => null))
    expect(result.error).toEqual(
      new Error('useVaultAccess must be used within a Provider')
    )
  })

  it('should throw an error if the selector is not a function', () => {
    const wrapper = ({ children }) => (
      <StateVaultContext.Provider value={{ state: {}, dispatch: () => {} }}>
        {children}
      </StateVaultContext.Provider>
    )

    const { result } = renderHook(
      () => useVaultAccess(null as unknown as (state: any) => any),
      { wrapper }
    )
    expect(result.error).toEqual(new Error('Selector must be a function'))
  })

  it('should return the selected state when a valid selector is used', () => {
    const mockState = { key: 'value', count: 10 }
    const wrapper = ({ children }: any) => (
      <StateVaultContext.Provider value={{ state: mockState }}>
        {children}
      </StateVaultContext.Provider>
    )

    const { result } = renderHook(() => useVaultAccess((state) => state.key), {
      wrapper,
    })
    expect(result.current).toBe('value')
  })

  it('should return the selected state using a complex selector', () => {
    const mockState = { key: 'value', count: 10 }
    const wrapper = ({ children }: any) => (
      <StateVaultContext.Provider value={{ state: mockState }}>
        {children}
      </StateVaultContext.Provider>
    )

    const { result } = renderHook(
      () => useVaultAccess((state) => state.count + 1),
      { wrapper }
    )
    expect(result.current).toBe(11)
  })
})
