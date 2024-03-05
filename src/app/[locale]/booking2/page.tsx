"use client"
import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Hero from '../components/Hero';

 
const Page= () => {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [service1, setService1] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [servicesApi, setServicesApi] =useState<{ result: any[] } | null>(null);
  const [bookingApi, setBookingApi] = useState<{ result: any[] } | null>(null);
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [clickedValues, setClickedValues] = useState<string[]>([]);
  const [error, setError] = useState<string>('');


  
  const handleItemClick = (itemName: string, itemCategory:string) => {
    setClickedItem(prevItem => (prevItem === itemName ? prevItem : itemName));
    setClickedValues(prevValues => [...prevValues, itemName]);
    setSelectedServices((prevSelectedServices) => {
        if (prevSelectedServices.includes(itemCategory)) {
          // If service is already selected, remove it
          return prevSelectedServices.filter((service) => service);
        } else {
          // If service is not selected, add it
          return [...prevSelectedServices, itemCategory];
        }
      });


};

  useEffect(() => {
  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/services", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Services API data:", data); // Log the data to check
      setServicesApi(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchBookingApi = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/availabity", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Booking API data:", data); // Log the data to check
    setBookingApi(data);
  } catch (error) {
    console.error('Error fetching availability:', error);
    setError('Error fetching availability. Please try again later.');
  }
};

  // Call the async functions
  fetchServices();
  fetchBookingApi();
}, []);



  
  const booking = async()=> {
    const data = {
      date: date,
      time: time,
      service: service,
      email: email,
      contact: contact,
      seriviceType: selectedServices
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactNumberRegex = /^\d{10}$/;

   if (emailRegex.test(email)) {
      console.log("Email Id Error "+ {email})

      setError(`${email} Invalid Email`);
    } 
    else if (contactNumberRegex.test(contact)) {
       setError(`${contact} Invalid Contact details`);
     }   
     else if  (!date || !email || !time || !service || contact || selectedServices) {
      console.log("Blank Fields")
      setError('All fields are necessary');
    } 
     else{
      console.log(contact,email,date,time,service,selectedServices)
      const result = await fetch("http://localhost:3000/api/bookings", {
      method: "POST",
      body: JSON.stringify(data)
    });
     
    }    
   

  }


  const services = servicesApi ? [
    {  title: "Threading", details: servicesApi.result.filter((item: {category:string})=> item.category=== 'Threading').map((item: {category:string, name:string})=> item) },
    {  title: "Waxing", details:servicesApi.result.filter((item: {category:string})=> item.category=== 'Waxing').map((item: {category:string})=> item)  },
    {  title: "Sugar Epilation", details: servicesApi.result.filter((item: {category:string})=> item.category=== 'Sugar Epilation').map((item: {category:string})=> item) },
    {  title: "Facial", details: servicesApi.result.filter((item: {category:string})=> item.category=== 'Facial').map((item: {category:string})=> item) },
    {  title: "Manicure", details: servicesApi.result.filter((item: {category:string})=> item.category=== 'Manicure').map((item: {category:string})=> item)},
    {  title: "Pedicure", details: servicesApi.result.filter((item: {category:string})=> item.category=== 'Pedicure').map((item: {category:string})=> item) },
    {  title: "Massage", details: servicesApi.result.filter((item: {category:string})=> item.category=== 'Massage').map((item: {category:string})=> item) },

  ]: [];

  

return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
      <div className="bg-gray-50 dark:bg-gray-900 col-span-2">
        <Hero
          height={400}
          isVisible={false}
          path="/asset/img/login.png"
          title="Reserve Your Slot"
        />
        <div>
          <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full h-full">
              <form action="" method="POST">
                <div className="mb-5 flex flex-wrap items-start">
                  {/* Date */}
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <h3 className="mb-3 block text-base font-medium text-tertiary">
                        {" "}
                        Date{" "}
                      </h3>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <h3 className="mb-3 block text-base font-medium text-tertiary">
                        {" "}
                        Time slots{" "}
                      </h3>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="dropdown w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      >
                        <option className="m-1 btn btn-outline btn-secondary">
                          Choose..
                        </option>
                        {bookingApi?.result.map((t) => (
                          <option key={t.id}>{t.time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-5 flex">
                  {/* Service Type */}
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5 pt-3">
                      <label className="mb-5 block text-base font-semibold text-tertiary sm:text-xl">
                        Service Type
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="dropdown w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      >
                        <option className="m-1 btn btn-outline btn-secondary">
                          Choose..
                        </option>

                        {services.map((service) => (
                          <option key={service.title}>{service.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* Service */}
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5 pt-3">
                      <label className="mb-5 block text-base font-semibold text-tertiary sm:text-xl">
                        Service Type
                      </label>
                      <select
                        value={service1}
                        onChange={(e) => setService1(e.target.value)}
                        className="dropdown w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      >
                        <option className="m-1 btn btn-outline btn-secondary">
                          Choose..
                        </option>

                        {servicesApi?.result
                          .filter(
                            (item: { category: string }) =>
                              item.category === service
                          )
                          .map(
                            (item: {
                              category: string;
                              name: string;
                              price: string;
                            }) => (
                              <option key={item.name}>{item.name}</option>
                            )
                          )}
                      </select>
                    </div>
                  </div>
                </div>

                {/* <div className='w-full px-3'>
              <div className='mb-5 pt-3'>
                <label className="mb-5 block text-base font-semibold text-tertiary sm:text-xl">
                  Select Services
                </label>
                <div className='flex flex-row'>
                {servicesApi?.result.filter((item: {category:string})=> item.category===service).map((item: {category:string, name:string, price:string})=>
                <div key={item.name} className="mb-2 mr-2 flex flex-wrap">
             
             <span id={item.name}
          key={item.name}
          onClick={() => handleItemClick(item.name, item.category)}
          className={`hover:cursor-pointer text-xs font-semibold inline-block py-1 px-2 rounded-full text-secondary uppercase last:mr-0 mr-1 ${
            clickedItem === item.name ? 'bg-tertiary' : 'bg-gray-400'
          }`}
        >
          {item.name}
        </span>
              </div>
                )}</div>
                    <div className="mb-4">
        <strong>Selected Services:</strong>
     
        <div className='bg-slate-300'>
        {selectedServices.map((value, index) => (
            <span key={index} className="mr-2">
                 {${index+1} ${value}}

            </span>
          ))}
          </div>
          <div>
          {clickedValues.map((value, index) => (
            <span key={index} className="mr-2">
             {` ${value} , `}
            </span>
          ))}
        </div>
      </div>
                
              </div>
            </div> */}

                <div className="mb-5 flex flex-wrap">
                  {/* Email Input */}
                  <div className="w-full px-3 sm:w-1/2">
                    <label className="mb-5 block text-base font-semibold text-tertiary sm:text-xl">
                      Email Id
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      title="Enter a valid email"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>

                  {/* Contact Input */}
                  <div className="w-full px-3 sm:w-1/2">
                    <label className="mb-5 block text-base font-semibold text-tertiary sm:text-xl">
                      Contact Number
                    </label>
                    <input
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      type="tel"
                      name="contact"
                      id="contact"
                      placeholder="Enter contact number"
                      title="Enter a 10-digit contact number"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>

                {/* <div className="mb-5">
  <label
            className="mb-5 block text-base font-semibold text-tertiary sm:text-xl"
          >
            Email Id
          </label>

          <input value={email} onChange={(e)=> setEmail(e.target.value)} 
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title='Enter a valid email'
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
            </div>
 <div className="mb-5">
  <label
            className="mb-5 block text-base font-semibold text-tertiary sm:text-xl"
          >
            Contact Number
          </label>

          <input value={contact} onChange={(e)=> setContact(e.target.value)} 
                  type="tel"
                  name="contact"
                  id="contact"
                 
                  title="Enter a 10-digit contact number"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div> */}

                <div className="text-center p-5 m-5 ">
                  <Button action={booking} title="Proceed to Payment" />
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>
  </div>
 );
};

export default Page