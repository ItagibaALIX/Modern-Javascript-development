import Head from 'components/Head';
import Homepage from 'components/pages/Homepage';
import { Button } from "@material-ui/core";
import { useRouter } from 'next/router';

export default function Home(): JSX.Element {
  const router = useRouter();

  return (
    <>
      <Head title="Modern Javascript development" />
      <Homepage />
      <Button
        color="primary"
        variant="contained"
        type="button"
        onClick={ () => (router.push('/login')) }
      >
        Login
      </Button>
      <Button
        color="primary"
        variant="contained"
        type="button"
        onClick={ () => (router.push('/register')) }
      >
        Register
      </Button>
    </>
  );
}
