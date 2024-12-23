import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { VaultGuard } from '../src'
import { Vault } from '../src/StateVault/types'
import { StateVaultContext } from '../src/StateVault/StateVaultContext'


describe('VaultGuard', () => {
  let mockVault: Vault

  beforeEach(() => {
    mockVault = {
      rootVaultReducer: jest.fn(),
      safeInitialState: {},
    }
  })

  it('should render children when valid vault is provided', () => {
    const TestComponent = () => (
      <VaultGuard vault={mockVault}>
        <div>Child Component</div>
      </VaultGuard>
    )

    render(<TestComponent />)
    
    expect(screen.getByText('Child Component')).toBeInTheDocument()
  })

  it('should throw an error when vault is invalid', () => {
    const invalidVault = {} // Invalid vault (does not have rootVaultReducer or safeInitialState)

    const TestComponent = () => (
      <VaultGuard vault={invalidVault as unknown as Vault}>
        <div>Child Component</div>
      </VaultGuard>
    )

    expect(() => render(<TestComponent />)).toThrowError('Vault must have a rootVaultReducer function')
  })

  it('should throw an error if vault does not have rootVaultReducer function', () => {
    const invalidVault = { rootVaultReducer: undefined, safeInitialState: {} }

    const TestComponent = () => (
      <VaultGuard vault={invalidVault as unknown as Vault}>
        <div>Child Component</div>
      </VaultGuard>
    )

    expect(() => render(<TestComponent />)).toThrowError('Vault must have a rootVaultReducer function')
  })

  it('should throw an error if vault does not have safeInitialState object', () => {
    const invalidVault = { rootVaultReducer: jest.fn(), safeInitialState: null }

    const TestComponent = () => (
      <VaultGuard vault={invalidVault as Vault}>
        <div>Child Component</div>
      </VaultGuard>
    )

    expect(() => render(<TestComponent />)).toThrowError('Vault must have an safeInitialState object')
  })

  it('should provide context value to children components', () => {
    const TestComponent = () => (
      <VaultGuard vault={mockVault}>
        <StateVaultContext.Consumer>
          {(value) => {
            expect(value).toHaveProperty('state')
            expect(value).toHaveProperty('dispatch')
            return <div>Child Component</div>
          }}
        </StateVaultContext.Consumer>
      </VaultGuard>
    )

    render(<TestComponent />)
  })
})
