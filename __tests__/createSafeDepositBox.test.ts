import { createSafeDepositBox } from '../src/StateVault/createSafeDepositBox';

describe('createSafeDepositBox', () => {
  it('should create a safe deposit box with the specified configuration', () => {
    const name = 'testSlice';
    const safeInitialState = { count: 0 };
    const vaultReducers = {
      increment: (state: any) => ({ ...state, count: state.count + 1 }),
    };

    const safeDepositBox = createSafeDepositBox({ name, safeInitialState, vaultReducers });

    expect(safeDepositBox.name).toBe(name);
    expect(safeDepositBox.safeInitialState).toEqual(safeInitialState);
    expect(typeof safeDepositBox.vaultReducer).toBe('function');
    expect(typeof safeDepositBox.keys.increment).toBe('function');
  });

  it('should throw an error if name is not a non-empty string', () => {
    expect(() => createSafeDepositBox({ name: '', safeInitialState: {}, vaultReducers: {} })).toThrow('Slice name must be a non-empty string');
    expect(() => createSafeDepositBox({ name: '   ', safeInitialState: {}, vaultReducers: {} })).toThrow('Slice name must be a non-empty string');
  });

  it('should throw an error if safeInitialState is not an object', () => {
    expect(() => createSafeDepositBox({ name: 'test', safeInitialState: null as any, vaultReducers: {} })).toThrow('Initial state must be an object');
    expect(() => createSafeDepositBox({ name: 'test', safeInitialState: 123 as any, vaultReducers: {} })).toThrow('Initial state must be an object');
  });

  it('should throw an error if vaultReducers is not an object', () => {
    expect(() => createSafeDepositBox({ name: 'test', safeInitialState: {}, vaultReducers: null as any })).toThrow('vaultReducers must be an object');
    expect(() => createSafeDepositBox({ name: 'test', safeInitialState: {}, vaultReducers: 123 as any })).toThrow('vaultReducers must be an object');
  });

  it('should throw an error if any vaultReducer is not a function', () => {
    expect(() => createSafeDepositBox({ name: 'test', safeInitialState: {}, vaultReducers: { test: 123 as any } })).toThrow('vaultReducers "test" must be a function');
  });

  it('should handle actions correctly in the vaultReducer', () => {
    const name = 'testSlice';
    const safeInitialState = { count: 0 };
    const vaultReducers = {
      increment: (state: any) => ({ ...state, count: state.count + 1 }),
    };

    const safeDepositBox = createSafeDepositBox({ name, safeInitialState, vaultReducers });

    const newState = safeDepositBox.vaultReducer(safeInitialState, { type: 'testSlice/increment' });
    expect(newState).toEqual({ count: 1 });
  });

  it('should return the initial state if action type does not match', () => {
    const name = 'testSlice';
    const safeInitialState = { count: 0 };
    const vaultReducers = {
      increment: (state: any) => ({ ...state, count: state.count + 1 }),
    };

    const safeDepositBox = createSafeDepositBox({ name, safeInitialState, vaultReducers });

    const newState = safeDepositBox.vaultReducer(safeInitialState, { type: 'otherSlice/increment' });
    expect(newState).toEqual(safeInitialState);
  });

  it('should throw an error if action is not an object', () => {
    const name = 'testSlice';
    const safeInitialState = { count: 0 };
    const vaultReducers = {
      increment: (state: any) => ({ ...state, count: state.count + 1 }),
    };

    const safeDepositBox = createSafeDepositBox({ name, safeInitialState, vaultReducers });

    expect(() => safeDepositBox.vaultReducer(safeInitialState, null as any)).toThrow('Key must be an object');
  });

  it('should throw an error if action type is not a string', () => {
    const name = 'testSlice';
    const safeInitialState = { count: 0 };
    const vaultReducers = {
      increment: (state: any) => ({ ...state, count: state.count + 1 }),
    };

    const safeDepositBox = createSafeDepositBox({ name, safeInitialState, vaultReducers });

    expect(() => safeDepositBox.vaultReducer(safeInitialState, { type: 123 as any })).toThrow('Key type must be a string');
  });
});