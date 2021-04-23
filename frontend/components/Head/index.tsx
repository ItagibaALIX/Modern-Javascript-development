import NextHead from 'next/head';

export interface HeadProps {
  title: string;
}

function Head({ title }: HeadProps): JSX.Element {
  return (
    <NextHead>
      <title>{title}</title>
    </NextHead>
  );
}

export default Head;
