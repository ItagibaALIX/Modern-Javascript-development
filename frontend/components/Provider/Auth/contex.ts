import createCtx from '../createCtx';

const {
  ctx: AuthContext, useCtx: useAuthContext,
} = createCtx();

export { useAuthContext };
export default AuthContext;
