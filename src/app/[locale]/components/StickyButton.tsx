import Image from "next/image"
import Link from "next/link"
import { useTranslations } from 'next-intl';

type ButtonProps =
    {
    
        icon?: string
        action?: () => void

    }
const StickyButton = ({ icon, action }: ButtonProps) => {

  const t = useTranslations('Footer');

    return (
      <div>
   <button className="fixed bottom-8 right-4 md:right-[2rem] flex items-center px-2 py-2 shadow z-30 text-white font-mono bg-black border border-tertiary rounded-md hover:bg-primary hover:text-secondary focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium ">
    {icon && (
        <Image src={icon} alt={""} className="mr-2" height={29} width={29} />
    )}
    <span> | {t("bookappointment")}</span>
</button>

</div>

    )
}
export default StickyButton