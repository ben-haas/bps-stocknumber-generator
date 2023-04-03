import Head from 'next/head';

import Header from '@/components/Header';
import NumberUpload from '@/components/Numbers/NumberUpload';

const UploadPage = () => {
  const numberUploadHandler = async (uploadedNumberData: {}) => {
    try {
      const response = await fetch('/api/number-upload', {
        method: 'POST',
        body: JSON.stringify(uploadedNumberData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(
          'Something went wrong. Refresh the page and try again.'
        );
      }

      const data = await response.json();
      console.log(data);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <>
      <Head>
        <title>Stock Number Generator | Upload</title>
        <meta name="description" content="Stock number upload" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <NumberUpload onAddNumbers={numberUploadHandler} />
    </>
  );
};

export default UploadPage;
