"use client"
import Button from '../../components/Button';
import {useState} from 'react'
import AdminNavBar from '../../components/AdminNavBar';

const Page = () => {
    const [name, setName]=useState("");
    const [design, setDesign]=useState("");
    const [description, setDescription]=useState("");
    
    const addTeam = async()=> {
        const data = {
          name:name,
          design:design,
          description:description
        };
        console.log(name,design,description)
        const result = await fetch("http://localhost:3000/api/teams", {
          method: "POST",
          body: JSON.stringify(data)
  
        });
    
      }
  return (
    <div className='flex flex-col w-full'>
      <AdminNavBar/>
    
    <div className='flex flex-col items-center justify-center w-full m-4'>
    <h3 className="mb-3 block text-base font-medium text-tertiary"> Add Team Member </h3>

<form  action="" method="POST">

<div className="w-full px-3 lg:w-96">
<div className="mb-5">

<input type="text" name="name" id="name" value={name} placeholder='Full Name' onChange={(e)=> setName(e.target.value)}
className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
/>
</div>
</div>
<div className="w-full px-3 lg:w-96">
<div className="mb-5">

<input type="text" name="design" id="design" value={design} placeholder='Designation' onChange={(e)=> setDesign(e.target.value)}
className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
/>
</div>
</div>
<div className="w-full px-3  lg:w-96">
<div className="mb-5">

<input type="text" name="description" id="description" value={description} placeholder='Describe in few words' onChange={(e)=> setDescription(e.target.value)}
className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
/>
</div>
</div>





<div className='text-center p-5 m-5 '>
<Button
action={addTeam}
title='Add Member'
/>

</div>
</form>

</div>
</div>
  )
}

export default Page
