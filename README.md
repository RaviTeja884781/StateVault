# StateVault

A lightweight and powerful state management library for React applications that securely manages your application state.

## Features
- 🔒 Secure state management with isolated slices
- 🚀 Lightweight and performant
- 💡 Simple and intuitive API
- 🔧 Type-safe with TypeScript support
- 📦 Zero dependencies (except React)
- ⚡ Modular safe deposit box architecture

## Installation
```bash
npm install state-vault
```

## Core Concepts

### Vault
The central state container that securely stores all your application state.

### Safe Deposit Box
A modular state slice that manages a specific piece of state with its own reducers and actions.

### Keys
Actions that trigger state changes in your vault.

## Basic Usage
```javascript
import { 
    configureVault, 
    createSafeDepositBox, 
    VaultGuard, 
    useVaultKey, 
    useVaultAccess 
} from 'state-vault';

// Create a safe deposit box
const counterBox = createSafeDepositBox({
    name: 'counter',
    safeInitialState: { value: 0 },
    vaultReducers: {
        increment: (state) => ({ ...state, value: state.value + 1 }),
        decrement: (state) => ({ ...state, value: state.value - 1 }),
    },
});

// Configure vault
const vault = configureVault({
    vaultReducer: {
        counter: counterBox.vaultReducer,
    },
});

// Wrap your app with VaultGuard
function App() {
    return (
        <VaultGuard vault={vault}>
            <Counter />
        </VaultGuard>
    );
}

// Use in components
function Counter() {
    const count = useVaultAccess((state) => state.counter.value);
    const useKey = useVaultKey();

    return (
        <div>
            <button onClick={() => useKey(counterBox.keys.decrement())}>-</button>
            <span>{count}</span>
            <button onClick={() => useKey(counterBox.keys.increment())}>+</button>
        </div>
    );
}
```

## API Reference

### `configureVault`
Creates a new vault instance to store your application state.
```javascript
const vault = configureVault({
    vaultReducer: {
        users: usersBox.vaultReducer,
        posts: postsBox.vaultReducer
    }
});
```

### `createSafeDepositBox`
Creates a modular state container with its own reducers and actions.
```javascript
const todoBox = createSafeDepositBox({
    name: 'todos',
    safeInitialState: { items: [] },
    vaultReducers: {
        add: (state, action) => ({
            ...state,
            items: [...state.items, action.payload]
        }),
        remove: (state, action) => ({
            ...state,
            items: state.items.filter(item => item.id !== action.payload)
        })
    }
});
```

### `VaultGuard`
React component that provides the vault context to your app.
```javascript
<VaultGuard vault={vault}>
    <App />
</VaultGuard>
```

### `useVaultAccess`
Hook to access state from the vault.
```javascript
const todos = useVaultAccess(state => state.todos.items);
```

### `useVaultKey`
Hook to dispatch actions to modify the vault state.
```javascript
const useKey = useVaultKey();
useKey(todoBox.keys.add({ id: 1, text: 'Learn StateVault' }));
```

### `createKey`
Utility to create standalone action creators.
```javascript
const resetKey = createKey('todos/reset');
useKey(resetKey());
```

## Advanced Usage

### Async Actions
```javascript
function TodoList() {
    const useKey = useVaultKey();

    const fetchTodos = async () => {
        useKey(async (dispatch, getState) => {
            dispatch(todoBox.keys.setLoading(true));
            try {
                const response = await fetch('/api/todos');
                const todos = await response.json();
                dispatch(todoBox.keys.setTodos(todos));
            } catch (error) {
                dispatch(todoBox.keys.setError(error.message));
            } finally {
                dispatch(todoBox.keys.setLoading(false));
            }
        });
    };
}
```

## TypeScript Support
StateVault is written in TypeScript and provides full type safety:
```typescript
interface TodoState {
    items: Todo[];
    loading: boolean;
    error: string | null;
}

const todoBox = createSafeDepositBox<TodoState>({
    name: 'todos',
    safeInitialState: {
        items: [],
        loading: false,
        error: null
    },
    vaultReducers: {
        setTodos: (state, action: Key<Todo[]>) => ({
            ...state,
            items: action.payload
        })
    }
});
```

## License
MIT © Ravi Teja Ladi