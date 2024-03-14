import { useTranslations } from 'next-intl';

const Faq = () => {
const f = useTranslations('faq');
  return (
    <div>
        <section className="relative z-20 overflow-hidden bg-[#1e293b] pb-12 pt-4 dark:bg-dark lg:pb-[90px] lg:pt-[90px] border-0 ">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            {/* <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
             
              <h2 className="mb-4 text-3xl font-bold text-dark dark:text-black sm:text-[40px]/[48px]">
                Comprehensive Beauty Services
              </h2>
              
            </div> */}
          </div>
        </div>
<div className="-mx-4 text-center flex flex-wrap px-7 md:px-16 items-center text-base text-body-color dark:text-white">
      <h2 className="text-2xl font-bold mx-auto mt-6 mb-2 text-justify">{f("faqtitle1")}</h2>
      <p>
        {f("faqDetails1")}
      </p>

      <h2 className="text-2xl mx-auto font-bold mt-6 mb-2 text-justify">{f("OurExpertise")}</h2>
      <p>
      {f("OurExpertiseDetails")}
      </p>

      <h2 className="text-2xl mx-auto font-bold mt-6 mb-2 text-justify">{f("CraftingUniqueLooks")}</h2>
      <p>
        {f("CraftingLookperagrapg")}
      </p>

      <h2 className="text-2xl mx-auto font-bold mt-6 mb-2 text-justify">{f("TheFanashExperience")}</h2>
      <p>
        {f("TheFanashExperagrapg")}
      </p>

      <h2 className="text-2xl mx-auto font-bold mt-6 mb-2 text-justify">{f("ArtistryandBeauty")}</h2>
      <p>
        {f("ArtistryBeautyperagraph")}
      </p>

      <h2 className="text-2xl mx-auto font-bold mt-6 mb-2 text-justify">{f("Our Reputation")}</h2>
      <p>
       {f("OurReputationPera")}
      </p>
    </div>
      </div>

      <div className="absolute bottom-0 right-0 z-[-1]">
        <svg
          width="1440"
          height="886"
          viewBox="0 0 1440 886"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1308.65"
              y1="1142.58"
              x2="602.827"
              y2="-418.681"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3056D3" stopOpacity="0.36" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0.096144" />
            </linearGradient>
          </defs>
        </svg>
      </div>
 </section>
      
    </div>
  )
}

export default Faq
