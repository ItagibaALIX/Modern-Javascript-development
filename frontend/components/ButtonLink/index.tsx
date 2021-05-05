import { forwardRef, Ref } from 'react';
import Link from 'next/link';

import Button, { ButtonProps } from 'components/Button';

export type ButtonLinkProps = { href: string; as?: string} & ButtonProps;

const ButtonLink = forwardRef(
  ({ href, as, ...props }: ButtonLinkProps, ref: Ref<HTMLButtonElement>) => (
    <Link href={href} as={as} passHref>
      <Button ref={ref} {...props} component="a" />
    </Link>
  ),
);

export default ButtonLink;
