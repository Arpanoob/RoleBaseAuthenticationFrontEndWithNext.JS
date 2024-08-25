"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "../types/user";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateSalary } from "../action/authActions"; // Import your actions

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isActive",
    header: "Status",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "rm",
    header: "RM",
  },
  {
    accessorKey: "salary",
    header: "Salary",
  },
  {
    header: "Action",
    id: "action",
    cell: ({ row }) => {
      const user = row.original as User;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isModalOpen, setIsModalOpen] = useState(false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [newSalary, setNewSalary] = useState(user.salary || "");
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const dispatch = useDispatch();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { userInfo } = useSelector((state: any) => state.auth);

      const handleModalOpen = () => {
        setNewSalary(user.salary || "");
        setIsModalOpen(true);
      };

      const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSalary(e.target.value);
      };

      const handleUpdateSalary = () => {
        if (newSalary) {
          dispatch(updateSalary({ id: user.id as string, salary: newSalary, role: user.role }) as any)
            .then(() => {
              setIsModalOpen(false); // Close modal on successful update
              dispatch(getUser(userInfo.user) as any); // Refresh user data
            })
            .catch((error: any) => {
              console.error("Failed to update salary:", error.message || error);
            });
        }
      };

      return (
        <>
          <button
            className="px-4 py-2 rounded text-white bg-blue-500"
            onClick={handleModalOpen}
          >
            Update Salary
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Edit Salary</h2>
                <input
                  type="number"
                  value={newSalary}
                  onChange={handleSalaryChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateSalary}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    },
  },
];
