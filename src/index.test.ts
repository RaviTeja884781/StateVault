import { VaultGuard, configureVault, createSafeDepositBox, createKey, useVaultKey, useVaultAccess } from './index'

describe('index.ts exports', () => {
  it('should export VaultGuard', () => {
    expect(VaultGuard).toBeDefined()
  })

  it('should export configureVault', () => {
    expect(configureVault).toBeDefined()
  })

  it('should export createSafeDepositBox', () => {
    expect(createSafeDepositBox).toBeDefined()
  })

  it('should export createKey', () => {
    expect(createKey).toBeDefined()
  })

  it('should export useVaultKey', () => {
    expect(useVaultKey).toBeDefined()
  })

  it('should export useVaultAccess', () => {
    expect(useVaultAccess).toBeDefined()
  })
})