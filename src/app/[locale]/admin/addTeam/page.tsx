// ./src/app/[locale]/admin/addTeam/page.tsx

"use client"; // Add this line at the top to mark the component as a Client Component

import React, { useState, useEffect } from 'react';
import Button from '../../components/Button'; // Adjust the path based on your project structure
import AdminNavBar from '../../components/AdminNavBar'; // Adjust the path based on your project structure
interface TeamMember {
  name: string;
  design?: string; 
  description: string;
  _id: string; 
}
const Page = () => {
  const [name, setName] = useState("");
  const [design, setDesign] = useState("");
  const [description, setDescription] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/teams", { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.result)
      let abs = data.result.map((item:any)=>{
      
         
        return {
          id: item._id, // Assuming an 'id' property
          name: item.name, // Assuming a 'name' property
        };
      })
      console.log(abs);
      setTeamMembers(data.result);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };
  const handleDelete = async (id: string) => {
    const confirmation = window.confirm('Are you sure you want to delete this item?');

    if (confirmation) {
      try {
        await deleteTeamMember(id);
        // alert('Item deleted successfully!');
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item. Please try again.');
      }
    }
  };

  const addTeam = async () => {
    const data = {
      name: name,
      design: design,
      description: description
    };

    try {
      const response = await fetch("http://localhost:3000/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setName("");
      setDesign("");
      setDescription("");

      fetchTeamMembers(); // Fetch updated team members after adding

      alert("Team member added successfully!");
    } catch (error) {
      console.error('Error adding team member:', error);
      alert("Error adding team member. Please try again.");
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      console.log("Deleting team member with id ", id);
      const response = await fetch(`http://localhost:3000/api/teams/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
        // body: JSON.stringify(id)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data); 
  
      fetchTeamMembers(); 
      // alert("Team member deleted successfully!")
      console.log("Team member deleted successfully!");
    } catch (error) {
      console.error('Error deleting team member:', error);
      
      console.error("Error deleting team member. Please try again.");
    }
  };
  
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return (
    <div className='flex flex-col w-full'>
      <AdminNavBar />

      <div className='flex flex-col items-center justify-center w-full m-4'>
        <h3 className="mb-3 block text-base font-medium text-tertiary"> Add Team Member </h3>

        <form action="" method="POST">
          <div className="w-full px-3 lg:w-96">
            <div className="mb-5">
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                placeholder='Full Name'
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="w-full px-3 lg:w-96">
            <div className="mb-5">
              <input
                type="text"
                name="design"
                id="design"
                value={design}
                placeholder='Designation'
                onChange={(e) => setDesign(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="w-full px-3  lg:w-96">
            <div className="mb-5">
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                placeholder='Describe in few words'
                onChange={(e) => setDescription(e.target.value)}
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

        <div className="bg-black mx-auto p-12 w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border bg-gray-500 px-4 py-2">Names</th>
                <th className="border bg-gray-500 px-4 py-2">Designation</th>
                <th className="border bg-gray-500 px-4 py-2">Description</th>
                <th className="border bg-gray-500 px-4 py-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((item, index) => (
                <tr key={index} className="border">
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.design}</td>
                  <td className="border px-4 py-2">{item.description}</td>
                  <td className="border px-4 py-2 text-center">
                    <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">
                      <i className="material-icons">delete</i>
                    </button>
                  </td>
                </tr>
              )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
