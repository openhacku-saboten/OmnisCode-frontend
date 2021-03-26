import Head from 'next/head';
import React from 'react';

type Props = {
  pageName: string;
};

const DefaultHead: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>OmnisCode</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="OmnisCode" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={process.env.baseUrl + '/' + props.pageName}
        />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/31395466/112653377-b1d72080-8e91-11eb-9a90-aa6b7c769ee1.png"
        />
        <meta property="og:site_name" content="OmnisCode" />
        <meta property="og:description" content="コードを共有するSNS" />
        {/* Twitter設定 */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    </>
  );
};

export default DefaultHead;
