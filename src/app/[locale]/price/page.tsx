import Hero from '../components/Hero'
import { useTranslations } from 'next-intl';

const Page = () => {
  const a = useTranslations('About');

  return (
    <div>
      <Hero
        path='/asset/img/login.png'
        height={450}
        isVisible={true}
        title="Reserve Your Slot"
      />
      <div className="flex justify-center dark:bg-gray-900 py-10 ">
        <div className="w-full md:w-[50%] lg:w-[40%]  h-[50rem]  rounded-lg ">
          {/* Iframe */}
          <iframe
            src="https://fanash-beauty.salonized.com/widget_bookings/new"
            title="Embedded Content"
            className="w-full h-full px-5 md:px-[60px] rounded-md"
          ></iframe>
            
        </div>
      </div>
    </div>
  );
};

export default Page;
