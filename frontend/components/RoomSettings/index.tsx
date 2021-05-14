import { Typography, Avatar as MuiAvatar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextInput from 'components/TextInput';
import { Formik, Form } from 'formik';
import { loginSchema } from 'utils/validation';
import Button from 'components/Button';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: theme.palette.text.secondary,
      cursor: 'pointer',
    },
    padding: theme.spacing(2),
  },
  roomName: {
    fontSize: 14,
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    maxHeight: '100%',
    height: '100%',
    width: '100%',
    overflowY: 'scroll',
  },
  button: {
    padding: theme.spacing(1),
  },
  line: {
    border: 'solid',
    borderWidth: '0.5px',
    borderColor: theme.palette.text.secondary,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),

  },
  controlButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
}));

export interface RoomSettingsProps {
  user: User;
  roomName: string;
}

function RoomSettings(props: RoomSettingsProps): JSX.Element {
  const {
    user,
    roomName = "The secret conv",
  } = props;
  const styles = useStyles({ name: user?.username ?? '' });

  const onClick = () => {
    console.log("click click")
  }

  return (
    <div className={styles.paper}>

      <div>
        <Formik
          initialValues={{ user: "" }}
          // validationSchema={loginSchema}
          onSubmit={(values): void => {
            console.log(values);
          }}
        >
          <Form noValidate className={styles.input}>
            <div className={styles.button}>
              <Typography variant="subtitle1" className={styles.roomName}>
                Add member:
              </Typography>
              <TextInput
                type="text"
                name="user"
                label="user"
                required
                fullWidth
              />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
              >
                Add
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
      <div>
        <Formik
          initialValues={{ user: "" }}
          // validationSchema={loginSchema}
          onSubmit={(values): void => {
            console.log(values);
          }}
        >
          <Form noValidate className={styles.input}>
            <div className={styles.button}>
              <Typography variant="subtitle1" className={styles.roomName}>
                Change owner:
              </Typography>
              <TextInput
                type="text"
                name="user"
                label="user"
                required
                fullWidth
              />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
              >
                Add
              </Button>
            </div>
          </Form>
        </Formik>
        <div className={styles.line} />
        <div className={styles.controlButton}>
          <div className={styles.button}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              fullWidth
            >
              Archive channel
          </Button>
          </div>
          <div className={styles.button}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              fullWidth
            >
              Leave channel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomSettings;
