import Head from 'next/head';
import React from 'react';

import { URL } from '../utils/cangeURL';

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
        {/* URL = https://omniscode.one */}
        <meta property="og:url" content={URL + '/' + props.pageName} />
        <meta
          property="og:image"
          content="https://omniscode-og-image.vercel.app/package%20main%0A%0Aimport%20%22fmt%22%0A%0Afunc%20main()%20%7B%0A%20%20%20%20fmt.Println(%22hello%20world%22)%0A%7D.jpeg?theme=gradient-dark&lang=go"
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
