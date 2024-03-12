
import Hero from '../../components/Hero'
import { useTranslations } from 'next-intl';

import Link from 'next/link'
const Page = () => {

  return (
    
    <div>
        <Hero
        path='/asset/img/make-up.jpeg'
        height={450}
        isVisible={true}
        title="Make Up"
        
        />
  
                
</div>

  )
}
export default Page
