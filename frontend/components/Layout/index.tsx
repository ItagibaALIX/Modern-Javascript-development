import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div>
      {children}
    </div>
  );
}

export default Layout;
