import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '100%',
    minHeight: '6em',
    backgroundColor: theme.palette.grey[100],
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(2),
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: theme.spacing(2),
    '& span': {
      fontSize: 14,
      fontWeight: 500,
      marginBottom: theme.spacing(1),
    },
  },
  text: {
    textDecoration: 'none',
    fontSize: 14,
    color: theme.palette.grey[500],
    marginBottom: 3,
  },
}));

function Footer(): JSX.Element {
  const classes = useStyles();
  const linkElement = (link: string, name: string) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={classes.text}
      href={link}
    >
      <Typography className={classes.text}>{name}</Typography>
    </a>
  );

  return (
    <div className={classes.container}>
      <div className={classes.textContainer}>
        <span>General Information</span>
        {linkElement('https://github.com/ItagibaALIX/Modern-Javascript-development', 'Github')}
      </div>
      <div className={classes.textContainer}>
        <span>Contact us</span>
        <Link href="/team"><a className={classes.text}>Team</a></Link>
      </div>
    </div>
  );
}

export default Footer;
