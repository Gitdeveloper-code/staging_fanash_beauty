import Image from "next/image";

const bg_blue_gradient = 'bg-gradient-to-br from-teal-100 via-teal-200 to-teal-500';
const text_gradient = 'bg-gradient-to-br from-black via-black to-gray-500 text-transparent bg-clip-text';

const bg_discount_gradient = 'bg-gradient-to-tr from-[#94618e] to-[#f4decb]'
const GetStarted = () => (
  <div className= "${discount_gradient} w-[120px] h-[120px] flex justify-center items-center rounded-full ${discount_gradient} p-[2px] cursor-pointer">
    <div className="flex justify-center items-center flex-col bg-primary w-[100%] h-[100%] rounded-full">
      <div className="flex justify-center items-start flex-row">
        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span className={text_gradient}>Sign Up</span>
        </p>

        <Image
        src="/asset/img/up-arrow.png"
        alt="arrow-up"
        width={32}
        height={32}
        className="object-contain"
        style={{ filter: 'invert(100%)' }}      
           ></Image>
      </div>
    
    </div>
  </div>
);
export default GetStarted;