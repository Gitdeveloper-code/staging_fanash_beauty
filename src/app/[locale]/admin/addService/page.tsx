 "use client"
import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import AdminNavBar from '../../components/AdminNavBar';

const Page = () => {
   const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [servicesApi, setServicesApi] = useState<{ result: Service[] }>({ result: [] });
  const [openDetails, setOpenDetails] = useState<{ [key: string]: boolean }>({});

interface Service {
  _id: string;
  name: string;
  price: string;
  category: string;
}

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/services`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setServicesApi(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmation = window.confirm('Are you sure you want to delete this item?');

    if (confirmation) {
      try {
        await deleteService(id);
        alert('Service deleted successfully!');
      } catch (error) {
        console.error('Error deleting Service:', error);
        alert('Error deleting Service. Please try again.');
      }
    }
  };
  
  const addService = async () => {
    const data = {
      name: name,
      price: price,
      category: category
    };

    try {
      const result = await fetch(`/api/services`, {
        method: "POST",
        body: JSON.stringify(data)
      });

      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      fetchData();
      alert("Service added successfully!");
      setName("");
      setPrice("");
      setCategory("");

    } catch (error) {
      console.error('Error adding service:', error);
      alert("Error adding service. Please try again.");
    }
  };

  const toggleDetails = (index: any) => {
    setOpenDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const deleteService = async (id: string) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchData();
      alert("Service deleted successfully!");
    } catch (error) {
      console.error('Error deleting service:', error);
      alert("Error deleting service. Please try again.");
    }
  };

  const services = [
    { path: "/asset/img/service1.png", title: "THREADING", details: (servicesApi.result ?? []).filter((item) => item.category === 'Threading') },
    { path: "/asset/img/service10.png", title: "WAXING", details: (servicesApi.result ?? []).filter((item) => item.category === 'Waxing') },
    { path: "/asset/img/service3.png", title: "SUGAR EPILATION", details: (servicesApi.result ?? []).filter((item) => item.category === 'Sugar Epilation') },
    { path: "/asset/img/service9.png", title: "FACIAL", details: (servicesApi.result ?? []).filter((item) => item.category === 'Facial') },
    { path: "/asset/img/service5.png", title: "MANICURE", details: (servicesApi.result ?? []).filter((item) => item.category === 'Manicure') },
    { path: "/asset/img/service6.png", title: "PEDICURE", details: (servicesApi.result ?? []).filter((item) => item.category === 'Pedicure') },
    { path: "/asset/img/service8.png", title: "MASSAGE", details: (servicesApi.result ?? []).filter((item) => item.category === 'Massage') },
  ];

  return (
    <div className='flex flex-col w-full'>
      <AdminNavBar />
      <div className='flex flex-col items-center justify-center w-full m-4'>
        <h3 className="mb-3 block text-base font-medium text-tertiary">Add Service</h3>
        <form>
          <div className="w-full px-3 lg:w-96">
            <div className="mb-5">
              <input
                type="text"
                name="name"
                value={name}
                placeholder='Service Name'
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="w-full px-3  lg:w-96">
            <div className="mb-5">
              <input
                type="text"
                name="price"
                value={price}
                placeholder='Price'
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="w-full px-3  lg:w-96">
            <div className="mb-5">
              <input
                type="text"
                name="category"
                value={category}
                placeholder='Category'
                onChange={(e) => setCategory(e.target.value)}
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
      <main>
        <div className="bg-black mx-auto p-12 w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border bg-gray-500 px-4 py-2">Services</th>
                <th className="border bg-gray-500 px-4 py-2">Details</th>
                <th className="border bg-gray-500 px-4 py-2">Price</th>
                <th className="border bg-gray-500 px-4 py-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <React.Fragment key={index}>
                  <tr className="border">
                    <td className="border px-4 py-2">{service.title}</td>
                    <td className="border px-4 py-2">
                      {service.details.length > 0 && (
                        <button onClick={() => toggleDetails(index)} className="text-blue-500 hover:text-blue-700">
                          {openDetails[index] ? "Hide Details" : "View Details"}
                        </button>
                      )}
                    </td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                  </tr>
                  {openDetails[index] && service.details.map((detail, detailIndex) => (
                    <tr key={`${index}-${detailIndex}`} className="border">
                      <td className="border px-4 py-2">-</td>
                      <td className="border px-4 py-2">{detail.name}</td>
                      <td className="border px-4 py-2">{detail.price}</td>
                      <td className="border px-4 py-2">
                        <button onClick={() => handleDelete(detail._id)} className="text-red-500 hover:text-red-700">
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Page;
