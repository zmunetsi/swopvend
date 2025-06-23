'use client';

import { createContext } from 'react';

export const ServerAuthContext = createContext(null);

export function ServerAuthProvider({ user, children }) {
  return (
    <ServerAuthContext.Provider value={user}>
      {children}
    </ServerAuthContext.Provider>
  );
}