
import Hero from '../../components/Hero'
import { useTranslations } from 'next-intl';

import Link from 'next/link'
const Page = () => {

  return (
    
    <div>
        <Hero
        path='/asset/img/bridal.jpeg'
        height={450}
        isVisible={true}
        title="Hair Styling"
          />
  
                
</div>

  )
}
export default Page
