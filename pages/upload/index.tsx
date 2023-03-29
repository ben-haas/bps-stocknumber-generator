import Head from 'next/head';

import Header from '@/components/Header';
import NumberUpload from '@/components/Numbers/NumberUpload';

const UploadPage = () => {
  return (
    <>
      <Head>
        <title>Stock Number Generator | Upload</title>
        <meta name="description" content="Stock number upload" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <NumberUpload />
    </>
  );
};

export default UploadPage;
