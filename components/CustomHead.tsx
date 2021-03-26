import Head from 'next/head';
import React from 'react';

import { URL } from '../utils/cangeURL';

type Props = {
  title: string;
  postId: number;
  image: string;
};

const CustomHead: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>OmnisCode</title>
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content="OmnisCode" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL + '/post/' + props.postId} />
        <meta property="og:image" content={props.image} />
        <meta property="og:site_name" content="OmnisCode" />
        <meta property="og:description" content={props.title} />
        {/* Twitter設定 */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    </>
  );
};

export default CustomHead;
