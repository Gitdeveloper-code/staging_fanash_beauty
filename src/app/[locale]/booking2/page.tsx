"use client"
import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Hero from '../components/Hero';

const Page = () => {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{
    date: string;
    time: string;
    selectedServices: string[];
  }>({
    date: '',
    time: '',
    selectedServices: [],
  });

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [service1, setService1] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [servicesApi, setServicesApi] = useState<{ result: any[] } | null>(null);
  const [bookingApi, setBookingApi] = useState<{ result: any[] } | null>(null);
  const [errors, setErrors] = useState<any>({});


 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date,
            time,
            service: service1,
            email,
            contact,
            selectedServices,
          }),
        });


        if (response.ok) {
          const responseData = await response.json();
          console.log('Booking successful:', responseData);

          setBookingSuccess(true);
          setBookingDetails({
            date,
            time,
            selectedServices,
          });

          resetForm();
        } else {
          const errorMessage = await response.text();
          console.error('Error during booking:', errorMessage);
          setErrors({ booking: 'Error during booking. Please try again later.' });
        }
      } catch (error) {
        console.error('Error during booking:', error);
        setErrors({ booking: 'Error during booking. Please try again later.' });
      }
    }
  };

  const resetForm = () => {
    setDate('');
    setTime('');
    setService('');
    setService1('');
    setSelectedServices([]);
    setEmail('');
    setContact('');
    setErrors({});
  };


  const validateForm = () => {
    const newErrors: any = {};

    // Date validation
    if (!date) {
      newErrors.date = 'Date is required';
    }

    // Time validation
    if (!time) {
      newErrors.time = 'Time is required';
    }

    // Service validation
    if (!service) {
      newErrors.service = 'Service is required';
    }

    // Service1 validation
    if (!service1) {
      newErrors.service1 = 'Service1 is required';
    }

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    // Contact validation
    if (!contact) {
      newErrors.contact = 'Contact is required';
    } else if (!/^\d{10}$/i.test(contact)) {
      newErrors.contact = 'Invalid contact number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    
  }
};

  // Call the async functions
  fetchServices();
  fetchBookingApi();
}, []);




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
              <form onSubmit={handleSubmit} method="POST">
                <div className="mb-5 flex flex-wrap items-start">
                  {/* Date */}
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <h3 className="mb-5 block text-base font-semibold text-tertiary sm:text-xl">
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
                  {errors.date && <small className="text-red-500">{errors.date}</small>}
                    </div>
                  </div>

                  {/* Time */}
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <h3 className="mb-5 block text-base font-semibold text-tertiary sm:text-xl">
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
                  {errors.time && <small className="text-red-500">{errors.time}</small>}
                    </div>
                  </div>
                </div>

                <div className="mb-5 flex">
                  {/* Service Type */}
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5 pt-3">
                      <h3 className="mb-5 block text-base font-semibold text-tertiary sm:text-xl">
                        Service Type
                      </h3>
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
                  {errors.service && <small className="text-red-500">{errors.service1}</small>}
                    </div>
                  </div>
                  {/* Service */}
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5 pt-3">
                      <h3 className="mb-5 block text-base font-semibold text-tertiary sm:text-xl">
                        Service Type
                      </h3>
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
                         {errors.service1 && <small className="text-red-500">{errors.service1}</small>}
                    </div>
                  </div>
                </div>


                <div className="mb-5 flex flex-wrap">
                  {/* Email Input */}
                  <div className="w-full px-3 sm:w-1/2">
                    <h3 className="mb-5 block text-base font-semibold text-tertiary sm:text-xl">
                      Email Id
                    </h3>
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
                  {errors.email && <small className="text-red-500">{errors.email}</small>}
                  </div>

                  {/* Contact Input */}
                  <div className="w-full px-3 sm:w-1/2">
                    <h3 className="mb-5 block text-base font-semibold text-tertiary sm:text-xl">
                      Contact Number
                    </h3>
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
                  {errors.contact && <small className="text-red-500" >{errors.contact}</small>}
                  </div>
                </div>

                <div className="text-center p-5 m-5 ">

                <button type="submit"  className="text-white font-mono  w-fit  bg-tertiary hover:bg-primary hover:text-secondary focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium  text-sm px-5 py-2.5 text-center inline-flex gap-3 items-center">Proceed to Payment</button>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>
{/* Pop-up message */}
{bookingSuccess && (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg text-black"> {/* Apply text-black class here */}
      <h2 className="text-xl font-semibold mb-4">Appointment Successfully Booked</h2>
      <p>Date: {bookingDetails.date}</p>
      <p>Time: {bookingDetails.time}</p>
      <p>Selected Services: {bookingDetails.selectedServices.join(', ')}</p>
      <button
        onClick={() => setBookingSuccess(false)}
        className="text-white font-mono  w-fit  bg-tertiary hover:bg-primary hover:text-secondary focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium  text-sm px-5 py-2.5 text-center inline-flex gap-3 items-center"
      >
        Close
      </button>
    </div>
  </div>
)}

  </div>
 );
};

export default Page