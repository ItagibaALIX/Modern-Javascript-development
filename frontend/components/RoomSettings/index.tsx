import { Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';

import TextInput from 'components/TextInput';
import Button from 'components/Button';
import { useInviteRoom } from 'hooks/rooms';
import { FindUserParams, InviteRoomParams, inviteRoomSchema } from 'utils/validation';
import { useFindUser } from 'hooks/auth';
import { useMessageContext } from 'components/Provider/Message';

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
  },
}));

// export interface RoomSettingsProps {
//   user: { username: string };
//   // roomName: string;
// }

function RoomSettings(): JSX.Element {
  const invite = useInviteRoom();
  const findUser = useFindUser();
  const styles = useStyles();
  const { currentRoom } = useMessageContext();

  return (
    <div className={styles.paper}>
      {currentRoom ?
        (
          <div>
            <Formik
              initialValues={{ email: '', id: currentRoom.id }}
              validationSchema={inviteRoomSchema}
              onSubmit={async (values: InviteRoomParams): Promise<void> => {
                console.log("onSubmit invite", values)
                await invite(values);
              }}
            >
              <Form noValidate className={styles.input}>
                <div className={styles.button}>
                  <Typography variant="subtitle1" className={styles.roomName}>
                    Add member:
                </Typography>
                  <TextInput
                    type="email"
                    name="email"
                    label="email"
                    required
                    fullWidth
                  // onChange={async (values: FindUserParams): Promise<void> => {
                  //   console.log("values", values);
                  //   const possibleEmail = await findUser(values);

                  //   console.log("possibleEmail", possibleEmail);
                  //   // if (possibleEmail) {
                  //   // }
                  // }}
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
        //  <div>
        //   <Formik
        //     initialValues={{ user: '' }}
        //     // validationSchema={loginSchema}
        //     onSubmit={(values): void => {
        //       console.log(values);
        //     }}
        //   >
        //     <Form noValidate className={styles.input}>
        //       <div className={styles.button}>
        //         <Typography variant="subtitle1" className={styles.roomName}>
        //           Change owner:
        //         </Typography>
        //         <TextInput
        //           type="text"
        //           name="user"
        //           label="user"
        //           required
        //           fullWidth
        //         />
        //         <Button
        //           color="primary"
        //           variant="contained"
        //           type="submit"
        //           fullWidth
        //         >
        //           Add
        //         </Button>
        //       </div>
        //     </Form>
        //   </Formik>
        //   <div className={styles.line} />
        //   <div className={styles.controlButton}>
        //     <div className={styles.button}>
        //       <Button
        //         color="primary"
        //         variant="contained"
        //         type="submit"
        //         fullWidth
        //       >
        //         Archive channel
        //       </Button>
        //     </div>
        //     <div className={styles.button}>
        //       <Button
        //         color="primary"
        //         variant="contained"
        //         type="submit"
        //         fullWidth
        //       >
        //         Leave channel
        //       </Button>
        //     </div>
        //   </div>
        // </div>
        ): (<></>)
      }
      </div>
      );
      
}

export default RoomSettings;
