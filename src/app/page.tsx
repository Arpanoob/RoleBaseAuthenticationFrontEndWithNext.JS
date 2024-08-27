"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getUser, addUser, getApprovals } from "../action/authActions";
import Profile from "@/components/profile";
import { DataTable } from "@/components/dataTable";
import { columns } from "@/components/colums";
import { Appcolumns } from "@/components/approvalsColums";
import Cookies from "js-cookie";

import { Role } from "@/types/user";

export default function Home() {
  const router = useRouter();
  // console.log(Cookies.get('token'),"qw")
  const { loading, userInfo, error, userList, approvals } = useSelector(
    (state: any) => state.auth
  );
  //console.log(userInfo.user.role)
  useEffect(() => {
    if (+userInfo.status !== 200 || Cookies.get("token")) router.push("/login");
  }, [userInfo.status, router]);
  function getCookieExpiryDate(seconds: number) {
    const date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    return `expires=${date.toUTCString()}`;
  }

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     console.log("Interval running");

  //     const cookieName = "token";
  //     const cookieValue = "1sec";
  //     const expiresInSeconds = 1; 
  //     const expires = getCookieExpiryDate(expiresInSeconds);

  //     document.cookie = `${cookieName}=${cookieValue}; path=/; ${expires}`;

  //     const token = Cookies.get("token");
  //     console.log("Current token:", token); 

  //     if (token) {
  //       console.log("Cookie found:", token);
  //       router.push("/login");
  //     }
  //   }, 1000); 

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [router]);

  const [selected, setSelected] = useState("Profile");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    salary: "",
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filters = ["Approval", "Users", "Profile"];
  const dispatch = useDispatch();

  const toggleModal = () => setIsModalOpen(!isModalOpen); // Toggle function

  useEffect(() => {
    if (selected === filters[1]) {
      dispatch(getUser(userInfo?.user) as any);
    }
    if (selected === filters[0]) {
      dispatch(getApprovals(userInfo) as any);
    }
  }, [selected]);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form Data:", formData); // Debugging: Ensure formData is correctly populated
    dispatch(addUser(formData) as any);
    toggleModal(); // Close modal after dispatch
  }

  return (
    <div className="mt-6 overflow-hidden">
      <div className="flex items-center justify-center fixed ml-[40%]">
        <div className="inline-flex rounded-lg my-3 bg-gray-100 bg-opacity-30 mx-auto">
          {filters.map((filter, index) => (
            <button
              key={filter}
              onClick={() => setSelected(filter)}
              className={`py-[10px] sm:py-2 my-1 px-[12px] sm:px-6 inline-flex items-center justify-center font-medium border border-gray-50 text-center focus:bg-primary text-black text-sm sm:text-base capitalize bg-white
              ${index === filters.length - 1 ? "!rounded-r-lg" : ""}
              ${index === 0 ? "!rounded-l-lg" : ""}
              ${
                filter === selected
                  ? "border-green-500 bg-green-900 text-white"
                  : ""
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-screen mt-[100px] w-full overflow-hidden">
        {selected === filters[2] && <Profile user={userInfo.user} />}
        {selected === filters[1] && (
          <>
            {/* Add Button */}
            <button
              onClick={toggleModal}
              className="w-12 h-12 mt-[25px] ml-[15px] fixed bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>

            {/* DataTable */}
            <div className="overflow-hidden">
              <DataTable columns={columns} data={userList} />
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6 w-96">
                  <h2 className="text-xl font-semibold mb-4">Add New User</h2>
                  <form onSubmit={handleAddUser}>
                    {/* Name Field */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter name"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter email"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Role{userInfo.user.role}
                      </label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select role</option>
                        {userInfo.user.role === Role.ADMIN && (
                          <>
                            <option value="Lead">Lead</option>
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                          </>
                        )}
                        {userInfo.user.role === Role.MANAGER && (
                          <>
                            <option value="Employee">Employee</option>
                            <option value="Lead">Lead</option>
                          </>
                        )}
                        {userInfo.user.role === Role.LEAD && (
                          <>
                            <option value="Employee">Employee</option>
                          </>
                        )}
                      </select>
                    </div>

                    {/* Salary Field */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Salary
                      </label>
                      <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter salary"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={toggleModal}
                        className="bg-gray-500 text-white py-2 px-4 rounded"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
        {selected === filters[0] && (
          <DataTable columns={Appcolumns} data={approvals} />
        )}
      </div>
    </div>
  );
}
