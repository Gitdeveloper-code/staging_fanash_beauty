import Image from "next/image"
import Link from "next/link"
type ButtonProps=
{
    title:string
    icon?:string
    action?: () => void

}
const StickyButton = ({title, icon, action}:ButtonProps) => {

  return (
    <div>

      <button className="fixed bottom-4 right-4 md:right-[6rem] px-4 py-4 rounded-full shadow animate-bounce z-30 text-white font-mono w-fit bg-tertiary hover:bg-primary hover:text-secondary focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium"
      onClick={action}
    >
        {icon && <Image src={icon} alt={title} height={29} width={29} 
        />}
       
        <label>{title}</label>

        </button>
    </div>
  )
}
export default StickyButton