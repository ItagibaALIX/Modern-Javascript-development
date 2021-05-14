import { ReactNode, forwardRef } from 'react';
import Link from 'next/link';
import MenuItem from '@material-ui/core/MenuItem';

export interface MenuItemLinkProps {
  href: string;
  as?: string;
  onClick: (event: never) => void;
  className: string;
  children: ReactNode;
}

const MenuItemLink = forwardRef(({
  href,
  as,
  ...props
}: MenuItemLinkProps, ref: never) => (
  <Link passHref href={href} as={as}>
    <MenuItem component="a" ref={ref} {...props} />
  </Link>
));

export default MenuItemLink;
