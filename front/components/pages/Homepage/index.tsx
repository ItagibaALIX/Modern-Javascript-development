import React from 'react';

import Layout from 'components/Layout';
import { useRegister } from 'hooks/auth';
import { RegisterParams } from 'utils/validation';

function Homepage(): JSX.Element {
  const register = useRegister();

  return (
    <Layout>
      <h1 className="title">
        Modern Javascript development
      </h1>
    </Layout>
  );
}

export default Homepage;
