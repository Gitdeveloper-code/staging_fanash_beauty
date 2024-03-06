"use client";
import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Hero from "../components/Hero";
import emailjs from "emailjs-com";


interface Option {
    id: string;
    time: string;
}

interface BookingApi {
    result: Option[];
}
const Page = () => {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{
    date: string;
    time: string;
    selectedServices: string[];
  }>({
    date: "",
    time: "",
    selectedServices: [],
  });

   const [date, setDate] = useState<string>('');
 const [time, setTime] = useState<string>('');
  const [service, setService] = useState("");
  const [service1, setService1] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [servicesApi, setServicesApi] = useState<{ result: any[] } | null>(
    null
  );
  const [bookingApi, setBookingApi] = useState<{ result: any[] } | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [errors1, setErrors1] = useState<any>(true);
  const [errors2, setErrors2] = useState<any>(true);


  const err_msg = (
    <small className="text-red-500">
      Slot is not available for the selected date
    </small>
  );
  const err_msg1 = (
    <small className="text-red-500">
      Slot is not available for the selected time
    </small>
  );
  const err_msg2 =(
    <small className="text-red-500">
      Enter a Valid Date!
    </small>
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Fetch existing bookings
        const response = await fetch("http://localhost:3000/api/bookings");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const existingBookings = await response.json();

        // Filter existing bookings for the selected date and time
        const filteredBookings = existingBookings.result.filter(
          (entry: any) => {
            return entry.date === date && entry.time === time;
          }
        );

        // Check if the slot is available
        const isSlotAvailable = filteredBookings.length === 0;

        if (isSlotAvailable) {
          try {
            const templateParams = {
              name: "Fanash Beauty Website",
              date: date,
              time: time,
              service: service,
              email: email,
              contact: contact,
              serviceType: selectedServices.join(", "), // Convert array to string
            };

            const emailResponse = await emailjs.send(
              "service_rbc43qh", // Replace with your Email.js service ID
              "template_ibi6ngg", // Replace with your Email.js template ID
              templateParams,
              "D2L4M77ORaA2dX64b" // Replace with your Email.js user ID
            );

            console.log("Email sent successfully:", emailResponse);
          } catch (error) {
            console.error("Error sending email:", error);
            setErrors("Error sending email. Please try again later.");
          }

          console.log(contact, email, date, time, service, selectedServices);

          // Proceed with the booking
          const bookingResponse = await fetch(
            "http://localhost:3000/api/bookings",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                date,
                time,
                service: service1,
                email,
                contact,
                serviceType: selectedServices,
              }),
            }
          );

          if (bookingResponse.ok) {
            const responseData = await bookingResponse.json();
            console.log("Booking successful:", responseData);

            // Update state and reset form
            setBookingSuccess(true);
            setBookingDetails({
              date,
              time,
              selectedServices,
            });
            setErrors1(true);

            resetForm();
          } else {
            const errorMessage = await bookingResponse.text();
            console.error("Error during booking:", errorMessage);

            setErrors({
              booking: "Error during booking. Please try again later.",
            });
          }
        } else {
          // Slot is not available
          console.log("Slot is not available");
          setErrors1(false);

          setErrors({
            booking: "Slot is not available for the selected date and time.",
          });
        }
      } catch (error) {
        console.error("Error during booking:", error);
        setErrors({ booking: "Error during booking. Please try again later." });
      }
    }
  };

  const resetForm = () => {
    setDate("");
    setTime("");
    setService("");
    setService1("");
    setSelectedServices([]);
    setEmail("");
    setContact("");
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: any = {};

    // Date validation
    if (!date) {
      newErrors.date = "Date is required";
    }
    // Time validation
    if (!time) {
      newErrors.time = "Time is required";
    }else {
      const inputDate = new Date(date);
      const currentDate = new Date();
      if (inputDate <= currentDate) {
        newErrors.date = "Enter a valid date";
      }
    }
    // Service validation
    if (!service) {
      newErrors.service = "Service is required";
    }

    // Service1 validation
    // if (!service1) {
    //   newErrors.service1 = "Select service type.";
    // }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email format";
      }
    }

    // Contact validation
    if (!contact) {
      newErrors.contact = "Contact is required";
    } else if (!/^\d{10}$/i.test(contact)) {
      newErrors.contact = "Invalid contact number";
    }

    // Set errors and return validation result
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/services", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Services API data:", data); // Log the data to check
        setServicesApi(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    const fetchBookingApi = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/availabity", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Booking API data:", data); // Log the data to check
        setBookingApi(data);
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    // Call the async functions
    fetchServices();
    fetchBookingApi();
  }, []);

  const services = servicesApi
    ? [
        {
          title: "Threading",
          details: servicesApi.result
            .filter(
              (item: { category: string }) => item.category === "Threading"
            )
            .map((item: { category: string; name: string }) => item),
        },
        {
          title: "Waxing",
          details: servicesApi.result
            .filter((item: { category: string }) => item.category === "Waxing")
            .map((item: { category: string }) => item),
        },
        {
          title: "Sugar Epilation",
          details: servicesApi.result
            .filter(
              (item: { category: string }) =>
                item.category === "Sugar Epilation"
            )
            .map((item: { category: string }) => item),
        },
        {
          title: "Facial",
          details: servicesApi.result
            .filter((item: { category: string }) => item.category === "Facial")
            .map((item: { category: string }) => item),
        },
        {
          title: "Manicure",
          details: servicesApi.result
            .filter(
              (item: { category: string }) => item.category === "Manicure"
            )
            .map((item: { category: string }) => item),
        },
        {
          title: "Pedicure",
          details: servicesApi.result
            .filter(
              (item: { category: string }) => item.category === "Pedicure"
            )
            .map((item: { category: string }) => item),
        },
        {
          title: "Massage",
          details: servicesApi.result
            .filter((item: { category: string }) => item.category === "Massage")
            .map((item: { category: string }) => item),
        },
      ]
    : [];

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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Date */}
                  
                    <div>
                      <h3 className="mb-2 block text-base font-semibold text-tertiary sm:text-xl">
                        Date*
                      </h3>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full h-11 rounded-md border border-[#e0e0e0] bg-white py-3 px-4 sm:px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                      {errors.date && (
                        <small className="text-red-500">{errors.date}</small>
                      )}
                      {errors1 ? null : err_msg}
                      {errors2 ? null : err_msg2}
                    </div>
                  

                  {/* Time */}
                  <div>
                    <div className="mb-5">
                      <h3 className="mb-2 block text-base font-semibold text-tertiary sm:text-xl">
                        Time slots*
                      </h3>
                    <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full h-11 rounded-md border border-[#e0e0e0] bg-white py-3 px-4 sm:px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                        <option key="default" className="m-1 btn btn-outline btn-secondary">
                            Choose..
                        </option>
                        {bookingApi?.result.map((t: Option, index: number) => (
                            <option key={t.id || index}>{t.time}</option>
                        ))}
                    </select>


                      {errors.time && (
                        <small className="text-red-500">{errors.time}</small>
                      )}
                      {errors1 ? null : err_msg1}
                    </div>
                  </div>
                </div>

                {/* Service Type and Region */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    
                      <h3 className="mb-2 block text-base font-semibold text-tertiary sm:text-xl">
                        Service Type*
                      </h3>
                      <select
                        value={service}
                        onChange={(e) => {
                          setService(e.target.value);
                          const selectedService = e.target.value;
                          setSelectedServices((prevServices) => [
                            ...prevServices,
                            selectedService,
                          ]);
                        }}
                        className="w-full h-11 rounded-md border border-[#e0e0e0] bg-white py-3 px-4 sm:px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      >
                        <option className="m-1 btn btn-outline btn-secondary">
                          Choose..
                        </option>
                       {services.map((service, index) => (
                        <option key={index}>{service.title}</option>
                        ))}

                      </select>
                      {errors.service && (
                        <small className="text-red-500">
                          {errors.service}
                        </small>
                      )}
                    
                  </div>
                  {/* Region */}
                  <div>
                    <div className="mb-5">
                      <h3 className="mb-2 block text-base font-semibold text-tertiary sm:text-xl">
                        Region
                      </h3>
                      <select
                        value={service1}
                        onChange={(e) => {
                          setService1(e.target.value);
                          const selectedService = e.target.value;
                          setSelectedServices((prevServices) => [
                            ...prevServices,
                            selectedService,
                          ]);
                        }}
                        className="w-full h-11 rounded-md border border-[#e0e0e0] bg-white py-3 px-4 sm:px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                                }, index: number) => (
                                <option key={index}>{item.name}</option>
                                )
                            )}

                      </select>
                      {/* {errors.service1 && (
                        <small className="text-red-500">
                          {errors.service1}
                        </small>
                      )} */}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email Input */}
                  <div>
                    <h3 className="mb-2 block text-base font-semibold text-tertiary sm:text-xl">
                      Email Id*
                    </h3>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter email"
                      // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      title="Enter a valid email"
                      className="w-full h-11 rounded-md border border-[#e0e0e0] bg-white py-3 px-4 sm:px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    {errors.email && (
                      <small className="text-red-500">{errors.email}</small>
                    )}
                  </div>

                  {/* Contact Input */}
                  <div>
                    <h3 className="mb-2 block text-base font-semibold text-tertiary sm:text-xl">
                      Contact Number*
                    </h3>
                    <input
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      type="tel"
                      name="contact"
                      id="contact"
                      placeholder="Enter contact number"
                      title="Enter a 10-digit contact number"
                      className="w-full h-11 rounded-md border border-[#e0e0e0] bg-white py-3 px-4 sm:px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    {errors.contact && (
                      <small className="text-red-500">{errors.contact}</small>
                    )}
                  </div>
                </div>

                <div className="text-center p-5 m-5 ">
                  <button
                    type="submit"
                    className="text-white font-mono bg-tertiary hover:bg-primary hover:text-secondary focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium text-sm px-5 py-2.5 text-center inline-flex gap-3 items-center"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>
      {/* Pop-up message */}

      {bookingSuccess && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-8 rounded-lg shadow-lg  text-black relative z-10">
            <h2 className="text-xl font-semibold mb-4 text-tertiary">
              Appointment Successfully Booked
            </h2>
            <p>Date: {bookingDetails.date}</p>
            <p>Time: {bookingDetails.time}</p>
            <p>
              Selected Services: {bookingDetails.selectedServices.join(", ")}
            </p>
            <button
              onClick={() => setBookingSuccess(false)}
              className="text-white font-mono bg-tertiary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium mt-4 text-sm px-5 py-2.5 inline-flex gap-3 items-center "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
