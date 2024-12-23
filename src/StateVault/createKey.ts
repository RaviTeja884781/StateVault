import { KeyCreator } from './types';

export const createKey = <T = any>(type: string): KeyCreator<T> => {
  if (typeof type !== 'string' || type.trim() === '') {
    throw new Error('Key type must be a non-empty string');
  }
  return (payload?: T) => ({ type, payload });
};
