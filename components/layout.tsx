import Header from './Header';
import { ReactNode } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
}));

const Layout = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();
  return (
    <div className={classes.mainWrap}>
      <Container>
        <Header />
        {children}
      </Container>
    </div>
  );
};

export default Layout;
