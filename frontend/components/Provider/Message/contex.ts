import createCtx from '../createCtx';

const {
  ctx: MessageContext, useCtx: useMessageContext,
} = createCtx();

export { useMessageContext };
export default MessageContext;
