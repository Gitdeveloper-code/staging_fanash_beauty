"use client";
import React, { useState } from "react";
import About1 from "../components/About1";
import Button from "../components/Button";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { useTranslations } from "next-intl";
import Image from "next/image";
import emailjs from "emailjs-com";

interface Errors {
  name: string;
  email: string;
  message: string;
  isChecked: string;
}

const Page = () => {
  const contact = useTranslations("Contact");
  const t = useTranslations("Testimonial");

  const [Name, setName] = useState<string>("");
  const [message, setmessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contacts, setContacts] = useState<
    { Name: string; message: string; email: string }[]
  >([]);
  // validations
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    message: "",
    isChecked: "",
  });

  const validateForm = (): boolean => {
    let tempErrors: Errors = {
      name: "",
      email: "",
      message: "",
      isChecked: "",
    };
    let isValid = true;

    if (Name.trim().length < 6) {
      tempErrors.name = "Name must contain at least 6 characters.";
      isValid = false;
    }

    if (email.trim().length < 10 || !/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid or too short.";
      isValid = false;
    } else {
      let numericCount = (email.match(/\d/g) || []).length;
      if (numericCount < 2) {
        tempErrors.email = "Email must include at least 2 numbers.";
        isValid = false;
      }
    }

    if (message.trim().length < 15) {
      tempErrors.message = "Message must contain 2 to 5 words.";
      isValid = false;
    }

    if (!isChecked) {
      tempErrors.isChecked = "You must agree to the terms.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handlePopupClose = () => {
    setShowPopup(false);
    // Clear the form inputs
    setName("");
    setmessage("");
    setEmail("");
    setIsChecked(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid");
      let obj = {
        Name,
        message,
        email,
        isChecked,
      };
      console.log(obj);
      contacts.push(obj);
      console.log(contacts);

      setShowPopup(true);
      // Send email using Email.js
      emailjs
        .send("service_htss9wb", "template_pjhucov", obj, "mP0EkuaZ0W0v0Hy_s")
        .then((response) => {
          console.log("Email sent:", response);
        })
        .catch((error) => {
          console.error("Email failed to send:", error);
        });

      // Add the form data to the contacts array (optional)
      setContacts([...contacts, obj]);
    } else {
      console.log("Form is invalid");
      setName("");
      setmessage("");
      setEmail("");
      setIsChecked(false);
    }
  };

  return (
    <div>
      <Hero
        height={500}
        isVisible={false}
        path="/asset/img/contact-banner.webp"
        title={contact("sayhi!")}
        description=""
      />
      <Navbar />
      <div className="bg-black py-8 mt-5 mb-5">
      {/* <div>
          <h3 style={{ color: "white", textAlign: "center", fontSize: "40px", fontWeight: "bold" }}>Get In <span style={{ color: "#bfa65c" }}>Touch!</span></h3>
          </div> */}
        <div className="flex flex-wrap md:flex-nowrap mb-10 mx-auto md:px-6">
          {/* Left Section: Contact Form */}
         
          <div className="flex-auto px-4 mb-8 md:w-1/3 mt-8  text-black">
            <div className="h-full bg-white text-black rounded-lg shadow-lg p-6">
            <h1 style={{fontWeight:"bold",fontSize:"20px",textAlign:"center",marginBottom:"10px",textTransform:"uppercase"}}>{contact("contactus")}</h1>
              <form
                className="px-6 py-6 pt-6 pb-6 rounded-lg mb-6 bg-gray-100"
                onSubmit={handleSubmit}
                method="POST"
              >
                <div className="w-100 mb-5">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      type="text"
                      value={Name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                      }
                      className="peer w-full h-full mb-5 bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-border-gray-400 border focus:border-2 focus:border-t-transparent px-3 py-2.5 rounded-[7px] border-gray-400 focus:border-gray-400"
                      placeholder=""
                    />

                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-gray-700 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-700 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-700 peer-focus:text-gray-700 before:border-gray-400 peer-focus:before:!border-gray-400 after:border-gray-400 peer-focus:after:!border-gray-400">
                      Name
                    </label>
                    <div style={{margin: "-23px", marginLeft: 0}}>
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-100 mb-5">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      type="email"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                      className="peer w-full h-full mb-5 bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-border-gray-400 border focus:border-2 focus:border-t-transparent px-3 py-2.5 rounded-[7px] border-gray-400 focus:border-gray-400"
                      placeholder=""
                    />

                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-gray-700 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-700 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-700 peer-focus:text-gray-700 before:border-gray-400 peer-focus:before:!border-gray-400 after:border-gray-400 peer-focus:after:!border-gray-400">
                      Email
                    </label>
                    <div style={{margin: "-23px", marginLeft: 0}}>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                    </div>
                  </div>
                </div>

                <div className="relative w-full min-w-[200px]">
                  <textarea
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setmessage(e.target.value)
                    }
                    className="peer w-full h-full mb-5 bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-border-gray-400 border focus:border-2 focus:border-t-transparent px-3 py-2.5 rounded-[7px] border-gray-400 focus:border-gray-400"
                    id="exampleFormControlTextarea1"
                    rows={3}
                    placeholder=""
                  ></textarea>

                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-gray-700 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-700 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-700 peer-focus:text-gray-700 before:border-gray-400 peer-focus:before:!border-gray-400 after:border-gray-400 peer-focus:after:!border-gray-400">
                    Message
                  </label>
                  <div style={{margin: "-23px", marginLeft: 0}}>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                  </div>
                </div>

                <div className="mb-6 inline-block min-h-[1.5rem] justify-center pl-[1.5rem] md:flex mt-6">
                  <input
                    className="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-tertiary outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-black checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setIsChecked(e.target.checked)
                    }
                    value=""
                    id="exampleCheck96"
                  />

                  <label className="dark:text-gray-700 inline-block pl-[0.15rem] hover:cursor-pointer">
                    {contact("contactformcheckboxtext")}
                  </label>
                  <div style={{margin: "-23px", marginLeft: 0}}>
                  {errors.isChecked && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.isChecked}
                    </p>
                  )}
                  </div>
                </div>

                <div className="text-center ">
                  {/* <Button type="submit" title={contact("send")} /> */}
                  <button
                    type="submit"
                    className="text-white contacts font-mono w-fit bg-tertiary hover:bg-primary hover:text-secondary focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium text-sm px-5 py-2.5 text-center inline-flex gap-3 items-center border border-gray-300 shadow-lg rounded-md w-50"
                  >
                   {contact("send")}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* popup */}
          {showPopup && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
              <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
              <div className="bg-white p-8 rounded-lg shadow-lg  text-black relative z-10">
                <h2 className="text-xl font-semibold mb-4 text-tertiary">
                  Email Send Successfully!
                </h2>
                <p>
                  {" "}
                  Thankyou !
                  <span className="text-lg font-semibold">{Name}</span>
                </p>
                <p>Email: {email}</p>
                <button
                  onClick={handlePopupClose}
                  className="text-white font-mono bg-tertiary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium mt-4 text-sm px-5 py-2.5 inline-flex gap-3 items-center rounded-[7px]"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {/*middle Section */}

          <div className="flex-auto px-4 mb-8 md:w-1/3 mt-8  text-black">
            <div className="h-full bg-white text-black rounded-lg shadow-lg p-6">
              <h1 style={{fontWeight:"bold",fontSize:"20px",textAlign:"center",marginBottom:"10px",textTransform:"uppercase"}}>{contact("businesshours")}</h1>
              <table className="table-auto w-full bg-gray-100">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">{contact("day")}</th>
                    <th className="px-4 py-2 text-left">{contact("hours")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">{contact("monday")}</td>
                    <td className="border px-4 py-2">12:00 - 18:00</td>
                  </tr>
                  <tr className="bg-gray-100 dark:bg-gray-200">
                    <td className="border px-4 py-2">{contact("tuesday")}</td>
                    <td className="border px-4 py-2">10:00 - 18:00</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">{contact("wednesday")}</td>
                    <td className="border px-4 py-2">10:00 - 18:00</td>
                  </tr>
                  <tr className="bg-gray-100 dark:bg-gray-200">
                    <td className="border px-4 py-2">{contact("thursday")}</td>
                    <td className="border px-4 py-2">10:00 - 21:00</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">{contact("friday")}</td>
                    <td className="border px-4 py-2">10:00 - 18:00</td>
                  </tr>
                  <tr className="bg-gray-100 dark:bg-gray-200">
                    <td className="border px-4 py-2">{contact("saturday")}</td>
                    <td className="border px-4 py-2">10:00 - 18:00</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">{contact("sunday")}</td>
                    <td className="border px-4 py-2">12:00 - 18:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/*Right Section:  */}
          <div className="flex-auto px-4 mb-8 md:w-1/3 mt-8">
          <div className="relative h-[450px] md:h-[580px] overflow-hidden  bg-cover bg-[50%] bg-no-repeat ">
          <iframe
            className="object-cover rounded-lg"
            style={{ border: 1, height: "100%", width: "100%" }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9759.465117176767!2d4.846636266303039!3d52.30028148416781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c60b1e9b72762f%3A0x7a057cd5d69eb153!2sFanash%20Beauty!5e0!3m2!1sen!2sus!4v1704618659343!5m2!1sen!2sus"
            width="600"
            height="450"
          ></iframe>
        </div> 
        </div>
        </div> 
        </div>
      {/* testimonial */}
      <div className="container my-5 mx-auto md:px-6">
        <section className="px-5 mb-32 text-center">
          <h2 className="mb-12 text-3xl font-bold text-white">{contact("testimonials")}</h2>

          <div className="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">
            <div className="mb-12 md:mb-0">
              <div className="mb-6 flex justify-center">
                <Image
                  alt = 'Alternative text for image'
                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  className="w-32 rounded-full shadow-lg dark:shadow-black/20"
                />
              </div>
              <h6 className="mb-4 font-medium  text-neutral-200">
              {contact("manpreetkaur")}
              </h6>
              <p className="mb-4 text-neutral-200 text-center">
              {contact("manpreetkaurdescription")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 96 960 960"
                  className="inline-block w-6"
                >
                  <path
                    fill="currentColor"
                    d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z"
                  />
                </svg>
              </p>
              <ul className="mb-0 flex justify-center">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    className="w-5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                    />
                  </svg>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    className="w-5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                    />
                  </svg>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    className="w-5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                    />
                  </svg>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    className="w-5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                    />
                  </svg>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    className="w-5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="m480 757 157 95-42-178 138-120-182-16-71-168v387ZM233 976l65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                    />
                  </svg>
                </li>
              </ul>
            </div>
            <div className="mb-12 md:mb-0">
              <div className="mb-6 flex justify-center">
                <Image
                  alt = 'Alternative text for image'
                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  className="w-32 rounded-full shadow-lg dark:shadow-black/20"
                />
              </div>
              {/* <h5 className="mb-2 text-lg font-bold">Lisa Cudrow</h5> */}
              <h6 className="mb-4 font-medium text-primary dark:text-primary-400">
              {contact("sheetalnaik")}
              </h6>
              <p className="mb-4 text-neutral-200 text-center">
              {contact("sheetalnaikdescription")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 96 960 960"
                  className="inline-block w-6"
                >
                  <path
                    fill="currentColor"
                    d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z"
                  />
                </svg>
              </p>
              <ul className="mb-0 flex justify-center">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    className="w-5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                    />
                  </svg>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    className="w-5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                    />
                  </svg>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    className="w-5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                    />
                  </svg>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    className="w-5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                    />
                  </svg>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    className="w-5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                    />
                  </svg>
                </li>
              </ul>
            </div>
            <div className="mb-0">
              <div className="mb-6 flex justify-center">
                <Image
                  alt = 'Alternative text for image'
                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  className="w-32 rounded-full shadow-lg dark:shadow-black/20"
                />
              </div>
              {/* <h5 className="mb-2 text-lg font-bold">John Smith</h5> */}
              <h6 className="mb-4 font-medium text-primary dark:text-primary-400">
              {contact("chanedraaijer")}
              </h6>
              <p className="mb-4 text-neutral-200 text-center">
              {contact("chanedraaijerdescription")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 96 960 960"
                  className="inline-block w-6"
                >
                  <path
                    fill="currentColor"
                    d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z"
                  />
                </svg>
              </p>
              <ul className="mb-0 flex justify-center">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    className="w-5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                    />
                  </svg>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    className="w-5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                    />
                  </svg>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    className="w-5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                    />
                  </svg>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    className="w-5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                    />
                  </svg>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 96 960 960"
                    className="w-5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z"
                    />
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Testimonial section */}
      {/* <section className=" dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
          <figure className="max-w-screen-md mx-auto">
            <svg
              className="h-12 mx-auto mb-3 text-tertiary dark:text-gray-600"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-2xl font-medium text-white dark:text-white">
                {t("testimonialdescription")}
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <Image
                className="w-6 h-6 rounded-full"
                src="/asset/img/team.png"
                alt="profile picture"
                height={500}
                width={500}
              />
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <div className="pr-3 font-medium text-gray-500 dark:text-white">
                  Micheal Gough
                </div>
                <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                  CEO at Google
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section> */}
    </div>
  );
};
export default Page;
