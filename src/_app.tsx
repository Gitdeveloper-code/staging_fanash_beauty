// pages/_app.tsx

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
const jwt = require('jsonwebtoken');


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Redirect logic to check if user is authenticated as admin
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    } else {
      try {
        const decodedToken: any = jwt.verify(token, "afucentTech");
        if (!decodedToken || decodedToken.role !== 'admin') {
          router.push('/');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        router.push('/');
      }
    }
  }

  return <Component {...pageProps} />;
}

export default MyApp;
