import React from 'react';

import Head from 'components/Head';
import Layout from 'components/Layout';

export default function Home(): JSX.Element {
  return (
    <>
      <Head title="Modern Javascript development" />
      <Layout>
        <h1 className="title">
          About us
        </h1>
        <div>Maxime CORBIN</div>
        <div>Itagiba ALIX</div>
        <div>Raphael MAISONNAVE</div>
      </Layout>
    </>
  );
}
