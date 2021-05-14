import * as React from 'react';

// interface ContextBundle<A extends Record<string, unknown>>{
//   useCtx: () => A;
//   ctx: React.Context<A | undefined>;
// }

export default function createCtx() {
  const ctx = React.createContext(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (c === undefined) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return { useCtx, ctx };
}
