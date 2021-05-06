import { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '100vh',
    maxHeight: '100vh',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  containerBody: {
    display: 'flex',
    height: '95vh',
    maxHeight: '95vh',
  },
}));

export interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <Header />
        <div className={classes.containerBody}>
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
