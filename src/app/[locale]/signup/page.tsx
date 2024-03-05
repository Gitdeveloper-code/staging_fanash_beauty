"use client"
import { User } from "@/libs/model/user"
import Button from "../components/Button"
import Navbar from "../components/Navbar"
import { useState } from "react"

const Page = () => {
  const [uname, setUname]=useState("");
  const [email, setEmail]=useState("");
  const [contact, setContact]=useState("");
  const [password, setPassword]=useState("");
  const [cpassword, setCPassword]=useState("");
  const [error, setError] = useState<string>('');

 
  const addUser = async () => {
    const data = {
      uname: uname,
      email: email,
      contact: contact,
      password: password,
    };

    // const existingUser = await User.findOne({uname})

    if (!uname || !email || !password) {
      setError('All fields are necessary');
    } else if (password !== cpassword) {
      setError('Passwords are different');
    } 
    // else if (existingUser) {
    //   setError(`${uname} User already exists`);
    // }   
     else{
      console.log(uname,email,contact,password)
      const result = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        body: JSON.stringify(data)
      });
     
    }
  };

  return (
<section>
    <div className="p-3"><Navbar/></div>
    
  <div className="h-full bg-white">
    {/*  Left column container with background*/}
    <div
      className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
      <div
        className="m-5 p-5 shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
         <video autoPlay muted loop style={{ height:'500px', width: '500px'}} > 
            <source src="/asset/img/video.mp4"/>
             </video>
          </div>

     {/* Right column container */}

      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
      <h1 className=" mb-5 text-xl font-bold leading-tight tracking-tight text-tertiary md:text-2xl dark:text-white">
                  Create and account
                </h1>

        <form>
          {/* Sign in section */}
          <div className="relative mb-6" data-te-input-wrapper-init >
            <input
              type="text"
              className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 ${
                uname ? 'has-value' : ''
              }`}            
              id="uname"
              value={uname}
              required
              onChange={(e)=> setUname(e.target.value)}
              placeholder="User Name" />
             <label
    className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary ${
      uname ? 'hidden' : ''
    }`}
  >
      User Name
  </label>
          </div>
     
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="text"
              className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 ${
                email ? 'has-value' : ''
              }`}                  id="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              placeholder="Email address" />
              <label
    className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary ${
      email ? 'hidden' : ''
    }`}
  >Email address
            </label>
          </div>
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="text"
              className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 ${
                contact ? 'has-value' : ''
              }`}                  id="contact"
              value={contact}
              onChange={(e)=> setContact(e.target.value)}
              placeholder="Contact" />
              <label
    className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary ${
      contact ? 'hidden' : ''
    }`}
  >Contact 
            </label>
          </div>

          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="password"
              className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 ${
                password ? 'has-value' : ''
              }`}                  id="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              placeholder="Password" />
               <label
    className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary ${
      password ? 'hidden' : ''
    }` }
  >  Password
            </label>
          </div>

          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="password"
              className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 ${
                password ? 'has-value' : ''
              }`}                  
              id="cpassword"
              value={cpassword}
              onChange={(e)=> setCPassword(e.target.value)}
              placeholder="Password" />
               <label
    className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary ${
      password ? 'hidden' : ''
    }` }
  >  Password
            </label>
          </div>

          

          <div className="text-center lg:text-left">
            <Button
            title='Register'
            action={addUser}
            />
      {error && <p style={{ color: 'red' }}>{error}</p>}

            
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
  )
}

export default Page
