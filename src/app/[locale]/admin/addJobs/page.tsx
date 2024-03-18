"use client";
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import AdminNavBar from '../../components/AdminNavBar';
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation'
import styles from '../loader.module.css'

import { getCookies, setCookie, } from 'cookies-next';
interface Job {
  category: string;
  design: string;
  type: string;
}

const Page: React.FC = () => {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [category, setCategory] = useState("");
  const [post, setPost] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobLocation, setLocation] = useState("");
  const [description, setDescription] = useState("");


  const getJobs = async () => {
    try {
      console.log("Fetching jobs...");
      let response = await fetch(`/api/jobs`, { cache: "no-store" });
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // console.log("Fetched data:", data);
      setJobs(data.result || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };


  useEffect(() => {

    const checkAuthorization = async () => {
      const getToken = getCookies({ secure: process.env.NODE_ENV === 'production' })
      // console.log(getToken);
      let token = getToken.token
      // console.log("Token is here", token);
      if (!token) {
        window.location.href = "/login";
      }
     
      else if (typeof token !== 'string') {
        throw new Error('Invalid token format');
      } else {
        // console.log("string hai")
        setAuthorized(true);
        setLoading(false);
        getJobs();

      }
      if (!token) {

        // console.log("Token is not present in localStorage");
        router.push('/');
      }
      else {
        try {
          // console.log("yeppie")

          const decodedToken: any = jwtDecode(token);
          // console.log(decodedToken);


          if (decodedToken && decodedToken.role === 'admin') {
            // console.log("Token is authorized");
            setAuthorized(true);
            setLoading(false);


          } else {
            console.log("User is not authorized");
            router.push('/');
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          router.push('/');
        }
      }
    };

    checkAuthorization();

  }, []);
  if (!authorized) {
    return (
      <div className={styles['loader-overlay']}>
        <div className={styles.loader}></div>
      </div>
    );
  }



  const handleDelete = async (id: string) => {
    const confirmation = window.confirm('Are you sure you want to delete this item?');

    if (confirmation) {
      try {
        await deleteJob(id);
        // alert('Item deleted successfully!');
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item. Please try again.');
      }
    }
  };

  const addJob = async () => {

    try {
      const dataForJob = {
        category: category,
        design: post,
        type: jobType,
        // location: location,
        // description: description
      };

      // console.log(dataForJob);
      if (!category || !post || !jobType) {
        throw new Error("All fields must be filled out");
      }
  
      const result = await fetch(`/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataForJob)
      });
  
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      // console.log(result);
      await getJobs();

      setCategory("");
      setPost("");
      setJobType("");
  
      // Show success alert
      alert("Job added successfully!");
    } catch (error) {
      console.error('Error adding job:', error);
  
      // Show error alert
      alert("Error adding job. Please try again.");
    }
  };
  

  const deleteJob = async (index: string) => {

    try {
      // console.log("Deleting item with id ", index);
      const response = await fetch(`/api/jobs/${index}`, {
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
      // console.log(data);
  
        getJobs(); 
      console.log(" deleted successfully!");
    } catch (error) {
      console.error('Error deleting Jobs:', error);
      
      console.error("Error deleting Jobs. Please try again.");
    }

  };

  return (
    <div className='flex flex-col w-full'>
      {/* loadercontent */}

      {loading && (
        <div className={styles['loader-overlay']}>
          <div className={styles.loader}>
          </div>
          <div className={styles['loading-text']}>Loading...</div>
        </div>
      )}
      {/* main content */}
      {!loading && (
        <>
          <AdminNavBar />
          <div className='flex flex-col items-center justify-center w-full'>
            <h3 className="mb-3 block text-base font-medium text-tertiary"> Add Job </h3>

            <form action="" method="POST">

              <div className="w-full px-3 sm:w-1/2 lg:w-96">
                <div className="mb-5">
                  <input type="text" name="category" id="category" value={category} placeholder='Category' onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2 lg:w-96">
                <div className="mb-5">
                  <input type="text" name="post" id="post" value={post} placeholder='Post' onChange={(e) => setPost(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2 lg:w-96">
                <div className="mb-5">
                  <input type="text" name="jobType" id="jobType" value={jobType} placeholder='Type' onChange={(e) => setJobType(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              {/* <div className="w-full px-3 sm:w-1/2 lg:w-96">
                <div className="mb-5">
                  <input type="text" name="jobLocation" id="jobLocation" value={jobLocation} placeholder='Location' onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div> */}
              {/* <div className="w-full px-3 sm:w-1/2 lg:w-96">
                <div className="mb-5">
                  <input type="text" name="description" id="description" value={description} placeholder='description' onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div> */}

              <div className='text-center p-5 m-5 '>
                <Button
                  title='Add Job'
                  action={addJob}
                />
              </div>
            </form>

          </div>

          <main>
            <div className="bg-black mx-auto p-12 w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border bg-gray-500 px-4 py-2">Category</th>
                    <th className="border bg-gray-500 px-4 py-2">Designation</th>
                    <th className="border bg-gray-500 px-4 py-2">Type</th>
                    {/* <th className="border bg-gray-500 px-4 py-2">Location</th>
                    <th className="border bg-gray-500 px-4 py-2">Description</th> */}
                    <th className="border bg-gray-500 px-4 py-2">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((item: any, index: number) => (
                    <tr key={index} className="border">
                      <td className="border px-4 py-2 text-center">{item.category}</td>
                      <td className="border px-4 py-2 text-center">{item.design}</td>
                      <td className="border px-4 py-2 text-center">{item.type}</td>
                      {/* <td className="border px-4 py-2 text-center">{item.type}</td>
                      <td className="border px-4 py-2 text-center">{item.type}</td> */}
                      <td className="border px-4 py-2 text-center">
                        <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </>
      )}
    </div>

  )
}

export default Page;
