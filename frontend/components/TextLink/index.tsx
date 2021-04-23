import React from 'react';
import Link from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';

export interface TextLinkProps {
  className?: string;
  href: string;
  as?: string;
  children: MuiLinkProps['children'];
}

const TextLink = ({
  className, href, as, children,
}: TextLinkProps): JSX.Element => (
  <Link href={href} as={as} passHref>
    <MuiLink className={className} underline="always">
      {children}
    </MuiLink>
  </Link>
);

export default TextLink;
