"use client";
export const enum Role {
  ADMIN = "Admin",
  MANAGER = "Manager",
  LEAD = "Lead",
  Employee = "Employee",
}

// export interface User {
//   Approvals?: Approvals;
//   //   _id: string;
//   username: string;
//   email: string;
//   role: Role;
//   rm: string;
//   salary: string;
//   //   isActive: string;
// }
interface Approvals {
  _id: string;
  approveByAdmin: boolean;
  approveByManager: boolean;
  approveByLead: boolean;
  salary: string;
  __v: number;
}

export interface User {
  email: string;
  username: string;
  role: string;
  isActive: boolean;
  salary: string;
  createdAt?: string;
  updatedAt?: string;
  Approvals?: Approvals;
  id?: string;
}
