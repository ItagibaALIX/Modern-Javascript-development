import Head from 'components/Head';
import Homepage from 'components/pages/Homepage';
import React from 'react';
import Layout from 'components/Layout';

export default function Home(): JSX.Element {

  return (
    <Layout>
      <Head title="Modern Javascript development" />
      <Homepage />
    </Layout>
  );
}
