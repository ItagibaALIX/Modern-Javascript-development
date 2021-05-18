import createCtx from '../createCtx';

const {
  ctx: UserContext, useCtx: useUserContext,
} = createCtx();

export { useUserContext };
export default UserContext;
