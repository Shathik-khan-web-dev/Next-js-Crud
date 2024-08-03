"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./model";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [allData, setAllData] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await axios.get("/api/user");
        setAllData(response.data.return);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getAllData();
  }, []);

  const handleEditClick = (data) => {
    setEditing(data._id);
    setFormData({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/user/${editing}`, formData);
      setEditing(null);

      // Refresh the data
      const response = await axios.get("/api/user");
      setAllData(response.data.return);
      toast.success("User updated successfully!"); // Add success message
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update user."); // Add error message
    }
  };

  const handleCancelEdit = () => {
    setEditing(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/user/${id}`);
      // Refresh the data
      const response = await axios.get("/api/user");
      setAllData(response.data.return);
      toast.success("User deleted successfully!"); // Add success message
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete user."); // Add error message
    }
  };

  const handleAddUserClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = () => {
    // Refresh the data after adding a new user
    const getAllData = async () => {
      try {
        const response = await axios.get("/api/user");
        setAllData(response.data.return);
      } catch (error) {
        console.error("Error:", error);
      } 
    };
    getAllData();
    handleCloseModal();
  };

  return (
    <div className="px-4 my-12 py-4 sm:px-6 lg:px-8 border-4 md:mx-56 md:h-full  ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900 underline">
            Users Details:
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={handleAddUserClick} // Open the modal
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add user
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Password
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Number
                  </th>
                  <th
                    scope="col"
                    className=" px-3 py-3.5 text-left text-sm font-semibold text-gray-900 pl-3 pr-4 sm:pr-0">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {allData.map((data) => (
                  <tr key={data._id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {editing === data._id ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="border rounded p-1"
                        />
                      ) : (
                        data.name
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {editing === data._id ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="border rounded p-1"
                        />
                      ) : (
                        data.email
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {editing === data._id ? (
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="border rounded p-1"
                        />
                      ) : (
                        data.password
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {editing === data._id ? (
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="border rounded p-1"
                        />
                      ) : (
                        data.phone
                      )}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      {editing === data._id ? (
                        <>
                          <button
                            onClick={handleSubmit}
                            className="text-indigo-600 hover:text-indigo-900 mr-2">
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-red-600 hover:text-red-900">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <a
                            onClick={() => handleEditClick(data)}
                            className="text-indigo-600 hover:text-indigo-900 mr-2">
                            Edit
                          </a>
                          <button
                            onClick={() => handleDelete(data._id)}
                            className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal component */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
      />

      <ToastContainer />
    </div>
  );
}
