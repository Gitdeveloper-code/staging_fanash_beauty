import Image from "next/image"
import Link from "next/link"
type ButtonProps=
{
    title:string
    icon?:string
    action?: () => void

}
const Button = ({title, icon, action}:ButtonProps) => {

  return (
    <div>

      <button type="button" className="text-white font-mono  w-fit  bg-tertiary hover:bg-primary hover:text-secondary focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium  text-sm px-5 py-2.5 text-center inline-flex gap-3 items-center"
      onClick={action}
    >

        {icon && <Image src={icon} alt={title} height={24} width={24} 
        />}
       
        <label>{title}</label>

        </button>
    </div>
  )
}

export default Button
