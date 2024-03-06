import type { Metadata } from 'next'
import { Inter, Roboto, Oswald } from 'next/font/google'
import './globals.css'
import Footer from './components/Footer'
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { locales } from '../../navigation';

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'Fanash Beauty',
  description: 'Generated by create next app',
  
}

export default function RootLayout({ children, params: { locale } }: RootLayoutProps) {
 const messages = useMessages();
  return (
    <html lang={locale}>
      
      <head>
    

      </head>
 <NextIntlClientProvider locale={locale} messages={messages}>
      <body  className={inter.className} 
      suppressHydrationWarning={true}
      >
        {/* <Navbar/> */}
        <main className='relative overflow-hidden bg-black'>  {children} </main>
       
        <Footer/>
        </body>
</NextIntlClientProvider>
    </html>
  )
}
