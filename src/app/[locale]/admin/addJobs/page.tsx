"use client"
import React, { useState } from 'react'
import Button from '../../components/Button';
import AdminNavBar from '../../components/AdminNavBar';


const Page = () => {
    const [name, setName]=useState("");
    const [price, setPrice]=useState("");
    const [category, setCategory]=useState("");

  
    const addService = async()=> {
      const data = {
        name:name,
        price:price,
        category:category
      };
      console.log(name,price,category)
      const result = await fetch("http://localhost:3000/api/services", {
        method: "POST",
        body: JSON.stringify(data)
      });
  
    }
  return (
    <div className='flex flex-col w-full'>
    <AdminNavBar/>
    <div className='flex flex-col items-center justify-center w-full'>
                    <h3 className="mb-3 block text-base font-medium text-tertiary"> Add Service </h3>

         <form  action="" method="POST">
      
        <div className="w-full px-3 sm:w-1/2 lg:w-96">
          <div className="mb-5">

            <input type="text" name="name" id="name" value={name} placeholder='Service Name' onChange={(e)=> setName(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/2 lg:w-96">
          <div className="mb-5">

            <input type="text" name="price" id="price" value={price} placeholder='Price' onChange={(e)=> setPrice(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/2 lg:w-96">
          <div className="mb-5">

            <input type="text" name="category" id="category" value={category} placeholder='Category' onChange={(e)=> setCategory(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>



       

      <div className='text-center p-5 m-5 '>
    

        <Button
        title='Add Service'
        action={addService}
        />
               
      </div>
    </form>
      
    </div>
    </div>

  )
}

export default Page
